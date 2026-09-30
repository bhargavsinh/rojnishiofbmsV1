import { J as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { j as useApp, k as t, l as HUKAM } from "./store-DweQ-t3L.mjs";
import { n as GlassCard } from "./glass-BhDIhW7d.mjs";
import { I as BookOpen } from "../_libs/lucide-react.mjs";
import { i as Button } from "./router-CbtxQHID.mjs";
import { t as FileManager } from "./file-manager-vA4PG5cn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seva-BmMf31MW.js
var import_jsx_runtime = require_jsx_runtime();
function SevaPage() {
	const lang = useApp((s) => s.settings.language);
	const seva = useApp((s) => s.seva);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-6xl mx-auto grid gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold text-gold m-0",
				children: HUKAM
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold mt-1 mb-2",
				children: "શ્રી દેવદમન પ્રભુ સેવા"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted m-0",
				children: "આ વિભાગ દૈનિક રોજનિશીથી અલગ છે — સેવા પ્રણાલિકા, ફોટા, PDF અને ઉત્સવ અભિલેખ માટેનું અર્કાઇવ."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2 mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/library",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }),
							" ",
							t("library", lang)
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center text-sm text-muted",
					children: [
						t("statsSeva", lang),
						": ",
						seva.length
					]
				})]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileManager, { space: "seva" })]
	});
}
//#endregion
export { SevaPage as component };
