import { forwardRef, type TextareaHTMLAttributes } from "react";
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className = "", ...props }, ref) => (
    <textarea
      ref={ref}
      className={[
        "min-h-24 w-full resize-y border bg-transparent px-3 py-2 text-sm outline-none transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50",
        error ? "border-foreground" : "border-border/40 focus:border-foreground",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
