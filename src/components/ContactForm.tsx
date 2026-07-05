"use client";

import { useState, type FormEvent } from "react";
import { isValidEmail, isValidPhone } from "@/lib/validation";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  applicants: string;
  visaType: string;
  destination: string;
  travelDate: string;
  details: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  applicants: "1",
  visaType: "",
  destination: "",
  travelDate: "",
  details: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors: Errors = {};
    if (!form.firstName.trim()) nextErrors.firstName = "First name is required";
    if (!form.lastName.trim()) nextErrors.lastName = "Last name is required";
    if (!isValidEmail(form.email)) nextErrors.email = "Enter a valid email";
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
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            placeholder="First Name"
            className="w-full rounded-btn border border-card-border bg-background px-4 py-3 text-sm text-foreground"
          />
          {errors.firstName && <p className="mt-1 text-xs text-difficulty-hard">{errors.firstName}</p>}
        </div>
        <div>
          <input
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            placeholder="Last Name"
            className="w-full rounded-btn border border-card-border bg-background px-4 py-3 text-sm text-foreground"
          />
          {errors.lastName && <p className="mt-1 text-xs text-difficulty-hard">{errors.lastName}</p>}
        </div>
        <div>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Business Email"
            type="email"
            className="w-full rounded-btn border border-card-border bg-background px-4 py-3 text-sm text-foreground"
          />
          {errors.email && <p className="mt-1 text-xs text-difficulty-hard">{errors.email}</p>}
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
        <input
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          placeholder="Company Name (optional)"
          className="w-full rounded-btn border border-card-border bg-background px-4 py-3 text-sm text-foreground"
        />
        <select
          value={form.applicants}
          onChange={(e) => setForm({ ...form, applicants: e.target.value })}
          className="w-full rounded-btn border border-card-border bg-background px-4 py-3 text-sm text-foreground"
        >
          <option value="1">1 person</option>
          <option value="2-5">2–5</option>
          <option value="5-10">5–10</option>
          <option value="10-20">10–20</option>
          <option value="20+">20+ people</option>
        </select>
        <div>
          <select
            value={form.visaType}
            onChange={(e) => setForm({ ...form, visaType: e.target.value })}
            className="w-full rounded-btn border border-card-border bg-background px-4 py-3 text-sm text-foreground"
          >
            <option value="">Select type</option>
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
            placeholder="e.g. USA, UK, Canada"
            className="w-full rounded-btn border border-card-border bg-background px-4 py-3 text-sm text-foreground"
          />
          {errors.destination && <p className="mt-1 text-xs text-difficulty-hard">{errors.destination}</p>}
        </div>
        <input
          value={form.travelDate}
          onChange={(e) => setForm({ ...form, travelDate: e.target.value })}
          type="date"
          className="w-full rounded-btn border border-card-border bg-background px-4 py-3 text-sm text-foreground"
        />
        <textarea
          value={form.details}
          onChange={(e) => setForm({ ...form, details: e.target.value })}
          placeholder="Additional Details"
          rows={3}
          className="w-full rounded-btn border border-card-border bg-background px-4 py-3 text-sm text-foreground md:col-span-2"
        />
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-btn bg-[linear-gradient(135deg,var(--gradient-cta-start),var(--gradient-cta-end))] py-3 text-sm font-semibold text-white md:w-auto md:px-8"
      >
        Submit Inquiry — We&apos;ll Call You Back
      </button>
      <p className="mt-3 text-xs text-foreground-secondary">🔒 Your information is confidential. No spam — ever.</p>
    </form>
  );
}
