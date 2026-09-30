import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { J as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as SEVA_ROOT_ID, i as FILE_ACCEPT, j as useApp, k as t, m as PDF_ACCEPT, r as FILES_ROOT_ID, u as IMAGE_ACCEPT, w as formatBytes } from "./store-DweQ-t3L.mjs";
import { n as GlassCard, r as SectionTitle, t as EmptyState } from "./glass-BhDIhW7d.mjs";
import { r as maybeGu } from "./gujarati-DvhvqI5H.mjs";
import { S as File, _ as Image, c as Search, d as Plus, h as List, i as Upload, v as Grid3x3, w as FileText, y as Folder } from "../_libs/lucide-react.mjs";
import { i as Button } from "./router-CbtxQHID.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/file-manager-vA4PG5cn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FileManager({ space }) {
	const lang = useApp((s) => s.settings.language);
	const folders = useApp((s) => s.folders);
	const files = useApp((s) => s.files);
	const createFolder = useApp((s) => s.createFolder);
	const renameFolder = useApp((s) => s.renameFolder);
	const deleteFolder = useApp((s) => s.deleteFolder);
	const uploadFiles = useApp((s) => s.uploadFiles);
	const renameFile = useApp((s) => s.renameFile);
	const moveFile = useApp((s) => s.moveFile);
	const deleteFile = useApp((s) => s.deleteFile);
	const openViewer = useApp((s) => s.openViewer);
	const rootId = space === "seva" ? SEVA_ROOT_ID : FILES_ROOT_ID;
	const [folderId, setFolderId] = (0, import_react.useState)(rootId);
	const [q, setQ] = (0, import_react.useState)("");
	const [sort, setSort] = (0, import_react.useState)("date");
	const [grid, setGrid] = (0, import_react.useState)(true);
	const fileRef = (0, import_react.useRef)(null);
	const photoRef = (0, import_react.useRef)(null);
	const pdfRef = (0, import_react.useRef)(null);
	const current = folders.find((f) => f.id === folderId) ?? folders.find((f) => f.id === rootId);
	const crumbs = (0, import_react.useMemo)(() => {
		const out = [];
		let id = folderId;
		const guard = /* @__PURE__ */ new Set();
		while (id && !guard.has(id)) {
			guard.add(id);
			const f = folders.find((x) => x.id === id);
			if (!f) break;
			out.unshift(f);
			id = f.parentId;
		}
		return out;
	}, [folderId, folders]);
	const childFolders = folders.filter((f) => f.parentId === folderId && f.space === space).filter((f) => !q || f.name.toLowerCase().includes(q.toLowerCase()));
	const childFiles = files.filter((f) => q ? f.name.toLowerCase().includes(q.toLowerCase()) : f.folderId === folderId).slice().sort((a, b) => {
		if (sort === "name") return a.name.localeCompare(b.name);
		if (sort === "type") return a.type.localeCompare(b.type);
		if (sort === "size") return b.size - a.size;
		return b.createdAt - a.createdAt;
	});
	function onUpload(list) {
		if (!list?.length) return;
		uploadFiles(Array.from(list), folderId);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-2 mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				className: "mb-0",
				children: space === "seva" ? t("seva", lang) : t("files", lang)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "quiet",
					size: "iconSm",
					onClick: () => setGrid(true),
					"aria-pressed": grid,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid3x3, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "quiet",
					size: "iconSm",
					onClick: () => setGrid(false),
					"aria-pressed": !grid,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "size-4" })
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-1 text-sm mb-3",
			children: crumbs.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-1",
				children: [i > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: "/"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "font-semibold text-royal",
					onClick: () => setFolderId(c.id),
					children: c.name
				})]
			}, c.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2 mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "relative flex-1 min-w-40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: t("searchPlaceholder", lang),
					className: "w-full min-h-11 rounded-[12px] border border-border bg-cream/70 pl-9 pr-3"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: sort,
				onChange: (e) => setSort(e.target.value),
				className: "min-h-11 rounded-[12px] border border-border bg-cream/70 px-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "name",
						children: t("sortName", lang)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "date",
						children: t("sortDate", lang)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "type",
						children: t("sortType", lang)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "size",
						children: t("sortSize", lang)
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2 mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: () => {
						const name = window.prompt(t("createFolder", lang));
						if (name?.trim()) createFolder(name.trim(), folderId, space);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }),
						" ",
						t("createFolder", lang)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => fileRef.current?.click(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }),
						" ",
						t("uploadFile", lang)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: () => photoRef.current?.click(),
					children: t("uploadPhoto", lang)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: () => pdfRef.current?.click(),
					children: t("uploadPdf", lang)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: fileRef,
					type: "file",
					multiple: true,
					accept: FILE_ACCEPT,
					className: "hidden",
					onChange: (e) => {
						onUpload(e.target.files);
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
						onUpload(e.target.files);
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
						onUpload(e.target.files);
						e.target.value = "";
					}
				})
			]
		}),
		childFolders.length === 0 && childFiles.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("emptyFolder", lang) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: grid ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2" : "flex flex-col gap-2",
			children: [childFolders.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setFolderId(f.id),
				onContextMenu: (e) => {
					e.preventDefault();
					const act = window.prompt(`${t("rename", lang)} / ${t("delete", lang)} (r/d)`, "r");
					if (act === "d") deleteFolder(f.id);
					if (act === "r") {
						const n = window.prompt(t("rename", lang), f.name);
						if (n?.trim()) renameFolder(f.id, n.trim());
					}
				},
				className: "glass-thin rounded-[16px] p-3 text-left min-h-24 tap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { className: "size-7 text-gold" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 font-semibold truncate",
						children: f.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted",
						children: t("folder", lang)
					})
				]
			}, f.id)), childFiles.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCard, {
				file: f,
				grid,
				onOpen: () => openViewer(f.id),
				onRename: () => {
					const n = window.prompt(t("rename", lang), f.name);
					if (n?.trim()) renameFile(f.id, n.trim());
				},
				onDelete: () => void deleteFile(f.id),
				onMove: () => {
					const dest = window.prompt(t("move", lang), folderId);
					if (dest) moveFile(f.id, dest);
				},
				folders: folders.filter((x) => x.space === space)
			}, f.id))]
		}),
		current && current.id !== rootId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted mt-3 m-0",
			children: lang === "gu" ? "લાંબા ટેપ / રાઈટ-ક્લિકથી નામ બદલો કે ભૂંસો." : "Long-press or right-click to rename or delete."
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoveBar, {
			folders: folders.filter((x) => x.space === space),
			onMove: (id, dest) => void moveFile(id, dest),
			files: childFiles
		})
	] });
}
function FileCard({ file, grid, onOpen, onRename, onDelete, onMove }) {
	const Icon = file.type === "image" ? Image : file.type === "pdf" ? FileText : File;
	const lang = useApp((s) => s.settings.language);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: grid ? "glass-thin rounded-[16px] p-3 min-h-24" : "glass-thin rounded-[14px] p-3 flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onOpen,
			className: grid ? "text-left w-full" : "flex items-center gap-3 flex-1 min-w-0 text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-7 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: grid ? "mt-2" : "",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-semibold truncate",
					children: file.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted",
					children: [
						file.type.toUpperCase(),
						" · ",
						formatBytes(file.size),
						" · ",
						maybeGu(new Date(file.createdAt).toLocaleDateString(), lang)
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-1 mt-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "quiet",
					size: "sm",
					onClick: onOpen,
					children: t("open", lang)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "quiet",
					size: "sm",
					onClick: onRename,
					children: t("rename", lang)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "quiet",
					size: "sm",
					onClick: onMove,
					children: t("move", lang)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "quiet",
					size: "sm",
					onClick: onDelete,
					children: t("delete", lang)
				})
			]
		})]
	});
}
function MoveBar({ folders, files }) {
	const lang = useApp((s) => s.settings.language);
	const moveFile = useApp((s) => s.moveFile);
	const [fileId, setFileId] = (0, import_react.useState)("");
	const [dest, setDest] = (0, import_react.useState)(folders[0]?.id ?? "");
	if (!files.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 flex flex-wrap gap-2 items-end",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-muted mb-1",
					children: t("move", lang)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "min-h-11 rounded-[10px] border border-border px-2",
					value: fileId,
					onChange: (e) => setFileId(e.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "—"
					}), files.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: f.id,
						children: f.name
					}, f.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				className: "min-h-11 rounded-[10px] border border-border px-2",
				value: dest,
				onChange: (e) => setDest(e.target.value),
				children: folders.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: f.id,
					children: f.name
				}, f.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				disabled: !fileId || !dest,
				onClick: () => {
					if (fileId && dest) moveFile(fileId, dest);
				},
				children: t("move", lang)
			})
		]
	});
}
//#endregion
export { FileManager as t };
