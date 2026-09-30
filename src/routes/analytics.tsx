import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsCharts } from "@/components/charts";
import { GlassCard, SectionTitle } from "@/components/ui/glass";
import { t } from "@/lib/i18n";
import { maybeGu } from "@/lib/gujarati";
import { useApp } from "@/lib/store";
import { keyOf } from "@/lib/utils";

export const Route = createFileRoute("/analytics")({ component: AnalyticsPage });

function AnalyticsPage() {
  const lang = useApp((s) => s.settings.language);
  const entries = useApp((s) => s.entries);
  const seva = useApp((s) => s.seva);
  const files = useApp((s) => s.files);
  const today = keyOf(new Date());
  const month = today.slice(0, 7);
  const vidya = entries.filter((e) => e.pillar === "vidya").length;
  const lekhan = entries.filter((e) => e.pillar === "lekhan").length;
  const sevaE = entries.filter((e) => e.pillar === "seva").length;

  return (
    <div className="max-w-6xl mx-auto grid gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          [t("statsEntries", lang), entries.length],
          [t("statsMonth", lang), entries.filter((e) => e.date.startsWith(month)).length],
          [t("statsSeva", lang), seva.length],
          [t("statsFiles", lang), files.length],
        ].map(([k, v]) => (
          <GlassCard key={String(k)} className="p-4">
            <div className="text-xs text-muted">{k}</div>
            <div className="text-2xl font-semibold tabular-nums">{maybeGu(v as number, lang)}</div>
          </GlassCard>
        ))}
      </div>
      <AnalyticsCharts />
      <GlassCard>
        <SectionTitle>{t("analytics", lang)}</SectionTitle>
        <ul className="m-0 p-0 list-none grid sm:grid-cols-3 gap-3">
          <li className="glass-thin rounded-[14px] p-3">
            <div className="text-sm text-muted">વિદ્યા</div>
            <div className="text-xl font-semibold tabular-nums">{maybeGu(vidya, lang)}</div>
          </li>
          <li className="glass-thin rounded-[14px] p-3">
            <div className="text-sm text-muted">લેખન</div>
            <div className="text-xl font-semibold tabular-nums">{maybeGu(lekhan, lang)}</div>
          </li>
          <li className="glass-thin rounded-[14px] p-3">
            <div className="text-sm text-muted">સેવા</div>
            <div className="text-xl font-semibold tabular-nums">{maybeGu(sevaE, lang)}</div>
          </li>
        </ul>
      </GlassCard>
    </div>
  );
}
