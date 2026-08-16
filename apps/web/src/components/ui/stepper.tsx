import type { HTMLAttributes, ReactNode } from "react";
export function Stepper({ className = "", ...props }: HTMLAttributes<HTMLOListElement>) {
  return (
    <ol className={["flex items-center gap-3", className].filter(Boolean).join(" ")} {...props} />
  );
}
export function Step({
  active = false,
  complete = false,
  children,
  className = "",
}: {
  active?: boolean;
  complete?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <li
      className={[
        "flex items-center gap-2 text-[10px] uppercase tracking-[0.15em]",
        active || complete ? "text-foreground" : "text-muted",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        className={[
          "flex size-5 items-center justify-center border",
          active || complete
            ? "border-foreground bg-foreground text-background"
            : "border-border/40",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {complete ? "✓" : null}
      </span>
      {children}
    </li>
  );
}
