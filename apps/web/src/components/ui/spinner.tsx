import { LoaderCircle } from "lucide-react";
import type { ComponentProps } from "react";

export interface SpinnerProps extends ComponentProps<typeof LoaderCircle> {
  className?: string;
}

export function Spinner({
  className = "",
  "aria-label": ariaLabel = "Loading",
  ...props
}: SpinnerProps) {
  return (
    <LoaderCircle
      role="status"
      aria-label={ariaLabel}
      className={["size-4 animate-spin text-muted", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
