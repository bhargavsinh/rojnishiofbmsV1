import { useRef } from "react";
import { Copy, Printer, Save, Trash2 } from "lucide-react";
import { t } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import type { SevaRecord } from "@/lib/types";
import { FILE_ACCEPT, downloadBlob } from "@/lib/utils";
import { Button } from "./ui/button";
import { GlassCard, SectionTitle } from "./ui/glass";

export function PranalikaEditor({
  rec,
  onChange,
}: {
  rec: SevaRecord;
  onChange: (next: SevaRecord) => void;
}) {
  const lang = useApp((s) => s.settings.language);
  const saveSeva = useApp((s) => s.saveSeva);
  const deleteSeva = useApp((s) => s.deleteSeva);
  const duplicateSeva = useApp((s) => s.duplicateSeva);
  const folders = useApp((s) => s.folders);
  const uploadFiles = useApp((s) => s.uploadFiles);
  const files = useApp((s) => s.files);
  const fileRef = useRef<HTMLInputElement>(null);
  const attached = files.filter((f) => rec.attachments.includes(f.id));

  function field<K extends keyof SevaRecord>(key: K, value: SevaRecord[K]) {
    onChange({ ...rec, [key]: value });
  }

  function printRec() {
    const w = window.open("", "_blank", "noopener,noreferrer");
    if (!w) return;
    const doc = w.document;
    doc.title = rec.title;
    const style = doc.createElement("style");
    style.textContent =
      "body{font-family:'Noto Sans Gujarati',sans-serif;padding:24px;color:#211a2b} h1{color:#8a1c1c} dt{font-weight:700;margin-top:12px} ";
    doc.head.appendChild(style);
    const h1 = doc.createElement("h1");
    h1.textContent = rec.title;
    doc.body.appendChild(h1);
    const rows: [string, string][] = [
      [t("time", lang), rec.time],
      [t("sequence", lang), rec.sequence],
      [t("procedure", lang), rec.content],
      [t("materials", lang), rec.materials],
      [t("special", lang), rec.special],
      [t("festival", lang), rec.festival],
      [t("notes", lang), rec.notes],
    ];
    const dl = doc.createElement("dl");
    for (const [k, v] of rows) {
      const dt = doc.createElement("dt");
      dt.textContent = k;
      const dd = doc.createElement("dd");
      dd.textContent = v || "—";
      dl.append(dt, dd);
    }
    doc.body.appendChild(dl);
    w.focus();
    w.print();
  }

  return (
    <GlassCard>
      <SectionTitle>{t("library", lang)}</SectionTitle>
      <div className="grid gap-3">
        <label className="text-sm font-semibold">
          {t("sevaName", lang)}
          <input
            className="mt-1 w-full min-h-11 rounded-[12px] border border-border bg-cream/70 px-3"
            value={rec.title}
            onChange={(e) => field("title", e.target.value)}
          />
        </label>
        <div className="grid sm:grid-cols-3 gap-3">
          <label className="text-sm font-semibold">
            {t("time", lang)}
            <input
              type="time"
              className="mt-1 w-full min-h-11 rounded-[12px] border border-border bg-cream/70 px-3"
              value={rec.time}
              onChange={(e) => field("time", e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold">
            {t("sequence", lang)}
            <input
              className="mt-1 w-full min-h-11 rounded-[12px] border border-border bg-cream/70 px-3"
              value={rec.sequence}
              onChange={(e) => field("sequence", e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold">
            {t("folder", lang)}
            <select
              className="mt-1 w-full min-h-11 rounded-[12px] border border-border bg-cream/70 px-3"
              value={rec.folderId}
              onChange={(e) => field("folderId", e.target.value)}
            >
              {folders
                .filter((f) => f.space === "seva")
                .map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <label className="text-sm font-semibold">
          {t("procedure", lang)}
          <textarea
            className="mt-1 w-full min-h-36 rounded-[14px] border border-border bg-cream/70 p-3"
            value={rec.content}
            onChange={(e) => field("content", e.target.value)}
          />
        </label>
        <label className="text-sm font-semibold">
          {t("materials", lang)}
          <textarea
            className="mt-1 w-full min-h-20 rounded-[14px] border border-border bg-cream/70 p-3"
            value={rec.materials}
            onChange={(e) => field("materials", e.target.value)}
          />
        </label>
        <label className="text-sm font-semibold">
          {t("special", lang)}
          <textarea
            className="mt-1 w-full min-h-16 rounded-[14px] border border-border bg-cream/70 p-3"
            value={rec.special}
            onChange={(e) => field("special", e.target.value)}
          />
        </label>
        <label className="text-sm font-semibold">
          {t("festival", lang)}
          <textarea
            className="mt-1 w-full min-h-16 rounded-[14px] border border-border bg-cream/70 p-3"
            value={rec.festival}
            onChange={(e) => field("festival", e.target.value)}
          />
        </label>
        <label className="text-sm font-semibold">
          {t("notes", lang)}
          <textarea
            className="mt-1 w-full min-h-16 rounded-[14px] border border-border bg-cream/70 p-3"
            value={rec.notes}
            onChange={(e) => field("notes", e.target.value)}
          />
        </label>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        <Button onClick={() => void saveSeva(rec)}>
          <Save className="size-4" /> {t("save", lang)}
        </Button>
        <Button variant="ghost" onClick={() => void duplicateSeva(rec.id)}>
          <Copy className="size-4" /> {t("duplicate", lang)}
        </Button>
        <Button variant="ghost" onClick={printRec}>
          <Printer className="size-4" /> {t("print", lang)} / {t("exportPdf", lang)}
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            const blob = new Blob([JSON.stringify(rec, null, 2)], { type: "application/json" });
            downloadBlob(blob, `${rec.title || "seva"}.json`);
          }}
        >
          {t("exportJson", lang)}
        </Button>
        <Button variant="ghost" onClick={() => fileRef.current?.click()}>
          {t("attach", lang)}
        </Button>
        <Button variant="danger" onClick={() => void deleteSeva(rec.id)}>
          <Trash2 className="size-4" /> {t("delete", lang)}
        </Button>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept={FILE_ACCEPT}
          className="hidden"
          onChange={(e) => {
            const list = e.target.files;
            if (!list?.length) return;
            void uploadFiles(Array.from(list), rec.folderId, { linkedSevaId: rec.id }).then((saved) => {
              if (saved.length) onChange({ ...rec, attachments: [...rec.attachments, ...saved.map((f) => f.id)] });
            });
            e.target.value = "";
          }}
        />
      </div>
      {attached.length ? (
        <ul className="mt-3 pl-5">
          {attached.map((f) => (
            <li key={f.id}>
              <button type="button" className="underline text-electric" onClick={() => useApp.getState().openViewer(f.id)}>
                {f.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </GlassCard>
  );
}
