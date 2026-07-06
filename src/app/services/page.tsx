import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PricingTier } from "@/components/PricingTier";

export const metadata: Metadata = {
  title: "Tourist Visa Services & Pricing",
  description:
    "End-to-end tourist visa support for 150+ destinations — document review, embassy appointments, application filing, and tracking. Plans from ₹1,499 per application.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Tourist Visa Services & Pricing | GVS",
    description:
      "End-to-end tourist visa support for 150+ destinations. Plans from ₹1,499 per application.",
    url: "/services",
  },
};

const INCLUDED = [
  "Single & multi-entry visas",
  "Document review & verification",
  "Embassy appointment booking",
  "Application filing & tracking",
  "WhatsApp status updates",
  "150+ countries covered",
];

const DOCUMENTS = [
  { title: "Valid Passport", detail: "At least 6 months validity with 2 blank pages." },
  { title: "Passport-size Photographs", detail: "Recent, per destination's specification." },
  { title: "Bank Statements", detail: "Last 3-6 months, per destination requirements." },
  { title: "ITR / Income Proof", detail: "Last 2-3 years, for financial capacity proof." },
  { title: "Travel Insurance", detail: "Minimum coverage per destination (e.g. €30,000 for Schengen)." },
  { title: "Confirmed Travel Itinerary", detail: "Flight bookings and hotel reservations." },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,var(--gradient-hero-start),var(--gradient-hero-end))] px-8 py-[140px] pb-[72px] text-white">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-sm text-white/70">Home / Services</p>
          <h1 className="mt-4 font-display text-5xl font-bold">Tourist Visa Services</h1>
          <p className="mt-4 max-w-xl text-white/80">
            End-to-end tourist and travel visa support for individuals and corporate teams, covering 150+
            destinations.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-8 py-[100px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="font-display text-3xl font-bold text-foreground">Tourist Visa</h2>
            <p className="mt-4 text-foreground-secondary">
              Whether it&apos;s a short family holiday or a longer international trip, we handle the entire tourist
              visa process — from document checklist to embassy submission — so you can focus on planning the trip
              itself.
            </p>
            <h3 className="mt-6 font-display text-lg font-semibold text-foreground">What&apos;s Included</h3>
            <ul className="mt-4 space-y-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground-secondary">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="/contact"
              className="mt-8 inline-block rounded-btn bg-[linear-gradient(135deg,var(--gradient-cta-start),var(--gradient-cta-end))] px-6 py-3 text-sm font-semibold text-white"
            >
              Apply Now →
            </a>
          </div>
          <div className="rounded-card border border-card-border bg-surface p-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-foreground-secondary">Processing time</p>
                <p className="font-display text-lg font-semibold text-foreground">5–15 business days</p>
              </div>
              <div>
                <p className="text-xs text-foreground-secondary">Approval rate</p>
                <p className="font-display text-lg font-semibold text-foreground">98%</p>
              </div>
              <div>
                <p className="text-xs text-foreground-secondary">Countries covered</p>
                <p className="font-display text-lg font-semibold text-foreground">150+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface px-8 py-[100px]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-center font-display text-4xl font-bold text-foreground">
            Standard Document Requirements
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {DOCUMENTS.map((doc) => (
              <div key={doc.title} className="rounded-card border border-card-border bg-background p-6">
                <h3 className="font-display text-base font-semibold text-foreground">{doc.title}</h3>
                <p className="mt-2 text-sm text-foreground-secondary">{doc.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-8 py-[100px]">
        <h2 className="text-center font-display text-4xl font-bold text-foreground">Service Packages</h2>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          <PricingTier
            name="Essential"
            price="₹1,499"
            priceNote="/ application"
            features={["Document checklist", "Document review", "Application filing", "Email support"]}
            cta={{ label: "Get Started", href: "/contact" }}
          />
          <PricingTier
            name="Professional"
            price="₹2,999"
            priceNote="/ application"
            featured
            features={[
              "Everything in Essential",
              "Dedicated consultant",
              "Embassy appointment",
              "WhatsApp + call support",
              "Free re-filing on rejection",
            ]}
            cta={{ label: "Get Started", href: "/contact" }}
          />
          <PricingTier
            name="Corporate"
            price="Custom"
            priceNote="for 5+ employees"
            features={["Everything in Professional", "Volume discounts", "Dedicated account manager", "Monthly invoicing"]}
            cta={{ label: "Contact Sales", href: "/contact" }}
          />
        </div>
      </section>
    </>
  );
}
