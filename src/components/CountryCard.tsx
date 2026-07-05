"use client";

import { useState } from "react";
import type { Country } from "@/data/countries";
import { getVisaByDate, formatVisaByDate } from "@/lib/visa-dates";

const difficultyColor: Record<Country["difficulty"], string> = {
  Easy: "text-difficulty-easy",
  Moderate: "text-difficulty-moderate",
  Hard: "text-difficulty-hard",
};

export function CountryCard({ country }: { country: Country }) {
  const [open, setOpen] = useState(false);
  const visaByDate = formatVisaByDate(getVisaByDate(country.processingDaysEstimate));

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative aspect-[3/4] w-full overflow-hidden rounded-card border border-card-border text-left"
      >
        <img
          src={`https://picsum.photos/seed/${country.imageSeed}/800/1000`}
          alt={country.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

        <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-white/80 shadow-lg">
          <img
            src={`https://flagcdn.com/w80/${country.code}.png`}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute left-2 top-2 flex gap-1">
          {country.evisa && (
            <span className="rounded-pill bg-accent/90 px-2 py-1 text-[11px] font-semibold text-white">
              e-Visa
            </span>
          )}
          {country.popular && (
            <span className="rounded-pill bg-white/90 px-2 py-1 text-[11px] font-semibold text-black">
              Popular
            </span>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 border-t border-white/20 bg-white/10 p-4 backdrop-blur-md">
          <h3 className="font-display text-lg font-semibold text-white">
            {country.flag} {country.name}
          </h3>
          <p className="text-xs text-white/80">{country.type}</p>
          <p className="mt-1 text-xs font-medium text-white">Get visa by {visaByDate}</p>
          <p className={`mt-1 text-xs font-semibold ${difficultyColor[country.difficulty]}`}>
            {country.difficulty}
          </p>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-card border border-card-border bg-surface p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h3 className="font-display text-2xl font-semibold text-foreground">
                {country.flag} {country.name}
              </h3>
              <button onClick={() => setOpen(false)} className="text-foreground-secondary" aria-label="Close">
                ✕
              </button>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-foreground-secondary">Visa Type</dt>
                <dd className="font-medium text-foreground">{country.type}</dd>
              </div>
              <div>
                <dt className="text-foreground-secondary">Entry</dt>
                <dd className="font-medium text-foreground">{country.entry}</dd>
              </div>
              <div>
                <dt className="text-foreground-secondary">Processing Time</dt>
                <dd className="font-medium text-foreground">{country.processing}</dd>
              </div>
              <div>
                <dt className="text-foreground-secondary">Fee</dt>
                <dd className="font-medium text-foreground">{country.fee}</dd>
              </div>
              <div>
                <dt className="text-foreground-secondary">Get Visa By</dt>
                <dd className="font-medium text-foreground">{visaByDate}</dd>
              </div>
              <div>
                <dt className="text-foreground-secondary">Difficulty</dt>
                <dd className={`font-medium ${difficultyColor[country.difficulty]}`}>{country.difficulty}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-foreground-secondary">{country.notes}</p>
            <a
              href="/contact"
              className="mt-6 inline-block rounded-btn bg-[linear-gradient(135deg,var(--gradient-cta-start),var(--gradient-cta-end))] px-6 py-3 text-sm font-semibold text-white"
            >
              Apply for {country.name} Visa
            </a>
          </div>
        </div>
      )}
    </>
  );
}
