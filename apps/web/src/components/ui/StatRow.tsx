import type { ReactNode } from "react";

interface StatRowProps {
  label: ReactNode;
  value: ReactNode;
  secondary?: ReactNode;
  className?: string;
}

export function StatRow({
  label,
  value,
  secondary,
  className = "",
}: StatRowProps) {
  return (
    <div
      className={["flex flex-col border-b border-border/30", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-center justify-between py-3">
        <p className="text-sm">{label}</p>
        <span className="text-xs text-muted font-mono">{value}</span>
      </div>
      {secondary ? (
        <p className="px-0 pb-3 text-xs text-muted">{secondary}</p>
      ) : null}
    </div>
  );
}
