import { HUKAM, OWNER_LINE } from "@/lib/constants";
import { t } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { Button } from "./ui/button";

export function WelcomeScreen({ loading }: { loading?: boolean }) {
  const lang = useApp((s) => s.settings.language);
  const mark = useApp((s) => s.markWelcome);
  return (
    <div className="min-h-dvh relative overflow-hidden grid place-items-center p-6">
      <div className="pop-orb w-72 h-72 bg-primary/40 top-[-40px] left-[-40px]" />
      <div className="pop-orb w-80 h-80 bg-gold/35 bottom-[-60px] right-[-40px]" />
      <div className="pop-orb w-40 h-40 bg-royal/30 top-1/3 right-12" />
      <div className="relative w-full max-w-lg glass-card p-8 text-center">
        <p className="text-sm font-semibold text-gold m-0">{HUKAM}</p>
        <h1 className="font-display text-4xl font-semibold mt-3 mb-2 tracking-tight">
          Rojnishi Of Bms
        </h1>
        <p className="text-royal font-semibold m-0">{t("appName", lang)}</p>
        <p className="text-muted mt-4 mb-2">{t("welcomeBody", lang)}</p>
        <p className="text-sm text-muted">{OWNER_LINE}</p>
        {loading ? (
          <p className="mt-6 mb-0 font-semibold text-emerald">લોડ થઈ રહ્યું છે…</p>
        ) : (
          <Button className="mt-6 min-w-44" onClick={() => void mark()}>
            {t("start", lang)}
          </Button>
        )}
      </div>
    </div>
  );
}

export function BootScreen() {
  return <WelcomeScreen loading />;
}
