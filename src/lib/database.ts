import {
  DEFAULT_CATEGORIES,
  DEFAULT_ROUTINE,
  FILES_ROOT_ID,
  LEGACY_LS_KEYS,
  NAMED_ROUTINES,
  PRANALIKA_TEMPLATES,
  SEVA_FOLDER_TREE,
  SEVA_ROOT_ID,
} from "./constants";
import type {
  AppSettings,
  Category,
  DiaryDay,
  DiaryEntry,
  FileBlobRow,
  FileMeta,
  Folder,
  Routine,
  SevaRecord,
} from "./types";
import { DB_NAME, DB_VERSION, SEED_VERSION } from "./types";
import { keyOf, uid } from "./utils";

const STORES = [
  "diary",
  "entries",
  "routines",
  "seva",
  "files",
  "fileblobs",
  "folders",
  "settings",
  "categories",
] as const;

export type StoreName = (typeof STORES)[number];

let dbPromise: Promise<IDBDatabase> | null = null;

function reqToPromise<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error("IndexedDB request failed"));
  });
}

function txDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("IndexedDB tx failed"));
    tx.onabort = () => reject(tx.error ?? new Error("IndexedDB tx aborted"));
  });
}

export function openDb(): Promise<IDBDatabase> {
  if (typeof indexedDB === "undefined") {
    return Promise.reject(new Error("IndexedDB is not available"));
  }
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains("diary")) {
          db.createObjectStore("diary", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("entries")) {
          const s = db.createObjectStore("entries", { keyPath: "id" });
          s.createIndex("date", "date", { unique: false });
        }
        if (!db.objectStoreNames.contains("routines")) {
          db.createObjectStore("routines", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("seva")) {
          const s = db.createObjectStore("seva", { keyPath: "id" });
          s.createIndex("folderId", "folderId", { unique: false });
        }
        if (!db.objectStoreNames.contains("files")) {
          const s = db.createObjectStore("files", { keyPath: "id" });
          s.createIndex("folderId", "folderId", { unique: false });
        }
        if (!db.objectStoreNames.contains("fileblobs")) {
          db.createObjectStore("fileblobs", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("folders")) {
          const s = db.createObjectStore("folders", { keyPath: "id" });
          s.createIndex("space", "space", { unique: false });
        }
        if (!db.objectStoreNames.contains("settings")) {
          db.createObjectStore("settings", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("categories")) {
          db.createObjectStore("categories", { keyPath: "id" });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => {
        dbPromise = null;
        reject(req.error ?? new Error("Failed to open database"));
      };
    });
  }
  return dbPromise;
}

export async function idbPut<T>(store: StoreName, value: T): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(store, "readwrite");
  tx.objectStore(store).put(value);
  await txDone(tx);
}

export async function idbPutMany<T>(store: StoreName, values: T[]): Promise<void> {
  if (!values.length) return;
  const db = await openDb();
  const tx = db.transaction(store, "readwrite");
  const os = tx.objectStore(store);
  for (const v of values) os.put(v);
  await txDone(tx);
}

export async function idbGet<T>(store: StoreName, key: IDBValidKey): Promise<T | undefined> {
  const db = await openDb();
  return reqToPromise(db.transaction(store, "readonly").objectStore(store).get(key));
}

export async function idbGetAll<T>(store: StoreName): Promise<T[]> {
  const db = await openDb();
  return reqToPromise(db.transaction(store, "readonly").objectStore(store).getAll());
}

export async function idbDelete(store: StoreName, key: IDBValidKey): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(store, "readwrite");
  tx.objectStore(store).delete(key);
  await txDone(tx);
}

export async function idbClear(store: StoreName): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(store, "readwrite");
  tx.objectStore(store).clear();
  await txDone(tx);
}

export async function idbByIndex<T>(
  store: StoreName,
  index: string,
  key: IDBValidKey,
): Promise<T[]> {
  const db = await openDb();
  const os = db.transaction(store, "readonly").objectStore(store);
  const idx = os.index(index);
  return reqToPromise(idx.getAll(key));
}

export function defaultSettings(): AppSettings {
  const now = Date.now();
  return {
    id: "app",
    appearance: "light",
    theme: "pop-glass",
    language: "gu",
    hasSeenWelcome: false,
    seedVersion: 0,
    createdAt: now,
    updatedAt: now,
  };
}

function folder(id: string, name: string, parentId: string | null, space: "files" | "seva"): Folder {
  return { id, name, parentId, space, createdAt: Date.now() };
}

export async function seedIfNeeded(): Promise<void> {
  const existing = (await idbGet<AppSettings>("settings", "app")) ?? defaultSettings();
  if (existing.seedVersion >= SEED_VERSION) {
    if (!existing.id) existing.id = "app";
    await idbPut("settings", existing);
    return;
  }

  const now = Date.now();
  const folders: Folder[] = [
    folder(FILES_ROOT_ID, "Files", null, "files"),
    folder(SEVA_ROOT_ID, "શ્રી દેવદમન સેવા", null, "seva"),
  ];
  const folderIdByName = new Map<string, string>();
  for (const node of SEVA_FOLDER_TREE) {
    const id = uid();
    folders.push(folder(id, node.name, SEVA_ROOT_ID, "seva"));
    folderIdByName.set(node.name, id);
    for (const child of node.children ?? []) {
      const cid = uid();
      folders.push(folder(cid, child, id, "seva"));
      folderIdByName.set(child, cid);
    }
  }

  const routines: Routine[] = NAMED_ROUTINES.map((r) => ({
    id: r.id,
    name: r.name,
    items: r.pick.map((i) => ({ ...DEFAULT_ROUTINE[i] })),
    createdAt: now,
    updatedAt: now,
  }));

  const seva: SevaRecord[] = PRANALIKA_TEMPLATES.map((p) => ({
    id: uid(),
    title: p.title,
    category: p.folderName,
    folderId: folderIdByName.get(p.folderName) ?? SEVA_ROOT_ID,
    content: "",
    date: keyOf(new Date()),
    time: p.time,
    sequence: p.sequence,
    materials: "",
    notes: "",
    special: "",
    festival: "",
    attachments: [],
    kind: "pranalika",
    createdAt: now,
    updatedAt: now,
  }));

  await idbPutMany("folders", folders);
  await idbPutMany("routines", routines);
  await idbPutMany("seva", seva);
  await idbPutMany("categories", DEFAULT_CATEGORIES);

  const next: AppSettings = {
    ...existing,
    id: "app",
    seedVersion: SEED_VERSION,
    updatedAt: now,
  };
  await idbPut("settings", next);
}

export async function loadAll() {
  await seedIfNeeded();
  const [days, entries, routines, seva, files, folders, settings, categories] =
    await Promise.all([
      idbGetAll<DiaryDay>("diary"),
      idbGetAll<DiaryEntry>("entries"),
      idbGetAll<Routine>("routines"),
      idbGetAll<SevaRecord>("seva"),
      idbGetAll<FileMeta>("files"),
      idbGetAll<Folder>("folders"),
      idbGet<AppSettings>("settings", "app"),
      idbGetAll<Category>("categories"),
    ]);
  return {
    days,
    entries,
    routines,
    seva,
    files,
    folders,
    settings: settings ?? defaultSettings(),
    categories: categories.length ? categories : DEFAULT_CATEGORIES,
  };
}

export async function wipeDatabase(): Promise<void> {
  for (const s of STORES) {
    await idbClear(s);
  }
  await seedIfNeeded();
}

export function readLegacyLocalStorage(): unknown | null {
  if (typeof localStorage === "undefined") return null;
  for (const k of LEGACY_LS_KEYS) {
    const raw = localStorage.getItem(k);
    if (!raw) continue;
    try {
      return JSON.parse(raw);
    } catch {
      /* ignore */
    }
  }
  return null;
}

export async function putFileBlob(id: string, blob: Blob): Promise<void> {
  const row: FileBlobRow = { id, blob };
  await idbPut("fileblobs", row);
}

export async function getFileBlob(id: string): Promise<Blob | undefined> {
  const row = await idbGet<FileBlobRow>("fileblobs", id);
  return row?.blob;
}

export async function deleteFileAndBlob(id: string): Promise<void> {
  await idbDelete("files", id);
  await idbDelete("fileblobs", id);
}

export async function clearAllStoresHard(): Promise<void> {
  for (const s of STORES) await idbClear(s);
}
