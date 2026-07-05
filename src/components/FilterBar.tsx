"use client";

import { Search } from "lucide-react";
import type { CountryFilters } from "@/lib/country-filters";

const REGION_OPTIONS = [
  { value: "all", label: "All Regions" },
  { value: "europe", label: "🌍 Europe / Schengen" },
  { value: "americas", label: "🌎 Americas" },
  { value: "asia", label: "🌏 Asia Pacific" },
  { value: "middleeast", label: "🕌 Middle East" },
  { value: "africa", label: "🌍 Africa" },
];

const COUNTRIES_PILL_OPTIONS = [
  { value: "all", label: "All Countries" },
  ...REGION_OPTIONS.slice(1),
  { value: "evisa", label: "⚡ e-Visa Available" },
];

const VISA_CATEGORY_OPTIONS = [
  { value: "all", label: "All Visa Types" },
  { value: "evisa", label: "⚡ e-Visa / Online" },
  { value: "arrival", label: "🛬 Visa on Arrival" },
  { value: "embassy", label: "🏛️ Embassy Visa" },
];

const PROCESSING_OPTIONS = [
  { value: "all", label: "Any Processing Time" },
  { value: "fast", label: "⚡ Fast (≤5 days)" },
  { value: "medium", label: "📅 Medium (6–21 days)" },
  { value: "slow", label: "🕐 Longer (21+ days)" },
];

type Props = {
  variant: "pills" | "selects";
  filters: CountryFilters;
  onChange: (filters: CountryFilters) => void;
};

export function FilterBar({ variant, filters, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative min-w-[220px] flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary"
          size={16}
        />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search destinations..."
          className="w-full rounded-pill border border-card-border bg-surface py-2 pl-9 pr-4 text-sm text-foreground"
        />
      </div>

      {variant === "pills" ? (
        <div className="flex flex-wrap gap-2">
          {COUNTRIES_PILL_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ ...filters, region: opt.value })}
              className={`rounded-pill border px-4 py-2 text-sm font-medium transition-colors ${
                filters.region === opt.value
                  ? "border-accent bg-accent text-white"
                  : "border-card-border text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      ) : (
        <>
          <select
            value={filters.region}
            onChange={(e) => onChange({ ...filters, region: e.target.value })}
            className="rounded-pill border border-card-border bg-surface px-4 py-2 text-sm text-foreground"
          >
            {REGION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <select
            value={filters.visaCategory}
            onChange={(e) => onChange({ ...filters, visaCategory: e.target.value })}
            className="rounded-pill border border-card-border bg-surface px-4 py-2 text-sm text-foreground"
          >
            {VISA_CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <select
            value={filters.processingSpeed}
            onChange={(e) => onChange({ ...filters, processingSpeed: e.target.value })}
            className="rounded-pill border border-card-border bg-surface px-4 py-2 text-sm text-foreground"
          >
            {PROCESSING_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}
