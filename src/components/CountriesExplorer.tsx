"use client";

import { useMemo, useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { CountryCard } from "@/components/CountryCard";
import { countries } from "@/data/countries";
import { matchesFilters, type CountryFilters } from "@/lib/country-filters";

export function CountriesExplorer() {
  const [filters, setFilters] = useState<CountryFilters>({
    search: "",
    region: "all",
    visaCategory: "all",
    processingSpeed: "all",
  });

  const filteredCountries = useMemo(() => countries.filter((c) => matchesFilters(c, filters)), [filters]);

  return (
    <>
      <div className="mt-8">
        <FilterBar variant="pills" filters={filters} onChange={setFilters} />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
        {filteredCountries.map((c) => (
          <CountryCard key={c.name} country={c} />
        ))}
      </div>
    </>
  );
}
