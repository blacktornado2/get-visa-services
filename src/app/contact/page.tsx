import { ContactForm } from "@/components/ContactForm";
import { OfficeCard } from "@/components/OfficeCard";
import { StatTile } from "@/components/StatTile";

const OFFICES = [
  { label: "Headquarters (HQ)", city: "Mumbai", address: "Level 8, Bandra Kurla Complex, Bandra East, Mumbai 400 051" },
  { label: "North India", city: "Delhi", address: "4th Floor, Connaught Place, New Delhi 110 001" },
  { label: "South India", city: "Bangalore", address: "MG Road, Bangalore 560 001" },
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
            <a href="tel:+911234567890" className="font-display text-lg font-semibold text-foreground">
              +91 12345 67890
            </a>
            <p className="mt-4 text-sm text-foreground-secondary">Email</p>
            <a href="mailto:info@getvisaservices.in" className="font-display text-lg font-semibold text-foreground">
              info@getvisaservices.in
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
