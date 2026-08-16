import type { HTMLAttributes, ReactNode } from "react";
export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}
export function InputGroup({ className = "", ...props }: InputGroupProps) {
  return (
    <div
      className={[
        "flex items-stretch border border-border/40 focus-within:border-foreground",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
export function InputGroupAddon({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={["flex items-center border-r border-border/40 px-3 text-muted", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
