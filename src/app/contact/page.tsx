import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { OfficeCard } from "@/components/OfficeCard";
import { StatTile } from "@/components/StatTile";

export const metadata: Metadata = {
  title: "Contact Us — Free Visa Consultation",
  description:
    "Talk to a GVS visa expert. Call or WhatsApp +91 98105 45760, email ggn@getvisaservices.in, or visit our Gurgaon office. Average response time: 2 hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact GVS — Free Visa Consultation",
    description:
      "Call or WhatsApp +91 98105 45760, email ggn@getvisaservices.in, or visit our Gurgaon office.",
    url: "/contact",
  },
};

const OFFICES = [
  {
    label: "Headquarters (HQ)",
    city: "Gurgaon",
    address: "Wework, Blue 1 Square, Udyog Vihar Phase 4 Rd, Phase IV, Sector 18, Gurugram, Haryana 122015",
  },
  { label: "Presence", city: "Noida", address: "Serving corporate and individual clients across Noida." },
  { label: "Presence", city: "Kolkata", address: "Serving corporate and individual clients across Kolkata." },
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-[1200px] px-8 py-[100px]">
      <h1 className="text-center font-display text-5xl font-bold text-foreground">Get in Touch</h1>
      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          <ContactForm />
        </div>
        <div className="space-y-6">
          <div className="rounded-card border border-card-border bg-surface p-6">
            <p className="text-sm text-foreground-secondary">Call / WhatsApp</p>
            <a href="tel:+919810545760" className="font-display text-lg font-semibold text-foreground">
              +91 98105 45760
            </a>
            <p className="mt-4 text-sm text-foreground-secondary">Email</p>
            <a href="mailto:ggn@getvisaservices.in" className="font-display text-lg font-semibold text-foreground">
              ggn@getvisaservices.in
            </a>
            <p className="mt-4 text-sm text-foreground-secondary">Working Hours</p>
            <p className="font-display text-lg font-semibold text-foreground">Mon–Sat, 9am–7pm IST</p>
          </div>
          <StatTile value="2 hrs" label="Average Response Time" />
          {OFFICES.map((office) => (
            <OfficeCard key={office.city} {...office} />
          ))}
        </div>
      </div>
    </section>
  );
}
