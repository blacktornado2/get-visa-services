import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Check, TriangleAlert, FileText, LogIn, Clock, IndianRupee, CalendarCheck, Gauge, CalendarRange, type LucideIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { countries, type Country } from "@/data/countries";
import { VisaByDate } from "@/components/VisaByDate";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PricingTier } from "@/components/PricingTier";
import { GuaranteeCard } from "@/components/GuaranteeCard";
import { TrustBadge } from "@/components/TrustBadge";
import { Reveal } from "@/components/Reveal";

const difficultyColor: Record<Country["difficulty"], string> = {
  Easy: "text-difficulty-easy",
  Moderate: "text-difficulty-moderate",
  Hard: "text-difficulty-hard",
};

function InfoField({
  icon: Icon,
  label,
  value,
  valueClassName,
}: {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10">
        <Icon size={20} className="text-accent" />
      </span>
      <div>
        <dt className="text-foreground-secondary">{label}</dt>
        <dd
          className={`mt-0.5 font-semibold underline decoration-1 underline-offset-2 ${valueClassName ?? "text-foreground"}`}
        >
          {value}
        </dd>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return countries.map((c) => ({ code: c.code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const country = countries.find((c) => c.code === code);
  if (!country) return {};

  const title = `${country.name} Visa for Indians — Fees, Processing Time & Documents`;
  const description = `Apply for your ${country.name} ${country.type} with GVS: ${country.processing} processing, fees from ${country.fee}, complete document checklist, and expert support.`;

  return {
    title,
    description,
    alternates: { canonical: `/countries/${country.code}` },
    openGraph: {
      title,
      description,
      url: `/countries/${country.code}`,
      images: [{ url: `/landmarks/${country.code}.jpg`, width: 800, height: 800 }],
    },
  };
}

export default async function CountryPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const country = countries.find((c) => c.code === code);
  if (!country) notFound();

  const faqJsonLd = country.faqs && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: country.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <section className="bg-[linear-gradient(135deg,var(--gradient-hero-start),var(--gradient-hero-end))] px-8 py-[80px] pb-[72px] text-white">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-sm text-white/70">
            <Link href="/">Home</Link> / <Link href="/countries">Countries</Link> / {country.name}
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold">
            {country.flag} {country.name}
          </h1>
          <span className="mt-4 inline-block rounded-pill bg-white/15 px-4 py-1 text-sm font-semibold text-white">
            {country.type}
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-8 py-[100px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          <div className="relative aspect-[3/4] overflow-hidden rounded-card border border-card-border md:col-span-2">
            <img
              src={`/landmarks/${country.code}.jpg`}
              alt={`Famous landmark in ${country.name}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute left-2 top-2 flex gap-1">
              {country.evisa && (
                <span className="rounded-pill bg-accent/90 px-2 py-1 text-[11px] font-semibold text-white">
                  e-Visa
                </span>
              )}
              {country.popular && (
                <span className="rounded-pill bg-white/90 px-2 py-1 text-[11px] font-semibold text-black">
                  Popular
                </span>
              )}
            </div>
          </div>

          <div className="md:col-span-3">
            <TrustBadge className="mb-6" />

            <dl className="grid grid-cols-1 gap-x-6 gap-y-6 text-sm sm:grid-cols-2">
              <InfoField icon={FileText} label="Visa Type" value={country.type} />
              <InfoField icon={LogIn} label="Entry" value={country.entry} />
              <InfoField icon={Clock} label="Processing Time" value={country.processing} />
              <InfoField icon={IndianRupee} label="Fee" value={country.fee} />
              <InfoField
                icon={CalendarCheck}
                label="Get Visa By"
                value={<VisaByDate processingDaysEstimate={country.processingDaysEstimate} />}
              />
              <InfoField
                icon={Gauge}
                label="Difficulty"
                value={country.difficulty}
                valueClassName={difficultyColor[country.difficulty]}
              />
              {country.lengthOfStay && (
                <InfoField icon={CalendarRange} label="Length of Stay" value={country.lengthOfStay} />
              )}
            </dl>

            <GuaranteeCard />

            <a
              href="/contact"
              className="mt-8 inline-block rounded-btn bg-[linear-gradient(135deg,var(--gradient-cta-start),var(--gradient-cta-end))] px-6 py-3 text-sm font-semibold text-white transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98]"
            >
              Apply for {country.name} Visa
            </a>
          </div>
        </div>

        {country.packages && (
          <Reveal className="mt-20">
            <h2 className="font-display text-3xl font-bold text-foreground">Service Packages</h2>
            <p className="mt-2 text-foreground-secondary">Choose the level of support that fits your application.</p>
            <div className="mx-auto mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:max-w-2xl">
              {country.packages.map((pkg) => (
                <PricingTier
                  key={pkg.name}
                  name={pkg.name}
                  price={pkg.price}
                  featured={pkg.name.toLowerCase().includes("premium")}
                  features={pkg.features}
                  cta={{ label: "Get Started", href: "/contact" }}
                />
              ))}
            </div>
          </Reveal>
        )}

        {country.documents && (
          <Reveal className="mt-20">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-display text-3xl font-bold text-foreground">Required Documents</h2>
              <span className="rounded-pill bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                {country.documents.length} {country.documents.length === 1 ? "document" : "documents"}
              </span>
            </div>
            <p className="mt-2 text-foreground-secondary">
              Have these ready before you start your {country.name} visa application.
            </p>
            <div className="mt-8 rounded-card border border-card-border bg-surface p-8">
              <ul className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
                {country.documents.map((doc) => (
                  <li key={doc} className="flex items-center gap-3 text-sm">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <Check size={14} className="text-accent" />
                    </span>
                    <span className="text-foreground">{doc}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-start gap-3 rounded-btn border border-accent/30 bg-accent/5 px-4 py-3 text-sm text-foreground-secondary">
                <TriangleAlert size={16} className="mt-0.5 shrink-0 text-accent" />
                Submit correct and complete documents to avoid delays or rejection.
              </div>
            </div>
          </Reveal>
        )}

        {country.faqs && (
          <Reveal className="mt-20">
            <h2 className="font-display text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
            <div className="mt-8">
              <FaqAccordion faqs={country.faqs} />
            </div>
          </Reveal>
        )}
      </section>
    </>
  );
}
