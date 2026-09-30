import { useMemo, useRef, useState } from "react";
import {
  File as FileIcon,
  FileText,
  Folder,
  Grid3x3,
  Image as ImageIcon,
  List,
  Plus,
  Search,
  Upload,
} from "lucide-react";
import { t } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { formatBytes, FILE_ACCEPT, IMAGE_ACCEPT, PDF_ACCEPT } from "@/lib/utils";
import { FILES_ROOT_ID, SEVA_ROOT_ID } from "@/lib/constants";
import type { FileMeta, Folder as FolderT, FolderSpace } from "@/lib/types";
import { maybeGu } from "@/lib/gujarati";
import { Button } from "./ui/button";
import { EmptyState, GlassCard, SectionTitle } from "./ui/glass";

export function FileManager({ space }: { space: FolderSpace }) {
  const lang = useApp((s) => s.settings.language);
  const folders = useApp((s) => s.folders);
  const files = useApp((s) => s.files);
  const createFolder = useApp((s) => s.createFolder);
  const renameFolder = useApp((s) => s.renameFolder);
  const deleteFolder = useApp((s) => s.deleteFolder);
  const uploadFiles = useApp((s) => s.uploadFiles);
  const renameFile = useApp((s) => s.renameFile);
  const moveFile = useApp((s) => s.moveFile);
  const deleteFile = useApp((s) => s.deleteFile);
  const openViewer = useApp((s) => s.openViewer);
  const rootId = space === "seva" ? SEVA_ROOT_ID : FILES_ROOT_ID;
  const [folderId, setFolderId] = useState(rootId);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"name" | "date" | "type" | "size">("date");
  const [grid, setGrid] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const pdfRef = useRef<HTMLInputElement>(null);

  const current = folders.find((f) => f.id === folderId) ?? folders.find((f) => f.id === rootId);
  const crumbs = useMemo(() => {
    const out: FolderT[] = [];
    let id: string | null = folderId;
    const guard = new Set<string>();
    while (id && !guard.has(id)) {
      guard.add(id);
      const f = folders.find((x) => x.id === id);
      if (!f) break;
      out.unshift(f);
      id = f.parentId;
    }
    return out;
  }, [folderId, folders]);

  const childFolders = folders
    .filter((f) => f.parentId === folderId && f.space === space)
    .filter((f) => !q || f.name.toLowerCase().includes(q.toLowerCase()));
  const childFiles = files
    .filter((f) => (q ? f.name.toLowerCase().includes(q.toLowerCase()) : f.folderId === folderId))
    .slice()
    .sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "type") return a.type.localeCompare(b.type);
      if (sort === "size") return b.size - a.size;
      return b.createdAt - a.createdAt;
    });

  function onUpload(list: FileList | null) {
    if (!list?.length) return;
    void uploadFiles(Array.from(list), folderId);
  }

  return (
    <GlassCard>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <SectionTitle className="mb-0">{space === "seva" ? t("seva", lang) : t("files", lang)}</SectionTitle>
        <div className="flex gap-1">
          <Button variant="quiet" size="iconSm" onClick={() => setGrid(true)} aria-pressed={grid}>
            <Grid3x3 className="size-4" />
          </Button>
          <Button variant="quiet" size="iconSm" onClick={() => setGrid(false)} aria-pressed={!grid}>
            <List className="size-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 text-sm mb-3">
        {crumbs.map((c, i) => (
          <span key={c.id} className="flex items-center gap-1">
            {i > 0 ? <span className="text-muted">/</span> : null}
            <button type="button" className="font-semibold text-royal" onClick={() => setFolderId(c.id)}>
              {c.name}
            </button>
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <label className="relative flex-1 min-w-40">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("searchPlaceholder", lang)}
            className="w-full min-h-11 rounded-[12px] border border-border bg-cream/70 pl-9 pr-3"
          />
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="min-h-11 rounded-[12px] border border-border bg-cream/70 px-3"
        >
          <option value="name">{t("sortName", lang)}</option>
          <option value="date">{t("sortDate", lang)}</option>
          <option value="type">{t("sortType", lang)}</option>
          <option value="size">{t("sortSize", lang)}</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            const name = window.prompt(t("createFolder", lang));
            if (name?.trim()) void createFolder(name.trim(), folderId, space);
          }}
        >
          <Plus className="size-4" /> {t("createFolder", lang)}
        </Button>
        <Button size="sm" onClick={() => fileRef.current?.click()}>
          <Upload className="size-4" /> {t("uploadFile", lang)}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => photoRef.current?.click()}>
          {t("uploadPhoto", lang)}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => pdfRef.current?.click()}>
          {t("uploadPdf", lang)}
        </Button>
        <input ref={fileRef} type="file" multiple accept={FILE_ACCEPT} className="hidden" onChange={(e) => { onUpload(e.target.files); e.target.value = ""; }} />
        <input ref={photoRef} type="file" multiple accept={IMAGE_ACCEPT} className="hidden" onChange={(e) => { onUpload(e.target.files); e.target.value = ""; }} />
        <input ref={pdfRef} type="file" multiple accept={PDF_ACCEPT} className="hidden" onChange={(e) => { onUpload(e.target.files); e.target.value = ""; }} />
      </div>

      {childFolders.length === 0 && childFiles.length === 0 ? (
        <EmptyState title={t("emptyFolder", lang)} />
      ) : (
        <div className={grid ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2" : "flex flex-col gap-2"}>
          {childFolders.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFolderId(f.id)}
              onContextMenu={(e) => {
                e.preventDefault();
                const act = window.prompt(`${t("rename", lang)} / ${t("delete", lang)} (r/d)`, "r");
                if (act === "d") void deleteFolder(f.id);
                if (act === "r") {
                  const n = window.prompt(t("rename", lang), f.name);
                  if (n?.trim()) void renameFolder(f.id, n.trim());
                }
              }}
              className="glass-thin rounded-[16px] p-3 text-left min-h-24 tap"
            >
              <Folder className="size-7 text-gold" />
              <div className="mt-2 font-semibold truncate">{f.name}</div>
              <div className="text-xs text-muted">{t("folder", lang)}</div>
            </button>
          ))}
          {childFiles.map((f) => (
            <FileCard
              key={f.id}
              file={f}
              grid={grid}
              onOpen={() => openViewer(f.id)}
              onRename={() => {
                const n = window.prompt(t("rename", lang), f.name);
                if (n?.trim()) void renameFile(f.id, n.trim());
              }}
              onDelete={() => void deleteFile(f.id)}
              onMove={() => {
                const dest = window.prompt(t("move", lang), folderId);
                if (dest) void moveFile(f.id, dest);
              }}
              folders={folders.filter((x) => x.space === space)}
            />
          ))}
        </div>
      )}

      {current && current.id !== rootId ? (
        <p className="text-xs text-muted mt-3 m-0">
          {lang === "gu" ? "લાંબા ટેપ / રાઈટ-ક્લિકથી નામ બદલો કે ભૂંસો." : "Long-press or right-click to rename or delete."}
        </p>
      ) : null}

      <MoveBar
        folders={folders.filter((x) => x.space === space)}
        onMove={(id, dest) => void moveFile(id, dest)}
        files={childFiles}
      />
    </GlassCard>
  );
}

function FileCard({
  file,
  grid,
  onOpen,
  onRename,
  onDelete,
  onMove,
}: {
  file: FileMeta;
  grid: boolean;
  onOpen: () => void;
  onRename: () => void;
  onDelete: () => void;
  onMove: () => void;
  folders: FolderT[];
}) {
  const Icon = file.type === "image" ? ImageIcon : file.type === "pdf" ? FileText : FileIcon;
  const lang = useApp((s) => s.settings.language);
  return (
    <article className={grid ? "glass-thin rounded-[16px] p-3 min-h-24" : "glass-thin rounded-[14px] p-3 flex items-center gap-3"}>
      <button type="button" onClick={onOpen} className={grid ? "text-left w-full" : "flex items-center gap-3 flex-1 min-w-0 text-left"}>
        <Icon className="size-7 text-primary" />
        <div className={grid ? "mt-2" : ""}>
          <div className="font-semibold truncate">{file.name}</div>
          <div className="text-xs text-muted">
            {file.type.toUpperCase()} · {formatBytes(file.size)} · {maybeGu(new Date(file.createdAt).toLocaleDateString(), lang)}
          </div>
        </div>
      </button>
      <div className="flex flex-wrap gap-1 mt-2">
        <Button variant="quiet" size="sm" onClick={onOpen}>{t("open", lang)}</Button>
        <Button variant="quiet" size="sm" onClick={onRename}>{t("rename", lang)}</Button>
        <Button variant="quiet" size="sm" onClick={onMove}>{t("move", lang)}</Button>
        <Button variant="quiet" size="sm" onClick={onDelete}>{t("delete", lang)}</Button>
      </div>
    </article>
  );
}

function MoveBar({
  folders,
  files,
}: {
  folders: FolderT[];
  files: FileMeta[];
  onMove: (id: string, dest: string) => void;
}) {
  const lang = useApp((s) => s.settings.language);
  const moveFile = useApp((s) => s.moveFile);
  const [fileId, setFileId] = useState("");
  const [dest, setDest] = useState(folders[0]?.id ?? "");
  if (!files.length) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-2 items-end">
      <label className="text-sm">
        <span className="block text-muted mb-1">{t("move", lang)}</span>
        <select className="min-h-11 rounded-[10px] border border-border px-2" value={fileId} onChange={(e) => setFileId(e.target.value)}>
          <option value="">—</option>
          {files.map((f) => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>
      </label>
      <select className="min-h-11 rounded-[10px] border border-border px-2" value={dest} onChange={(e) => setDest(e.target.value)}>
        {folders.map((f) => (
          <option key={f.id} value={f.id}>{f.name}</option>
        ))}
      </select>
      <Button
        variant="ghost"
        disabled={!fileId || !dest}
        onClick={() => {
          if (fileId && dest) void moveFile(fileId, dest);
        }}
      >
        {t("move", lang)}
      </Button>
    </div>
  );
}
