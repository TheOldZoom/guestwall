import type { ReactNode } from "react";
export function EmptyState({
  title,
  description,
  action,
  className = "",
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={["border border-dashed border-border/40 p-8 text-center", className]
        .filter(Boolean)
        .join(" ")}
    >
      <p className="text-[10px] uppercase tracking-[0.25em] text-foreground">{title}</p>
      {description && <p className="mt-2 text-sm text-muted">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
