import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { t } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { EmptyState, GlassCard, SectionTitle } from "@/components/ui/glass";
import { formatDayTitle, maybeGu } from "@/lib/gujarati";
import type { RoutineItem } from "@/lib/types";

export const Route = createFileRoute("/notes")({ component: NotesPage });

function NotesPage() {
  const lang = useApp((s) => s.settings.language);
  const days = useApp((s) => s.days);
  const entries = useApp((s) => s.entries);
  const routines = useApp((s) => s.routines);
  const saveRoutine = useApp((s) => s.saveRoutine);
  const createRoutine = useApp((s) => s.createRoutine);
  const deleteRoutine = useApp((s) => s.deleteRoutine);
  const [rid, setRid] = useState(routines[0]?.id ?? "");
  const routine = routines.find((r) => r.id === rid) ?? routines[0];

  const noted = Object.values(days)
    .filter((d) => d.note.trim() || entries.some((e) => e.date === d.date))
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="max-w-5xl mx-auto grid gap-4">
      <GlassCard>
        <SectionTitle>{t("notes", lang)}</SectionTitle>
        {noted.length === 0 ? (
          <EmptyState title={t("noEntries", lang)} />
        ) : (
          <ul className="m-0 p-0 list-none grid gap-2">
            {noted.map((d) => (
              <li key={d.id}>
                <Link
                  to="/diary"
                  search={{ date: d.date }}
                  className="block glass-thin rounded-[14px] p-3 hover:bg-primary/5"
                >
                  <div className="font-semibold text-royal">{formatDayTitle(d.date, lang)}</div>
                  <p className="m-0 text-sm text-muted line-clamp-2">{d.note || "—"}</p>
                  <p className="m-0 text-xs mt-1">
                    {t("totalEntries", lang)}: {maybeGu(entries.filter((e) => e.date === d.date).length, lang)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </GlassCard>

      <GlassCard>
        <SectionTitle>{t("routines", lang)}</SectionTitle>
        <div className="flex flex-wrap gap-2 mb-3">
          <select
            className="min-h-11 rounded-[12px] border border-border px-3"
            value={routine?.id ?? ""}
            onChange={(e) => setRid(e.target.value)}
          >
            {routines.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
          <Button
            variant="ghost"
            onClick={() => {
              const name = window.prompt(t("newRoutine", lang));
              if (!name?.trim()) return;
              void createRoutine(name.trim()).then((r) => setRid(r.id));
            }}
          >
            <Plus className="size-4" /> {t("newRoutine", lang)}
          </Button>
          {routine ? (
            <Button variant="ghost" onClick={() => void deleteRoutine(routine.id)}>
              <Trash2 className="size-4" /> {t("delete", lang)}
            </Button>
          ) : null}
        </div>
        {routine ? (
          <RoutineEditor
            items={routine.items}
            onChange={(items) => void saveRoutine({ ...routine, items })}
          />
        ) : null}
      </GlassCard>
    </div>
  );
}

function RoutineEditor({
  items,
  onChange,
}: {
  items: RoutineItem[];
  onChange: (items: RoutineItem[]) => void;
}) {
  const lang = useApp((s) => s.settings.language);
  const categories = useApp((s) => s.categories);
  return (
    <div className="grid gap-2">
      {items.map((it, i) => (
        <div key={i} className="flex flex-wrap gap-2">
          <input
            type="time"
            className="min-h-11 rounded-[10px] border border-border px-2"
            value={it.time}
            onChange={(e) => {
              const next = items.slice();
              next[i] = { ...it, time: e.target.value };
              onChange(next);
            }}
          />
          <input
            className="flex-1 min-h-11 rounded-[10px] border border-border px-3"
            value={it.description}
            onChange={(e) => {
              const next = items.slice();
              next[i] = { ...it, description: e.target.value };
              onChange(next);
            }}
          />
          <select
            className="min-h-11 rounded-[10px] border border-border px-2"
            value={it.pillar}
            onChange={(e) => {
              const next = items.slice();
              next[i] = { ...it, pillar: e.target.value };
              onChange(next);
            }}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {lang === "en" ? c.nameEn : c.nameGu}
              </option>
            ))}
          </select>
          <Button
            variant="quiet"
            size="iconSm"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
      <Button
        variant="ghost"
        onClick={() => onChange([...items, { time: "", description: "", pillar: "other" }])}
      >
        <Plus className="size-4" /> {t("addEntry", lang)}
      </Button>
    </div>
  );
}
