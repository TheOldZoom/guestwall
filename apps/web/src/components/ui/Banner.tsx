"use client";

import { useEffect, useState } from "react";
import { X, type LucideIcon } from "lucide-react";

interface BannerProps {
  storageKey?: string;
  dismissDays?: number;
  icon?: LucideIcon;
  message: React.ReactNode;
  trailing?: React.ReactNode;
  href?: string;
  external?: boolean;
}

export function Banner({
  storageKey = "ui-banner-hidden",
  dismissDays = 30,
  icon: Icon,
  message,
  trailing,
  href,
  external = false,
}: BannerProps) {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const elapsed = Date.now() - Number(stored);
        if (elapsed < dismissDays * 24 * 60 * 60 * 1000) {
          setDismissed(true);
          return;
        }
        localStorage.removeItem(storageKey);
      }
    } catch {}
  }, [storageKey, dismissDays]);

  function handleDismiss(e?: React.MouseEvent) {
    e?.preventDefault();
    e?.stopPropagation();
    setDismissed(true);
    try {
      localStorage.setItem(storageKey, String(Date.now()));
    } catch {}
  }

  if (!mounted || dismissed) return null;

  const content = (
    <>
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0 text-foreground" />}

      <div className="flex-1 min-w-0 flex flex-wrap items-baseline gap-x-2 gap-y-1 group">
        <span className="text-[11px] uppercase tracking-[0.12em] text-foreground group-hover:text-muted transition">
          {message}
        </span>
        {trailing && (
          <span className="font-mono text-[11px] tabular-nums border border-foreground/25 px-1.5 py-0.5 text-foreground">
            {trailing}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Close banner"
        className="shrink-0 text-muted hover:text-foreground transition p-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </>
  );

  return (
    <div
      className="relative border-b border-foreground/15"
      style={{
        background:
          "color-mix(in srgb, var(--foreground) 4%, var(--background))",
      }}
    >
      <div className="mx-auto max-w-5xl px-6 py-2.5 flex items-center gap-3">
        {href ? (
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="flex-1 flex items-center gap-3 no-underline group"
          >
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    </div>
  );
}
