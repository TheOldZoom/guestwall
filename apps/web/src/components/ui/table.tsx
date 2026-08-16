import type {
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";
export function Table({ className = "", ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-auto">
      <table
        className={["w-full text-left text-sm", className].filter(Boolean).join(" ")}
        {...props}
      />
    </div>
  );
}
export function TableHeader({ className = "", ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={[
        "border-b border-border/40 text-[10px] uppercase tracking-[0.15em] text-muted",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
export function TableBody({ className = "", ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={className} {...props} />;
}
export function TableRow({ className = "", ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={["border-b border-border/40 transition-colors hover:bg-foreground/5", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
export function TableHead({ className = "", ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={["h-10 px-3 font-normal", className].filter(Boolean).join(" ")} {...props} />
  );
}
export function TableCell({ className = "", ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={["p-3", className].filter(Boolean).join(" ")} {...props} />;
}
export function TableCaption({
  className = "",
  ...props
}: HTMLAttributes<HTMLTableCaptionElement>) {
  return (
    <caption
      className={["mt-3 text-xs text-muted", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export const DataTable = Table;
export const DataTableHeader = TableHeader;
export const DataTableBody = TableBody;
export const DataTableRow = TableRow;
export const DataTableHead = TableHead;
export const DataTableCell = TableCell;
