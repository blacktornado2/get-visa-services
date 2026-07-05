export function getVisaByDate(processingDaysEstimate: number, from: Date = new Date()): Date {
  const result = new Date(from);
  result.setDate(result.getDate() + processingDaysEstimate);
  return result;
}

export function formatVisaByDate(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}
