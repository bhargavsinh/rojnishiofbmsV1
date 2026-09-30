import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { J as require_jsx_runtime, S as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as FOOTER_VERSE, j as useApp, k as t, l as HUKAM, p as OWNER_LINE, t as APP_NAME$1, x as cn } from "./store-DweQ-t3L.mjs";
import { E as Download, F as CalendarDays, I as BookOpen, N as ChartColumn, a as TriangleAlert, b as FolderOpen, c as Search, g as LayoutDashboard, m as Menu, n as ZoomOut, p as NotebookPen, r as X, s as Settings, t as ZoomIn, x as Flame } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CbtxQHID.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 min-h-11 px-4 text-sm font-semibold rounded-[10px] transition-[transform,background-color,box-shadow,filter] duration-150 ease-out disabled:opacity-50 disabled:pointer-events-none tap select-none", {
	variants: {
		variant: {
			primary: "bg-royal text-[#fff8f0] shadow-[0_8px_18px_-10px_rgba(138,28,28,0.7)] hover:brightness-110",
			gold: "bg-gold text-charcoal hover:brightness-105",
			ghost: "bg-transparent text-royal border border-border hover:bg-primary/10",
			glass: "glass-thin text-fg hover:bg-primary/10",
			danger: "bg-danger text-white hover:brightness-110",
			quiet: "bg-transparent text-muted hover:text-fg hover:bg-primary/10"
		},
		size: {
			md: "min-h-11 px-4",
			sm: "min-h-9 px-3 text-[13px]",
			icon: "size-11 p-0",
			iconSm: "size-9 p-0"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = (0, import_react.forwardRef)(function Button({ className, variant, size, asChild, ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		ref,
		...props
	});
});
function ConfirmDialog() {
	const c = useApp((s) => s.confirm);
	const close = useApp((s) => s.closeConfirm);
	const lang = useApp((s) => s.settings.language);
	if (!c.open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[80] grid place-items-center p-4",
		role: "alertdialog",
		"aria-modal": "true",
		"aria-labelledby": "confirm-title",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "absolute inset-0 bg-charcoal/45 backdrop-blur-sm",
			"aria-label": t("cancel", lang),
			onClick: () => close(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 w-full max-w-md glass-card p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					id: "confirm-title",
					className: "m-0 text-lg font-semibold",
					children: c.title || t("areYouSure", lang)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 mb-5 text-sm text-muted",
					children: c.message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => close(false),
						children: t("cancel", lang)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: c.danger ? "danger" : "primary",
						onClick: () => close(true),
						children: c.confirmLabel || t("confirm", lang)
					})]
				})
			]
		})]
	});
}
function FileViewer() {
	const viewer = useApp((s) => s.viewer);
	const close = useApp((s) => s.closeViewer);
	const fileUrl = useApp((s) => s.fileUrl);
	const files = useApp((s) => s.files);
	const lang = useApp((s) => s.settings.language);
	const [url, setUrl] = (0, import_react.useState)();
	const [zoom, setZoom] = (0, import_react.useState)(1);
	const file = viewer.open ? files.find((f) => f.id === viewer.fileId) : void 0;
	(0, import_react.useEffect)(() => {
		if (!viewer.open) {
			setUrl(void 0);
			setZoom(1);
			return;
		}
		fileUrl(viewer.fileId).then(setUrl);
	}, [viewer, fileUrl]);
	if (!viewer.open || !file) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[70] bg-charcoal/80 backdrop-blur-md flex flex-col",
		role: "dialog",
		"aria-modal": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "no-print flex items-center gap-2 px-3 py-2 text-[#f6eef8]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "flex-1 m-0 truncate font-medium",
					children: file.name
				}),
				file.type === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "quiet",
					size: "iconSm",
					onClick: () => setZoom((z) => Math.max(.5, z - .25)),
					"aria-label": "zoom out",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "quiet",
					size: "iconSm",
					onClick: () => setZoom((z) => Math.min(4, z + .25)),
					"aria-label": "zoom in",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "size-4" })
				})] }) : null,
				url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: url,
					download: file.name,
					className: "inline-flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "glass",
						size: "sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }),
							" ",
							t("download", lang)
						]
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "quiet",
					size: "icon",
					onClick: close,
					"aria-label": t("close", lang),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-auto grid place-items-center p-3",
			children: !url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[#f6eef8]",
				children: t("saving", lang)
			}) : file.type === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: url,
				alt: file.name,
				className: "max-w-none origin-center outline outline-1 -outline-offset-1 outline-white/10",
				style: {
					transform: `scale(${zoom})`,
					maxHeight: zoom === 1 ? "90vh" : void 0
				}
			}) : file.type === "pdf" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				title: file.name,
				src: url,
				className: "w-full h-[88vh] rounded-xl bg-white"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				title: file.name,
				src: url,
				className: "w-full h-[88vh] rounded-xl bg-white"
			})
		})]
	});
}
function WelcomeScreen() {
	const lang = useApp((s) => s.settings.language);
	const mark = useApp((s) => s.markWelcome);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh relative overflow-hidden grid place-items-center p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pop-orb w-72 h-72 bg-primary/40 top-[-40px] left-[-40px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pop-orb w-80 h-80 bg-gold/35 bottom-[-60px] right-[-40px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pop-orb w-40 h-40 bg-royal/30 top-1/3 right-12" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full max-w-lg glass-card p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-gold m-0",
						children: HUKAM
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-semibold mt-3 mb-2 tracking-tight",
						children: t("welcomeTitle", lang)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-royal font-semibold m-0",
						children: t("appName", lang)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted mt-4 mb-2",
						children: t("welcomeBody", lang)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: OWNER_LINE
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-6 min-w-44",
						onClick: () => void mark(),
						children: t("start", lang)
					})
				]
			})
		]
	});
}
function BootScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh grid place-items-center p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-card p-8 text-center max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-gold m-0",
					children: HUKAM
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold mt-3 mb-1",
					children: "Rojnishi Of Bms"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted m-0",
					children: "રોજનિશી · લોડ થઈ રહ્યું છે…"
				})
			]
		})
	});
}
var NAV = [
	{
		to: "/",
		key: "dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/diary",
		key: "diary",
		icon: CalendarDays
	},
	{
		to: "/notes",
		key: "notes",
		icon: NotebookPen
	},
	{
		to: "/analytics",
		key: "analytics",
		icon: ChartColumn
	},
	{
		to: "/files",
		key: "files",
		icon: FolderOpen
	},
	{
		to: "/seva",
		key: "seva",
		icon: Flame
	},
	{
		to: "/library",
		key: "library",
		icon: BookOpen
	},
	{
		to: "/search",
		key: "search",
		icon: Search
	},
	{
		to: "/settings",
		key: "settings",
		icon: Settings
	}
];
var MOBILE_PRIMARY = [
	"/",
	"/diary",
	"/seva",
	"/files"
];
function AppShell({ children }) {
	const ready = useApp((s) => s.ready);
	const init = useApp((s) => s.init);
	const welcome = useApp((s) => s.settings.hasSeenWelcome);
	const saveState = useApp((s) => s.saveState);
	const lang = useApp((s) => s.settings.language);
	const legacy = useApp((s) => s.legacyPrompt);
	const migrateLegacy = useApp((s) => s.migrateLegacy);
	const dismissLegacy = useApp((s) => s.dismissLegacy);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		init();
	}, [init]);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => useApp.getState().applyChrome();
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	const saveLabel = saveState === "saving" ? t("saving", lang) : `✓ ${t("saved", lang)}`;
	const items = (0, import_react.useMemo)(() => NAV.map((n) => ({
		...n,
		label: t(n.key, lang),
		active: n.to === "/" ? pathname === "/" : pathname.startsWith(n.to)
	})), [lang, pathname]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootScreen, {});
	if (!welcome) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WelcomeScreen, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh flex",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden lg:flex w-[248px] shrink-0 sticky top-0 h-dvh flex-col glass-card rounded-none border-y-0 border-l-0 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-6 flex flex-col gap-1",
						"aria-label": "main",
						children: items.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, { ...n }, n.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-auto pt-4 text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "m-0 font-semibold text-emerald tabular-nums",
							children: saveLabel
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 mb-0",
							children: FOOTER_VERSE
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0 flex flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "lg:hidden sticky top-0 z-30 glass-card rounded-none border-x-0 border-t-0 px-3 py-2 flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "quiet",
								size: "icon",
								onClick: () => setOpen(true),
								"aria-label": "menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { compact: true }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto text-xs text-emerald font-semibold",
								children: saveLabel
							})
						]
					}),
					legacy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-3 mt-3 glass-card p-3 border border-gold/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "m-0 font-semibold",
								children: "જૂનો ડેટા મળ્યો છે."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "m-0 text-sm text-muted",
								children: "શું તમે તેને નવા Database માં સાચવવા માંગો છો?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 mt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									onClick: () => void migrateLegacy(legacy),
									children: t("save", lang)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: dismissLegacy,
									children: t("cancel", lang)
								})]
							})
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1 p-3 sm:p-5 lg:p-6 safe-bottom lg:pb-6 page-enter",
						children
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "lg:hidden fixed bottom-0 inset-x-0 z-30 glass-card rounded-none border-x-0 border-b-0 px-2 pt-1",
				style: { paddingBottom: "max(8px, env(safe-area-inset-bottom))" },
				"aria-label": "bottom",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-5 gap-1",
					children: [items.filter((n) => MOBILE_PRIMARY.includes(n.to) || n.to === "/settings").slice(0, 4).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
						...n,
						compact: true
					}, n.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setOpen(true),
						className: "flex flex-col items-center justify-center min-h-14 text-[11px] font-semibold text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" }), t("more", lang)]
					})]
				})
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-40 lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "absolute inset-0 bg-charcoal/40",
					"aria-label": "close",
					onClick: () => setOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute left-0 top-0 bottom-0 w-[84%] max-w-sm glass-card rounded-none p-4 overflow-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "quiet",
							size: "icon",
							onClick: () => setOpen(false),
							"aria-label": t("close", lang),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-5 flex flex-col gap-1",
						children: items.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, { ...n }, n.to))
					})]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileViewer, {})
		]
	});
}
function Brand({ compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2.5 min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid place-items-center size-10 rounded-[12px] bg-royal text-gold font-display font-bold",
			children: "ર"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("min-w-0", compact && "hidden xs:block"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display font-semibold leading-tight truncate",
				children: APP_NAME$1
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] text-muted truncate",
				children: HUKAM
			})]
		})]
	});
}
function NavLink({ to, label, icon: Icon, active, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: cn("flex items-center gap-2.5 min-h-11 px-3 rounded-[12px] text-sm font-semibold transition-colors duration-150", compact && "flex-col justify-center gap-0.5 min-h-14 px-1 text-[11px]", active ? "bg-royal text-[#fff6ee]" : "text-muted hover:bg-primary/10 hover:text-fg"),
		"aria-current": active ? "page" : void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: label
		})]
	});
}
function registerPwa() {
	if (typeof window === "undefined") return;
	if (!("serviceWorker" in navigator)) return;
	navigator.serviceWorker.register("/service-worker.js").catch(() => {});
}
var styles_default = "/assets/styles-_Ow8mda_.css";
var APP_NAME = "Rojnishi Of Bms";
var Route$9 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#6D28D9"
			},
			{
				name: "description",
				content: "રોજનિશી — દૈનિક નોંધ, વિદ્યા, કાર્ય, લેખન અને શ્રી દેવદમન પ્રભુ સેવા અભિલેખાગાર."
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/icon-192.png"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Gujarati:wght@400;500;600;700&display=swap"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	(0, import_react.useEffect)(() => {
		registerPwa();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "gu",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					position: "bottom-center",
					toastOptions: { className: "glass-card !text-fg" }
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$8 = () => import("./routes-UmP7FQw1.mjs");
var Route$8 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./analytics-BXTVmvKv.mjs");
var Route$7 = createFileRoute("/analytics")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./diary-82znlJSA.mjs");
var Route$6 = createFileRoute("/diary")({
	validateSearch: (search) => ({ date: typeof search.date === "string" ? search.date : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./files-C92Ht7RW.mjs");
var Route$5 = createFileRoute("/files")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./library-DhUzYuww.mjs");
var Route$4 = createFileRoute("/library")({
	validateSearch: (search) => ({ id: typeof search.id === "string" ? search.id : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./notes-BD7C951o.mjs");
var Route$3 = createFileRoute("/notes")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./search-BoeIRYcc.mjs");
var Route$2 = createFileRoute("/search")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./settings-1qWAkikx.mjs");
var Route$1 = createFileRoute("/settings")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./seva-BmMf31MW.mjs");
var Route = createFileRoute("/seva")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$8.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$9
	}),
	AnalyticsRoute: Route$7.update({
		id: "/analytics",
		path: "/analytics",
		getParentRoute: () => Route$9
	}),
	DiaryRoute: Route$6.update({
		id: "/diary",
		path: "/diary",
		getParentRoute: () => Route$9
	}),
	FilesRoute: Route$5.update({
		id: "/files",
		path: "/files",
		getParentRoute: () => Route$9
	}),
	LibraryRoute: Route$4.update({
		id: "/library",
		path: "/library",
		getParentRoute: () => Route$9
	}),
	NotesRoute: Route$3.update({
		id: "/notes",
		path: "/notes",
		getParentRoute: () => Route$9
	}),
	SearchRoute: Route$2.update({
		id: "/search",
		path: "/search",
		getParentRoute: () => Route$9
	}),
	SettingsRoute: Route$1.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => Route$9
	}),
	SevaRoute: Route.update({
		id: "/seva",
		path: "/seva",
		getParentRoute: () => Route$9
	})
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultPreload: "intent",
		scrollRestoration: true
	});
}
//#endregion
export { Button as i, Route$4 as n, Route$6 as r, router_exports as t };
