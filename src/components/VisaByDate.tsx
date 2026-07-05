"use client";

import { useEffect, useState } from "react";
import { getVisaByDate, formatVisaByDate } from "@/lib/visa-dates";

export function VisaByDate({ processingDaysEstimate }: { processingDaysEstimate: number }) {
  // Computed client-side after mount: this page is statically prerendered, so a
  // build-time `new Date()` would bake a stale date into the HTML and mismatch
  // whatever the client's clock says at hydration.
  const [visaByDate, setVisaByDate] = useState<string | null>(null);

  useEffect(() => {
    setVisaByDate(formatVisaByDate(getVisaByDate(processingDaysEstimate)));
  }, [processingDaysEstimate]);

  return <>{visaByDate ?? "—"}</>;
}
