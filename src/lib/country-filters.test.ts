import { describe, it, expect } from "vitest";
import { matchesFilters, processingSpeedBucket, type CountryFilters } from "./country-filters";
import type { Country } from "@/data/countries";

function makeCountry(overrides: Partial<Country>): Country {
  return {
    name: "Testland",
    flag: "🏳️",
    code: "tl",
    region: "asia",
    type: "Tourist Visa",
    entry: "Single",
    processing: "5 days",
    processingDaysEstimate: 5,
    fee: "₹1,000",
    evisa: true,
    visaCategory: "evisa",
    difficulty: "Easy",
    popular: false,
    notes: "",
    imageSeed: "testland",
    ...overrides,
  };
}

const baseFilters: CountryFilters = {
  search: "",
  region: "all",
  visaCategory: "all",
  processingSpeed: "all",
};

describe("processingSpeedBucket", () => {
  it("buckets days into fast/medium/slow", () => {
    expect(processingSpeedBucket(3)).toBe("fast");
    expect(processingSpeedBucket(10)).toBe("medium");
    expect(processingSpeedBucket(30)).toBe("slow");
  });
});

describe("matchesFilters", () => {
  const france = makeCountry({
    name: "France",
    region: "europe",
    visaCategory: "embassy",
    processingDaysEstimate: 15,
    evisa: false,
  });
  const vietnam = makeCountry({
    name: "Vietnam",
    region: "asia",
    visaCategory: "evisa",
    processingDaysEstimate: 3,
    evisa: true,
  });

  it("matches by search substring, case-insensitive", () => {
    expect(matchesFilters(france, { ...baseFilters, search: "fra" })).toBe(true);
    expect(matchesFilters(france, { ...baseFilters, search: "viet" })).toBe(false);
  });

  it("matches by region", () => {
    expect(matchesFilters(france, { ...baseFilters, region: "europe" })).toBe(true);
    expect(matchesFilters(france, { ...baseFilters, region: "asia" })).toBe(false);
  });

  it("treats region 'evisa' as an e-Visa availability filter, not a region", () => {
    expect(matchesFilters(vietnam, { ...baseFilters, region: "evisa" })).toBe(true);
    expect(matchesFilters(france, { ...baseFilters, region: "evisa" })).toBe(false);
  });

  it("matches by visa category", () => {
    expect(matchesFilters(vietnam, { ...baseFilters, visaCategory: "evisa" })).toBe(true);
    expect(matchesFilters(france, { ...baseFilters, visaCategory: "evisa" })).toBe(false);
  });

  it("matches by processing speed bucket", () => {
    expect(matchesFilters(vietnam, { ...baseFilters, processingSpeed: "fast" })).toBe(true);
    expect(matchesFilters(france, { ...baseFilters, processingSpeed: "fast" })).toBe(false);
  });

  it("combines all filters with AND logic", () => {
    expect(
      matchesFilters(vietnam, { search: "viet", region: "asia", visaCategory: "evisa", processingSpeed: "fast" })
    ).toBe(true);
    expect(
      matchesFilters(vietnam, { search: "viet", region: "asia", visaCategory: "embassy", processingSpeed: "fast" })
    ).toBe(false);
  });
});
