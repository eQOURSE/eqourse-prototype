import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root")!;

// React replaces the build-time fallback on its first commit. On the homepage,
// the full stylesheet loads without blocking the inline preview, so wait for it
// before mounting the app to avoid an unstyled intermediate render.
let mounted = false;
const mountApp = () => {
  if (mounted) return;
  mounted = true;
  createRoot(rootElement).render(<App />);
};
const deferredStyles = document.querySelector<HTMLLinkElement>("link[data-deferred-app-css]");
if (deferredStyles && deferredStyles.media !== "all") {
  if (deferredStyles.sheet) {
    deferredStyles.media = "all";
    mountApp();
  } else {
    deferredStyles.addEventListener("load", mountApp, { once: true });
    deferredStyles.addEventListener("error", mountApp, { once: true });
  }
} else {
  mountApp();
}
