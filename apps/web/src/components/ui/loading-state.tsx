import { Spinner } from "./spinner";
export function LoadingState({
  label = "Loading",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      className={[
        "flex items-center gap-2 py-6 text-[10px] uppercase tracking-[0.2em] text-muted",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Spinner aria-hidden="true" />
      {label}
    </div>
  );
}
