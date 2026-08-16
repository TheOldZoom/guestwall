import type { HTMLAttributes } from "react";

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  className?: string;
}

export function Kbd({ className = "", ...props }: KbdProps) {
  return (
    <kbd
      className={[
        "inline-flex min-h-5 items-center border border-border/40 px-1 font-mono text-[10px] text-muted",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
