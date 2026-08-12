"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpDown } from "lucide-react";

interface DropdownOption<T> {
  id: T;
  label: string;
}

interface DropdownProps<T> {
  options: readonly DropdownOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  triggerIcon?: ReactNode;
  ariaLabel?: string;
  className?: string;
}

export function Dropdown<T>({
  options,
  value,
  onChange,
  triggerIcon,
  ariaLabel = "Open menu",
  className = "",
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = options.find((option) => option.id === value);

  useEffect(() => {
    if (!open) return;

    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      className={["relative shrink-0", className].filter(Boolean).join(" ")}
      ref={ref}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        title={current?.label}
        aria-label={ariaLabel}
        className="flex h-6 w-6 cursor-pointer items-center justify-center text-muted transition-colors duration-200 hover:text-foreground"
      >
        {triggerIcon ?? <ArrowUpDown className="size-4" />}
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 z-20 mt-2 flex min-w-35 flex-col gap-2 border border-border/40 bg-background p-3"
        >
          {options.map((option) => (
            <button
              key={String(option.id)}
              type="button"
              role="option"
              aria-selected={option.id === value}
              onClick={() => {
                onChange?.(option.id);
                setOpen(false);
              }}
              className={[
                "text-left text-xs whitespace-nowrap transition hover:text-foreground",
                option.id === value ? "text-foreground" : "text-muted",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
