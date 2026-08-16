import { CircleAlert } from "lucide-react";
import type { ReactNode } from "react";
export function ErrorState({
  title = "Something went wrong",
  description,
  action,
  className = "",
}: {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={["border border-border/40 p-5", className].filter(Boolean).join(" ")}
    >
      <CircleAlert className="size-4 text-muted" aria-hidden="true" />
      <p className="mt-3 text-[10px] uppercase tracking-[0.2em]">{title}</p>
      {description && <p className="mt-2 text-sm text-muted">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
