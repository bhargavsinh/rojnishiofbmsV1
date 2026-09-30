import { BACKUP_VERSION, type BackupPayload, type FileMeta } from "./types";
import { blobToBase64, base64ToBlob } from "./utils";
import { getFileBlob } from "./database";

export async function buildBackup(
  data: Omit<BackupPayload, "version" | "app" | "exportedAt" | "fileData">,
  includeFiles: boolean,
): Promise<BackupPayload> {
  const payload: BackupPayload = {
    version: BACKUP_VERSION,
    app: "rojnishi-of-bms",
    exportedAt: Date.now(),
    ...data,
  };
  if (includeFiles) {
    const fileData: NonNullable<BackupPayload["fileData"]> = {};
    for (const f of data.files) {
      const blob = await getFileBlob(f.id);
      if (!blob) continue;
      fileData[f.id] = { mimeType: f.mimeType, base64: await blobToBase64(blob) };
    }
    payload.fileData = fileData;
  }
  return payload;
}

export function validateBackup(raw: unknown): BackupPayload {
  if (!raw || typeof raw !== "object") throw new Error("invalid");
  const obj = raw as Record<string, unknown>;

  // Legacy in-memory store from the original HTML prototype: { "YYYY-MM-DD": { entries, note } }
  const keys = Object.keys(obj);
  const looksLegacy =
    !("app" in obj) &&
    !("entries" in obj) &&
    keys.length > 0 &&
    keys.every((k) => /^\d{4}-\d{2}-\d{2}$/.test(k) || k === "entries" || k === "note");

  if (looksLegacy || isLegacyDayMap(obj)) {
    return migrateLegacyStore(obj);
  }

  if (obj.app && obj.app !== "rojnishi-of-bms") {
    // still accept if it has our collections
  }
  return {
    version: typeof obj.version === "number" ? obj.version : 1,
    app: "rojnishi-of-bms",
    exportedAt: typeof obj.exportedAt === "number" ? obj.exportedAt : Date.now(),
    settings: (obj.settings as BackupPayload["settings"]) ?? undefined,
    days: Array.isArray(obj.days) ? (obj.days as BackupPayload["days"]) : [],
    entries: Array.isArray(obj.entries) ? (obj.entries as BackupPayload["entries"]) : [],
    routines: Array.isArray(obj.routines) ? (obj.routines as BackupPayload["routines"]) : [],
    folders: Array.isArray(obj.folders) ? (obj.folders as BackupPayload["folders"]) : [],
    files: Array.isArray(obj.files) ? (obj.files as FileMeta[]) : [],
    fileData:
      obj.fileData && typeof obj.fileData === "object"
        ? (obj.fileData as BackupPayload["fileData"])
        : undefined,
    seva: Array.isArray(obj.seva) ? (obj.seva as BackupPayload["seva"]) : [],
    categories: Array.isArray(obj.categories) ? (obj.categories as BackupPayload["categories"]) : [],
  };
}

function isLegacyDayMap(obj: Record<string, unknown>): boolean {
  const keys = Object.keys(obj).filter((k) => /^\d{4}-\d{2}-\d{2}$/.test(k));
  if (!keys.length) return false;
  const sample = obj[keys[0]];
  return !!sample && typeof sample === "object" && "entries" in (sample as object);
}

function migrateLegacyStore(obj: Record<string, unknown>): BackupPayload {
  const days: BackupPayload["days"] = [];
  const entries: BackupPayload["entries"] = [];
  const now = Date.now();
  for (const [date, rec] of Object.entries(obj)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
    const r = (rec ?? {}) as { entries?: unknown; note?: unknown };
    const list = Array.isArray(r.entries) ? r.entries : [];
    days.push({
      id: date,
      date,
      note: typeof r.note === "string" ? r.note : "",
      attachments: [],
      createdAt: now,
      updatedAt: now,
    });
    list.forEach((e, i) => {
      const row = (e ?? {}) as { t?: unknown; d?: unknown; p?: unknown };
      entries.push({
        id: `${date}-${i}-${now}`,
        date,
        time: typeof row.t === "string" ? row.t : "",
        description: typeof row.d === "string" ? row.d : "",
        pillar: typeof row.p === "string" ? row.p : "other",
        note: "",
        status: "pending",
        attachments: [],
        order: i,
        createdAt: now,
        updatedAt: now,
      });
    });
  }
  return {
    version: 1,
    app: "rojnishi-of-bms",
    exportedAt: now,
    days,
    entries,
    routines: [],
    folders: [],
    files: [],
    seva: [],
    categories: [],
  };
}

export function fileDataToBlobs(data: NonNullable<BackupPayload["fileData"]>) {
  const out: { id: string; blob: Blob }[] = [];
  for (const [id, row] of Object.entries(data)) {
    if (!row?.base64) continue;
    out.push({ id, blob: base64ToBlob(row.base64, row.mimeType || "application/octet-stream") });
  }
  return out;
}
