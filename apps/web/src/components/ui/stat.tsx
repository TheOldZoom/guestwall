import type { ReactNode } from "react";
export function Stat({
  label,
  value,
  change,
  className = "",
}: {
  label: ReactNode;
  value: ReactNode;
  change?: ReactNode;
  className?: string;
}) {
  return (
    <div className={["border-l border-border/40 pl-3", className].filter(Boolean).join(" ")}>
      <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{label}</p>
      <p className="mt-2 text-2xl tabular-nums">{value}</p>
      {change && <p className="mt-1 text-xs text-muted">{change}</p>}
    </div>
  );
}
