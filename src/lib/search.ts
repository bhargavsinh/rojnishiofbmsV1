import type { DiaryEntry, FileMeta, SevaRecord } from "./types";

export type SearchHit = {
  id: string;
  kind: "entry" | "note" | "seva" | "file";
  title: string;
  snippet: string;
  href: string;
};

function has(q: string, ...parts: Array<string | undefined>) {
  const n = q.trim().toLowerCase();
  if (!n) return false;
  return parts.some((p) => (p || "").toLowerCase().includes(n));
}

export function runSearch(
  q: string,
  data: {
    entries: DiaryEntry[];
    days: { id: string; note: string }[];
    seva: SevaRecord[];
    files: FileMeta[];
  },
): SearchHit[] {
  const query = q.trim();
  if (query.length < 1) return [];
  const hits: SearchHit[] = [];

  for (const e of data.entries) {
    if (has(query, e.description, e.note, e.pillar, e.time)) {
      hits.push({
        id: e.id,
        kind: "entry",
        title: e.description || e.time || e.date,
        snippet: `${e.date} · ${e.time} · ${e.note}`.trim(),
        href: `/diary?date=${e.date}`,
      });
    }
  }
  for (const d of data.days) {
    if (has(query, d.note)) {
      hits.push({
        id: `note-${d.id}`,
        kind: "note",
        title: d.id,
        snippet: d.note.slice(0, 140),
        href: `/diary?date=${d.id}`,
      });
    }
  }
  for (const s of data.seva) {
    if (has(query, s.title, s.content, s.materials, s.notes, s.special, s.festival, s.category)) {
      hits.push({
        id: s.id,
        kind: "seva",
        title: s.title,
        snippet: (s.content || s.notes || s.category).slice(0, 140),
        href: `/library?id=${s.id}`,
      });
    }
  }
  for (const f of data.files) {
    if (has(query, f.name, f.type, f.mimeType)) {
      hits.push({
        id: f.id,
        kind: "file",
        title: f.name,
        snippet: f.type.toUpperCase(),
        href: `/files`,
      });
    }
  }
  return hits.slice(0, 80);
}
