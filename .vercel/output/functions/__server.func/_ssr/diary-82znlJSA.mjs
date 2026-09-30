import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { J as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as entriesFor, D as pillarColor, O as pillarName, T as keyOf, b as addDays, i as FILE_ACCEPT, j as useApp, k as t, v as WEEK_HDR_EN, y as WEEK_HDR_GU } from "./store-DweQ-t3L.mjs";
import { n as GlassCard, r as SectionTitle, t as EmptyState } from "./glass-BhDIhW7d.mjs";
import { i as monthName, r as maybeGu, t as formatDayTitle } from "./gujarati-DvhvqI5H.mjs";
import { A as ChevronLeft, D as Copy, M as Check, O as ChevronUp, T as Ellipsis, d as Plus, f as Paperclip, j as ChevronDown, k as ChevronRight, o as Trash2 } from "../_libs/lucide-react.mjs";
import { i as Button, r as Route$6 } from "./router-CbtxQHID.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/diary-82znlJSA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CalendarView() {
	const lang = useApp((s) => s.settings.language);
	const viewY = useApp((s) => s.viewY);
	const viewM = useApp((s) => s.viewM);
	const setView = useApp((s) => s.setView);
	const selected = useApp((s) => s.selectedDate);
	const selectDate = useApp((s) => s.selectDate);
	const goToday = useApp((s) => s.goToday);
	const entries = useApp((s) => s.entries);
	const categories = useApp((s) => s.categories);
	const today = keyOf(/* @__PURE__ */ new Date());
	const startOffset = (new Date(viewY, viewM, 1).getDay() + 6) % 7;
	const start = new Date(viewY, viewM, 1 - startOffset);
	const hdr = lang === "en" ? WEEK_HDR_EN : WEEK_HDR_GU;
	const cells = Array.from({ length: 42 }, (_, i) => {
		const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
		const k = keyOf(d);
		const list = entriesFor(k, entries);
		return {
			d,
			k,
			list,
			pills: [...new Set(list.map((e) => e.pillar))].slice(0, 4),
			out: d.getMonth() !== viewM
		};
	});
	const monthCount = cells.filter((c) => !c.out).reduce((n, c) => n + c.list.length, 0);
	const title = `${monthName(viewM, lang)} ${maybeGu(viewY, lang)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t("calendar", lang) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2 mb-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: () => setView(viewY, viewM - 1),
					"aria-label": "previous month",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-lg font-bold text-royal",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: () => setView(viewY, viewM + 1),
					"aria-label": "next month",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-7 gap-1 mb-1",
			children: hdr.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center text-[11px] font-bold text-gold bg-gold/10 rounded-lg py-1.5",
				children: w
			}, w))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-7 gap-1",
			children: cells.map((c) => {
				const sel = c.k === selected;
				const isToday = c.k === today;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => selectDate(c.k),
					className: [
						"cal-cell relative min-h-12 sm:min-h-[58px] rounded-[10px] border border-border bg-cream/70 text-left p-1.5 tap",
						c.out ? "opacity-40" : "",
						isToday ? "today" : "",
						sel ? "sel" : "hover:bg-gold/10"
					].join(" "),
					"aria-label": formatDayTitle(c.k, lang),
					"aria-pressed": sel,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `text-[13px] font-semibold ${sel ? "text-white" : ""}`,
						children: maybeGu(c.d.getDate(), lang)
					}), c.list.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute bottom-1.5 left-1.5 flex gap-0.5",
						children: c.pills.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
							className: "size-1.5 rounded-full inline-block",
							style: { background: pillarColor(p, categories) }
						}, p))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `absolute bottom-1 right-1 text-[10px] font-bold rounded-full px-1.5 ${sel ? "bg-gold/80 text-charcoal" : "bg-gold/25 text-charcoal"}`,
						children: maybeGu(c.list.length, lang)
					})] }) : null]
				}, c.k);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2 mt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				onClick: goToday,
				children: t("goToday", lang)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center min-h-11 px-3 text-sm text-muted",
				children: [
					t("monthEntries", lang),
					": ",
					maybeGu(monthCount, lang)
				]
			})]
		})
	] });
}
function DayPanel() {
	const lang = useApp((s) => s.settings.language);
	const date = useApp((s) => s.selectedDate);
	const entries = useApp((s) => s.entries);
	const days = useApp((s) => s.days);
	const categories = useApp((s) => s.categories);
	const routines = useApp((s) => s.routines);
	const addEntry = useApp((s) => s.addEntry);
	const setDayNote = useApp((s) => s.setDayNote);
	const applyRoutine = useApp((s) => s.applyRoutine);
	const copyDay = useApp((s) => s.copyDay);
	const clearDay = useApp((s) => s.clearDay);
	const [routineId, setRoutineId] = (0, import_react.useState)("routine-nitya");
	const [copyFrom, setCopyFrom] = (0, import_react.useState)(addDays(date, -1));
	const list = entriesFor(date, entries);
	const note = days[date]?.note ?? "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t("dayNote", lang) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-lg font-bold text-royal",
			children: formatDayTitle(date, lang)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted mt-0.5 mb-3",
			children: list.length ? `${t("totalEntries", lang)} ${maybeGu(list.length, lang)} — ${lang === "gu" ? "સમય પ્રમાણે ગોઠવાયેલી" : "sorted by time"}` : t("noEntries", lang)
		}),
		list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("emptyDay", lang) }) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-2",
			children: list.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntryRow, { entry: e }, e.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2 mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => {
						addEntry(date).then(() => {
							const inputs = document.querySelectorAll("[data-entry-desc]");
							inputs[inputs.length - 1]?.focus();
						});
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }),
						" ",
						t("addEntry", lang)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => void applyRoutine(routineId, date),
					children: t("fillRoutine", lang)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => void copyDay(addDays(date, -1), date),
					children: t("copyYesterday", lang)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => void clearDay(date),
					children: t("clearDay", lang)
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex flex-wrap gap-2 items-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-muted mb-1",
					children: t("applyRoutine", lang)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "min-h-11 rounded-[10px] border border-border bg-cream/80 px-3",
					value: routineId,
					onChange: (e) => setRoutineId(e.target.value),
					children: routines.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: r.id,
						children: r.name
					}, r.id))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-muted mb-1",
					children: t("copyDay", lang)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						className: "min-h-11 rounded-[10px] border border-border bg-cream/80 px-3",
						value: copyFrom,
						onChange: (e) => setCopyFrom(e.target.value)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => void copyDay(copyFrom, date),
						children: t("copy", lang)
					})]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 pt-4 border-t border-dashed border-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "dayNote",
				className: "block text-sm font-semibold text-gold mb-1.5",
				children: t("dayLineNote", lang)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				id: "dayNote",
				value: note,
				onChange: (e) => void setDayNote(date, e.target.value),
				placeholder: t("dayNotePh", lang),
				className: "w-full min-h-20 rounded-[14px] border border-border bg-cream/70 p-3 text-sm"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-wrap gap-1.5",
			children: Object.entries(list.reduce((acc, e) => {
				acc[e.pillar] = (acc[e.pillar] || 0) + 1;
				return acc;
			}, {})).map(([k, n]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-[11px] font-bold text-white rounded-full px-2.5 py-1",
				style: { background: pillarColor(k, categories) },
				children: [
					pillarName(k, categories, lang),
					" · ",
					maybeGu(n, lang)
				]
			}, k))
		})
	] });
}
function EntryRow({ entry }) {
	const lang = useApp((s) => s.settings.language);
	const categories = useApp((s) => s.categories);
	const updateEntry = useApp((s) => s.updateEntry);
	const deleteEntry = useApp((s) => s.deleteEntry);
	const duplicateEntry = useApp((s) => s.duplicateEntry);
	const reorderEntry = useApp((s) => s.reorderEntry);
	const toggleEntry = useApp((s) => s.toggleEntry);
	const uploadFiles = useApp((s) => s.uploadFiles);
	const files = useApp((s) => s.files);
	const [open, setOpen] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	const color = pillarColor(entry.pillar, categories);
	const attached = files.filter((f) => entry.attachments.includes(f.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-[14px] border border-border bg-cream/60 p-2 sm:p-2.5",
		style: { borderLeft: `5px solid ${color}` },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void toggleEntry(entry.id),
					className: `size-9 rounded-lg border grid place-items-center ${entry.status === "done" ? "bg-emerald text-white border-emerald" : "border-border"}`,
					"aria-pressed": entry.status === "done",
					"aria-label": t("done", lang),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "time",
					value: entry.time,
					onChange: (e) => void updateEntry(entry.id, { time: e.target.value }),
					className: "min-h-11 w-[7.2rem] rounded-[10px] border border-border bg-card px-2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					"data-entry-desc": true,
					type: "text",
					value: entry.description,
					placeholder: t("description", lang),
					onChange: (e) => void updateEntry(entry.id, { description: e.target.value }),
					className: `flex-1 min-w-[10rem] min-h-11 rounded-[10px] border border-border bg-card px-3 ${entry.status === "done" ? "line-through opacity-70" : ""}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: entry.pillar,
					onChange: (e) => void updateEntry(entry.id, { pillar: e.target.value }),
					className: "min-h-11 max-w-[12rem] rounded-[10px] border border-border bg-card px-2 text-[13px]",
					children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: lang === "en" ? c.nameEn : c.nameGu
					}, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "quiet",
					size: "iconSm",
					onClick: () => setOpen((v) => !v),
					"aria-expanded": open,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" })
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex flex-wrap gap-1.5 items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "quiet",
					size: "sm",
					onClick: () => void duplicateEntry(entry.id),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }),
						" ",
						t("duplicate", lang)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "quiet",
					size: "sm",
					onClick: () => void reorderEntry(entry.id, -1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-3.5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "quiet",
					size: "sm",
					onClick: () => void reorderEntry(entry.id, 1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "quiet",
					size: "sm",
					onClick: () => fileRef.current?.click(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-3.5" }),
						" ",
						t("attach", lang)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "quiet",
					size: "sm",
					onClick: () => void deleteEntry(entry.id),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }),
						" ",
						t("delete", lang)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: fileRef,
					type: "file",
					accept: FILE_ACCEPT,
					className: "hidden",
					onChange: (e) => {
						const list = e.target.files;
						if (!list?.length) return;
						uploadFiles(Array.from(list), "files-root", {
							linkedDate: entry.date,
							linkedEntryId: entry.id
						}).then((saved) => {
							if (saved.length) updateEntry(entry.id, { attachments: [...entry.attachments, ...saved.map((f) => f.id)] });
						});
						e.target.value = "";
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: entry.note,
					onChange: (e) => void updateEntry(entry.id, { note: e.target.value }),
					placeholder: t("dayLineNote", lang),
					className: "w-full min-h-16 rounded-[10px] border border-border bg-card p-2 text-sm"
				}),
				attached.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-xs underline text-electric",
					onClick: () => useApp.getState().openViewer(f.id),
					children: f.name
				}, f.id))
			]
		}) : null]
	});
}
function DiaryPage() {
	const { date } = Route$6.useSearch();
	const selectDate = useApp((s) => s.selectDate);
	const selected = useApp((s) => s.selectedDate);
	const navigate = useNavigate({ from: "/diary" });
	(0, import_react.useEffect)(() => {
		if (date && /^\d{4}-\d{2}-\d{2}$/.test(date) && date !== selected) selectDate(date);
	}, [
		date,
		selectDate,
		selected
	]);
	(0, import_react.useEffect)(() => {
		if (selected && selected !== date) navigate({
			search: { date: selected },
			replace: true
		});
	}, [
		selected,
		date,
		navigate
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-6xl mx-auto grid lg:grid-cols-[minmax(320px,1fr)_minmax(320px,1.2fr)] gap-4 items-start",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarView, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayPanel, {})]
	});
}
//#endregion
export { DiaryPage as component };
