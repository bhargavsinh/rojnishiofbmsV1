import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { EmptyState, GlassCard, SectionTitle } from "@/components/ui/glass";
import { t } from "@/lib/i18n";
import { runSearch } from "@/lib/search";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/search")({ component: SearchPage });

function SearchPage() {
  const lang = useApp((s) => s.settings.language);
  const entries = useApp((s) => s.entries);
  const days = useApp((s) => s.days);
  const seva = useApp((s) => s.seva);
  const files = useApp((s) => s.files);
  const openViewer = useApp((s) => s.openViewer);
  const [q, setQ] = useState("");
  const hits = useMemo(
    () => runSearch(q, { entries, days: Object.values(days), seva, files }),
    [q, entries, days, seva, files],
  );

  return (
    <div className="max-w-3xl mx-auto grid gap-4">
      <GlassCard>
        <SectionTitle>{t("search", lang)}</SectionTitle>
        <label className="relative block">
          <SearchIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("searchPlaceholder", lang)}
            className="w-full min-h-12 rounded-[14px] border border-border bg-cream/70 pl-10 pr-3"
            autoFocus
          />
        </label>
      </GlassCard>
      <GlassCard>
        {q && hits.length === 0 ? <EmptyState title={t("noResults", lang)} /> : null}
        <ul className="m-0 p-0 list-none grid gap-2">
          {hits.map((h) => (
            <li key={h.id} className="glass-thin rounded-[14px] p-3">
              <div className="text-[11px] font-bold uppercase text-gold">{h.kind}</div>
              {h.kind === "file" ? (
                <button type="button" className="font-semibold text-left" onClick={() => openViewer(h.id)}>
                  {h.title}
                </button>
              ) : h.kind === "seva" ? (
                <Link to="/library" search={{ id: h.id }} className="font-semibold">
                  {h.title}
                </Link>
              ) : (
                <Link
                  to="/diary"
                  search={{ date: h.href.includes("date=") ? h.href.split("date=")[1] : undefined }}
                  className="font-semibold"
                >
                  {h.title}
                </Link>
              )}
              <p className="m-0 text-sm text-muted">{h.snippet}</p>
            </li>
          ))}
        </ul>
      </GlassCard>
    </div>
  );
}
