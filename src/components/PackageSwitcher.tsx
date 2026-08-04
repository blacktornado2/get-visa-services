"use client";

import { useRef, useState } from "react";
import { Check } from "lucide-react";
import type { VisaPackage } from "@/data/countries";

// "Standard Visa Package" -> "Standard". Falls back to the full name if it
// doesn't follow the convention, so an unusually named package still reads fine.
function shortName(name: string) {
  const stripped = name.replace(/\s*(visa\s*)?package$/i, "").trim();
  return stripped || name;
}

function isFeatured(pkg: VisaPackage) {
  return pkg.name.toLowerCase().includes("premium");
}

// The tiers are cumulative in the data: every higher tier repeats the lower
// tier's features. Say that once instead of making the reader diff two lists.
function upgradeNote(packages: VisaPackage[], index: number) {
  const current = packages[index];
  const previous = packages[index - 1];
  const next = packages[index + 1];

  if (previous) {
    const extra = current.features.filter((f) => !previous.features.includes(f));
    if (extra.length > 0 && extra.length < current.features.length) {
      return `Everything in ${shortName(previous.name)}, plus ${extra.length} more.`;
    }
  }

  if (next) {
    const extra = next.features.filter((f) => !current.features.includes(f));
    if (extra.length > 0) {
      return `Need more? ${shortName(next.name)} adds ${extra.length} services.`;
    }
  }

  return null;
}

export function PackageSwitcher({ packages }: { packages: VisaPackage[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  if (packages.length === 0) return null;

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (delta === 0) return;
    event.preventDefault();
    const next = (index + delta + packages.length) % packages.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="max-w-3xl">
      <div
        role="tablist"
        aria-label="Service package"
        // mt leaves headroom for the "Most Popular" badge, which sits above the control.
        className="mt-7 grid gap-1.5 rounded-pill border border-card-border bg-surface p-1.5"
        style={{ gridTemplateColumns: `repeat(${packages.length}, minmax(0, 1fr))` }}
      >
        {packages.map((pkg, i) => {
          const selected = i === active;
          return (
            <button
              key={pkg.name}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`package-tab-${i}`}
              aria-controls={`package-panel-${i}`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`relative rounded-pill px-3.5 py-2.5 text-center transition-colors duration-200 ${
                selected
                  ? "bg-[linear-gradient(135deg,var(--gradient-cta-start),var(--gradient-cta-end))] text-white"
                  : "text-foreground-secondary hover:bg-accent/10"
              }`}
            >
              {isFeatured(pkg) && (
                <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-pill bg-accent px-3 py-0.5 text-[11px] font-semibold text-white">
                  Most Popular
                </span>
              )}
              <span className="block text-sm font-semibold">{shortName(pkg.name)}</span>
              <span className="mt-px block text-xs opacity-85">{pkg.price}</span>
            </button>
          );
        })}
      </div>

      {packages.map((pkg, i) => {
        const note = upgradeNote(packages, i);
        return (
          <div
            key={pkg.name}
            role="tabpanel"
            id={`package-panel-${i}`}
            aria-labelledby={`package-tab-${i}`}
            tabIndex={0}
            hidden={i !== active}
            className="mt-4 rounded-card border border-card-border bg-surface p-7"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="font-display text-3xl font-bold text-foreground">{pkg.price}</p>
              <span className="rounded-pill bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                {pkg.features.length} services included
              </span>
            </div>

            <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground-secondary">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-7 grid grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_auto]">
              {note && <p className="text-xs text-foreground-secondary">{note}</p>}
              <a
                href="/contact"
                className="rounded-btn bg-[linear-gradient(135deg,var(--gradient-cta-start),var(--gradient-cta-end))] px-8 py-3 text-center text-sm font-semibold text-white transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98] sm:col-start-2"
              >
                Get Started
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
