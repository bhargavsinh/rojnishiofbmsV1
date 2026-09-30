import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { APP_NAME } from "@/lib/constants";
import { t } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { APP_VERSION, DB_VERSION } from "@/lib/types";
import { downloadBlob, formatBytes } from "@/lib/utils";
import { maybeGu } from "@/lib/gujarati";
import { Button } from "@/components/ui/button";
import { GlassCard, SectionTitle } from "@/components/ui/glass";
import type { Appearance, Language, ThemeId } from "@/lib/types";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  const lang = useApp((s) => s.settings.language);
  const settings = useApp((s) => s.settings);
  const updateSettings = useApp((s) => s.updateSettings);
  const exportBackup = useApp((s) => s.exportBackup);
  const importBackup = useApp((s) => s.importBackup);
  const wipeAll = useApp((s) => s.wipeAll);
  const addCategory = useApp((s) => s.addCategory);
  const days = useApp((s) => s.days);
  const entries = useApp((s) => s.entries);
  const seva = useApp((s) => s.seva);
  const files = useApp((s) => s.files);
  const [io, setIo] = useState("");
  const [includeFiles, setIncludeFiles] = useState(false);
  const [storage, setStorage] = useState<{ used: number; quota: number } | null>(null);
  const [standalone, setStandalone] = useState(false);

  useEffect(() => {
    setStandalone(window.matchMedia("(display-mode: standalone)").matches);
    if (navigator.storage?.estimate) {
      void navigator.storage.estimate().then((e) => {
        setStorage({ used: e.usage ?? 0, quota: e.quota ?? 0 });
      });
    }
  }, [files.length, entries.length]);

  async function doExport() {
    const payload = await exportBackup(includeFiles);
    const txt = JSON.stringify(payload, null, 2);
    setIo(txt);
    downloadBlob(new Blob([txt], { type: "application/json" }), `rojnishi-backup-${new Date().toISOString().slice(0, 10)}.json`);
    try {
      await navigator.clipboard.writeText(txt);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="max-w-3xl mx-auto grid gap-4">
      <GlassCard>
        <SectionTitle>{t("appearance", lang)}</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {(["light", "dark", "auto"] as Appearance[]).map((a) => (
            <Button key={a} variant={settings.appearance === a ? "primary" : "ghost"} onClick={() => void updateSettings({ appearance: a })}>
              {t(a, lang)}
            </Button>
          ))}
        </div>
        <div className="mt-4 text-sm font-semibold">{t("theme", lang)}</div>
        <div className="flex flex-wrap gap-2 mt-2">
          {(["pop-glass", "royal", "minimal"] as ThemeId[]).map((th) => (
            <Button key={th} variant={settings.theme === th ? "gold" : "ghost"} onClick={() => void updateSettings({ theme: th })}>
              {th === "pop-glass" ? t("popGlass", lang) : th === "royal" ? t("royal", lang) : t("minimal", lang)}
            </Button>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <SectionTitle>{t("language", lang)}</SectionTitle>
        <div className="flex gap-2">
          {(["gu", "en"] as Language[]).map((l) => (
            <Button key={l} variant={settings.language === l ? "primary" : "ghost"} onClick={() => void updateSettings({ language: l })}>
              {l === "gu" ? t("gujarati", lang) : t("english", lang)}
            </Button>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <SectionTitle>{t("customCategory", lang)}</SectionTitle>
        <form
          className="flex flex-wrap gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const name = String(fd.get("name") || "").trim();
            const color = String(fd.get("color") || "#64748b");
            if (name) void addCategory(name, color);
            e.currentTarget.reset();
          }}
        >
          <input name="name" required placeholder={t("customCategory", lang)} className="flex-1 min-h-11 rounded-[12px] border border-border px-3" />
          <input name="color" type="color" defaultValue="#7c3aed" className="size-11 rounded-[10px]" />
          <Button type="submit">{t("save", lang)}</Button>
        </form>
      </GlassCard>

      <GlassCard>
        <SectionTitle>{t("data", lang)}</SectionTitle>
        <label className="flex items-center gap-2 min-h-11">
          <input type="checkbox" checked={includeFiles} onChange={(e) => setIncludeFiles(e.target.checked)} />
          {t("includeFiles", lang)}
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          <Button onClick={() => void doExport()}>{t("export", lang)} / {t("copy", lang)}</Button>
          <Button variant="ghost" onClick={() => { const p = useApp.getState().exportBackup(false); void p.then((x) => setIo(JSON.stringify(x, null, 2))); }}>
            {t("showData", lang)}
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              if (!io.trim()) return;
              try {
                void importBackup(JSON.parse(io), "merge");
              } catch {
                setIo("JSON માન્ય નથી.");
              }
            }}
          >
            {t("merge", lang)}
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              if (!io.trim()) return;
              try {
                void importBackup(JSON.parse(io), "replace");
              } catch {
                setIo("JSON માન્ય નથી.");
              }
            }}
          >
            {t("replace", lang)}
          </Button>
          <Button variant="danger" onClick={() => void wipeAll()}>{t("wipe", lang)}</Button>
        </div>
        <textarea
          className="mt-3 w-full min-h-32 rounded-[14px] border border-border bg-cream/70 p-3 font-mono text-xs"
          value={io}
          onChange={(e) => setIo(e.target.value)}
          placeholder={t("searchPlaceholder", lang)}
        />
      </GlassCard>

      <GlassCard>
        <SectionTitle>{t("storage", lang)}</SectionTitle>
        <ul className="m-0 p-0 list-none text-sm grid gap-1">
          <li>{t("dbActive", lang)}</li>
          <li>
            {t("used", lang)}: {storage ? formatBytes(storage.used) : "—"}
            {storage?.quota ? ` / ${formatBytes(storage.quota)}` : ""}
          </li>
          <li>{t("statsDays", lang)}: {maybeGu(Object.keys(days).length, lang)}</li>
          <li>{t("statsEntries", lang)}: {maybeGu(entries.length, lang)}</li>
          <li>{t("statsSeva", lang)}: {maybeGu(seva.length, lang)}</li>
          <li>{t("statsFiles", lang)}: {maybeGu(files.length, lang)}</li>
          <li>{t("statsPhotos", lang)}: {maybeGu(files.filter((f) => f.type === "image").length, lang)}</li>
          <li>{t("statsPdfs", lang)}: {maybeGu(files.filter((f) => f.type === "pdf").length, lang)}</li>
        </ul>
      </GlassCard>

      <GlassCard>
        <SectionTitle>{t("application", lang)}</SectionTitle>
        <p className="m-0 text-sm">
          {APP_NAME} · v{APP_VERSION} · DB {DB_VERSION}
        </p>
        <p className="text-sm text-muted">
          PWA: {standalone ? t("active", lang) : t("installHint", lang)}
        </p>
        <p className="text-sm">{t("offline", lang)}</p>
      </GlassCard>
    </div>
  );
}
