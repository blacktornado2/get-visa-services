"use client";

import { useMemo, useState } from "react";
import { HowItWorks } from "@/components/HowItWorks";
import { InquiryForm } from "@/components/InquiryForm";
import { FilterBar } from "@/components/FilterBar";
import { CountryCard } from "@/components/CountryCard";
import { StatTile } from "@/components/StatTile";
import { TestimonialCard } from "@/components/TestimonialCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBanner } from "@/components/CtaBanner";
import { countries } from "@/data/countries";
import { testimonials } from "@/data/testimonials";
import { faqs } from "@/data/faqs";
import { matchesFilters, type CountryFilters } from "@/lib/country-filters";

const popularCountries = countries.filter((c) => c.popular);

export default function HomePage() {
  const [filters, setFilters] = useState<CountryFilters>({
    search: "",
    region: "all",
    visaCategory: "all",
    processingSpeed: "all",
  });

  const filteredCountries = useMemo(
    () => popularCountries.filter((c) => matchesFilters(c, filters)),
    [filters]
  );

  return (
    <>
      <section id="countries" className="mx-auto max-w-[1200px] px-8 py-[100px]">
        <h2 className="text-center font-display text-4xl font-bold text-foreground">Popular Countries</h2>
        <div className="mt-8">
          <FilterBar variant="selects" filters={filters} onChange={setFilters} />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {filteredCountries.map((c) => (
            <CountryCard key={c.name} country={c} />
          ))}
        </div>
      </section>

      <HowItWorks />

      <section className="mx-auto max-w-[1200px] px-8 py-[100px]">
        <h2 className="text-center font-display text-4xl font-bold text-foreground">Get a Free Consultation</h2>
        <div className="mx-auto mt-8 max-w-2xl">
          <InquiryForm />
        </div>
      </section>

      <section className="bg-surface px-8 py-[100px]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="font-display text-4xl font-bold text-foreground">India&apos;s Most Trusted Visa Service Partner</h2>
          <p className="mt-4 max-w-2xl text-foreground-secondary">
            Founded in 2009, GVS has grown from a single Mumbai office into a nationwide consultancy trusted by
            travellers and corporates alike.
          </p>
          <p className="mt-4 max-w-2xl text-foreground-secondary">
            We cover visa requirements for 150+ countries, backed by consultants who track embassy rules daily so
            your application is never based on outdated information.
          </p>
          <a href="/about" className="mt-4 inline-block text-sm font-semibold text-accent">
            Talk to an Expert →
          </a>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatTile value="15+" label="Years of Experience" />
            <StatTile value="500+" label="Corporate Clients" />
            <StatTile value="48hr" label="Avg. Processing Start" />
            <StatTile value="24/7" label="Support Available" />
          </div>
        </div>
      </section>

      <section id="testimonials" className="mx-auto max-w-[1200px] px-8 py-[100px]">
        <h2 className="text-center font-display text-4xl font-bold text-foreground">What Our Clients Say</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-[1200px] px-8 py-[100px]">
        <h2 className="text-center font-display text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
        <div className="mt-8">
          <FaqAccordion faqs={faqs} />
        </div>
        <p className="mt-6 text-center text-sm text-foreground-secondary">
          Have more questions?{" "}
          <a href="/contact" className="font-semibold text-accent">
            Contact us →
          </a>
        </p>
      </section>

      <CtaBanner
        heading="Ready to Start Your Visa Journey?"
        subcopy="Talk to a visa expert today and get a clear plan for your application."
        primary={{ label: "Book Free Consultation", href: "/contact" }}
        secondary={{ label: "📞 Call Now", href: "tel:+911234567890" }}
      />
    </>
  );
}
