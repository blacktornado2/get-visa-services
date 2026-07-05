"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Country } from "@/data/countries";
import { getVisaByDate, formatVisaByDate } from "@/lib/visa-dates";

const difficultyColor: Record<Country["difficulty"], string> = {
  Easy: "text-difficulty-easy",
  Moderate: "text-difficulty-moderate",
  Hard: "text-difficulty-hard",
};

export function CountryCard({ country }: { country: Country }) {
  // Computed client-side after mount, not during render: this page is statically
  // prerendered, so a build-time `new Date()` would bake a stale date into the HTML
  // and mismatch whatever the client's clock says at hydration.
  const [visaByDate, setVisaByDate] = useState<string | null>(null);

  useEffect(() => {
    setVisaByDate(formatVisaByDate(getVisaByDate(country.processingDaysEstimate)));
  }, [country.processingDaysEstimate]);

  return (
    <Link
      href={`/countries/${country.code}`}
      className="group relative aspect-[3/5] w-full overflow-hidden rounded-card border border-card-border text-left shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.45)]"
    >
      <img
        src={`https://picsum.photos/seed/${country.imageSeed}/800/1000`}
        alt={country.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

      <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-white/80 shadow-lg">
        <img src={`https://flagcdn.com/w80/${country.code}.png`} alt="" className="h-full w-full object-cover" />
      </div>

      <div className="absolute left-2 top-2 flex gap-1">
        {country.evisa && (
          <span className="rounded-pill bg-accent/90 px-2 py-1 text-[11px] font-semibold text-white">e-Visa</span>
        )}
        {country.popular && (
          <span className="rounded-pill bg-white/90 px-2 py-1 text-[11px] font-semibold text-black">Popular</span>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 border-t border-white/20 bg-white/10 p-4 backdrop-blur-md">
        <h3 className="font-display text-lg font-semibold text-white">
          {country.flag} {country.name}
        </h3>
        <p className="text-xs text-white/80">{country.type}</p>
        {visaByDate && <p className="mt-1 text-xs font-medium text-white">Get visa by {visaByDate}</p>}
        <p className={`mt-1 text-xs font-semibold ${difficultyColor[country.difficulty]}`}>{country.difficulty}</p>
      </div>
    </Link>
  );
}
