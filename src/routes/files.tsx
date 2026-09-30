import { createFileRoute } from "@tanstack/react-router";
import { FileManager } from "@/components/file-manager";

export const Route = createFileRoute("/files")({ component: FilesPage });

function FilesPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <FileManager space="files" />
    </div>
  );
}
