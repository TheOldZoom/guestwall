import { forwardRef, type LabelHTMLAttributes } from "react";
export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", ...props }, ref) => (
    <label
      ref={ref}
      className={["text-[10px] uppercase tracking-[0.25em] text-muted", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  ),
);
Label.displayName = "Label";
