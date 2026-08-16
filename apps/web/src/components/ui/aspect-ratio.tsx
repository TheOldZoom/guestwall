import type { CSSProperties, HTMLAttributes } from "react";
export function AspectRatio({
  ratio = 1,
  className = "",
  style,
  ...props
}: HTMLAttributes<HTMLDivElement> & { ratio?: number }) {
  return (
    <div
      className={["overflow-hidden", className].filter(Boolean).join(" ")}
      style={{ aspectRatio: String(ratio), ...style } as CSSProperties}
      {...props}
    />
  );
}
