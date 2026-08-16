import type { HTMLAttributes, ReactNode } from "react";
export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={["border border-border/40 bg-transparent", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
export function CardHeader({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={["border-b border-border/40 p-5", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
export function CardTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3 className={["text-sm font-medium", className].filter(Boolean).join(" ")}>{children}</h3>
  );
}
export function CardDescription({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={["mt-1 text-sm text-muted", className].filter(Boolean).join(" ")}>{children}</p>
  );
}
export function CardContent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={["p-5 sm:p-6", className].filter(Boolean).join(" ")}>{children}</div>;
}
export function CardFooter({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={["flex items-center border-t border-border/40 px-5 py-4", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
