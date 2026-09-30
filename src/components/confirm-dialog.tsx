import { useApp } from "@/lib/store";
import { t } from "@/lib/i18n";
import { Button } from "./ui/button";

export function ConfirmDialog() {
  const c = useApp((s) => s.confirm);
  const close = useApp((s) => s.closeConfirm);
  const lang = useApp((s) => s.settings.language);
  if (!c.open) return null;
  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center p-4"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <button
        className="absolute inset-0 bg-charcoal/45 backdrop-blur-sm"
        aria-label={t("cancel", lang)}
        onClick={() => close(false)}
      />
      <div className="relative z-10 w-full max-w-md glass-card p-5">
        <h3 id="confirm-title" className="m-0 text-lg font-semibold">
          {c.title || t("areYouSure", lang)}
        </h3>
        <p className="mt-2 mb-5 text-sm text-muted">{c.message}</p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => close(false)}>
            {t("cancel", lang)}
          </Button>
          <Button variant={c.danger ? "danger" : "primary"} onClick={() => close(true)}>
            {c.confirmLabel || t("confirm", lang)}
          </Button>
        </div>
      </div>
    </div>
  );
}
