import type { Metadata } from "next";
import { StatTile } from "@/components/StatTile";
import { ValueCard } from "@/components/ValueCard";
import { OfficeCard } from "@/components/OfficeCard";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "About Us — A Trusted Extension of Vagabond Holidays",
  description:
    "GVS is a Gurgaon-based visa consultancy founded in 2017, delivering reliable, transparent visa solutions for individuals, families, and corporates across India.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About GVS — A Trusted Extension of Vagabond Holidays",
    description:
      "Gurgaon-based visa consultancy delivering reliable, transparent visa solutions for individuals, families, and corporates across India.",
    url: "/about",
  },
};

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
  {
    label: "Headquarters",
    city: "Gurgaon",
    address: "Wework, Blue 1 Square, Udyog Vihar Phase 4 Rd, Phase IV, Sector 18, Gurugram, Haryana 122015",
  },
  { label: "Presence", city: "Noida", address: "Serving corporate and individual clients across Noida." },
  { label: "Presence", city: "Kolkata", address: "Serving corporate and individual clients across Kolkata." },
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
              A Trusted Extension of Vagabond Holidays
            </h2>
            <p className="mt-4 text-foreground-secondary">
              GVS - Get Visa Services is a trusted extension of Vagabond Holidays, founded in Gurgaon in 2017 by
              Himanshu Khatri, and has since grown into a dedicated visa consultancy for individuals, families, and
              corporates across India.
            </p>
            <p className="mt-4 text-foreground-secondary">
              Our mission is to provide reliable, transparent, and hassle-free visa solutions through expert
              guidance and personalized support — with a vision to become India&apos;s most trusted corporate visa
              partner, delivering efficient, technology-driven visa solutions.
            </p>
            <p className="mt-4 text-foreground-secondary">
              We handle both offline and online visa processing, with door-to-door document pickup and 24×7
              customer support for destinations including Australia, China, Dubai, Schengen, Singapore, UK, Vietnam,
              and the US.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatTile value="10+" label="Years of Experience" />
            <StatTile value="99%" label="Success Rate" />
            <StatTile value="150+" label="Countries Covered" />
            <StatTile value="24/7" label="Customer Support" />
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
