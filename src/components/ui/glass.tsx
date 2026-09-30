import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("glass-card p-4 sm:p-5", className)} {...props} />;
}

export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "flex items-center gap-2.5 text-base font-semibold text-fg m-0 mb-3",
        className,
      )}
    >
      <span className="inline-block w-1.5 h-4 rounded-sm bg-royal" aria-hidden />
      {children}
    </h2>
  );
}

export function EmptyState({
  title,
  hint,
}: {
  title: string;
  hint?: string;
}) {
  return (
    <div className="rounded-[14px] border border-dashed border-border bg-cream/50 px-4 py-8 text-center">
      <p className="m-0 font-semibold">{title}</p>
      {hint ? <p className="m-0 mt-1 text-sm text-muted">{hint}</p> : null}
    </div>
  );
}
