import { Check } from "lucide-react";

type Props = {
  name: string;
  price: string;
  priceNote?: string;
  features: string[];
  featured?: boolean;
  cta: { label: string; href: string };
};

export function PricingTier({ name, price, priceNote, features, featured, cta }: Props) {
  return (
    <div
      className={`relative rounded-card border p-8 ${
        featured ? "border-accent bg-surface shadow-lg" : "border-card-border bg-surface"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-pill bg-accent px-4 py-1 text-xs font-semibold text-white">
          Most Popular
        </span>
      )}
      <h3 className="font-display text-xl font-semibold text-foreground">{name}</h3>
      <p className="mt-2 font-display text-3xl font-bold text-foreground">
        {price}
        {priceNote && <span className="ml-1 text-sm font-normal text-foreground-secondary">{priceNote}</span>}
      </p>
      <ul className="mt-6 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-foreground-secondary">
            <Check size={16} className="mt-0.5 shrink-0 text-accent" />
            {f}
          </li>
        ))}
      </ul>
      <a
        href={cta.href}
        className="mt-8 block rounded-btn bg-[linear-gradient(135deg,var(--gradient-cta-start),var(--gradient-cta-end))] py-3 text-center text-sm font-semibold text-white"
      >
        {cta.label}
      </a>
    </div>
  );
}
