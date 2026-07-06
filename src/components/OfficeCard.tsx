export function OfficeCard({ label, city, address }: { label: string; city: string; address: string }) {
  return (
    <div className="rounded-card border border-card-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent">{label}</p>
      <h3 className="mt-2 font-display text-xl font-semibold text-foreground">{city}</h3>
      <p className="mt-2 text-sm text-foreground-secondary">{address}</p>
    </div>
  );
}
