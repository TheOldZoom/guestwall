import { CircleAlert, CircleCheck, Info } from "lucide-react";
import type { HTMLAttributes } from "react";
export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning";
}
export function Alert({ variant = "default", className = "", children, ...props }: AlertProps) {
  const Icon = variant === "success" ? CircleCheck : variant === "warning" ? CircleAlert : Info;
  return (
    <div
      role="alert"
      className={["flex gap-3 border border-border/40 p-3 text-sm text-foreground", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <Icon className="size-4 shrink-0 text-muted" aria-hidden="true" />
      {children}
    </div>
  );
}
export function AlertTitle({ className = "", ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={["text-[10px] uppercase tracking-[0.2em]", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
export function AlertDescription({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={["mt-1 text-sm text-muted", className].filter(Boolean).join(" ")} {...props} />
  );
}
