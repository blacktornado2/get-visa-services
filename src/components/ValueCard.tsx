export function ValueCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-card border border-card-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-foreground-secondary">{description}</p>
    </div>
  );
}
