import { useEffect, useMemo, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarDays,
  ChartColumn,
  FolderOpen,
  Flame,
  LayoutDashboard,
  Menu,
  NotebookPen,
  Search,
  Settings,
  X,
} from "lucide-react";
import { APP_NAME, FOOTER_VERSE, HUKAM } from "@/lib/constants";
import { t, type I18nKey } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ConfirmDialog } from "../confirm-dialog";
import { FileViewer } from "../file-viewer";
import { BootScreen, WelcomeScreen } from "../welcome";
import { Button } from "../ui/button";

const NAV: { to: string; labelKey: I18nKey; icon: typeof LayoutDashboard }[] = [
  { to: "/", labelKey: "dashboard", icon: LayoutDashboard },
  { to: "/diary", labelKey: "diary", icon: CalendarDays },
  { to: "/notes", labelKey: "notes", icon: NotebookPen },
  { to: "/analytics", labelKey: "analytics", icon: ChartColumn },
  { to: "/files", labelKey: "files", icon: FolderOpen },
  { to: "/seva", labelKey: "seva", icon: Flame },
  { to: "/library", labelKey: "library", icon: BookOpen },
  { to: "/search", labelKey: "search", icon: Search },
  { to: "/settings", labelKey: "settings", icon: Settings },
];

const MOBILE_PRIMARY = ["/", "/diary", "/seva", "/files"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const ready = useApp((s) => s.ready);
  const init = useApp((s) => s.init);
  const welcome = useApp((s) => s.settings.hasSeenWelcome);
  const saveState = useApp((s) => s.saveState);
  const lang = useApp((s) => s.settings.language);
  const legacy = useApp((s) => s.legacyPrompt);
  const migrateLegacy = useApp((s) => s.migrateLegacy);
  const dismissLegacy = useApp((s) => s.dismissLegacy);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    void init();
  }, [init]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => useApp.getState().applyChrome();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const saveLabel = saveState === "saving" ? t("saving", lang) : `✓ ${t("saved", lang)}`;

  const items = useMemo(
    () =>
      NAV.map((n) => ({
        ...n,
        label: t(n.labelKey, lang),
        active: n.to === "/" ? pathname === "/" : pathname.startsWith(n.to),
      })),
    [lang, pathname],
  );

  if (!ready) return <BootScreen />;
  if (!welcome) return <WelcomeScreen />;

  return (
    <div className="min-h-dvh flex">
      <aside className="hidden lg:flex w-[248px] shrink-0 sticky top-0 h-dvh flex-col glass-card rounded-none border-y-0 border-l-0 p-4">
        <Brand />
        <nav className="mt-6 flex flex-col gap-1" aria-label="main">
          {items.map((n) => (
            <NavLink key={n.to} {...n} />
          ))}
        </nav>
        <div className="mt-auto pt-4 text-xs text-muted">
          <p className="m-0 font-semibold text-emerald tabular-nums">{saveLabel}</p>
          <p className="mt-2 mb-0">{FOOTER_VERSE}</p>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="lg:hidden sticky top-0 z-30 glass-card rounded-none border-x-0 border-t-0 px-3 py-2 flex items-center gap-2">
          <Button variant="quiet" size="icon" onClick={() => setOpen(true)} aria-label="menu">
            <Menu className="size-5" />
          </Button>
          <Brand compact />
          <span className="ml-auto text-xs text-emerald font-semibold">{saveLabel}</span>
        </header>

        {legacy ? (
          <div className="mx-3 mt-3 glass-card p-3 border border-gold/40">
            <p className="m-0 font-semibold">જૂનો ડેટા મળ્યો છે.</p>
            <p className="m-0 text-sm text-muted">શું તમે તેને નવા Database માં સાચવવા માંગો છો?</p>
            <div className="flex gap-2 mt-2">
              <Button size="sm" onClick={() => void migrateLegacy(legacy)}>
                {t("save", lang)}
              </Button>
              <Button size="sm" variant="ghost" onClick={dismissLegacy}>
                {t("cancel", lang)}
              </Button>
            </div>
          </div>
        ) : null}

        <main className="flex-1 p-3 sm:p-5 lg:p-6 safe-bottom lg:pb-6 page-enter">{children}</main>
      </div>

      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 z-30 glass-card rounded-none border-x-0 border-b-0 px-2 pt-1"
        style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}
        aria-label="bottom"
      >
        <div className="grid grid-cols-5 gap-1">
          {items
            .filter((n) => MOBILE_PRIMARY.includes(n.to) || n.to === "/settings")
            .slice(0, 4)
            .map((n) => (
              <NavLink key={n.to} {...n} compact />
            ))}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex flex-col items-center justify-center min-h-14 text-[11px] font-semibold text-muted"
          >
            <Menu className="size-5" />
            {t("more", lang)}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button className="absolute inset-0 bg-charcoal/40" aria-label="close" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[84%] max-w-sm glass-card rounded-none p-4 overflow-auto">
            <div className="flex items-center justify-between">
              <Brand />
              <Button variant="quiet" size="icon" onClick={() => setOpen(false)} aria-label={t("close", lang)}>
                <X />
              </Button>
            </div>
            <nav className="mt-5 flex flex-col gap-1">
              {items.map((n) => (
                <NavLink key={n.to} {...n} />
              ))}
            </nav>
          </div>
        </div>
      ) : null}

      <ConfirmDialog />
      <FileViewer />
    </div>
  );
}

function Brand({ compact }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <span className="grid place-items-center size-10 rounded-[12px] bg-royal text-gold font-display font-bold">
        ર
      </span>
      <div className={cn("min-w-0", compact && "hidden xs:block")}>
        <div className="font-display font-semibold leading-tight truncate">{APP_NAME}</div>
        <div className="text-[11px] text-muted truncate">{HUKAM}</div>
      </div>
    </div>
  );
}

function NavLink({
  to,
  label,
  icon: Icon,
  active,
  compact,
}: {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  active: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2.5 min-h-11 px-3 rounded-[12px] text-sm font-semibold transition-colors duration-150",
        compact && "flex-col justify-center gap-0.5 min-h-14 px-1 text-[11px]",
        active ? "bg-royal text-[#fff6ee]" : "text-muted hover:bg-primary/10 hover:text-fg",
      )}
      aria-current={active ? "page" : undefined}
    >
      <Icon className="size-5 shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  );
}
