import type { ReactNode } from "react";

interface SectionHeaderProps {
  label: string;
  sublabel?: string;
  actionLabel?: string;
  actionHref?: string;
  actionExternal?: boolean;
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({
  label,
  sublabel,
  actionLabel,
  actionHref,
  actionExternal = false,
  action,
  className = "",
}: SectionHeaderProps) {
  const actionNode =
    action ??
    (actionLabel && actionHref ? (
      <a
        href={actionHref}
        target={actionExternal ? "_blank" : undefined}
        rel={actionExternal ? "noopener noreferrer" : undefined}
        className="text-[10px] uppercase tracking-[0.15em] text-muted hover:text-foreground transition"
      >
        {actionLabel}
      </a>
    ) : null);

  return (
    <div
      className={["flex items-end justify-between mb-8 gap-4", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted">{label}</p>
        {sublabel && <p className="mt-2 text-xs text-muted">{sublabel}</p>}
      </div>
      {actionNode}
    </div>
  );
}

export function SectionColumnLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={[
        "text-[10px] uppercase tracking-[0.2em] text-muted mb-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  );
}
