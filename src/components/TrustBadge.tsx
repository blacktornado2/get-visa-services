import { ShieldCheck } from "lucide-react";

export function TrustBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <ShieldCheck size={18} className="shrink-0 text-accent" />
      <span className="text-sm font-bold text-foreground underline decoration-accent decoration-2 underline-offset-4">
        On-Time Guaranteed
      </span>
    </span>
  );
}
