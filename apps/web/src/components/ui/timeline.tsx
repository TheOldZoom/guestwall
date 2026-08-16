import type { HTMLAttributes } from "react";
export function Timeline({ className = "", ...props }: HTMLAttributes<HTMLOListElement>) {
  return (
    <ol className={["border-l border-border/40", className].filter(Boolean).join(" ")} {...props} />
  );
}
export function TimelineItem({ className = "", ...props }: HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      className={[
        "relative pl-5 pb-5 before:absolute before:-left-px before:top-1 before:size-2 before:-translate-x-1/2 before:bg-foreground",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
