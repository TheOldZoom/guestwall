import type { HTMLAttributes } from "react";
export function List({ className = "", ...props }: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={["divide-y divide-border/40 border-y border-border/40", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
export function ListItem({ className = "", ...props }: HTMLAttributes<HTMLLIElement>) {
  return <li className={["px-3 py-3 text-sm", className].filter(Boolean).join(" ")} {...props} />;
}
