import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How GVS - Get Visa Services collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | GVS",
    description: "How GVS - Get Visa Services collects, uses, and protects your personal information.",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,var(--gradient-hero-start),var(--gradient-hero-end))] px-8 py-[140px] pb-[72px] text-white">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-sm text-white/70">Home / Privacy Policy</p>
          <h1 className="mt-4 font-display text-5xl font-bold">Privacy Policy</h1>
          <p className="mt-4 max-w-xl text-white/80">Last updated 10 July 2026.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[800px] px-8 py-[100px]">
        <div className="space-y-10 text-foreground-secondary">
          <div>
            <p>
              Your privacy matters to us. When you share personal information with GVS - Get Visa Services, we make
              every reasonable effort to keep it secure and private, and to use it only for the purpose you shared it
              — helping you get your visa.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">What We Collect</h2>
            <p className="mt-3">To assess and process your visa application, we typically collect:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Name, address, email, and phone number</li>
              <li>Date of birth and gender</li>
              <li>Passport details and photographs required by the destination embassy</li>
              <li>Travel insurance and itinerary details, where relevant</li>
              <li>Payment details, to process your service fee</li>
            </ul>
            <p className="mt-3">
              We do not collect sensitive information such as race, religion, or political beliefs, except where a
              specific destination&apos;s visa process genuinely requires it.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">How We Collect It</h2>
            <p className="mt-3">
              We gather information through application forms, phone and WhatsApp conversations, our website and
              contact forms, email, and in-person document handovers. If you apply as part of a group, we may also
              collect information from your group coordinator, with your consent.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">How We Use Your Information</h2>
            <p className="mt-3">
              We use your information to review your documents, prepare and file your visa application, communicate
              status updates via WhatsApp, email, or phone, and meet the documentation requirements of the relevant
              embassy or consulate. We do not sell your personal information.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Data Security</h2>
            <p className="mt-3">
              We take reasonable technical and organizational measures to protect your personal information,
              including passport and payment details, against unauthorized access, loss, or misuse.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Your Rights &amp; Contact</h2>
            <p className="mt-3">
              You can ask us what personal information we hold about you, request a correction, or ask us to delete
              it once your application is complete, by writing to{" "}
              <a href="mailto:ggn@getvisaservices.in" className="font-semibold text-accent">
                ggn@getvisaservices.in
              </a>{" "}
              or calling{" "}
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
