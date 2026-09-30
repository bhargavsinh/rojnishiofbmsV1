import { J as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as pillarColor, O as pillarName, T as keyOf, f as MONTHS_GU, j as useApp, k as t } from "./store-DweQ-t3L.mjs";
import { n as GlassCard, r as SectionTitle } from "./glass-BhDIhW7d.mjs";
import { r as maybeGu } from "./gujarati-DvhvqI5H.mjs";
import { a as CartesianGrid, c as Cell, i as XAxis, l as ResponsiveContainer, n as BarChart, o as Bar, r as YAxis, s as Pie, t as PieChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-BXTVmvKv.js
var import_jsx_runtime = require_jsx_runtime();
function AnalyticsCharts() {
	const entries = useApp((s) => s.entries);
	const seva = useApp((s) => s.seva);
	const categories = useApp((s) => s.categories);
	const lang = useApp((s) => s.settings.language);
	const y = (/* @__PURE__ */ new Date()).getFullYear();
	const monthly = Array.from({ length: 12 }, (_, m) => {
		const prefix = `${y}-${String(m + 1).padStart(2, "0")}`;
		return {
			name: MONTHS_GU[m].slice(0, 3),
			n: entries.filter((e) => e.date.startsWith(prefix)).length,
			seva: seva.filter((s) => s.date.startsWith(prefix)).length
		};
	});
	const cat = categories.map((c) => ({
		name: pillarName(c.id, categories, lang),
		value: entries.filter((e) => e.pillar === c.id).length,
		color: pillarColor(c.id, categories)
	})).filter((c) => c.value > 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid lg:grid-cols-2 gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t("monthActivity", lang) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-56",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data: monthly,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							strokeDasharray: "3 3",
							stroke: "var(--line)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "name",
							tick: { fontSize: 11 }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							allowDecimals: false,
							width: 28
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "n",
							fill: "var(--royal)",
							radius: [
								6,
								6,
								0,
								0
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "seva",
							fill: "var(--gold)",
							radius: [
								6,
								6,
								0,
								0
							]
						})
					]
				})
			})
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t("categorySplit", lang) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-56",
			children: cat.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted text-sm",
				children: t("noResults", lang)
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
					data: cat,
					dataKey: "value",
					nameKey: "name",
					innerRadius: 48,
					outerRadius: 80,
					children: cat.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: c.color }, c.name))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {})] })
			})
		})] })]
	});
}
function AnalyticsPage() {
	const lang = useApp((s) => s.settings.language);
	const entries = useApp((s) => s.entries);
	const seva = useApp((s) => s.seva);
	const files = useApp((s) => s.files);
	const month = keyOf(/* @__PURE__ */ new Date()).slice(0, 7);
	const vidya = entries.filter((e) => e.pillar === "vidya").length;
	const lekhan = entries.filter((e) => e.pillar === "lekhan").length;
	const sevaE = entries.filter((e) => e.pillar === "seva").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-6xl mx-auto grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 md:grid-cols-4 gap-3",
				children: [
					[t("statsEntries", lang), entries.length],
					[t("statsMonth", lang), entries.filter((e) => e.date.startsWith(month)).length],
					[t("statsSeva", lang), seva.length],
					[t("statsFiles", lang), files.length]
				].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted",
						children: k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-2xl font-semibold tabular-nums",
						children: maybeGu(v, lang)
					})]
				}, String(k)))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalyticsCharts, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t("analytics", lang) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "m-0 p-0 list-none grid sm:grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "glass-thin rounded-[14px] p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-muted",
							children: "વિદ્યા"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xl font-semibold tabular-nums",
							children: maybeGu(vidya, lang)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "glass-thin rounded-[14px] p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-muted",
							children: "લેખન"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xl font-semibold tabular-nums",
							children: maybeGu(lekhan, lang)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "glass-thin rounded-[14px] p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-muted",
							children: "સેવા"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xl font-semibold tabular-nums",
							children: maybeGu(sevaE, lang)
						})]
					})
				]
			})] })
		]
	});
}
//#endregion
export { AnalyticsPage as component };
