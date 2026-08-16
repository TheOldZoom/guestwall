import Link from "next/link";
import type { ComponentProps, HTMLAttributes, ReactNode } from "react";
export function Breadcrumb({ className = "", ...props }: HTMLAttributes<HTMLElement>) {
  return <nav aria-label="Breadcrumb" className={className} {...props} />;
}
export function BreadcrumbList({ className = "", ...props }: HTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      className={[
        "flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-muted",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
export function BreadcrumbItem({ className = "", ...props }: HTMLAttributes<HTMLLIElement>) {
  return (
    <li className={["flex items-center gap-2", className].filter(Boolean).join(" ")} {...props} />
  );
}
export function BreadcrumbLink({ className = "", ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={["transition-colors hover:text-foreground", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
export function BreadcrumbPage({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span aria-current="page" className={["text-foreground", className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}
export function BreadcrumbSeparator({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={["text-muted", className].filter(Boolean).join(" ")}>
      /
    </span>
  );
}
