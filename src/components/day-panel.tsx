import { useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  MoreHorizontal,
  Paperclip,
  Plus,
  Trash2,
} from "lucide-react";
import { formatDayTitle, maybeGu } from "@/lib/gujarati";
import { t } from "@/lib/i18n";
import { entriesFor, pillarColor, pillarName, useApp } from "@/lib/store";
import { addDays, FILE_ACCEPT } from "@/lib/utils";
import type { DiaryEntry } from "@/lib/types";
import { Button } from "./ui/button";
import { EmptyState, GlassCard, SectionTitle } from "./ui/glass";

export function DayPanel() {
  const lang = useApp((s) => s.settings.language);
  const date = useApp((s) => s.selectedDate);
  const entries = useApp((s) => s.entries);
  const days = useApp((s) => s.days);
  const categories = useApp((s) => s.categories);
  const routines = useApp((s) => s.routines);
  const addEntry = useApp((s) => s.addEntry);
  const setDayNote = useApp((s) => s.setDayNote);
  const applyRoutine = useApp((s) => s.applyRoutine);
  const copyDay = useApp((s) => s.copyDay);
  const clearDay = useApp((s) => s.clearDay);
  const [routineId, setRoutineId] = useState("routine-nitya");
  const [copyFrom, setCopyFrom] = useState(addDays(date, -1));
  const list = entriesFor(date, entries);
  const note = days[date]?.note ?? "";

  return (
    <GlassCard>
      <SectionTitle>{t("dayNote", lang)}</SectionTitle>
      <div className="text-lg font-bold text-royal">{formatDayTitle(date, lang)}</div>
      <p className="text-sm text-muted mt-0.5 mb-3">
        {list.length
          ? `${t("totalEntries", lang)} ${maybeGu(list.length, lang)} — ${lang === "gu" ? "સમય પ્રમાણે ગોઠવાયેલી" : "sorted by time"}`
          : t("noEntries", lang)}
      </p>

      {list.length === 0 ? <EmptyState title={t("emptyDay", lang)} /> : null}
      <div className="flex flex-col gap-2">
        {list.map((e) => (
          <EntryRow key={e.id} entry={e} />
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <Button
          onClick={() => {
            void addEntry(date).then(() => {
              const inputs = document.querySelectorAll<HTMLInputElement>('[data-entry-desc]');
              inputs[inputs.length - 1]?.focus();
            });
          }}
        >
          <Plus className="size-4" /> {t("addEntry", lang)}
        </Button>
        <Button variant="ghost" onClick={() => void applyRoutine(routineId, date)}>
          {t("fillRoutine", lang)}
        </Button>
        <Button variant="ghost" onClick={() => void copyDay(addDays(date, -1), date)}>
          {t("copyYesterday", lang)}
        </Button>
        <Button variant="ghost" onClick={() => void clearDay(date)}>
          {t("clearDay", lang)}
        </Button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 items-end">
        <label className="text-sm">
          <span className="block text-muted mb-1">{t("applyRoutine", lang)}</span>
          <select
            className="min-h-11 rounded-[10px] border border-border bg-cream/80 px-3"
            value={routineId}
            onChange={(e) => setRoutineId(e.target.value)}
          >
            {routines.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="block text-muted mb-1">{t("copyDay", lang)}</span>
          <span className="flex gap-2">
            <input
              type="date"
              className="min-h-11 rounded-[10px] border border-border bg-cream/80 px-3"
              value={copyFrom}
              onChange={(e) => setCopyFrom(e.target.value)}
            />
            <Button variant="ghost" onClick={() => void copyDay(copyFrom, date)}>
              {t("copy", lang)}
            </Button>
          </span>
        </label>
      </div>

      <div className="mt-4 pt-4 border-t border-dashed border-border">
        <label htmlFor="dayNote" className="block text-sm font-semibold text-gold mb-1.5">
          {t("dayLineNote", lang)}
        </label>
        <textarea
          id="dayNote"
          value={note}
          onChange={(e) => void setDayNote(date, e.target.value)}
          placeholder={t("dayNotePh", lang)}
          className="w-full min-h-20 rounded-[14px] border border-border bg-cream/70 p-3 text-sm"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {Object.entries(
          list.reduce<Record<string, number>>((acc, e) => {
            acc[e.pillar] = (acc[e.pillar] || 0) + 1;
            return acc;
          }, {}),
        ).map(([k, n]) => (
          <span
            key={k}
            className="text-[11px] font-bold text-white rounded-full px-2.5 py-1"
            style={{ background: pillarColor(k, categories) }}
          >
            {pillarName(k, categories, lang)} · {maybeGu(n, lang)}
          </span>
        ))}
      </div>
    </GlassCard>
  );
}

function EntryRow({ entry }: { entry: DiaryEntry }) {
  const lang = useApp((s) => s.settings.language);
  const categories = useApp((s) => s.categories);
  const updateEntry = useApp((s) => s.updateEntry);
  const deleteEntry = useApp((s) => s.deleteEntry);
  const duplicateEntry = useApp((s) => s.duplicateEntry);
  const reorderEntry = useApp((s) => s.reorderEntry);
  const toggleEntry = useApp((s) => s.toggleEntry);
  const uploadFiles = useApp((s) => s.uploadFiles);
  const files = useApp((s) => s.files);
  const [open, setOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const color = pillarColor(entry.pillar, categories);
  const attached = files.filter((f) => entry.attachments.includes(f.id));

  return (
    <article
      className="rounded-[14px] border border-border bg-cream/60 p-2 sm:p-2.5"
      style={{ borderLeft: `5px solid ${color}` }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => void toggleEntry(entry.id)}
          className={`size-9 rounded-lg border grid place-items-center ${
            entry.status === "done" ? "bg-emerald text-white border-emerald" : "border-border"
          }`}
          aria-pressed={entry.status === "done"}
          aria-label={t("done", lang)}
        >
          <Check className="size-4" />
        </button>
        <input
          type="time"
          value={entry.time}
          onChange={(e) => void updateEntry(entry.id, { time: e.target.value })}
          className="min-h-11 w-[7.2rem] rounded-[10px] border border-border bg-card px-2"
        />
        <input
          data-entry-desc
          type="text"
          value={entry.description}
          placeholder={t("description", lang)}
          onChange={(e) => void updateEntry(entry.id, { description: e.target.value })}
          className={`flex-1 min-w-[10rem] min-h-11 rounded-[10px] border border-border bg-card px-3 ${
            entry.status === "done" ? "line-through opacity-70" : ""
          }`}
        />
        <select
          value={entry.pillar}
          onChange={(e) => void updateEntry(entry.id, { pillar: e.target.value })}
          className="min-h-11 max-w-[12rem] rounded-[10px] border border-border bg-card px-2 text-[13px]"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {lang === "en" ? c.nameEn : c.nameGu}
            </option>
          ))}
        </select>
        <Button variant="quiet" size="iconSm" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          <MoreHorizontal className="size-4" />
        </Button>
      </div>
      {open ? (
        <div className="mt-2 flex flex-wrap gap-1.5 items-center">
          <Button variant="quiet" size="sm" onClick={() => void duplicateEntry(entry.id)}>
            <Copy className="size-3.5" /> {t("duplicate", lang)}
          </Button>
          <Button variant="quiet" size="sm" onClick={() => void reorderEntry(entry.id, -1)}>
            <ChevronUp className="size-3.5" />
          </Button>
          <Button variant="quiet" size="sm" onClick={() => void reorderEntry(entry.id, 1)}>
            <ChevronDown className="size-3.5" />
          </Button>
          <Button variant="quiet" size="sm" onClick={() => fileRef.current?.click()}>
            <Paperclip className="size-3.5" /> {t("attach", lang)}
          </Button>
          <Button variant="quiet" size="sm" onClick={() => void deleteEntry(entry.id)}>
            <Trash2 className="size-3.5" /> {t("delete", lang)}
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept={FILE_ACCEPT}
            className="hidden"
            onChange={(e) => {
              const list = e.target.files;
              if (!list?.length) return;
              void uploadFiles(Array.from(list), "files-root", {
                linkedDate: entry.date,
                linkedEntryId: entry.id,
              }).then((saved) => {
                if (saved.length) {
                  void updateEntry(entry.id, {
                    attachments: [...entry.attachments, ...saved.map((f) => f.id)],
                  });
                }
              });
              e.target.value = "";
            }}
          />
          <textarea
            value={entry.note}
            onChange={(e) => void updateEntry(entry.id, { note: e.target.value })}
            placeholder={t("dayLineNote", lang)}
            className="w-full min-h-16 rounded-[10px] border border-border bg-card p-2 text-sm"
          />
          {attached.map((f) => (
            <button
              key={f.id}
              type="button"
              className="text-xs underline text-electric"
              onClick={() => useApp.getState().openViewer(f.id)}
            >
              {f.name}
            </button>
          ))}
        </div>
      ) : null}
    </article>
  );
}
