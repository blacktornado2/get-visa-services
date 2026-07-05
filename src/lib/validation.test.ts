import { describe, it, expect } from "vitest";
import { isValidEmail, isValidPhone } from "./validation";

describe("isValidEmail", () => {
  it("accepts well-formed emails", () => {
    expect(isValidEmail("a@b.com")).toBe(true);
  });
  it("rejects malformed emails", () => {
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });
});

describe("isValidPhone", () => {
  it("accepts numbers with optional +, spaces, dashes", () => {
    expect(isValidPhone("+91 12345 67890")).toBe(true);
    expect(isValidPhone("9876543210")).toBe(true);
  });
  it("rejects too-short or invalid values", () => {
    expect(isValidPhone("123")).toBe(false);
    expect(isValidPhone("call me")).toBe(false);
  });
});
