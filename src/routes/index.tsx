import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import {
  CalendarDays,
  Camera,
  FileUp,
  FileText,
  Flame,
  Plus,
  Search,
} from "lucide-react";
import { HUKAM, OWNER_LINE, FILES_ROOT_ID, SEVA_ROOT_ID } from "@/lib/constants";
import { formatDayTitle, gujaratiDate, maybeGu } from "@/lib/gujarati";
import { t } from "@/lib/i18n";
import { entriesFor, pillarName, useApp } from "@/lib/store";
import { IMAGE_ACCEPT, PDF_ACCEPT, FILE_ACCEPT, keyOf, uid } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GlassCard, SectionTitle } from "@/components/ui/glass";

export const Route = createFileRoute("/")({ component: Dashboard });

function Dashboard() {
  const lang = useApp((s) => s.settings.language);
  const entries = useApp((s) => s.entries);
  const days = useApp((s) => s.days);
  const seva = useApp((s) => s.seva);
  const files = useApp((s) => s.files);
  const categories = useApp((s) => s.categories);
  const addEntry = useApp((s) => s.addEntry);
  const uploadFiles = useApp((s) => s.uploadFiles);
  const saveSeva = useApp((s) => s.saveSeva);
  const navigate = useNavigate();
  const photoRef = useRef<HTMLInputElement>(null);
  const pdfRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const today = keyOf(new Date());
  const todayEntries = entriesFor(today, entries);
  const done = todayEntries.filter((e) => e.status === "done").length;
  const now = new Date();
  const monthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const gDate = gujaratiDate(now, lang);

  const stats = [
    { k: t("statsDays", lang), v: Object.keys(days).length },
    { k: t("statsEntries", lang), v: entries.length },
    { k: t("statsToday", lang), v: todayEntries.length },
    { k: t("statsMonth", lang), v: entries.filter((e) => e.date.startsWith(monthPrefix)).length },
    { k: t("statsSeva", lang), v: seva.length },
    { k: t("statsFiles", lang), v: files.length },
    { k: t("statsPhotos", lang), v: files.filter((f) => f.type === "image").length },
    { k: t("statsPdfs", lang), v: files.filter((f) => f.type === "pdf").length },
  ];

  return (
    <div className="max-w-6xl mx-auto grid gap-4">
      <GlassCard className="relative overflow-hidden">
        <div className="pop-orb w-32 h-32 bg-gold/30 -top-8 -right-6" />
        <p className="text-sm font-semibold text-gold m-0">{HUKAM}</p>
        <h1 className="font-display text-3xl font-semibold mt-1 mb-1">Rojnishi Of Bms</h1>
        <p className="text-muted m-0">{OWNER_LINE}</p>
        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          <div>
            <div className="text-xs uppercase tracking-wide text-muted">{t("todayPanel", lang)}</div>
            <div className="text-xl font-bold text-royal">{formatDayTitle(today, lang)}</div>
            <div className="text-sm">{gDate.label}</div>
          </div>
          <div>
            <div className="text-xs text-muted">{t("statsToday", lang)}</div>
            <div className="text-2xl font-semibold tabular-nums">{maybeGu(todayEntries.length, lang)}</div>
          </div>
          <div>
            <div className="text-xs text-muted">{t("completed", lang)}</div>
            <div className="text-2xl font-semibold tabular-nums">{maybeGu(done, lang)}</div>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <SectionTitle>{t("quick", lang)}</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Button
            onClick={() => {
              void addEntry(today).then(() => navigate({ to: "/diary", search: { date: today } }));
            }}
          >
            <Plus className="size-4" /> {t("newNote", lang)}
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              const rec = {
                id: uid(),
                title: "સેવા નોંધ",
                category: "અન્ય",
                folderId: SEVA_ROOT_ID,
                content: "",
                date: today,
                time: "",
                sequence: "",
                materials: "",
                notes: "",
                special: "",
                festival: "",
                attachments: [],
                kind: "record" as const,
                createdAt: Date.now(),
                updatedAt: Date.now(),
              };
              void saveSeva(rec).then(() => navigate({ to: "/library", search: { id: rec.id } }));
            }}
          >
            <Flame className="size-4" /> {t("sevaNote", lang)}
          </Button>
          <Button variant="ghost" onClick={() => fileRef.current?.click()}>
            <FileUp className="size-4" /> {t("uploadFile", lang)}
          </Button>
          <Button variant="ghost" onClick={() => photoRef.current?.click()}>
            <Camera className="size-4" /> {t("uploadPhoto", lang)}
          </Button>
          <Button variant="ghost" onClick={() => pdfRef.current?.click()}>
            <FileText className="size-4" /> {t("uploadPdf", lang)}
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/diary" search={{ date: undefined }}>
              <CalendarDays className="size-4" /> {t("calendar", lang)}
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/search">
              <Search className="size-4" /> {t("search", lang)}
            </Link>
          </Button>
        </div>
        <input ref={fileRef} type="file" multiple accept={FILE_ACCEPT} className="hidden" onChange={(e) => { if (e.target.files) void uploadFiles(Array.from(e.target.files), FILES_ROOT_ID); e.target.value=""; }} />
        <input ref={photoRef} type="file" multiple accept={IMAGE_ACCEPT} className="hidden" onChange={(e) => { if (e.target.files) void uploadFiles(Array.from(e.target.files), FILES_ROOT_ID); e.target.value=""; }} />
        <input ref={pdfRef} type="file" multiple accept={PDF_ACCEPT} className="hidden" onChange={(e) => { if (e.target.files) void uploadFiles(Array.from(e.target.files), FILES_ROOT_ID); e.target.value=""; }} />
      </GlassCard>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => (
          <GlassCard key={s.k} className="p-4">
            <div className="text-xs text-muted">{s.k}</div>
            <div className="text-2xl font-semibold tabular-nums mt-1">{maybeGu(s.v, lang)}</div>
          </GlassCard>
        ))}
      </div>

      <GlassCard>
        <SectionTitle>{t("todayPanel", lang)}</SectionTitle>
        {todayEntries.length === 0 ? (
          <p className="text-muted m-0">{t("noEntries", lang)}</p>
        ) : (
          <ul className="m-0 p-0 list-none grid gap-2">
            {todayEntries.map((e) => (
              <li key={e.id} className="flex gap-3 items-center rounded-[12px] bg-cream/60 px-3 py-2 border border-border">
                <span className="tabular-nums text-sm w-14">{e.time || "--:--"}</span>
                <span className={`flex-1 ${e.status === "done" ? "line-through opacity-70" : ""}`}>{e.description}</span>
                <span className="text-xs font-bold" style={{ color: "var(--royal)" }}>
                  {pillarName(e.pillar, categories, lang)}
                </span>
              </li>
            ))}
          </ul>
        )}
        {days[today]?.note ? (
          <p className="mt-3 mb-0 text-sm">
            <strong>{t("notes", lang)}:</strong> {days[today].note}
          </p>
        ) : null}
      </GlassCard>
    </div>
  );
}
