import Link from "next/link";

const SERVICE_LINKS = ["Tourist Visa", "Business Visa", "Work Visa", "Student Visa", "Visa Renewal", "Attestation"];
const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];
const COUNTRY_LINKS = ["USA Visa", "UK Visa", "Canada Visa", "Australia Visa", "Schengen Visa", "UAE Visa"];

export function Footer() {
  return (
    <footer className="bg-nav-surface px-8 py-16 text-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[linear-gradient(135deg,var(--gradient-cta-start),var(--gradient-cta-end))] font-display text-lg font-bold text-white">
              G
            </span>
            <span className="font-display text-base font-bold">GVS</span>
          </div>
          <p className="mt-4 text-sm text-white/70">
            India&apos;s trusted visa service partner for businesses and corporates since 2009.
          </p>
          <p className="mt-4 text-sm text-white/70">📞 +91 12345 67890</p>
          <p className="text-sm text-white/70">✉ info@getvisaservices.in</p>
          <p className="text-sm text-white/70">📍 Mumbai · Delhi · Bangalore</p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide">Services</h4>
          <ul className="mt-4 space-y-2">
            {SERVICE_LINKS.map((label) => (
              <li key={label}>
                <Link href="/services" className="text-sm text-white/70">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide">Company</h4>
          <ul className="mt-4 space-y-2">
            {COMPANY_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm text-white/70">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide">Countries</h4>
          <ul className="mt-4 space-y-2">
            {COUNTRY_LINKS.map((label) => (
              <li key={label}>
                <a href="#" className="text-sm text-white/70">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1200px] flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row">
        <p>© 2026 GVS - Get Visa Services. All rights reserved. | getvisaservices.in</p>
        <div className="flex gap-4">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
