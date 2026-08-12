import type { ReactNode } from "react";

interface SkeletonBoxProps {
  className?: string;
  width?: string;
  height?: string;
  pulse?: boolean;
}

export function SkeletonBox({
  className = "",
  width,
  height,
  pulse = true,
}: SkeletonBoxProps) {
  return (
    <div
      className={["bg-border/40", pulse && "animate-pulse", className]
        .filter(Boolean)
        .join(" ")}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

export function SkeletonRow({ className = "" }: { className?: string }) {
  return (
    <div
      className={[
        "flex items-center justify-between py-3 border-b border-border/30 gap-3",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <div className="flex items-center gap-3 min-w-0">
        <SkeletonBox className="w-10 h-10 shrink-0" />
        <div className="space-y-1.5 min-w-0">
          <SkeletonBox className="h-3 w-32" />
          <SkeletonBox className="h-2 w-20" />
        </div>
      </div>
      <SkeletonBox className="h-2 w-10 shrink-0" />
    </div>
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={["border border-border/40 p-4 flex flex-col gap-4", className]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <div className="flex justify-between items-start gap-3">
        <SkeletonBox className="h-4 w-2/3" />
        <SkeletonBox className="h-4 w-8" />
      </div>
      <SkeletonBox className="h-3 w-full" />
      <SkeletonBox className="h-3 w-1/2" />
      <div className="flex items-center gap-3 pt-1">
        <SkeletonBox className="h-3 w-16" />
        <SkeletonBox className="h-3 w-12" />
      </div>
    </div>
  );
}

export function SkeletonSummaryRow({ className = "" }: { className?: string }) {
  return (
    <div
      className={[
        "flex items-center justify-between py-3 border-b border-border/30 gap-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <SkeletonBox className="h-3 w-32" />
      <SkeletonBox className="h-3 w-16" />
    </div>
  );
}

export function SkeletonRows({
  count,
  children,
}: {
  count: number;
  children?: (index: number) => ReactNode;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) =>
        children ? children(i) : <SkeletonRow key={i} />,
      )}
    </>
  );
}
