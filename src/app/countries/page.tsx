"use client";

import { useMemo, useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { CountryCard } from "@/components/CountryCard";
import { countries } from "@/data/countries";
import { matchesFilters, type CountryFilters } from "@/lib/country-filters";

export default function CountriesPage() {
  const [filters, setFilters] = useState<CountryFilters>({
    search: "",
    region: "all",
    visaCategory: "all",
    processingSpeed: "all",
  });

  const filteredCountries = useMemo(() => countries.filter((c) => matchesFilters(c, filters)), [filters]);

  return (
    <section className="mx-auto max-w-[1200px] px-8 py-[100px]">
      <h1 className="text-center font-display text-5xl font-bold text-foreground">Explore Destinations</h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-foreground-secondary">
        Browse visa requirements, processing times, and fees for every destination we cover.
      </p>
      <div className="mt-8">
        <FilterBar variant="pills" filters={filters} onChange={setFilters} />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
        {filteredCountries.map((c) => (
          <CountryCard key={c.name} country={c} />
        ))}
      </div>
    </section>
  );
}
