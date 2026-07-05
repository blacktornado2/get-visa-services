export function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-card border border-card-border bg-surface p-6 text-center">
      <p className="font-display text-3xl font-bold text-accent">{value}</p>
      <p className="mt-1 text-sm text-foreground-secondary">{label}</p>
    </div>
  );
}
