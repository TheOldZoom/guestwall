"use client";

import type { ReactNode } from "react";

interface Tab<T extends string> {
  id: T;
  label: string;
}

interface TabBarProps<T extends string> {
  tabs: readonly Tab<T>[];
  active: T;
  onSelect: (id: T) => void;
  className?: string;
  buttonClassName?: string;
  mobileOnly?: boolean;
}

export function TabBar<T extends string>({
  tabs,
  active,
  onSelect,
  className = "",
  buttonClassName = "",
  mobileOnly = false,
}: TabBarProps<T>) {
  return (
    <div
      className={[
        "flex flex-wrap gap-2",
        mobileOnly ? "lg:hidden" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id)}
          className={[
            "text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 border transition-colors",
            active === id
              ? "bg-foreground text-background border-foreground"
              : "border-border/60 text-muted hover:border-foreground hover:text-foreground",
            buttonClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function TabPanel({
  id,
  active,
  children,
  className = "",
}: {
  id: string;
  active: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[id !== active ? "hidden lg:block" : "", "min-w-0", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
