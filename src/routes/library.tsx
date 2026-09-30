import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { PranalikaEditor } from "@/components/pranalika-editor";
import { Button } from "@/components/ui/button";
import { EmptyState, GlassCard, SectionTitle } from "@/components/ui/glass";
import { SEVA_ROOT_ID } from "@/lib/constants";
import { t } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { keyOf, uid } from "@/lib/utils";
import type { SevaRecord } from "@/lib/types";

export const Route = createFileRoute("/library")({
  validateSearch: (search: Record<string, unknown>) => ({
    id: typeof search.id === "string" ? search.id : undefined,
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const { id } = Route.useSearch();
  const lang = useApp((s) => s.settings.language);
  const seva = useApp((s) => s.seva);
  const saveSeva = useApp((s) => s.saveSeva);
  const navigate = useNavigate({ from: "/library" });
  const selected = useMemo(() => seva.find((s) => s.id === id) ?? seva[0], [seva, id]);
  const [draft, setDraft] = useState<SevaRecord | undefined>(selected);

  useEffect(() => {
    setDraft(selected);
  }, [selected]);

  function createNew() {
    const rec: SevaRecord = {
      id: uid(),
      title: t("newPranalika", lang),
      category: "",
      folderId: SEVA_ROOT_ID,
      content: "",
      date: keyOf(new Date()),
      time: "",
      sequence: "",
      materials: "",
      notes: "",
      special: "",
      festival: "",
      attachments: [],
      kind: "pranalika",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    void saveSeva(rec).then(() => navigate({ search: { id: rec.id } }));
  }

  return (
    <div className="max-w-6xl mx-auto grid lg:grid-cols-[260px_1fr] gap-4 items-start">
      <GlassCard>
        <div className="flex items-center justify-between gap-2 mb-3">
          <SectionTitle className="mb-0">{t("library", lang)}</SectionTitle>
          <Button size="iconSm" variant="ghost" onClick={createNew} aria-label={t("newPranalika", lang)}>
            <Plus className="size-4" />
          </Button>
        </div>
        {seva.length === 0 ? <EmptyState title={t("noResults", lang)} /> : null}
        <ul className="m-0 p-0 list-none grid gap-1">
          {seva.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => void navigate({ search: { id: s.id } })}
                className={`w-full text-left rounded-[12px] px-3 py-2 min-h-11 ${
                  selected?.id === s.id ? "bg-royal text-[#fff6ee]" : "hover:bg-primary/10"
                }`}
              >
                <div className="font-semibold truncate">{s.title}</div>
                <div className="text-xs opacity-80 truncate">{s.time || s.kind}</div>
              </button>
            </li>
          ))}
        </ul>
      </GlassCard>
      {draft ? <PranalikaEditor rec={draft} onChange={setDraft} /> : <EmptyState title={t("noResults", lang)} />}
    </div>
  );
}
