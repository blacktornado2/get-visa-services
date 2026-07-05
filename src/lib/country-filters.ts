import type { Country } from "@/data/countries";

export type CountryFilters = {
  search: string;
  region: string;
  visaCategory: string;
  processingSpeed: string;
};

export function processingSpeedBucket(days: number): "fast" | "medium" | "slow" {
  if (days <= 5) return "fast";
  if (days <= 21) return "medium";
  return "slow";
}

export function matchesFilters(country: Country, filters: CountryFilters): boolean {
  const matchesSearch =
    filters.search.trim() === "" ||
    country.name.toLowerCase().includes(filters.search.trim().toLowerCase());

  const matchesRegion =
    filters.region === "all" ||
    (filters.region === "evisa" ? country.evisa : country.region === filters.region);

  const matchesVisaCategory =
    filters.visaCategory === "all" || country.visaCategory === filters.visaCategory;

  const matchesProcessingSpeed =
    filters.processingSpeed === "all" ||
    processingSpeedBucket(country.processingDaysEstimate) === filters.processingSpeed;

  return matchesSearch && matchesRegion && matchesVisaCategory && matchesProcessingSpeed;
}
