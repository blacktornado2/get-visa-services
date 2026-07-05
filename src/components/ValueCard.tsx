export function ValueCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-card border border-card-border bg-surface p-6">
      <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-foreground-secondary">{description}</p>
    </div>
  );
}
