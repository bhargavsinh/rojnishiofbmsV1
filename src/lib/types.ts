export type Appearance = "light" | "dark" | "auto";
export type ThemeId = "pop-glass" | "royal" | "minimal";
export type Language = "gu" | "en";
export type SaveState = "saved" | "saving" | "error";
export type FileKind = "image" | "pdf" | "text" | "other";
export type FolderSpace = "files" | "seva";
export type EntryStatus = "pending" | "done";
export type SevaKind = "record" | "pranalika";

export interface Category {
  id: string;
  nameGu: string;
  nameEn: string;
  color: string;
  builtin: boolean;
  order: number;
}

export interface DiaryDay {
  id: string;
  date: string;
  note: string;
  attachments: string[];
  createdAt: number;
  updatedAt: number;
}

export interface DiaryEntry {
  id: string;
  date: string;
  time: string;
  description: string;
  pillar: string;
  note: string;
  status: EntryStatus;
  attachments: string[];
  order: number;
  createdAt: number;
  updatedAt: number;
}

export interface RoutineItem {
  time: string;
  description: string;
  pillar: string;
}

export interface Routine {
  id: string;
  name: string;
  items: RoutineItem[];
  createdAt: number;
  updatedAt: number;
}

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  space: FolderSpace;
  createdAt: number;
}

export interface FileMeta {
  id: string;
  name: string;
  type: FileKind;
  size: number;
  mimeType: string;
  createdAt: number;
  category?: string;
  folderId: string;
  linkedDate?: string;
  linkedEntryId?: string;
  linkedSevaId?: string;
}

export interface FileBlobRow {
  id: string;
  blob: Blob;
}

export interface SevaRecord {
  id: string;
  title: string;
  category: string;
  folderId: string;
  content: string;
  date: string;
  time: string;
  sequence: string;
  materials: string;
  notes: string;
  special: string;
  festival: string;
  attachments: string[];
  kind: SevaKind;
  createdAt: number;
  updatedAt: number;
}

export interface AppSettings {
  id: "app";
  appearance: Appearance;
  theme: ThemeId;
  language: Language;
  hasSeenWelcome: boolean;
  lastBackupAt?: number;
  seedVersion: number;
  createdAt: number;
  updatedAt: number;
}

export interface BackupPayload {
  version: number;
  app: "rojnishi-of-bms";
  exportedAt: number;
  settings?: Partial<AppSettings>;
  days: DiaryDay[];
  entries: DiaryEntry[];
  routines: Routine[];
  folders: Folder[];
  files: FileMeta[];
  fileData?: Record<string, { mimeType: string; base64: string }>;
  seva: SevaRecord[];
  categories: Category[];
}

export const APP_VERSION = "1.0.0";
export const DB_NAME = "rojnishi-of-bms";
export const DB_VERSION = 1;
export const BACKUP_VERSION = 1;
export const SEED_VERSION = 1;
