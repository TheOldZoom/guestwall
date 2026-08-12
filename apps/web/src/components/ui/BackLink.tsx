import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ComponentProps } from "react";

interface BackLinkProps extends ComponentProps<typeof Link> {
  label?: string;
}

export function BackLink({
  label = "Back",
  className = "",
  ...props
}: BackLinkProps) {
  return (
    <Link
      className={[
        "inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted hover:text-foreground transition-colors",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      {label}
    </Link>
  );
}
