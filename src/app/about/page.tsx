import { StatTile } from "@/components/StatTile";
import { ValueCard } from "@/components/ValueCard";
import { OfficeCard } from "@/components/OfficeCard";
import { CtaBanner } from "@/components/CtaBanner";

const VALUES = [
  {
    title: "Honesty First",
    description:
      "If your profile has a weak spot, we tell you before you pay — not after a rejection. No false promises, no guaranteed-approval claims.",
  },
  {
    title: "Speed Without Shortcuts",
    description:
      "Applications filed within 48 hours of complete documentation. Fast because our process is tight — never because we skip checks.",
  },
  {
    title: "A Human on Every Case",
    description:
      "No ticket queues. Every application has a named consultant you can reach on WhatsApp — from first call to visa in hand.",
  },
];

const OFFICES = [
  { label: "Headquarters", city: "Mumbai", address: "Level 8, Bandra Kurla Complex, Bandra East, Mumbai 400 051" },
  { label: "North India", city: "Delhi", address: "4th Floor, Connaught Place, New Delhi 110 001" },
  { label: "South India", city: "Bangalore", address: "MG Road, Bangalore 560 001" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,var(--gradient-hero-start),var(--gradient-hero-end))] px-8 py-[140px] pb-[72px] text-white">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-sm text-white/70">Home / About</p>
          <h1 className="mt-4 font-display text-5xl font-bold">About GVS</h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-8 py-[100px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Built on 15 Years of Getting Travellers Where They Need to Go
            </h2>
            <p className="mt-4 text-foreground-secondary">
              Founded in 2009 in Mumbai, GVS started as a two-person consultancy helping local exporters get
              business visas sorted quickly and correctly.
            </p>
            <p className="mt-4 text-foreground-secondary">
              Today we process thousands of applications a year across 150+ destinations, with a rejection rate
              under 2% — well below the industry average.
            </p>
            <p className="mt-4 text-foreground-secondary">
              Our consultants track embassy rule changes daily, so your application is always built on current
              requirements, not last year&apos;s checklist.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatTile value="15+" label="Years of Experience" />
            <StatTile value="10K+" label="Visas Processed" />
            <StatTile value="98%" label="Approval Rate" />
            <StatTile value="150+" label="Countries Covered" />
          </div>
        </div>
      </section>

      <section className="bg-surface px-8 py-[100px]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-center font-display text-4xl font-bold text-foreground">What We Stand For</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map((v) => (
              <ValueCard key={v.title} title={v.title} description={v.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-8 py-[100px]">
        <h2 className="text-center font-display text-4xl font-bold text-foreground">Our Offices</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {OFFICES.map((office) => (
            <OfficeCard key={office.city} {...office} />
          ))}
        </div>
      </section>

      <CtaBanner
        heading="Plan Your Next Trip With Us"
        primary={{ label: "Book Free Consultation", href: "/contact" }}
        secondary={{ label: "Browse Destinations", href: "/countries" }}
      />
    </>
  );
}
