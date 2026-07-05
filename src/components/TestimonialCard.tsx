import { Star } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="rounded-card border border-card-border bg-surface p-6">
      <div className="flex gap-1 text-accent">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}
      </div>
      <p className="mt-4 text-sm text-foreground-secondary">&quot;{testimonial.quote}&quot;</p>
      <p className="mt-4 font-display text-sm font-semibold text-foreground">{testimonial.name}</p>
      <p className="text-xs text-foreground-secondary">{testimonial.role}</p>
    </div>
  );
}
