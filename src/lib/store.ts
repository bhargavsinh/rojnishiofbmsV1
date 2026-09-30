import { create } from "zustand";
import { toast } from "sonner";
import {
  clearAllStoresHard,
  defaultSettings,
  deleteFileAndBlob,
  getFileBlob,
  idbDelete,
  idbPut,
  idbPutMany,
  loadAll,
  putFileBlob,
  readLegacyLocalStorage,
  seedIfNeeded,
} from "./database";
import { FILES_ROOT_ID, PILLARS, SEVA_ROOT_ID } from "./constants";
import { t } from "./i18n";
import { validateBackup, buildBackup, fileDataToBlobs } from "./backup";
import type {
  Appearance,
  AppSettings,
  BackupPayload,
  Category,
  DiaryDay,
  DiaryEntry,
  FileMeta,
  Folder,
  Language,
  Routine,
  SaveState,
  SevaRecord,
  ThemeId,
} from "./types";
import { SEED_VERSION } from "./types";
import {
  fileKind,
  isBlockedFile,
  keyOf,
  uid,
} from "./utils";

export type ConfirmState = {
  open: boolean;
  title: string;
  message: string;
  danger?: boolean;
  confirmLabel?: string;
  resolve?: (v: boolean) => void;
};

export type ViewerState =
  | { open: false }
  | { open: true; fileId: string; kind: FileMeta["type"] };

type AppStore = {
  ready: boolean;
  saveState: SaveState;
  legacyPrompt: unknown | null;
  selectedDate: string;
  viewY: number;
  viewM: number;
  days: Record<string, DiaryDay>;
  entries: DiaryEntry[];
  routines: Routine[];
  seva: SevaRecord[];
  files: FileMeta[];
  folders: Folder[];
  categories: Category[];
  settings: AppSettings;
  confirm: ConfirmState;
  viewer: ViewerState;
  urlCache: Record<string, string>;

  init: () => Promise<void>;
  setView: (y: number, m: number) => void;
  selectDate: (key: string) => void;
  goToday: () => void;
  ensureDay: (date: string) => DiaryDay;
  addEntry: (date?: string, partial?: Partial<DiaryEntry>) => Promise<DiaryEntry>;
  updateEntry: (id: string, patch: Partial<DiaryEntry>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  duplicateEntry: (id: string) => Promise<void>;
  reorderEntry: (id: string, dir: -1 | 1) => Promise<void>;
  toggleEntry: (id: string) => Promise<void>;
  setDayNote: (date: string, note: string) => Promise<void>;
  clearDay: (date: string) => Promise<void>;
  applyRoutine: (routineId: string, date: string) => Promise<void>;
  copyDay: (from: string, to: string) => Promise<void>;
  saveRoutine: (r: Routine) => Promise<void>;
  createRoutine: (name: string) => Promise<Routine>;
  deleteRoutine: (id: string) => Promise<void>;
  addCategory: (nameGu: string, color: string) => Promise<void>;
  saveSeva: (rec: SevaRecord) => Promise<void>;
  deleteSeva: (id: string) => Promise<void>;
  duplicateSeva: (id: string) => Promise<SevaRecord | undefined>;
  createFolder: (name: string, parentId: string, space: Folder["space"]) => Promise<Folder>;
  renameFolder: (id: string, name: string) => Promise<void>;
  deleteFolder: (id: string) => Promise<void>;
  uploadFiles: (list: File[], folderId: string, link?: Partial<Pick<FileMeta, "linkedDate" | "linkedEntryId" | "linkedSevaId">>) => Promise<FileMeta[]>;
  renameFile: (id: string, name: string) => Promise<void>;
  moveFile: (id: string, folderId: string) => Promise<void>;
  deleteFile: (id: string) => Promise<void>;
  fileUrl: (id: string) => Promise<string | undefined>;
  updateSettings: (patch: Partial<AppSettings>) => Promise<void>;
  applyChrome: () => void;
  markWelcome: () => Promise<void>;
  exportBackup: (includeFiles: boolean) => Promise<BackupPayload>;
  importBackup: (raw: unknown, mode: "merge" | "replace") => Promise<void>;
  wipeAll: () => Promise<void>;
  migrateLegacy: (raw: unknown) => Promise<void>;
  dismissLegacy: () => void;
  ask: (opts: Omit<ConfirmState, "open" | "resolve">) => Promise<boolean>;
  closeConfirm: (v: boolean) => void;
  openViewer: (fileId: string) => void;
  closeViewer: () => void;
  setSaving: () => void;
  setSaved: () => void;
};

let saveTimer: ReturnType<typeof setTimeout> | undefined;

function dayRecord(days: Record<string, DiaryDay>, date: string): DiaryDay {
  const existing = days[date];
  if (existing) return existing;
  const now = Date.now();
  return { id: date, date, note: "", attachments: [], createdAt: now, updatedAt: now };
}

function applyDocumentChrome(settings: AppSettings) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  let appearance = settings.appearance;
  if (appearance === "auto") {
    appearance = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  root.dataset.appearance = appearance;
  root.dataset.theme = settings.theme;
  root.lang = settings.language === "en" ? "en" : "gu";
}

export const useApp = create<AppStore>((set, get) => ({
  ready: false,
  saveState: "saved",
  legacyPrompt: null,
  selectedDate: keyOf(new Date()),
  viewY: new Date().getFullYear(),
  viewM: new Date().getMonth(),
  days: {},
  entries: [],
  routines: [],
  seva: [],
  files: [],
  folders: [],
  categories: [],
  settings: defaultSettings(),
  confirm: { open: false, title: "", message: "" },
  viewer: { open: false },
  urlCache: {},

  setSaving: () => {
    set({ saveState: "saving" });
    if (saveTimer) clearTimeout(saveTimer);
  },
  setSaved: () => {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(() => set({ saveState: "saved" }), 280);
  },

  init: async () => {
    try {
      const data = await loadAll();
      const days: Record<string, DiaryDay> = {};
      for (const d of data.days) days[d.id] = d;
      const now = new Date();
      set({
        ready: true,
        days,
        entries: data.entries,
        routines: data.routines,
        seva: data.seva,
        files: data.files,
        folders: data.folders,
        categories: data.categories,
        settings: data.settings,
        selectedDate: keyOf(now),
        viewY: now.getFullYear(),
        viewM: now.getMonth(),
        legacyPrompt: readLegacyLocalStorage(),
      });
      applyDocumentChrome(data.settings);
    } catch (err) {
      console.error(err);
      set({ ready: true, saveState: "error" });
      toast.error("⚠️ કંઈક ખોટું થયું");
    }
  },

  applyChrome: () => applyDocumentChrome(get().settings),

  setView: (y, m) => {
    let yy = y;
    let mm = m;
    if (mm < 0) {
      mm = 11;
      yy -= 1;
    }
    if (mm > 11) {
      mm = 0;
      yy += 1;
    }
    set({ viewY: yy, viewM: mm });
  },
  selectDate: (key) => {
    const [y, m] = key.split("-").map(Number);
    set({ selectedDate: key, viewY: y, viewM: m - 1 });
  },
  goToday: () => {
    const n = new Date();
    set({ selectedDate: keyOf(n), viewY: n.getFullYear(), viewM: n.getMonth() });
  },

  ensureDay: (date) => {
    const rec = dayRecord(get().days, date);
    if (!get().days[date]) {
      const days = { ...get().days, [date]: rec };
      set({ days });
      void idbPut("diary", rec);
    }
    return rec;
  },

  addEntry: async (date, partial) => {
    const d = date ?? get().selectedDate;
    get().ensureDay(d);
    const now = Date.now();
    const siblings = get().entries.filter((e) => e.date === d);
    const entry: DiaryEntry = {
      id: uid(),
      date: d,
      time: "",
      description: "",
      pillar: "vidya",
      note: "",
      status: "pending",
      attachments: [],
      order: siblings.length,
      createdAt: now,
      updatedAt: now,
      ...partial,
    };
    set({ entries: [...get().entries, entry] });
    get().setSaving();
    await idbPut("entries", entry);
    get().setSaved();
    toast.success("✓ નોંધ સાચવાઈ");
    return entry;
  },

  updateEntry: async (id, patch) => {
    const entries = get().entries.map((e) =>
      e.id === id ? { ...e, ...patch, updatedAt: Date.now() } : e,
    );
    const next = entries.find((e) => e.id === id);
    if (!next) return;
    set({ entries });
    get().setSaving();
    await idbPut("entries", next);
    get().setSaved();
  },

  deleteEntry: async (id) => {
    const ok = await get().ask({
      title: t("delete", get().settings.language),
      message: t("cannotUndo", get().settings.language),
      danger: true,
      confirmLabel: t("delete", get().settings.language),
    });
    if (!ok) return;
    const entries = get().entries.filter((e) => e.id !== id);
    set({ entries });
    get().setSaving();
    await idbDelete("entries", id);
    get().setSaved();
  },

  duplicateEntry: async (id) => {
    const src = get().entries.find((e) => e.id === id);
    if (!src) return;
    await get().addEntry(src.date, {
      time: src.time,
      description: src.description,
      pillar: src.pillar,
      note: src.note,
      status: "pending",
      attachments: [...src.attachments],
    });
  },

  reorderEntry: async (id, dir) => {
    const src = get().entries.find((e) => e.id === id);
    if (!src) return;
    const list = get()
      .entries.filter((e) => e.date === src.date)
      .sort((a, b) => a.order - b.order || a.time.localeCompare(b.time));
    const i = list.findIndex((e) => e.id === id);
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    const a = list[i];
    const b = list[j];
    const ao = a.order;
    a.order = b.order;
    b.order = ao;
    a.updatedAt = Date.now();
    b.updatedAt = Date.now();
    set({ entries: get().entries.map((e) => (e.id === a.id ? a : e.id === b.id ? b : e)) });
    await idbPutMany("entries", [a, b]);
  },

  toggleEntry: async (id) => {
    const src = get().entries.find((e) => e.id === id);
    if (!src) return;
    await get().updateEntry(id, { status: src.status === "done" ? "pending" : "done" });
  },

  setDayNote: async (date, note) => {
    const rec = { ...get().ensureDay(date), note, updatedAt: Date.now() };
    set({ days: { ...get().days, [date]: rec } });
    get().setSaving();
    await idbPut("diary", rec);
    get().setSaved();
  },

  clearDay: async (date) => {
    const ok = await get().ask({
      title: t("clearDay", get().settings.language),
      message: t("cannotUndo", get().settings.language),
      danger: true,
    });
    if (!ok) return;
    const rest = get().entries.filter((e) => e.date !== date);
    const days = { ...get().days };
    delete days[date];
    set({ entries: rest, days });
    const doomed = get().entries.filter((e) => e.date === date);
    for (const e of doomed) await idbDelete("entries", e.id);
    await idbDelete("diary", date);
    toast.success("આ દિવસની નોંધ ભૂંસાઈ.");
  },

  applyRoutine: async (routineId, date) => {
    const r = get().routines.find((x) => x.id === routineId);
    if (!r) return;
    get().ensureDay(date);
    const existing = get().entries.filter((e) => e.date === date);
    const now = Date.now();
    const added: DiaryEntry[] = [];
    r.items.forEach((item, i) => {
      if (existing.some((e) => e.time === item.time && e.description === item.description)) return;
      added.push({
        id: uid(),
        date,
        time: item.time,
        description: item.description,
        pillar: item.pillar,
        note: "",
        status: "pending",
        attachments: [],
        order: existing.length + i,
        createdAt: now,
        updatedAt: now,
      });
    });
    if (!added.length) {
      toast.success("દિનચર્યા પહેલેથી છે.");
      return;
    }
    set({ entries: [...get().entries, ...added] });
    await idbPutMany("entries", added);
    toast.success("નિયમિત દિનચર્યાનો ક્રમ ઉમેરાયો — હવે વિગત પ્રમાણે સુધારી લેવો.");
  },

  copyDay: async (from, to) => {
    if (from === to) return;
    get().ensureDay(to);
    const srcDay = get().days[from];
    const srcEntries = get().entries.filter((e) => e.date === from);
    const now = Date.now();
    const copies: DiaryEntry[] = srcEntries.map((e, i) => ({
      ...e,
      id: uid(),
      date: to,
      status: "pending",
      order: i,
      createdAt: now,
      updatedAt: now,
    }));
    if (srcDay?.note) {
      const rec = { ...get().ensureDay(to), note: srcDay.note, updatedAt: now };
      set({ days: { ...get().days, [to]: rec } });
      await idbPut("diary", rec);
    }
    set({ entries: [...get().entries, ...copies] });
    await idbPutMany("entries", copies);
    toast.success("✓ નોંધ સાચવાઈ");
  },

  saveRoutine: async (r) => {
    const next = { ...r, updatedAt: Date.now() };
    set({ routines: get().routines.map((x) => (x.id === r.id ? next : x)) });
    await idbPut("routines", next);
    toast.success("✓ નોંધ સાચવાઈ");
  },

  createRoutine: async (name) => {
    const r: Routine = {
      id: uid(),
      name,
      items: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    set({ routines: [...get().routines, r] });
    await idbPut("routines", r);
    return r;
  },

  deleteRoutine: async (id) => {
    const ok = await get().ask({
      title: t("delete", get().settings.language),
      message: t("cannotUndo", get().settings.language),
      danger: true,
    });
    if (!ok) return;
    set({ routines: get().routines.filter((r) => r.id !== id) });
    await idbDelete("routines", id);
  },

  addCategory: async (nameGu, color) => {
    const c: Category = {
      id: uid(),
      nameGu,
      nameEn: nameGu,
      color,
      builtin: false,
      order: get().categories.length,
    };
    set({ categories: [...get().categories, c] });
    await idbPut("categories", c);
  },

  saveSeva: async (rec) => {
    const next = { ...rec, updatedAt: Date.now() };
    const exists = get().seva.some((s) => s.id === rec.id);
    set({ seva: exists ? get().seva.map((s) => (s.id === rec.id ? next : s)) : [...get().seva, next] });
    await idbPut("seva", next);
    toast.success("✓ સેવા પ્રણાલિકા સાચવાઈ");
  },

  deleteSeva: async (id) => {
    const ok = await get().ask({
      title: t("delete", get().settings.language),
      message: t("cannotUndo", get().settings.language),
      danger: true,
    });
    if (!ok) return;
    set({ seva: get().seva.filter((s) => s.id !== id) });
    await idbDelete("seva", id);
  },

  duplicateSeva: async (id) => {
    const src = get().seva.find((s) => s.id === id);
    if (!src) return;
    const copy: SevaRecord = {
      ...src,
      id: uid(),
      title: `${src.title} (નકલ)`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await get().saveSeva(copy);
    return copy;
  },

  createFolder: async (name, parentId, space) => {
    const f: Folder = { id: uid(), name, parentId, space, createdAt: Date.now() };
    set({ folders: [...get().folders, f] });
    await idbPut("folders", f);
    return f;
  },

  renameFolder: async (id, name) => {
    const folders = get().folders.map((f) => (f.id === id ? { ...f, name } : f));
    const next = folders.find((f) => f.id === id);
    if (!next) return;
    set({ folders });
    await idbPut("folders", next);
  },

  deleteFolder: async (id) => {
    if (id === FILES_ROOT_ID || id === SEVA_ROOT_ID) return;
    const ok = await get().ask({
      title: t("delete", get().settings.language),
      message: t("cannotUndo", get().settings.language),
      danger: true,
    });
    if (!ok) return;
    const folder = get().folders.find((f) => f.id === id);
    const fallback = folder?.parentId ?? (folder?.space === "seva" ? SEVA_ROOT_ID : FILES_ROOT_ID);
    const files = get().files.map((f) => (f.folderId === id ? { ...f, folderId: fallback } : f));
    const folders = get().folders.filter((f) => f.id !== id).map((f) =>
      f.parentId === id ? { ...f, parentId: fallback } : f,
    );
    const seva = get().seva.map((s) => (s.folderId === id ? { ...s, folderId: fallback } : s));
    set({ files, folders, seva });
    await idbDelete("folders", id);
    await idbPutMany("files", files.filter((f) => f.folderId === fallback));
    await idbPutMany("seva", seva.filter((s) => s.folderId === fallback));
  },

  uploadFiles: async (list, folderId, link) => {
    const saved: FileMeta[] = [];
    for (const file of list) {
      if (isBlockedFile(file)) {
        toast.error("આ ફાઈલ પ્રકાર માન્ય નથી.");
        continue;
      }
      if (file.size > 40 * 1024 * 1024) {
        toast.error("ફાઈલ ૪૦ MBથી મોટી છે.");
        continue;
      }
      const meta: FileMeta = {
        id: uid(),
        name: file.name,
        type: fileKind(file.type, file.name),
        size: file.size,
        mimeType: file.type || "application/octet-stream",
        createdAt: Date.now(),
        folderId,
        ...link,
      };
      await putFileBlob(meta.id, file);
      await idbPut("files", meta);
      saved.push(meta);
      if (meta.type === "image") toast.success("✓ ફોટો અપલોડ થયો");
      else if (meta.type === "pdf") toast.success("✓ PDF સાચવાઈ");
      else toast.success("✓ નોંધ સાચવાઈ");
    }
    if (saved.length) set({ files: [...get().files, ...saved] });
    return saved;
  },

  renameFile: async (id, name) => {
    const files = get().files.map((f) => (f.id === id ? { ...f, name } : f));
    const next = files.find((f) => f.id === id);
    if (!next) return;
    set({ files });
    await idbPut("files", next);
  },

  moveFile: async (id, folderId) => {
    const files = get().files.map((f) => (f.id === id ? { ...f, folderId } : f));
    const next = files.find((f) => f.id === id);
    if (!next) return;
    set({ files });
    await idbPut("files", next);
  },

  deleteFile: async (id) => {
    const ok = await get().ask({
      title: t("delete", get().settings.language),
      message: t("cannotUndo", get().settings.language),
      danger: true,
    });
    if (!ok) return;
    set({ files: get().files.filter((f) => f.id !== id) });
    const cache = { ...get().urlCache };
    if (cache[id]) {
      URL.revokeObjectURL(cache[id]);
      delete cache[id];
    }
    set({ urlCache: cache });
    await deleteFileAndBlob(id);
  },

  fileUrl: async (id) => {
    const cached = get().urlCache[id];
    if (cached) return cached;
    const blob = await getFileBlob(id);
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    set({ urlCache: { ...get().urlCache, [id]: url } });
    return url;
  },

  updateSettings: async (patch) => {
    const settings = { ...get().settings, ...patch, id: "app" as const, updatedAt: Date.now() };
    set({ settings });
    applyDocumentChrome(settings);
    await idbPut("settings", settings);
  },

  markWelcome: async () => {
    await get().updateSettings({ hasSeenWelcome: true });
  },

  exportBackup: async (includeFiles) => {
    const s = get();
    const payload = await buildBackup(
      {
        settings: s.settings,
        days: Object.values(s.days),
        entries: s.entries,
        routines: s.routines,
        folders: s.folders,
        files: s.files,
        seva: s.seva,
        categories: s.categories,
      },
      includeFiles,
    );
    await get().updateSettings({ lastBackupAt: Date.now() });
    toast.success("✓ બેકઅપ તૈયાર");
    return payload;
  },

  importBackup: async (raw, mode) => {
    const parsed = validateBackup(raw);
    const ok = await get().ask({
      title: mode === "replace" ? "બધો ડેટા બદલાશે" : "ડેટા ભેળવાશે",
      message: t("areYouSure", get().settings.language),
      danger: mode === "replace",
      confirmLabel: mode === "replace" ? t("replace", get().settings.language) : t("merge", get().settings.language),
    });
    if (!ok) return;
    if (mode === "replace") {
      await clearAllStoresHard();
      await seedIfNeeded();
    }
    if (parsed.days.length) await idbPutMany("diary", parsed.days);
    if (parsed.entries.length) await idbPutMany("entries", parsed.entries);
    if (parsed.routines.length) await idbPutMany("routines", parsed.routines);
    if (parsed.folders.length) await idbPutMany("folders", parsed.folders);
    if (parsed.files.length) await idbPutMany("files", parsed.files);
    if (parsed.seva.length) await idbPutMany("seva", parsed.seva);
    if (parsed.categories.length) await idbPutMany("categories", parsed.categories);
    if (parsed.settings) {
      const settings = {
        ...get().settings,
        ...parsed.settings,
        id: "app" as const,
        seedVersion: SEED_VERSION,
        hasSeenWelcome: true,
      };
      await idbPut("settings", settings);
    }
    if (parsed.fileData) {
      for (const row of fileDataToBlobs(parsed.fileData)) {
        await putFileBlob(row.id, row.blob);
      }
    }
    await get().init();
    toast.success("ડેટા આયાત થયો.");
  },

  wipeAll: async () => {
    const ok = await get().ask({
      title: t("wipe", get().settings.language),
      message: t("cannotUndo", get().settings.language),
      danger: true,
      confirmLabel: t("wipe", get().settings.language),
    });
    if (!ok) return;
    await clearAllStoresHard();
    await seedIfNeeded();
    await get().init();
    toast.success("બધો ડેટા ભૂંસાયો.");
  },

  migrateLegacy: async (raw) => {
    await get().importBackup(raw, "merge");
    get().dismissLegacy();
  },
  dismissLegacy: () => set({ legacyPrompt: null }),

  ask: (opts) =>
    new Promise<boolean>((resolve) => {
      set({ confirm: { open: true, ...opts, resolve } });
    }),
  closeConfirm: (v) => {
    const c = get().confirm;
    c.resolve?.(v);
    set({ confirm: { open: false, title: "", message: "" } });
  },

  openViewer: (fileId) => {
    const f = get().files.find((x) => x.id === fileId);
    if (!f) return;
    set({ viewer: { open: true, fileId, kind: f.type } });
  },
  closeViewer: () => set({ viewer: { open: false } }),
}));

export function entriesFor(date: string, entries: DiaryEntry[]) {
  return entries
    .filter((e) => e.date === date)
    .sort((a, b) => (a.time || "99:99").localeCompare(b.time || "99:99") || a.order - b.order);
}

export function pillarColor(id: string, categories: Category[]) {
  const c = categories.find((x) => x.id === id);
  if (c) return c.color;
  return PILLARS[id]?.c ?? PILLARS.other.c;
}

export function pillarName(id: string, categories: Category[], lang: Language) {
  const c = categories.find((x) => x.id === id);
  if (c) return lang === "en" ? c.nameEn : c.nameGu;
  const p = PILLARS[id];
  if (p) return lang === "en" ? p.nEn : p.n;
  return id;
}

export function resolvedAppearance(a: Appearance): "light" | "dark" {
  if (a === "auto") {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return a;
}

export type { ThemeId };
