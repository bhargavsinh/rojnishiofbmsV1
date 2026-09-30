import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { J as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { j as useApp, k as t } from "./store-DweQ-t3L.mjs";
import { n as GlassCard, r as SectionTitle, t as EmptyState } from "./glass-BhDIhW7d.mjs";
import { r as maybeGu, t as formatDayTitle } from "./gujarati-DvhvqI5H.mjs";
import { d as Plus, o as Trash2 } from "../_libs/lucide-react.mjs";
import { i as Button } from "./router-CbtxQHID.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notes-BD7C951o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NotesPage() {
	const lang = useApp((s) => s.settings.language);
	const days = useApp((s) => s.days);
	const entries = useApp((s) => s.entries);
	const routines = useApp((s) => s.routines);
	const saveRoutine = useApp((s) => s.saveRoutine);
	const createRoutine = useApp((s) => s.createRoutine);
	const deleteRoutine = useApp((s) => s.deleteRoutine);
	const [rid, setRid] = (0, import_react.useState)(routines[0]?.id ?? "");
	const routine = routines.find((r) => r.id === rid) ?? routines[0];
	const noted = Object.values(days).filter((d) => d.note.trim() || entries.some((e) => e.date === d.date)).sort((a, b) => b.date.localeCompare(a.date));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-5xl mx-auto grid gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t("notes", lang) }), noted.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("noEntries", lang) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "m-0 p-0 list-none grid gap-2",
			children: noted.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/diary",
				search: { date: d.date },
				className: "block glass-thin rounded-[14px] p-3 hover:bg-primary/5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold text-royal",
						children: formatDayTitle(d.date, lang)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "m-0 text-sm text-muted line-clamp-2",
						children: d.note || "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "m-0 text-xs mt-1",
						children: [
							t("totalEntries", lang),
							": ",
							maybeGu(entries.filter((e) => e.date === d.date).length, lang)
						]
					})
				]
			}) }, d.id))
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t("routines", lang) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2 mb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "min-h-11 rounded-[12px] border border-border px-3",
						value: routine?.id ?? "",
						onChange: (e) => setRid(e.target.value),
						children: routines.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: r.id,
							children: r.name
						}, r.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						onClick: () => {
							const name = window.prompt(t("newRoutine", lang));
							if (!name?.trim()) return;
							createRoutine(name.trim()).then((r) => setRid(r.id));
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }),
							" ",
							t("newRoutine", lang)
						]
					}),
					routine ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						onClick: () => void deleteRoutine(routine.id),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }),
							" ",
							t("delete", lang)
						]
					}) : null
				]
			}),
			routine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoutineEditor, {
				items: routine.items,
				onChange: (items) => void saveRoutine({
					...routine,
					items
				})
			}) : null
		] })]
	});
}
function RoutineEditor({ items, onChange }) {
	const lang = useApp((s) => s.settings.language);
	const categories = useApp((s) => s.categories);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2",
		children: [items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "time",
					className: "min-h-11 rounded-[10px] border border-border px-2",
					value: it.time,
					onChange: (e) => {
						const next = items.slice();
						next[i] = {
							...it,
							time: e.target.value
						};
						onChange(next);
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "flex-1 min-h-11 rounded-[10px] border border-border px-3",
					value: it.description,
					onChange: (e) => {
						const next = items.slice();
						next[i] = {
							...it,
							description: e.target.value
						};
						onChange(next);
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "min-h-11 rounded-[10px] border border-border px-2",
					value: it.pillar,
					onChange: (e) => {
						const next = items.slice();
						next[i] = {
							...it,
							pillar: e.target.value
						};
						onChange(next);
					},
					children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: lang === "en" ? c.nameEn : c.nameGu
					}, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "quiet",
					size: "iconSm",
					onClick: () => onChange(items.filter((_, j) => j !== i)),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
				})
			]
		}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			onClick: () => onChange([...items, {
				time: "",
				description: "",
				pillar: "other"
			}]),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }),
				" ",
				t("addEntry", lang)
			]
		})]
	});
}
//#endregion
export { NotesPage as component };
