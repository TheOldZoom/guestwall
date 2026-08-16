import type { HTMLAttributes, ReactNode } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  pulse?: boolean;
}

export function Skeleton({ pulse = true, className = "", ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={["bg-border/40", pulse && "animate-pulse", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export function SkeletonRow({ className = "" }: { className?: string }) {
  return (
    <div
      className={[
        "flex items-center justify-between gap-3 border-b border-border/30 py-3",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <div className="flex min-w-0 items-center gap-3">
        <Skeleton className="size-10 shrink-0" />
        <div className="min-w-0 space-y-1.5">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-2 w-20" />
        </div>
      </div>
      <Skeleton className="h-2 w-10 shrink-0" />
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
      {Array.from({ length: count }).map((_, index) =>
        children ? children(index) : <SkeletonRow key={index} />,
      )}
    </>
  );
}
