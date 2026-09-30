import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { J as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { j as useApp, k as t } from "./store-DweQ-t3L.mjs";
import { n as GlassCard, r as SectionTitle, t as EmptyState } from "./glass-BhDIhW7d.mjs";
import { c as Search } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-BoeIRYcc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function has(q, ...parts) {
	const n = q.trim().toLowerCase();
	if (!n) return false;
	return parts.some((p) => (p || "").toLowerCase().includes(n));
}
function runSearch(q, data) {
	const query = q.trim();
	if (query.length < 1) return [];
	const hits = [];
	for (const e of data.entries) if (has(query, e.description, e.note, e.pillar, e.time)) hits.push({
		id: e.id,
		kind: "entry",
		title: e.description || e.time || e.date,
		snippet: `${e.date} · ${e.time} · ${e.note}`.trim(),
		href: `/diary?date=${e.date}`
	});
	for (const d of data.days) if (has(query, d.note)) hits.push({
		id: `note-${d.id}`,
		kind: "note",
		title: d.id,
		snippet: d.note.slice(0, 140),
		href: `/diary?date=${d.id}`
	});
	for (const s of data.seva) if (has(query, s.title, s.content, s.materials, s.notes, s.special, s.festival, s.category)) hits.push({
		id: s.id,
		kind: "seva",
		title: s.title,
		snippet: (s.content || s.notes || s.category).slice(0, 140),
		href: `/library?id=${s.id}`
	});
	for (const f of data.files) if (has(query, f.name, f.type, f.mimeType)) hits.push({
		id: f.id,
		kind: "file",
		title: f.name,
		snippet: f.type.toUpperCase(),
		href: `/files`
	});
	return hits.slice(0, 80);
}
function SearchPage() {
	const lang = useApp((s) => s.settings.language);
	const entries = useApp((s) => s.entries);
	const days = useApp((s) => s.days);
	const seva = useApp((s) => s.seva);
	const files = useApp((s) => s.files);
	const openViewer = useApp((s) => s.openViewer);
	const [q, setQ] = (0, import_react.useState)("");
	const hits = (0, import_react.useMemo)(() => runSearch(q, {
		entries,
		days: Object.values(days),
		seva,
		files
	}), [
		q,
		entries,
		days,
		seva,
		files
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl mx-auto grid gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t("search", lang) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "relative block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: t("searchPlaceholder", lang),
				className: "w-full min-h-12 rounded-[14px] border border-border bg-cream/70 pl-10 pr-3",
				autoFocus: true
			})]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, { children: [q && hits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("noResults", lang) }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "m-0 p-0 list-none grid gap-2",
			children: hits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "glass-thin rounded-[14px] p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] font-bold uppercase text-gold",
						children: h.kind
					}),
					h.kind === "file" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "font-semibold text-left",
						onClick: () => openViewer(h.id),
						children: h.title
					}) : h.kind === "seva" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/library",
						search: { id: h.id },
						className: "font-semibold",
						children: h.title
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/diary",
						search: { date: h.href.includes("date=") ? h.href.split("date=")[1] : void 0 },
						className: "font-semibold",
						children: h.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "m-0 text-sm text-muted",
						children: h.snippet
					})
				]
			}, h.id))
		})] })]
	});
}
//#endregion
export { SearchPage as component };
