import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={[
          "w-full border bg-transparent px-3 py-2 text-sm outline-none transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-foreground" : "border-border/40 focus:border-foreground",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
