import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { J as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as uid, S as downloadBlob, T as keyOf, h as SEVA_ROOT_ID, i as FILE_ACCEPT, j as useApp, k as t } from "./store-DweQ-t3L.mjs";
import { n as GlassCard, r as SectionTitle, t as EmptyState } from "./glass-BhDIhW7d.mjs";
import { D as Copy, d as Plus, l as Save, o as Trash2, u as Printer } from "../_libs/lucide-react.mjs";
import { i as Button, n as Route$4 } from "./router-CbtxQHID.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library-DhUzYuww.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PranalikaEditor({ rec, onChange }) {
	const lang = useApp((s) => s.settings.language);
	const saveSeva = useApp((s) => s.saveSeva);
	const deleteSeva = useApp((s) => s.deleteSeva);
	const duplicateSeva = useApp((s) => s.duplicateSeva);
	const folders = useApp((s) => s.folders);
	const uploadFiles = useApp((s) => s.uploadFiles);
	const files = useApp((s) => s.files);
	const fileRef = (0, import_react.useRef)(null);
	const attached = files.filter((f) => rec.attachments.includes(f.id));
	function field(key, value) {
		onChange({
			...rec,
			[key]: value
		});
	}
	function printRec() {
		const w = window.open("", "_blank", "noopener,noreferrer");
		if (!w) return;
		const doc = w.document;
		doc.title = rec.title;
		const style = doc.createElement("style");
		style.textContent = "body{font-family:'Noto Sans Gujarati',sans-serif;padding:24px;color:#211a2b} h1{color:#8a1c1c} dt{font-weight:700;margin-top:12px} ";
		doc.head.appendChild(style);
		const h1 = doc.createElement("h1");
		h1.textContent = rec.title;
		doc.body.appendChild(h1);
		const rows = [
			[t("time", lang), rec.time],
			[t("sequence", lang), rec.sequence],
			[t("procedure", lang), rec.content],
			[t("materials", lang), rec.materials],
			[t("special", lang), rec.special],
			[t("festival", lang), rec.festival],
			[t("notes", lang), rec.notes]
		];
		const dl = doc.createElement("dl");
		for (const [k, v] of rows) {
			const dt = doc.createElement("dt");
			dt.textContent = k;
			const dd = doc.createElement("dd");
			dd.textContent = v || "—";
			dl.append(dt, dd);
		}
		doc.body.appendChild(dl);
		w.focus();
		w.print();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t("library", lang) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-semibold",
					children: [t("sevaName", lang), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "mt-1 w-full min-h-11 rounded-[12px] border border-border bg-cream/70 px-3",
						value: rec.title,
						onChange: (e) => field("title", e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid sm:grid-cols-3 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm font-semibold",
							children: [t("time", lang), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "time",
								className: "mt-1 w-full min-h-11 rounded-[12px] border border-border bg-cream/70 px-3",
								value: rec.time,
								onChange: (e) => field("time", e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm font-semibold",
							children: [t("sequence", lang), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "mt-1 w-full min-h-11 rounded-[12px] border border-border bg-cream/70 px-3",
								value: rec.sequence,
								onChange: (e) => field("sequence", e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm font-semibold",
							children: [t("folder", lang), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "mt-1 w-full min-h-11 rounded-[12px] border border-border bg-cream/70 px-3",
								value: rec.folderId,
								onChange: (e) => field("folderId", e.target.value),
								children: folders.filter((f) => f.space === "seva").map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: f.id,
									children: f.name
								}, f.id))
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-semibold",
					children: [t("procedure", lang), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "mt-1 w-full min-h-36 rounded-[14px] border border-border bg-cream/70 p-3",
						value: rec.content,
						onChange: (e) => field("content", e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-semibold",
					children: [t("materials", lang), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "mt-1 w-full min-h-20 rounded-[14px] border border-border bg-cream/70 p-3",
						value: rec.materials,
						onChange: (e) => field("materials", e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-semibold",
					children: [t("special", lang), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "mt-1 w-full min-h-16 rounded-[14px] border border-border bg-cream/70 p-3",
						value: rec.special,
						onChange: (e) => field("special", e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-semibold",
					children: [t("festival", lang), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "mt-1 w-full min-h-16 rounded-[14px] border border-border bg-cream/70 p-3",
						value: rec.festival,
						onChange: (e) => field("festival", e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-semibold",
					children: [t("notes", lang), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "mt-1 w-full min-h-16 rounded-[14px] border border-border bg-cream/70 p-3",
						value: rec.notes,
						onChange: (e) => field("notes", e.target.value)
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2 mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => void saveSeva(rec),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }),
						" ",
						t("save", lang)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					onClick: () => void duplicateSeva(rec.id),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }),
						" ",
						t("duplicate", lang)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					onClick: printRec,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-4" }),
						" ",
						t("print", lang),
						" / ",
						t("exportPdf", lang)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => {
						const blob = new Blob([JSON.stringify(rec, null, 2)], { type: "application/json" });
						downloadBlob(blob, `${rec.title || "seva"}.json`);
					},
					children: t("exportJson", lang)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => fileRef.current?.click(),
					children: t("attach", lang)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "danger",
					onClick: () => void deleteSeva(rec.id),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }),
						" ",
						t("delete", lang)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: fileRef,
					type: "file",
					multiple: true,
					accept: FILE_ACCEPT,
					className: "hidden",
					onChange: (e) => {
						const list = e.target.files;
						if (!list?.length) return;
						uploadFiles(Array.from(list), rec.folderId, { linkedSevaId: rec.id }).then((saved) => {
							if (saved.length) onChange({
								...rec,
								attachments: [...rec.attachments, ...saved.map((f) => f.id)]
							});
						});
						e.target.value = "";
					}
				})
			]
		}),
		attached.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 pl-5",
			children: attached.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "underline text-electric",
				onClick: () => useApp.getState().openViewer(f.id),
				children: f.name
			}) }, f.id))
		}) : null
	] });
}
function LibraryPage() {
	const { id } = Route$4.useSearch();
	const lang = useApp((s) => s.settings.language);
	const seva = useApp((s) => s.seva);
	const saveSeva = useApp((s) => s.saveSeva);
	const navigate = useNavigate({ from: "/library" });
	const selected = (0, import_react.useMemo)(() => seva.find((s) => s.id === id) ?? seva[0], [seva, id]);
	const [draft, setDraft] = (0, import_react.useState)(selected);
	(0, import_react.useEffect)(() => {
		setDraft(selected);
	}, [selected]);
	function createNew() {
		const rec = {
			id: uid(),
			title: t("newPranalika", lang),
			category: "",
			folderId: SEVA_ROOT_ID,
			content: "",
			date: keyOf(/* @__PURE__ */ new Date()),
			time: "",
			sequence: "",
			materials: "",
			notes: "",
			special: "",
			festival: "",
			attachments: [],
			kind: "pranalika",
			createdAt: Date.now(),
			updatedAt: Date.now()
		};
		saveSeva(rec).then(() => navigate({ search: { id: rec.id } }));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-6xl mx-auto grid lg:grid-cols-[260px_1fr] gap-4 items-start",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2 mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					className: "mb-0",
					children: t("library", lang)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "iconSm",
					variant: "ghost",
					onClick: createNew,
					"aria-label": t("newPranalika", lang),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
				})]
			}),
			seva.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("noResults", lang) }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "m-0 p-0 list-none grid gap-1",
				children: seva.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => void navigate({ search: { id: s.id } }),
					className: `w-full text-left rounded-[12px] px-3 py-2 min-h-11 ${selected?.id === s.id ? "bg-royal text-[#fff6ee]" : "hover:bg-primary/10"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold truncate",
						children: s.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs opacity-80 truncate",
						children: s.time || s.kind
					})]
				}) }, s.id))
			})
		] }), draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PranalikaEditor, {
			rec: draft,
			onChange: setDraft
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("noResults", lang) })]
	});
}
//#endregion
export { LibraryPage as component };
