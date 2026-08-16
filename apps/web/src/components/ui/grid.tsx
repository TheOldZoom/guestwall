import type { HTMLAttributes } from "react";
export function Grid({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={["grid gap-4", className].filter(Boolean).join(" ")} {...props} />;
}
