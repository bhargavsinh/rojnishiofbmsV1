import { useEffect, useState } from "react";
import { X, Download, ZoomIn, ZoomOut } from "lucide-react";
import { useApp } from "@/lib/store";
import { t } from "@/lib/i18n";
import { Button } from "./ui/button";

export function FileViewer() {
  const viewer = useApp((s) => s.viewer);
  const close = useApp((s) => s.closeViewer);
  const fileUrl = useApp((s) => s.fileUrl);
  const files = useApp((s) => s.files);
  const lang = useApp((s) => s.settings.language);
  const [url, setUrl] = useState<string>();
  const [zoom, setZoom] = useState(1);

  const file = viewer.open ? files.find((f) => f.id === viewer.fileId) : undefined;

  useEffect(() => {
    if (!viewer.open) {
      setUrl(undefined);
      setZoom(1);
      return;
    }
    void fileUrl(viewer.fileId).then(setUrl);
  }, [viewer, fileUrl]);

  if (!viewer.open || !file) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-charcoal/80 backdrop-blur-md flex flex-col" role="dialog" aria-modal>
      <div className="no-print flex items-center gap-2 px-3 py-2 text-[#f6eef8]">
        <p className="flex-1 m-0 truncate font-medium">{file.name}</p>
        {file.type === "image" ? (
          <>
            <Button variant="quiet" size="iconSm" onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))} aria-label="zoom out">
              <ZoomOut className="size-4" />
            </Button>
            <Button variant="quiet" size="iconSm" onClick={() => setZoom((z) => Math.min(4, z + 0.25))} aria-label="zoom in">
              <ZoomIn className="size-4" />
            </Button>
          </>
        ) : null}
        {url ? (
          <a href={url} download={file.name} className="inline-flex">
            <Button variant="glass" size="sm">
              <Download className="size-4" /> {t("download", lang)}
            </Button>
          </a>
        ) : null}
        <Button variant="quiet" size="icon" onClick={close} aria-label={t("close", lang)}>
          <X className="size-5" />
        </Button>
      </div>
      <div className="flex-1 overflow-auto grid place-items-center p-3">
        {!url ? (
          <p className="text-[#f6eef8]">{t("saving", lang)}</p>
        ) : file.type === "image" ? (
          <img
            src={url}
            alt={file.name}
            className="max-w-none origin-center outline outline-1 -outline-offset-1 outline-white/10"
            style={{ transform: `scale(${zoom})`, maxHeight: zoom === 1 ? "90vh" : undefined }}
          />
        ) : file.type === "pdf" ? (
          <iframe title={file.name} src={url} className="w-full h-[88vh] rounded-xl bg-white" />
        ) : (
          <iframe title={file.name} src={url} className="w-full h-[88vh] rounded-xl bg-white" />
        )}
      </div>
    </div>
  );
}
