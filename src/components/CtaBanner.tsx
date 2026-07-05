import Link from "next/link";

type Props = {
  heading: string;
  subcopy?: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

export function CtaBanner({ heading, subcopy, primary, secondary }: Props) {
  return (
    <section className="bg-[linear-gradient(135deg,var(--gradient-cta-start),var(--gradient-cta-end))] px-8 py-16 text-center text-white">
      <h2 className="font-display text-3xl font-bold md:text-4xl">{heading}</h2>
      {subcopy && <p className="mx-auto mt-3 max-w-xl text-white/90">{subcopy}</p>}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link href={primary.href} className="rounded-btn bg-nav-surface px-6 py-3 text-sm font-semibold text-white">
          {primary.label}
        </Link>
        <Link
          href={secondary.href}
          className="rounded-btn border border-white px-6 py-3 text-sm font-semibold text-white"
        >
          {secondary.label}
        </Link>
      </div>
    </section>
  );
}
