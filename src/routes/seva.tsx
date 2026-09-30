import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { FileManager } from "@/components/file-manager";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass";
import { HUKAM } from "@/lib/constants";
import { t } from "@/lib/i18n";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/seva")({ component: SevaPage });

function SevaPage() {
  const lang = useApp((s) => s.settings.language);
  const seva = useApp((s) => s.seva);
  return (
    <div className="max-w-6xl mx-auto grid gap-4">
      <GlassCard>
        <p className="text-sm font-semibold text-gold m-0">{HUKAM}</p>
        <h1 className="text-2xl font-semibold mt-1 mb-2">શ્રી દેવદમન પ્રભુ સેવા</h1>
        <p className="text-muted m-0">
          આ વિભાગ દૈનિક રોજનિશીથી અલગ છે — સેવા પ્રણાલિકા, ફોટા, PDF અને ઉત્સવ અભિલેખ માટેનું અર્કાઇવ.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <Button asChild>
            <Link to="/library" search={{ id: undefined }}>
              <BookOpen className="size-4" /> {t("library", lang)}
            </Link>
          </Button>
          <span className="inline-flex items-center text-sm text-muted">
            {t("statsSeva", lang)}: {seva.length}
          </span>
        </div>
      </GlassCard>
      <FileManager space="seva" />
    </div>
  );
}
