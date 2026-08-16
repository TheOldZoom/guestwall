import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "icon";
  icon?: ReactNode;
  iconRight?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "default",
      className = "",
      type = "button",
      icon,
      iconRight,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={[
          "inline-flex items-center justify-center gap-2 border text-[10px] uppercase tracking-[0.15em] outline-none transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent/40",
          variant === "default" &&
            "border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground",
          variant === "outline" && "border-border/40 text-foreground hover:border-foreground",
          variant === "ghost" &&
            "border-transparent text-muted hover:border-foreground hover:text-foreground",
          size === "default" && "min-h-9 px-3 py-2",
          size === "sm" && "min-h-8 px-2.5 py-1.5",
          size === "icon" && "size-9 p-0",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {icon && (
          <span className="inline-flex shrink-0 [&>svg]:size-3.5" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
        {iconRight && (
          <span className="inline-flex shrink-0 [&>svg]:size-3.5" aria-hidden="true">
            {iconRight}
          </span>
        )}
      </button>
    );
  },
);
Button.displayName = "Button";
