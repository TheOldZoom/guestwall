import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  label: string;
  description?: string;
  children: ReactNode;
  className?: string;
  hideBottomBorder?: boolean;
}

export function Section({
  id,
  label,
  description,
  children,
  className = "",
  hideBottomBorder = false,
}: SectionProps) {
  return (
    <div
      id={id}
      className={[
        "py-6",
        !hideBottomBorder && "border-b border-border/40",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">{label}</p>
        {description && (
          <p className="mt-1.5 text-sm text-muted/80">{description}</p>
        )}
      </div>
      <div className="space-y-3 text-sm leading-relaxed text-foreground/90">
        {children}
      </div>
    </div>
  );
}
