"use client";

import { useState, type FormEvent } from "react";
import { isValidPhone } from "@/lib/validation";

type FormState = { name: string; phone: string; visaType: string; destination: string };
type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = { name: "", phone: "", visaType: "", destination: "" };

export function InquiryForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors: Errors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!isValidPhone(form.phone)) nextErrors.phone = "Enter a valid phone number";
    if (!form.visaType) nextErrors.visaType = "Select a visa type";
    if (!form.destination.trim()) nextErrors.destination = "Destination is required";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
      setForm(initialState);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-card border border-card-border bg-surface p-8 text-center">
        <p className="font-display text-xl font-semibold text-foreground">Thanks — we&apos;ll call you back shortly!</p>
        <button onClick={() => setSubmitted(false)} className="mt-4 text-sm text-accent underline">
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-card border border-card-border bg-surface p-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Full Name"
            className="w-full rounded-btn border border-card-border bg-background px-4 py-3 text-sm text-foreground"
          />
          {errors.name && <p className="mt-1 text-xs text-difficulty-hard">{errors.name}</p>}
        </div>
        <div>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Phone / WhatsApp"
            className="w-full rounded-btn border border-card-border bg-background px-4 py-3 text-sm text-foreground"
          />
          {errors.phone && <p className="mt-1 text-xs text-difficulty-hard">{errors.phone}</p>}
        </div>
        <div>
          <select
            value={form.visaType}
            onChange={(e) => setForm({ ...form, visaType: e.target.value })}
            className="w-full rounded-btn border border-card-border bg-background px-4 py-3 text-sm text-foreground"
          >
            <option value="">Select Visa Type</option>
            <option value="single">Single Entry Tourist Visa</option>
            <option value="multiple">Multiple Entry Tourist Visa</option>
            <option value="evisa">e-Visa / Visa on Arrival</option>
          </select>
          {errors.visaType && <p className="mt-1 text-xs text-difficulty-hard">{errors.visaType}</p>}
        </div>
        <div>
          <input
            value={form.destination}
            onChange={(e) => setForm({ ...form, destination: e.target.value })}
            placeholder="Destination Country"
            className="w-full rounded-btn border border-card-border bg-background px-4 py-3 text-sm text-foreground"
          />
          {errors.destination && <p className="mt-1 text-xs text-difficulty-hard">{errors.destination}</p>}
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-btn bg-[linear-gradient(135deg,var(--gradient-cta-start),var(--gradient-cta-end))] py-3 text-sm font-semibold text-white md:w-auto md:px-8"
      >
        Submit Inquiry — We&apos;ll Call You Back →
      </button>
      <p className="mt-3 text-xs text-foreground-secondary">🔒 Your data is safe with us. No spam, ever.</p>
    </form>
  );
}
