export function registerPwa() {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;
  if (!import.meta.env.PROD) return;
  void navigator.serviceWorker.register("/service-worker.js").catch(() => {
    /* ignore */
  });
}
