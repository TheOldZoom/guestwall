import { forwardRef, type InputHTMLAttributes } from "react";
export interface CalendarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  className?: string;
}
export const Calendar = forwardRef<HTMLInputElement, CalendarProps>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      type="date"
      className={[
        "border border-border/40 bg-transparent px-3 py-2 text-sm outline-none focus:border-foreground",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  ),
);
Calendar.displayName = "Calendar";

export const DatePicker = Calendar;
export type DatePickerProps = CalendarProps;

export interface DateRangePickerProps {
  start: CalendarProps;
  end: CalendarProps;
  className?: string;
}

export function DateRangePicker({ start, end, className = "" }: DateRangePickerProps) {
  return (
    <div className={["flex flex-wrap items-center gap-2", className].filter(Boolean).join(" ")}>
      <Calendar aria-label="Start date" {...start} />
      <span className="text-muted" aria-hidden="true">
        -
      </span>
      <Calendar aria-label="End date" {...end} />
    </div>
  );
}
