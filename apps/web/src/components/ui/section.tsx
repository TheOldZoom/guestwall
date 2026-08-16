export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border/40 py-10">
      <p className="mb-6 text-[10px] uppercase tracking-[0.25em] text-muted">{title}</p>
      {children}
    </section>
  );
}
