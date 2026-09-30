import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { J as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as downloadBlob, j as useApp, k as t, n as APP_VERSION, t as APP_NAME, w as formatBytes } from "./store-DweQ-t3L.mjs";
import { n as GlassCard, r as SectionTitle } from "./glass-BhDIhW7d.mjs";
import { r as maybeGu } from "./gujarati-DvhvqI5H.mjs";
import { i as Button } from "./router-CbtxQHID.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-1qWAkikx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const lang = useApp((s) => s.settings.language);
	const settings = useApp((s) => s.settings);
	const updateSettings = useApp((s) => s.updateSettings);
	const exportBackup = useApp((s) => s.exportBackup);
	const importBackup = useApp((s) => s.importBackup);
	const wipeAll = useApp((s) => s.wipeAll);
	const addCategory = useApp((s) => s.addCategory);
	const days = useApp((s) => s.days);
	const entries = useApp((s) => s.entries);
	const seva = useApp((s) => s.seva);
	const files = useApp((s) => s.files);
	const [io, setIo] = (0, import_react.useState)("");
	const [includeFiles, setIncludeFiles] = (0, import_react.useState)(false);
	const [storage, setStorage] = (0, import_react.useState)(null);
	const [standalone, setStandalone] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setStandalone(window.matchMedia("(display-mode: standalone)").matches);
		if (navigator.storage?.estimate) navigator.storage.estimate().then((e) => {
			setStorage({
				used: e.usage ?? 0,
				quota: e.quota ?? 0
			});
		});
	}, [files.length, entries.length]);
	async function doExport() {
		const payload = await exportBackup(includeFiles);
		const txt = JSON.stringify(payload, null, 2);
		setIo(txt);
		downloadBlob(new Blob([txt], { type: "application/json" }), `rojnishi-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`);
		try {
			await navigator.clipboard.writeText(txt);
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl mx-auto grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t("appearance", lang) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						"light",
						"dark",
						"auto"
					].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: settings.appearance === a ? "primary" : "ghost",
						onClick: () => void updateSettings({ appearance: a }),
						children: t(a, lang)
					}, a))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 text-sm font-semibold",
					children: t("theme", lang)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2 mt-2",
					children: [
						"pop-glass",
						"royal",
						"minimal"
					].map((th) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: settings.theme === th ? "gold" : "ghost",
						onClick: () => void updateSettings({ theme: th }),
						children: th === "pop-glass" ? t("popGlass", lang) : th === "royal" ? t("royal", lang) : t("minimal", lang)
					}, th))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t("language", lang) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2",
				children: ["gu", "en"].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: settings.language === l ? "primary" : "ghost",
					onClick: () => void updateSettings({ language: l }),
					children: l === "gu" ? t("gujarati", lang) : t("english", lang)
				}, l))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t("customCategory", lang) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-wrap gap-2",
				onSubmit: (e) => {
					e.preventDefault();
					const fd = new FormData(e.currentTarget);
					const name = String(fd.get("name") || "").trim();
					const color = String(fd.get("color") || "#64748b");
					if (name) addCategory(name, color);
					e.currentTarget.reset();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "name",
						required: true,
						placeholder: t("customCategory", lang),
						className: "flex-1 min-h-11 rounded-[12px] border border-border px-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "color",
						type: "color",
						defaultValue: "#7c3aed",
						className: "size-11 rounded-[10px]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: t("save", lang)
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t("data", lang) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 min-h-11",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: includeFiles,
						onChange: (e) => setIncludeFiles(e.target.checked)
					}), t("includeFiles", lang)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2 mt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => void doExport(),
							children: [
								t("export", lang),
								" / ",
								t("copy", lang)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => {
								useApp.getState().exportBackup(false).then((x) => setIo(JSON.stringify(x, null, 2)));
							},
							children: t("showData", lang)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => {
								if (!io.trim()) return;
								try {
									importBackup(JSON.parse(io), "merge");
								} catch {
									setIo("JSON માન્ય નથી.");
								}
							},
							children: t("merge", lang)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => {
								if (!io.trim()) return;
								try {
									importBackup(JSON.parse(io), "replace");
								} catch {
									setIo("JSON માન્ય નથી.");
								}
							},
							children: t("replace", lang)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "danger",
							onClick: () => void wipeAll(),
							children: t("wipe", lang)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "mt-3 w-full min-h-32 rounded-[14px] border border-border bg-cream/70 p-3 font-mono text-xs",
					value: io,
					onChange: (e) => setIo(e.target.value),
					placeholder: t("searchPlaceholder", lang)
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t("storage", lang) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "m-0 p-0 list-none text-sm grid gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("dbActive", lang) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						t("used", lang),
						": ",
						storage ? formatBytes(storage.used) : "—",
						storage?.quota ? ` / ${formatBytes(storage.quota)}` : ""
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						t("statsDays", lang),
						": ",
						maybeGu(Object.keys(days).length, lang)
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						t("statsEntries", lang),
						": ",
						maybeGu(entries.length, lang)
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						t("statsSeva", lang),
						": ",
						maybeGu(seva.length, lang)
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						t("statsFiles", lang),
						": ",
						maybeGu(files.length, lang)
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						t("statsPhotos", lang),
						": ",
						maybeGu(files.filter((f) => f.type === "image").length, lang)
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						t("statsPdfs", lang),
						": ",
						maybeGu(files.filter((f) => f.type === "pdf").length, lang)
					] })
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t("application", lang) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "m-0 text-sm",
					children: [
						APP_NAME,
						" · v",
						APP_VERSION,
						" · DB ",
						1
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: ["PWA: ", standalone ? t("active", lang) : t("installHint", lang)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: t("offline", lang)
				})
			] })
		]
	});
}
//#endregion
export { SettingsPage as component };
