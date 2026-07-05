import { describe, it, expect } from "vitest";
import { getVisaByDate, formatVisaByDate } from "./visa-dates";

describe("getVisaByDate", () => {
  it("adds the processing days to the given date", () => {
    const from = new Date(2026, 0, 1); // 1 Jan 2026
    const result = getVisaByDate(15, from);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(16);
  });

  it("rolls over into the next month", () => {
    const from = new Date(2026, 0, 20); // 20 Jan 2026
    const result = getVisaByDate(15, from);
    expect(result.getMonth()).toBe(1); // February
    expect(result.getDate()).toBe(4);
  });
});

describe("formatVisaByDate", () => {
  it("formats as 'D MMM'", () => {
    const date = new Date(2026, 6, 12); // 12 Jul 2026
    expect(formatVisaByDate(date)).toBe("12 Jul");
  });
});
