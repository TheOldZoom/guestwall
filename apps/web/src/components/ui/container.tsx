import type { HTMLAttributes } from "react";
export function Container({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={["mx-auto w-full max-w-5xl px-6", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
