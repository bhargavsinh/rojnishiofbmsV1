import { J as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { x as cn } from "./store-DweQ-t3L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/glass-BhDIhW7d.js
var import_jsx_runtime = require_jsx_runtime();
function GlassCard({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("glass-card p-4 sm:p-5", className),
		...props
	});
}
function SectionTitle({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
		className: cn("flex items-center gap-2.5 text-base font-semibold text-fg m-0 mb-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "inline-block w-1.5 h-4 rounded-sm bg-royal",
			"aria-hidden": true
		}), children]
	});
}
function EmptyState({ title, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[14px] border border-dashed border-border bg-cream/50 px-4 py-8 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "m-0 font-semibold",
			children: title
		}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "m-0 mt-1 text-sm text-muted",
			children: hint
		}) : null]
	});
}
//#endregion
export { GlassCard as n, SectionTitle as r, EmptyState as t };
