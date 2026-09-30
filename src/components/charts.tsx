import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MONTHS_GU } from "@/lib/constants";
import { t } from "@/lib/i18n";
import { pillarColor, pillarName, useApp } from "@/lib/store";
import { GlassCard, SectionTitle } from "./ui/glass";

export function AnalyticsCharts() {
  const entries = useApp((s) => s.entries);
  const seva = useApp((s) => s.seva);
  const categories = useApp((s) => s.categories);
  const lang = useApp((s) => s.settings.language);
  const y = new Date().getFullYear();

  const monthly = Array.from({ length: 12 }, (_, m) => {
    const prefix = `${y}-${String(m + 1).padStart(2, "0")}`;
    return {
      name: MONTHS_GU[m].slice(0, 3),
      n: entries.filter((e) => e.date.startsWith(prefix)).length,
      seva: seva.filter((s) => s.date.startsWith(prefix)).length,
    };
  });

  const cat = categories
    .map((c) => ({
      name: pillarName(c.id, categories, lang),
      value: entries.filter((e) => e.pillar === c.id).length,
      color: pillarColor(c.id, categories),
    }))
    .filter((c) => c.value > 0);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <GlassCard>
        <SectionTitle>{t("monthActivity", lang)}</SectionTitle>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} width={28} />
              <Tooltip />
              <Bar dataKey="n" fill="var(--royal)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="seva" fill="var(--gold)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
      <GlassCard>
        <SectionTitle>{t("categorySplit", lang)}</SectionTitle>
        <div className="h-56">
          {cat.length === 0 ? (
            <p className="text-muted text-sm">{t("noResults", lang)}</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={cat} dataKey="value" nameKey="name" innerRadius={48} outerRadius={80}>
                  {cat.map((c) => (
                    <Cell key={c.name} fill={c.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
