import { Check, ShieldCheck } from "lucide-react";

export function GuaranteeCard() {
  return (
    <div className="relative mt-8 overflow-hidden rounded-card bg-[linear-gradient(135deg,var(--gradient-hero-start),var(--gradient-hero-end)_65%,var(--gradient-cta-start))] p-6 text-white shadow-xl shadow-black/10 sm:p-8">
      <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />

      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
            <ShieldCheck size={24} className="text-accent" />
          </span>
          <h3 className="font-display text-xl font-bold tracking-tight">GVS Guarantee</h3>
        </div>
        <span className="rounded-pill bg-white/15 px-4 py-1 text-xs font-semibold ring-1 ring-white/20">
          Included
        </span>
      </div>

      <div className="relative mt-6 space-y-3 text-sm text-white/90">
        <div className="flex items-start gap-2">
          <Check size={16} className="mt-0.5 shrink-0 text-accent" />
          <p>
            If delayed past our promised date — <span className="font-semibold text-white">100% refund</span>
          </p>
        </div>
        <div className="flex items-start gap-2">
          <Check size={16} className="mt-0.5 shrink-0 text-accent" />
          <p>
            If your application is rejected — <span className="font-semibold text-white">100% refund</span>
          </p>
        </div>
      </div>

      <p className="relative mt-5 border-t border-white/10 pt-4 text-xs text-white/60">
        Covers our service fee only — embassy and visa fees are collected directly by the embassy and are
        non-refundable.
      </p>
    </div>
  );
}
