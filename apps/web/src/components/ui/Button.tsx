"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "outline" | "solid" | "ghost";
export type ButtonSize = "xs" | "sm" | "md" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  selected?: boolean;
  children: ReactNode;
  className?: string;
}

const sizeClasses: Record<ButtonSize, string> = {
  xs: "px-3 py-1 text-[10px] tracking-[0.15em]",
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-xs",
  icon: "w-8 h-8 p-0 shrink-0",
};

const variantClasses: Record<ButtonVariant, string> = {
  outline:
    "border border-border/40 text-muted hover:border-foreground hover:text-foreground",
  solid: "border border-foreground bg-foreground text-background",
  ghost: "text-muted hover:text-foreground",
};

export function Button({
  variant = "outline",
  size = "sm",
  selected = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={[
        "inline-flex items-center justify-center transition",
        sizeClasses[size],
        selected
          ? "border border-foreground bg-foreground text-background"
          : variantClasses[variant],
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
