import Link from "next/link";

const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-nav-surface px-8 py-10 text-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-3">
            <img src="/gvs-icon.png" alt="" className="h-9 w-9 object-contain" />
            <span className="font-display text-base font-bold">Get Visa Services</span>
          </div>
          <p className="mt-4 text-sm text-white/70">
            A trusted extension of Vagabond Holidays, serving travellers and corporates since 2017.
          </p>
          <p className="mt-4 text-sm text-white/70">📞 +91 98105 45760</p>
          <p className="text-sm text-white/70">✉ ggn@getvisaservices.in</p>
          <p className="text-sm text-white/70">📍 Gurgaon · Noida · Kolkata</p>
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
      </div>

      <div className="mx-auto mt-12 flex max-w-[1200px] flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row">
        <p>© 2026 GVS - Get Visa Services. All rights reserved. | getvisaservices.in</p>
        <div className="flex gap-4">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
