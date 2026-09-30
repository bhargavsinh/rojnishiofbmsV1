import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function keyOf(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export function parseKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function addDays(key: string, delta: number): string {
  const dt = parseKey(key);
  dt.setDate(dt.getDate() + delta);
  return keyOf(dt);
}

export function formatBytes(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(units.length - 1, Math.floor(Math.log(n) / Math.log(1024)));
  const v = n / 1024 ** i;
  return `${v >= 10 || i === 0 ? v.toFixed(0) : v.toFixed(1)} ${units[i]}`;
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number) {
  let t: ReturnType<typeof setTimeout> | undefined;
  const wrapped = (...args: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
  wrapped.cancel = () => {
    if (t) clearTimeout(t);
  };
  return wrapped;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function extOf(name: string): string {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i + 1).toLowerCase() : "";
}

export function fileKind(mime: string, name: string): "image" | "pdf" | "text" | "other" {
  if (mime.startsWith("image/")) return "image";
  if (mime === "application/pdf" || extOf(name) === "pdf") return "pdf";
  if (
    mime.startsWith("text/") ||
    ["txt", "md", "csv", "json"].includes(extOf(name))
  ) {
    return "text";
  }
  return "other";
}

const BLOCKED_EXT = new Set([
  "html",
  "htm",
  "js",
  "mjs",
  "cjs",
  "exe",
  "bat",
  "cmd",
  "sh",
  "ps1",
  "com",
  "msi",
  "wasm",
]);
const BLOCKED_MIME = new Set([
  "text/html",
  "application/javascript",
  "text/javascript",
  "application/x-msdownload",
  "application/x-executable",
]);

export function isBlockedFile(file: File): boolean {
  if (BLOCKED_EXT.has(extOf(file.name))) return true;
  if (file.type && BLOCKED_MIME.has(file.type)) return true;
  return false;
}

export const IMAGE_ACCEPT = "image/jpeg,image/jpg,image/png,image/webp,.jpg,.jpeg,.png,.webp";
export const PDF_ACCEPT = "application/pdf,.pdf";
export const FILE_ACCEPT = `${IMAGE_ACCEPT},${PDF_ACCEPT},.txt,.md,.csv,.json,text/plain`;

export async function blobToBase64(blob: Blob): Promise<string> {
  const buf = await blob.arrayBuffer();
  const bytes = new Uint8Array(buf);
  const chunk = 0x8000;
  let binary = "";
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

export function base64ToBlob(b64: string, mime: string): Blob {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime || "application/octet-stream" });
}
