import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
export function Pagination({ className = "", ...props }: HTMLAttributes<HTMLElement>) {
  return <nav aria-label="Pagination" className={className} {...props} />;
}
export function PaginationContent({ className = "", ...props }: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={["flex items-center gap-1", className].filter(Boolean).join(" ")} {...props} />
  );
}
export function PaginationItem({ className = "", ...props }: HTMLAttributes<HTMLLIElement>) {
  return <li className={className} {...props} />;
}
export function PaginationLink({
  active = false,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      className={[
        "flex size-8 items-center justify-center border text-[10px] transition-colors",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border/40 bg-background text-muted hover:border-foreground hover:text-foreground",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
export function PaginationEllipsis({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={["flex size-8 items-center justify-center text-muted", className]
        .filter(Boolean)
        .join(" ")}
    >
      …
    </span>
  );
}
