import type { HTMLAttributes, ReactNode } from "react";
export function Sidebar({ className = "", ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <aside
      className={["border-r border-border/40", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
export function SidebarHeader({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={["border-b border-border/40 p-4", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
export function SidebarContent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={["p-3", className].filter(Boolean).join(" ")}>{children}</div>;
}
export function SidebarFooter({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={["mt-auto border-t border-border/40 p-4", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
