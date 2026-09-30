import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { J as require_jsx_runtime, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as uid, C as entriesFor, O as pillarName, T as keyOf, h as SEVA_ROOT_ID, i as FILE_ACCEPT, j as useApp, k as t, l as HUKAM, m as PDF_ACCEPT, p as OWNER_LINE, r as FILES_ROOT_ID, u as IMAGE_ACCEPT } from "./store-DweQ-t3L.mjs";
import { n as GlassCard, r as SectionTitle } from "./glass-BhDIhW7d.mjs";
import { n as gujaratiDate, r as maybeGu, t as formatDayTitle } from "./gujarati-DvhvqI5H.mjs";
import { C as FileUp, F as CalendarDays, P as Camera, c as Search, d as Plus, w as FileText, x as Flame } from "../_libs/lucide-react.mjs";
import { i as Button } from "./router-CbtxQHID.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-UmP7FQw1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const lang = useApp((s) => s.settings.language);
	const entries = useApp((s) => s.entries);
	const days = useApp((s) => s.days);
	const seva = useApp((s) => s.seva);
	const files = useApp((s) => s.files);
	const categories = useApp((s) => s.categories);
	const addEntry = useApp((s) => s.addEntry);
	const uploadFiles = useApp((s) => s.uploadFiles);
	const saveSeva = useApp((s) => s.saveSeva);
	const navigate = useNavigate();
	const photoRef = (0, import_react.useRef)(null);
	const pdfRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	const today = keyOf(/* @__PURE__ */ new Date());
	const todayEntries = entriesFor(today, entries);
	const done = todayEntries.filter((e) => e.status === "done").length;
	const now = /* @__PURE__ */ new Date();
	const monthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
	const gDate = gujaratiDate(now, lang);
	const stats = [
		{
			k: t("statsDays", lang),
			v: Object.keys(days).length
		},
		{
			k: t("statsEntries", lang),
			v: entries.length
		},
		{
			k: t("statsToday", lang),
			v: todayEntries.length
		},
		{
			k: t("statsMonth", lang),
			v: entries.filter((e) => e.date.startsWith(monthPrefix)).length
		},
		{
			k: t("statsSeva", lang),
			v: seva.length
		},
		{
			k: t("statsFiles", lang),
			v: files.length
		},
		{
			k: t("statsPhotos", lang),
			v: files.filter((f) => f.type === "image").length
		},
		{
			k: t("statsPdfs", lang),
			v: files.filter((f) => f.type === "pdf").length
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-6xl mx-auto grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
				className: "relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pop-orb w-32 h-32 bg-gold/30 -top-8 -right-6" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-gold m-0",
						children: HUKAM
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-semibold mt-1 mb-1",
						children: "Rojnishi Of Bms"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted m-0",
						children: OWNER_LINE
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid sm:grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-wide text-muted",
									children: t("todayPanel", lang)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xl font-bold text-royal",
									children: formatDayTitle(today, lang)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm",
									children: gDate.label
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted",
								children: t("statsToday", lang)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-semibold tabular-nums",
								children: maybeGu(todayEntries.length, lang)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted",
								children: t("completed", lang)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-semibold tabular-nums",
								children: maybeGu(done, lang)
							})] })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t("quick", lang) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 sm:grid-cols-4 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => {
								addEntry(today).then(() => navigate({
									to: "/diary",
									search: { date: today }
								}));
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }),
								" ",
								t("newNote", lang)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							onClick: () => {
								const rec = {
									id: uid(),
									title: "સેવા નોંધ",
									category: "અન્ય",
									folderId: SEVA_ROOT_ID,
									content: "",
									date: today,
									time: "",
									sequence: "",
									materials: "",
									notes: "",
									special: "",
									festival: "",
									attachments: [],
									kind: "record",
									createdAt: Date.now(),
									updatedAt: Date.now()
								};
								saveSeva(rec).then(() => navigate({
									to: "/library",
									search: { id: rec.id }
								}));
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-4" }),
								" ",
								t("sevaNote", lang)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							onClick: () => fileRef.current?.click(),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { className: "size-4" }),
								" ",
								t("uploadFile", lang)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							onClick: () => photoRef.current?.click(),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" }),
								" ",
								t("uploadPhoto", lang)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							onClick: () => pdfRef.current?.click(),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }),
								" ",
								t("uploadPdf", lang)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/diary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-4" }),
									" ",
									t("calendar", lang)
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/search",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }),
									" ",
									t("search", lang)
								]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: fileRef,
					type: "file",
					multiple: true,
					accept: FILE_ACCEPT,
					className: "hidden",
					onChange: (e) => {
						if (e.target.files) uploadFiles(Array.from(e.target.files), FILES_ROOT_ID);
						e.target.value = "";
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: photoRef,
					type: "file",
					multiple: true,
					accept: IMAGE_ACCEPT,
					className: "hidden",
					onChange: (e) => {
						if (e.target.files) uploadFiles(Array.from(e.target.files), FILES_ROOT_ID);
						e.target.value = "";
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: pdfRef,
					type: "file",
					multiple: true,
					accept: PDF_ACCEPT,
					className: "hidden",
					onChange: (e) => {
						if (e.target.files) uploadFiles(Array.from(e.target.files), FILES_ROOT_ID);
						e.target.value = "";
					}
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 md:grid-cols-4 gap-3",
				children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted",
						children: s.k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-2xl font-semibold tabular-nums mt-1",
						children: maybeGu(s.v, lang)
					})]
				}, s.k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t("todayPanel", lang) }),
				todayEntries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted m-0",
					children: t("noEntries", lang)
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "m-0 p-0 list-none grid gap-2",
					children: todayEntries.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 items-center rounded-[12px] bg-cream/60 px-3 py-2 border border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-sm w-14",
								children: e.time || "--:--"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `flex-1 ${e.status === "done" ? "line-through opacity-70" : ""}`,
								children: e.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold",
								style: { color: "var(--royal)" },
								children: pillarName(e.pillar, categories, lang)
							})
						]
					}, e.id))
				}),
				days[today]?.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 mb-0 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [t("notes", lang), ":"] }),
						" ",
						days[today].note
					]
				}) : null
			] })
		]
	});
}
//#endregion
export { Dashboard as component };
