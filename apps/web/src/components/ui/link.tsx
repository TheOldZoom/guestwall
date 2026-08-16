import NextLink from "next/link";
import type { ComponentProps } from "react";

export interface LinkProps extends ComponentProps<typeof NextLink> {
  className?: string;
}

export function Link({ className = "", ...props }: LinkProps) {
  return (
    <NextLink
      className={[
        "text-muted underline-offset-4 transition-colors duration-150 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/40",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
