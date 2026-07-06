import type { Metadata } from "next";
import { CountriesExplorer } from "@/components/CountriesExplorer";

export const metadata: Metadata = {
  title: "Explore Visa Destinations — 40+ Countries",
  description:
    "Browse visa requirements, processing times, fees, and difficulty for 40+ destinations — Schengen, USA, UK, UAE, Southeast Asia, and more.",
  alternates: { canonical: "/countries" },
  openGraph: {
    title: "Explore Visa Destinations — 40+ Countries",
    description:
      "Browse visa requirements, processing times, fees, and difficulty for 40+ destinations — Schengen, USA, UK, UAE, Southeast Asia, and more.",
    url: "/countries",
  },
};

export default function CountriesPage() {
  return (
    <section className="mx-auto max-w-[1200px] px-8 py-[100px]">
      <h1 className="text-center font-display text-5xl font-bold text-foreground">Explore Destinations</h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-foreground-secondary">
        Browse visa requirements, processing times, and fees for every destination we cover.
      </p>
      <CountriesExplorer />
    </section>
  );
}
