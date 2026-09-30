import { ChevronLeft, ChevronRight } from "lucide-react";
import { WEEK_HDR_EN, WEEK_HDR_GU } from "@/lib/constants";
import { formatDayTitle, maybeGu, monthName } from "@/lib/gujarati";
import { t } from "@/lib/i18n";
import { entriesFor, pillarColor, useApp } from "@/lib/store";
import { keyOf } from "@/lib/utils";
import { Button } from "./ui/button";
import { GlassCard, SectionTitle } from "./ui/glass";

export function CalendarView() {
  const lang = useApp((s) => s.settings.language);
  const viewY = useApp((s) => s.viewY);
  const viewM = useApp((s) => s.viewM);
  const setView = useApp((s) => s.setView);
  const selected = useApp((s) => s.selectedDate);
  const selectDate = useApp((s) => s.selectDate);
  const goToday = useApp((s) => s.goToday);
  const entries = useApp((s) => s.entries);
  const categories = useApp((s) => s.categories);

  const today = keyOf(new Date());
  const first = new Date(viewY, viewM, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const start = new Date(viewY, viewM, 1 - startOffset);
  const hdr = lang === "en" ? WEEK_HDR_EN : WEEK_HDR_GU;

  const cells = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    const k = keyOf(d);
    const list = entriesFor(k, entries);
    const pills = [...new Set(list.map((e) => e.pillar))].slice(0, 4);
    return { d, k, list, pills, out: d.getMonth() !== viewM };
  });

  const monthCount = cells.filter((c) => !c.out).reduce((n, c) => n + c.list.length, 0);
  const title = `${monthName(viewM, lang)} ${maybeGu(viewY, lang)}`;

  return (
    <GlassCard>
      <SectionTitle>{t("calendar", lang)}</SectionTitle>
      <div className="flex items-center justify-between gap-2 mb-3">
        <Button variant="ghost" size="icon" onClick={() => setView(viewY, viewM - 1)} aria-label="previous month">
          <ChevronLeft className="size-5" />
        </Button>
        <div className="text-lg font-bold text-royal">{title}</div>
        <Button variant="ghost" size="icon" onClick={() => setView(viewY, viewM + 1)} aria-label="next month">
          <ChevronRight className="size-5" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {hdr.map((w) => (
          <div
            key={w}
            className="text-center text-[11px] font-bold text-gold bg-gold/10 rounded-lg py-1.5"
          >
            {w}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((c) => {
          const sel = c.k === selected;
          const isToday = c.k === today;
          return (
            <button
              key={c.k}
              type="button"
              onClick={() => selectDate(c.k)}
              className={[
                "cal-cell relative min-h-12 sm:min-h-[58px] rounded-[10px] border border-border bg-cream/70 text-left p-1.5 tap",
                c.out ? "opacity-40" : "",
                isToday ? "today" : "",
                sel ? "sel" : "hover:bg-gold/10",
              ].join(" ")}
              aria-label={formatDayTitle(c.k, lang)}
              aria-pressed={sel}
            >
              <span className={`text-[13px] font-semibold ${sel ? "text-white" : ""}`}>
                {maybeGu(c.d.getDate(), lang)}
              </span>
              {c.list.length > 0 ? (
                <>
                  <span className="absolute bottom-1.5 left-1.5 flex gap-0.5">
                    {c.pills.map((p) => (
                      <i
                        key={p}
                        className="size-1.5 rounded-full inline-block"
                        style={{ background: pillarColor(p, categories) }}
                      />
                    ))}
                  </span>
                  <span
                    className={`absolute bottom-1 right-1 text-[10px] font-bold rounded-full px-1.5 ${
                      sel ? "bg-gold/80 text-charcoal" : "bg-gold/25 text-charcoal"
                    }`}
                  >
                    {maybeGu(c.list.length, lang)}
                  </span>
                </>
              ) : null}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        <Button variant="ghost" onClick={goToday}>
          {t("goToday", lang)}
        </Button>
        <span className="inline-flex items-center min-h-11 px-3 text-sm text-muted">
          {t("monthEntries", lang)}: {maybeGu(monthCount, lang)}
        </span>
      </div>
    </GlassCard>
  );
}
