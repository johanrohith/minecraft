import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CBYnGwcq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const host = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let alive = true;
		fetch("/blocklands.html").then((res) => res.text()).then((text) => {
			if (!alive) return;
			const root = host.current;
			if (!root || root.querySelector("canvas")) return;
			const doc = new DOMParser().parseFromString(text, "text/html");
			const css = doc.querySelector("style")?.textContent ?? "";
			const style = document.createElement("style");
			style.dataset.blocklands = "1";
			style.textContent = css;
			if (!document.head.querySelector("style[data-blocklands]")) document.head.appendChild(style);
			root.replaceChildren();
			const canvas = doc.querySelector("canvas");
			const ui = doc.querySelector("#ui");
			if (canvas) root.appendChild(canvas);
			if (ui) root.appendChild(ui);
			const code = doc.querySelector("script")?.textContent;
			if (!code || document.querySelector("script[data-blocklands]")) return;
			const script = document.createElement("script");
			script.dataset.blocklands = "1";
			script.textContent = code;
			document.body.appendChild(script);
		}).catch(() => {
			if (host.current) host.current.textContent = "Blocklands failed to start. Reload the page.";
		});
		return () => {
			alive = false;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		ref: host,
		className: "game-frame",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "boot-fallback",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "boot-fallback__mark",
				children: "Blocklands"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Loading the island…" })]
		})
	});
}
//#endregion
export { Home as component };
