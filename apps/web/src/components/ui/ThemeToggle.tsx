"use client";

import * as React from "react";
import { useTheme } from "next-themes";

const LABELS: Record<"light" | "dark", string> = {
  light: "Light",
  dark: "Dark",
};

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[22px] w-[58px]" aria-hidden="true" />;
  }

  const current = theme === "dark" ? "dark" : "light";
  const cycle = () => setTheme(current === "light" ? "dark" : "light");

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${LABELS[current]}. Click to change.`}
      className={[
        "text-[10px] uppercase tracking-[0.15em] px-3 py-1 border border-border/40 text-muted hover:border-foreground hover:text-foreground transition",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {LABELS[current]}
    </button>
  );
}
