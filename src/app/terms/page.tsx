import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that govern how GVS - Get Visa Services provides visa consultation and assistance.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms & Conditions | GVS",
    description: "The terms that govern how GVS - Get Visa Services provides visa consultation and assistance.",
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,var(--gradient-hero-start),var(--gradient-hero-end))] px-8 py-[140px] pb-[72px] text-white">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-sm text-white/70">Home / Terms &amp; Conditions</p>
          <h1 className="mt-4 font-display text-5xl font-bold">Terms &amp; Conditions</h1>
          <p className="mt-4 max-w-xl text-white/80">Last updated 10 July 2026.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[800px] px-8 py-[100px]">
        <div className="space-y-10 text-foreground-secondary">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">1. Our Services</h2>
            <p className="mt-3">
              GVS - Get Visa Services provides visa consultation and application-assistance services to individuals
              and corporates who wish to travel internationally. We are an independent consultancy — we do not
              represent, and are not affiliated with, any embassy, consulate, or government immigration authority.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">2. Visa Decisions Are Not Ours to Make</h2>
            <p className="mt-3">
              Visa approval or rejection is decided solely by the relevant embassy, consulate, or immigration
              authority. We do not guarantee approval, and processing timelines vary by destination, visa type, and
              individual circumstances beyond our control.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">3. Fees &amp; Payment</h2>
            <p className="mt-3">
              Full payment of our service fee is required before we begin processing your application. Embassy,
              consulate, and government fees are collected on their behalf and are always non-refundable once paid,
              since they go directly to that authority.
            </p>
            <p className="mt-3">
              Our own service fee is non-refundable once processing has started, except where covered by our GVS
              Guarantee: if we miss the processing date we promised you, or your application is rejected, we refund
              our service fee in full. Details of the GVS Guarantee are shown on the relevant country page at the
              time of application.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">4. Your Responsibilities</h2>
            <p className="mt-3">
              You are responsible for providing complete, authentic, and accurate documentation. False, misleading,
              or incomplete information may result in delays or rejection by the embassy, and we cannot be held
              responsible for outcomes caused by inaccurate information you provide.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">5. Limitation of Liability</h2>
            <p className="mt-3">
              We are not liable for embassy decisions, processing delays, or any travel-related losses (such as
              non-refundable flights or hotel bookings) arising from a visa being delayed or refused, except as
              expressly covered by the GVS Guarantee described above.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">6. Right to Refuse Service</h2>
            <p className="mt-3">
              We reserve the right to decline an application that appears incomplete, inconsistent, or fraudulent, at
              our discretion, and to refund any fees paid for that application accordingly.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">7. Changes to These Terms</h2>
            <p className="mt-3">
              We may update these terms from time to time. Continued use of our services after an update constitutes
              acceptance of the revised terms.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">8. Contact Us</h2>
            <p className="mt-3">
              Questions about these terms can be sent to{" "}
              <a href="mailto:ggn@getvisaservices.in" className="font-semibold text-accent">
                ggn@getvisaservices.in
              </a>{" "}
              or call{" "}
              <a href="tel:+919810545760" className="font-semibold text-accent">
                +91 98105 45760
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
