import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/countries", label: "Countries" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-[68px] border-b border-white/10 bg-nav-surface/92 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-8">
        <Link href="/" className="flex items-center gap-3">
          <img src="/gvs-icon.png" alt="" className="h-9 w-9 object-contain" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-bold text-white">GVS</span>
            <span className="text-[10px] font-semibold tracking-[2px] text-white/70">
              GET VISA SERVICES
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/contact"
            className="rounded-btn bg-[linear-gradient(135deg,var(--gradient-cta-start),var(--gradient-cta-end))] px-5 py-2 text-sm font-semibold text-white"
          >
            Get Free Consultation
          </Link>
        </div>
      </div>
    </header>
  );
}
