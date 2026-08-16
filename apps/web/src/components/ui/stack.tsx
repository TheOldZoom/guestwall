import type { HTMLAttributes } from "react";
export function Stack({
  gap = "gap-4",
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { gap?: string }) {
  return <div className={["flex flex-col", gap, className].filter(Boolean).join(" ")} {...props} />;
}
