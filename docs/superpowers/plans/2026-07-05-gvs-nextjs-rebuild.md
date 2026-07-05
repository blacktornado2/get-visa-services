# GVS Next.js Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the 6-page GVS marketing site (design specified in the `*.dc.html` prototypes / `README.md`) as a production Next.js app, per `docs/superpowers/specs/2026-07-05-gvs-nextjs-rebuild-design.md`.

**Architecture:** Next.js App Router + TypeScript, Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.ts`) with CSS variables driving light/dark theming via a `data-theme` attribute, a single canonical country dataset shared by two pages, client-only forms (no backend), Vitest for the handful of pure-logic units.

**Tech Stack:** Next.js 16.2.10, React 19.2.4, TypeScript 5, Tailwind CSS 4.3, lucide-react (icons), next/font/google (Playfair Display + Plus Jakarta Sans), Vitest (unit tests). Verified by scaffolding a throwaway probe app before writing this plan — these are the exact versions `create-next-app@latest` currently installs.

## Global Constraints

- Next.js App Router + TypeScript + Tailwind CSS v4 — no `tailwind.config.ts`; all design tokens live in `src/app/globals.css` under `@theme inline`.
- Theming via CSS variables switched by `[data-theme="dark"]` on `<html>` — never use `!important` overrides.
- Do not implement the retired navy `#0B1F3A` / gold `#C9A84C` values anywhere.
- Forms (`InquiryForm`, `ContactForm`) do client-side validation only and show an inline success state — no network calls, no backend wiring.
- Keep all placeholder content as-is: WhatsApp number `911234567890`, the 3 office addresses, blog posts/images, country images — do not invent real business data.
- Services page covers **Tourist Visa only** — do not add Business/Student/Work visa content.
- One canonical country dataset (`src/data/countries.ts`, 39 entries) and one shared `CountryCard` component used by both Home and Countries pages — never duplicate country data.
- One shared `Footer` component (full 4-column variant) rendered on every page — no compact variant.
- Use plain `<img>` tags for all photos (not `next/image`) — avoids Next's remote-image-domain allowlist config, which this project doesn't otherwise need.

---

### Task 1: Project scaffold & tooling

**Files:**
- Create: `design-reference/About.dc.html`, `design-reference/Blog.dc.html`, `design-reference/Contact.dc.html`, `design-reference/Countries.dc.html`, `design-reference/Home.dc.html`, `design-reference/Services.dc.html` (moved from repo root)
- Create: full Next.js scaffold at repo root (`package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `public/*`, `.gitignore`)
- Modify: `vitest.config.ts` (create)

**Interfaces:**
- Produces: an npm project at repo root with `npm run dev`, `npm run build`, `npm run lint`, `npm test` scripts; `@/*` import alias resolving to `src/*`.

- [ ] **Step 1: Move the design prototypes out of the repo root**

The prototypes currently sit at the repo root alongside `README.md`. `create-next-app` refuses to scaffold into a non-empty directory unless the extra files are on its safe-list (`README.md` is; `*.dc.html` files are not). Move them into a `design-reference/` folder so they stay in git history but stop blocking the scaffold.

```bash
mkdir -p design-reference
git mv About.dc.html Blog.dc.html Contact.dc.html Countries.dc.html Home.dc.html Services.dc.html design-reference/
git commit -m "Move design prototypes to design-reference/"
```

- [ ] **Step 2: Scaffold Next.js into a temp dir, then merge into the repo**

`create-next-app` still won't run cleanly with `docs/` and `design-reference/` present, so scaffold into an isolated temp directory and copy the result in (excluding its own `.git`, since the repo already has one).

```bash
SCAFFOLD_DIR=$(mktemp -d)
npx --yes create-next-app@latest "$SCAFFOLD_DIR/app" --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack
rsync -a --exclude='.git' "$SCAFFOLD_DIR/app/" ./
rm -rf "$SCAFFOLD_DIR"
```

- [ ] **Step 3: Verify the scaffold**

```bash
cat package.json
```

Expected: a `"next"` dependency around `16.x`, a `"react"` dependency around `19.x`, `"tailwindcss": "^4"` in devDependencies, and `dev`/`build`/`start`/`lint` scripts.

```bash
npm run build
```

Expected: build succeeds (uses the scaffold's default placeholder homepage — we replace it in later tasks).

- [ ] **Step 4: Install the extra dependencies this project needs**

```bash
npm install lucide-react
npm install -D vitest
npm pkg set scripts.test="vitest run"
```

- [ ] **Step 5: Add the Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
  },
});
```

- [ ] **Step 6: Verify the test runner works with no tests yet**

```bash
npm test
```

Expected: `No test files found` (not an error) — confirms Vitest is wired up before any test files exist.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Scaffold Next.js + TypeScript + Tailwind v4 + Vitest"
```

---

### Task 2: Design tokens (theme CSS + fonts)

**Files:**
- Modify: `src/app/globals.css` (replace scaffold defaults with GVS design tokens)
- Modify: `src/app/page.tsx` (placeholder stub — see Step 2)

Note: `globals.css` references `--font-playfair`/`--font-jakarta`, which stay undefined until Task 12 wires up the actual `next/font/google` loader in `layout.tsx`. That's fine — no component using `font-display`/`font-body` is actually mounted into the rendered app until Task 12 assembles the root layout, so there's no visible gap.

**Interfaces:**
- Produces: Tailwind utilities usable by all later components: `bg-background`, `text-foreground`, `text-foreground-secondary`, `bg-surface`/`border-surface`, `bg-accent`/`text-accent`/`border-accent`, `bg-nav-surface`, `border-card-border`, `bg-whatsapp`, `text-difficulty-easy`/`text-difficulty-moderate`/`text-difficulty-hard`, `rounded-card`/`rounded-btn`/`rounded-pill`, `font-display`/`font-body`. Plus raw CSS vars `--gradient-hero-start`, `--gradient-hero-end`, `--gradient-cta-start`, `--gradient-cta-end` for gradient backgrounds via arbitrary values.

- [ ] **Step 1: Replace `src/app/globals.css`**

```css
@import "tailwindcss";

:root {
  --background: #FDF6F0;
  --foreground: #1a0a0f;
  --foreground-secondary: #5a3a3a;
  --surface: #ffffff;
  --accent: #D4A96A;
  --nav-surface: #3D1A24;
  --card-border: #e8e4da;
  --gradient-hero-start: #3D1A24;
  --gradient-hero-end: #6b2d3e;
  --gradient-cta-start: #D4A96A;
  --gradient-cta-end: #e8c285;
}

[data-theme="dark"] {
  --background: #12121f;
  --foreground: #ffffff;
  --foreground-secondary: rgba(255, 255, 255, 0.65);
  --surface: #1a1a2e;
  --accent: #B87333;
  --nav-surface: #0D0D1A;
  --card-border: rgba(184, 115, 51, 0.2);
  --gradient-hero-start: #0D0D1A;
  --gradient-hero-end: #1a1a3e;
  --gradient-cta-start: #B87333;
  --gradient-cta-end: #d4905a;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-foreground-secondary: var(--foreground-secondary);
  --color-surface: var(--surface);
  --color-accent: var(--accent);
  --color-nav-surface: var(--nav-surface);
  --color-card-border: var(--card-border);
  --color-whatsapp: #25D366;
  --color-difficulty-easy: #1F8A5B;
  --color-difficulty-moderate: #C9A84C;
  --color-difficulty-hard: #C94C4C;
  --radius-card: 20px;
  --radius-btn: 8px;
  --radius-pill: 100px;
  --font-display: var(--font-playfair);
  --font-body: var(--font-jakarta);
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
}
```

- [ ] **Step 2: Delete the scaffold's placeholder homepage content (keep the file, we rewrite it in Task 14)**

```bash
cat > src/app/page.tsx << 'EOF'
export default function HomePage() {
  return null;
}
EOF
```

- [ ] **Step 3: Verify it builds**

```bash
npm run build
```

Expected: succeeds with no CSS errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/page.tsx
git commit -m "Add GVS design tokens to globals.css"
```

---

### Task 3: Form validation helpers

**Files:**
- Create: `src/lib/validation.ts`
- Test: `src/lib/validation.test.ts`

**Interfaces:**
- Produces: `isValidEmail(value: string): boolean`, `isValidPhone(value: string): boolean` — consumed by `InquiryForm` (Task 14) and `ContactForm` (Task 19).

- [ ] **Step 1: Write the failing test**

Create `src/lib/validation.test.ts`:

```ts
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
```

- [ ] **Step 2: Run it to verify it fails**

```bash
npx vitest run src/lib/validation.test.ts
```

Expected: FAIL — `Cannot find module './validation'`.

- [ ] **Step 3: Implement**

Create `src/lib/validation.ts`:

```ts
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  return /^\+?[0-9\s-]{7,15}$/.test(value.trim());
}
```

- [ ] **Step 4: Run it to verify it passes**

```bash
npx vitest run src/lib/validation.test.ts
```

Expected: PASS, 4 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/validation.ts src/lib/validation.test.ts
git commit -m "Add form validation helpers"
```

---

### Task 4: Theme system

**Files:**
- Create: `src/contexts/theme-context.tsx`
- Create: `src/components/ThemeToggle.tsx`

**Interfaces:**
- Produces: `ThemeProvider` (wraps the app in Task 12's layout), `useTheme(): { theme: "light" | "dark"; toggleTheme: () => void }`, `<ThemeToggle />` component (used in Task 9's Nav).
- Consumes: nothing from earlier tasks.

- [ ] **Step 1: Create the theme context**

Create `src/contexts/theme-context.tsx`:

```tsx
"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
type ThemeContextValue = { theme: Theme; toggleTheme: () => void };

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("gvs-theme");
    setTheme(stored === "dark" ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("gvs-theme", next);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
```

- [ ] **Step 2: Create the toggle button**

Create `src/components/ThemeToggle.tsx`:

```tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 rounded-pill border border-card-border px-4 py-2 text-sm font-medium text-foreground"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
```

- [ ] **Step 3: Verify it type-checks**

```bash
npx tsc --noEmit
```

Expected: no errors (these files aren't imported anywhere yet, but must still type-check standalone).

- [ ] **Step 4: Commit**

```bash
git add src/contexts/theme-context.tsx src/components/ThemeToggle.tsx
git commit -m "Add theme context and toggle button"
```

---

### Task 5: Country data model + visa-by-date logic

**Files:**
- Create: `src/data/countries.ts`
- Create: `src/lib/visa-dates.ts`
- Test: `src/lib/visa-dates.test.ts`

**Interfaces:**
- Produces: `Country` type, `countries: Country[]` (39 entries) from `src/data/countries.ts`; `getVisaByDate(processingDaysEstimate: number, from?: Date): Date` and `formatVisaByDate(date: Date): string` from `src/lib/visa-dates.ts`. Consumed by `CountryCard` (Task 7), `country-filters.ts` (Task 6), Home/Countries pages (Tasks 14–15).

- [ ] **Step 1: Create the country dataset**

Create `src/data/countries.ts`:

```ts
export type CountryRegion = "europe" | "americas" | "asia" | "middleeast" | "africa";
export type VisaCategory = "evisa" | "arrival" | "embassy";
export type Difficulty = "Easy" | "Moderate" | "Hard";

export type Country = {
  name: string;
  flag: string;
  code: string;
  region: CountryRegion;
  type: string;
  entry: string;
  processing: string;
  processingDaysEstimate: number;
  fee: string;
  evisa: boolean;
  visaCategory: VisaCategory;
  difficulty: Difficulty;
  popular: boolean;
  notes: string;
  imageSeed: string;
};

export const countries: Country[] = [
  { name: "France", flag: "🇫🇷", code: "fr", region: "europe", type: "Schengen Visa", entry: "Single/Multiple", processing: "10–15 days", processingDaysEstimate: 15, fee: "₹8,500", evisa: false, visaCategory: "embassy", difficulty: "Moderate", popular: true, notes: "Bank statements last 3 months required. Cover letter recommended.", imageSeed: "france" },
  { name: "Germany", flag: "🇩🇪", code: "de", region: "europe", type: "Schengen Visa", entry: "Single/Multiple", processing: "10–15 days", processingDaysEstimate: 15, fee: "₹8,500", evisa: false, visaCategory: "embassy", difficulty: "Moderate", popular: true, notes: "Strong financial proof required. Purpose of visit must be clearly stated.", imageSeed: "germany" },
  { name: "Italy", flag: "🇮🇹", code: "it", region: "europe", type: "Schengen Visa", entry: "Single/Multiple", processing: "10–15 days", processingDaysEstimate: 15, fee: "₹8,500", evisa: false, visaCategory: "embassy", difficulty: "Moderate", popular: true, notes: "Hotel bookings and travel itinerary mandatory.", imageSeed: "italy" },
  { name: "Spain", flag: "🇪🇸", code: "es", region: "europe", type: "Schengen Visa", entry: "Single/Multiple", processing: "10–15 days", processingDaysEstimate: 15, fee: "₹8,500", evisa: false, visaCategory: "embassy", difficulty: "Moderate", popular: false, notes: "Travel insurance minimum €30,000 required.", imageSeed: "spain" },
  { name: "Netherlands", flag: "🇳🇱", code: "nl", region: "europe", type: "Schengen Visa", entry: "Single/Multiple", processing: "10–15 days", processingDaysEstimate: 15, fee: "₹8,500", evisa: false, visaCategory: "embassy", difficulty: "Moderate", popular: false, notes: "Apply at least 3 weeks in advance.", imageSeed: "netherlands" },
  { name: "Greece", flag: "🇬🇷", code: "gr", region: "europe", type: "Schengen Visa", entry: "Single/Multiple", processing: "8–12 days", processingDaysEstimate: 12, fee: "₹8,500", evisa: false, visaCategory: "embassy", difficulty: "Easy", popular: false, notes: "One of the more straightforward Schengen applications.", imageSeed: "greece" },
  { name: "Switzerland", flag: "🇨🇭", code: "ch", region: "europe", type: "Schengen Visa", entry: "Single/Multiple", processing: "10–15 days", processingDaysEstimate: 15, fee: "₹9,200", evisa: false, visaCategory: "embassy", difficulty: "Moderate", popular: true, notes: "Not EU but part of Schengen. Higher funds proof needed.", imageSeed: "switzerland" },
  { name: "UK", flag: "🇬🇧", code: "gb", region: "europe", type: "Standard Visitor Visa", entry: "Multiple", processing: "15–21 days", processingDaysEstimate: 21, fee: "₹14,000", evisa: false, visaCategory: "embassy", difficulty: "Moderate", popular: true, notes: "Strong ties to home country required. Financial proof essential.", imageSeed: "uk" },
  { name: "Portugal", flag: "🇵🇹", code: "pt", region: "europe", type: "Schengen Visa", entry: "Single/Multiple", processing: "10–15 days", processingDaysEstimate: 15, fee: "₹8,500", evisa: false, visaCategory: "embassy", difficulty: "Easy", popular: false, notes: "High approval rate. Straightforward documentation.", imageSeed: "portugal" },
  { name: "USA", flag: "🇺🇸", code: "us", region: "americas", type: "B-2 Tourist Visa", entry: "Multiple", processing: "4–8 weeks", processingDaysEstimate: 56, fee: "₹14,000", evisa: false, visaCategory: "embassy", difficulty: "Hard", popular: true, notes: "Interview at US consulate required. Strong ties to India must be demonstrated.", imageSeed: "usa" },
  { name: "Canada", flag: "🇨🇦", code: "ca", region: "americas", type: "Visitor Visa (TRV)", entry: "Multiple", processing: "2–8 weeks", processingDaysEstimate: 56, fee: "₹11,500", evisa: false, visaCategory: "embassy", difficulty: "Moderate", popular: true, notes: "Biometrics required. Apply well in advance.", imageSeed: "canada" },
  { name: "Mexico", flag: "🇲🇽", code: "mx", region: "americas", type: "Tourist Card (FMM)", entry: "Single", processing: "On arrival", processingDaysEstimate: 1, fee: "₹1,200", evisa: true, visaCategory: "arrival", difficulty: "Easy", popular: false, notes: "Visa-free for Indian passport holders with valid US visa.", imageSeed: "mexico" },
  { name: "Brazil", flag: "🇧🇷", code: "br", region: "americas", type: "Tourist Visa", entry: "Single", processing: "5–10 days", processingDaysEstimate: 10, fee: "₹7,500", evisa: true, visaCategory: "evisa", difficulty: "Easy", popular: false, notes: "e-Visa available online. Processing within 72 hours usually.", imageSeed: "brazil" },
  { name: "Argentina", flag: "🇦🇷", code: "ar", region: "americas", type: "Tourist Visa", entry: "Single", processing: "5–10 days", processingDaysEstimate: 10, fee: "₹5,500", evisa: false, visaCategory: "embassy", difficulty: "Moderate", popular: false, notes: "Apply at Argentine consulate in your city.", imageSeed: "argentina" },
  { name: "Thailand", flag: "🇹🇭", code: "th", region: "asia", type: "Tourist Visa (TR)", entry: "Single", processing: "3–5 days", processingDaysEstimate: 5, fee: "₹3,500", evisa: true, visaCategory: "evisa", difficulty: "Easy", popular: true, notes: "Visa on arrival also available for 30 days. e-Visa recommended for longer stays.", imageSeed: "thailand" },
  { name: "Japan", flag: "🇯🇵", code: "jp", region: "asia", type: "Tourist Visa", entry: "Single/Multiple", processing: "5–7 days", processingDaysEstimate: 7, fee: "₹5,500", evisa: false, visaCategory: "embassy", difficulty: "Moderate", popular: true, notes: "Requires invitation or travel agency itinerary. Detailed documents needed.", imageSeed: "japan" },
  { name: "Australia", flag: "🇦🇺", code: "au", region: "asia", type: "Visitor Visa (600)", entry: "Multiple", processing: "15–30 days", processingDaysEstimate: 30, fee: "₹16,000", evisa: false, visaCategory: "embassy", difficulty: "Moderate", popular: true, notes: "Online application. Health insurance and financial proof needed.", imageSeed: "australia" },
  { name: "Singapore", flag: "🇸🇬", code: "sg", region: "asia", type: "Tourist Visa", entry: "Single/Multiple", processing: "3–5 days", processingDaysEstimate: 5, fee: "₹3,200", evisa: true, visaCategory: "evisa", difficulty: "Easy", popular: true, notes: "e-Visa available. Very high approval rate for Indian tourists.", imageSeed: "singapore" },
  { name: "Bali / Indonesia", flag: "🇮🇩", code: "id", region: "asia", type: "Visa on Arrival", entry: "Single", processing: "On arrival", processingDaysEstimate: 1, fee: "₹3,000", evisa: true, visaCategory: "arrival", difficulty: "Easy", popular: true, notes: "Visa on arrival at major airports. Also available as e-Visa.", imageSeed: "bali-indonesia" },
  { name: "Vietnam", flag: "🇻🇳", code: "vn", region: "asia", type: "e-Visa", entry: "Single", processing: "3 days", processingDaysEstimate: 3, fee: "₹2,200", evisa: true, visaCategory: "evisa", difficulty: "Easy", popular: true, notes: "e-Visa fully online. Valid 90 days. Very straightforward process.", imageSeed: "vietnam" },
  { name: "Malaysia", flag: "🇲🇾", code: "my", region: "asia", type: "eNTRI / Visa", entry: "Single", processing: "1–3 days", processingDaysEstimate: 3, fee: "₹2,800", evisa: true, visaCategory: "evisa", difficulty: "Easy", popular: true, notes: "eNTRI available for Indian passport holders. 30-day stay.", imageSeed: "malaysia" },
  { name: "South Korea", flag: "🇰🇷", code: "kr", region: "asia", type: "Tourist Visa (C-3)", entry: "Single/Multiple", processing: "5–7 days", processingDaysEstimate: 7, fee: "₹6,500", evisa: false, visaCategory: "embassy", difficulty: "Moderate", popular: true, notes: "K-ETA digital travel authorization available for some nationalities.", imageSeed: "south-korea" },
  { name: "New Zealand", flag: "🇳🇿", code: "nz", region: "asia", type: "Visitor Visa", entry: "Single", processing: "20–30 days", processingDaysEstimate: 30, fee: "₹14,500", evisa: false, visaCategory: "embassy", difficulty: "Moderate", popular: true, notes: "NZeTA for transit only. Full visitor visa required for Indian passport.", imageSeed: "new-zealand" },
  { name: "Sri Lanka", flag: "🇱🇰", code: "lk", region: "asia", type: "ETA", entry: "Single", processing: "Instant", processingDaysEstimate: 1, fee: "₹2,000", evisa: true, visaCategory: "evisa", difficulty: "Easy", popular: true, notes: "Online ETA within hours. 30-day stay. Very easy process.", imageSeed: "sri-lanka" },
  { name: "Nepal", flag: "🇳🇵", code: "np", region: "asia", type: "Visa on Arrival", entry: "Single", processing: "On arrival", processingDaysEstimate: 1, fee: "Free", evisa: true, visaCategory: "arrival", difficulty: "Easy", popular: false, notes: "Free visa on arrival for Indian passport holders. No application needed.", imageSeed: "nepal" },
  { name: "Philippines", flag: "🇵🇭", code: "ph", region: "asia", type: "Visa on Arrival", entry: "Single", processing: "On arrival", processingDaysEstimate: 1, fee: "Free", evisa: true, visaCategory: "arrival", difficulty: "Easy", popular: false, notes: "Visa on arrival for Indian passport, up to 30 days.", imageSeed: "philippines" },
  { name: "UAE (Dubai)", flag: "🇦🇪", code: "ae", region: "middleeast", type: "Tourist Visa", entry: "Single/Multiple", processing: "2–4 days", processingDaysEstimate: 4, fee: "₹7,500", evisa: true, visaCategory: "evisa", difficulty: "Easy", popular: true, notes: "e-Visa available. 30-day and 90-day options. Very high approval.", imageSeed: "uae-dubai" },
  { name: "Saudi Arabia", flag: "🇸🇦", code: "sa", region: "middleeast", type: "Tourist e-Visa", entry: "Multiple", processing: "24–72 hrs", processingDaysEstimate: 3, fee: "₹6,800", evisa: true, visaCategory: "evisa", difficulty: "Easy", popular: true, notes: "Online e-Visa. Valid 1 year, multiple entry, 90 days per visit.", imageSeed: "saudi-arabia" },
  { name: "Qatar", flag: "🇶🇦", code: "qa", region: "middleeast", type: "Tourist Visa", entry: "Single", processing: "2–3 days", processingDaysEstimate: 3, fee: "₹5,200", evisa: true, visaCategory: "evisa", difficulty: "Easy", popular: false, notes: "Visa on arrival available. e-Visa recommended for advance planning.", imageSeed: "qatar" },
  { name: "Oman", flag: "🇴🇲", code: "om", region: "middleeast", type: "Tourist e-Visa", entry: "Single", processing: "24–48 hrs", processingDaysEstimate: 2, fee: "₹4,800", evisa: true, visaCategory: "evisa", difficulty: "Easy", popular: false, notes: "e-Visa online. 30-day visit visa. Quick processing.", imageSeed: "oman" },
  { name: "Jordan", flag: "🇯🇴", code: "jo", region: "middleeast", type: "Visa on Arrival", entry: "Single", processing: "On arrival", processingDaysEstimate: 1, fee: "₹4,000", evisa: true, visaCategory: "arrival", difficulty: "Easy", popular: false, notes: "Visa on arrival available. Jordan Pass recommended for tourists.", imageSeed: "jordan" },
  { name: "Bahrain", flag: "🇧🇭", code: "bh", region: "middleeast", type: "Tourist e-Visa", entry: "Single", processing: "Instant–24 hrs", processingDaysEstimate: 1, fee: "₹3,800", evisa: true, visaCategory: "evisa", difficulty: "Easy", popular: false, notes: "e-Visa online. Very quick approval. Up to 14 days stay.", imageSeed: "bahrain" },
  { name: "Kenya", flag: "🇰🇪", code: "ke", region: "africa", type: "e-Visa", entry: "Single", processing: "3–5 days", processingDaysEstimate: 5, fee: "₹4,200", evisa: true, visaCategory: "evisa", difficulty: "Easy", popular: false, notes: "e-Visa mandatory since 2023. Apply at evisa.go.ke.", imageSeed: "kenya" },
  { name: "Tanzania", flag: "🇹🇿", code: "tz", region: "africa", type: "Tourist Visa", entry: "Single", processing: "2–5 days", processingDaysEstimate: 5, fee: "₹4,800", evisa: true, visaCategory: "evisa", difficulty: "Easy", popular: false, notes: "e-Visa available. Visa on arrival also possible at major ports.", imageSeed: "tanzania" },
  { name: "South Africa", flag: "🇿🇦", code: "za", region: "africa", type: "Tourist Visa", entry: "Single", processing: "10–15 days", processingDaysEstimate: 15, fee: "₹7,000", evisa: false, visaCategory: "embassy", difficulty: "Moderate", popular: false, notes: "Apply at VFS centre. Biometrics required.", imageSeed: "south-africa" },
  { name: "Morocco", flag: "🇲🇦", code: "ma", region: "africa", type: "Tourist Visa", entry: "Single", processing: "5–10 days", processingDaysEstimate: 10, fee: "₹4,500", evisa: false, visaCategory: "embassy", difficulty: "Moderate", popular: false, notes: "Apply at Moroccan consulate. Itinerary and hotel bookings required.", imageSeed: "morocco" },
  { name: "Egypt", flag: "🇪🇬", code: "eg", region: "africa", type: "Tourist e-Visa", entry: "Single", processing: "3–5 days", processingDaysEstimate: 5, fee: "₹3,500", evisa: true, visaCategory: "evisa", difficulty: "Easy", popular: false, notes: "e-Visa online. Visa on arrival also available at Cairo airport.", imageSeed: "egypt" },
  { name: "Maldives", flag: "🇲🇻", code: "mv", region: "asia", type: "Visa on Arrival", entry: "Single", processing: "On arrival", processingDaysEstimate: 1, fee: "Free", evisa: true, visaCategory: "arrival", difficulty: "Easy", popular: true, notes: "Free 30-day visa on arrival for all nationalities. No application needed.", imageSeed: "maldives" },
  { name: "Mauritius", flag: "🇲🇺", code: "mu", region: "africa", type: "Visa on Arrival", entry: "Single", processing: "On arrival", processingDaysEstimate: 1, fee: "Free", evisa: true, visaCategory: "arrival", difficulty: "Easy", popular: false, notes: "Free visa on arrival for Indian passport holders. Up to 90 days.", imageSeed: "mauritius" },
];
```

- [ ] **Step 2: Write the failing test for visa-by-date logic**

Create `src/lib/visa-dates.test.ts`:

```ts
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
```

- [ ] **Step 3: Run it to verify it fails**

```bash
npx vitest run src/lib/visa-dates.test.ts
```

Expected: FAIL — `Cannot find module './visa-dates'`.

- [ ] **Step 4: Implement**

Create `src/lib/visa-dates.ts`:

```ts
export function getVisaByDate(processingDaysEstimate: number, from: Date = new Date()): Date {
  const result = new Date(from);
  result.setDate(result.getDate() + processingDaysEstimate);
  return result;
}

export function formatVisaByDate(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}
```

- [ ] **Step 5: Run it to verify it passes**

```bash
npx vitest run src/lib/visa-dates.test.ts
```

Expected: PASS, 3 tests.

- [ ] **Step 6: Verify the whole project still type-checks**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add src/data/countries.ts src/lib/visa-dates.ts src/lib/visa-dates.test.ts
git commit -m "Add canonical country dataset and visa-by-date logic"
```

---

### Task 6: Country filter logic

**Files:**
- Create: `src/lib/country-filters.ts`
- Test: `src/lib/country-filters.test.ts`

**Interfaces:**
- Consumes: `Country` type from `src/data/countries.ts` (Task 5).
- Produces: `CountryFilters` type `{ search: string; region: string; visaCategory: string; processingSpeed: string }`, `processingSpeedBucket(days: number): "fast" | "medium" | "slow"`, `matchesFilters(country: Country, filters: CountryFilters): boolean` — consumed by `FilterBar` (Task 8), Home/Countries pages (Tasks 14–15).

- [ ] **Step 1: Write the failing test**

Create `src/lib/country-filters.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { matchesFilters, processingSpeedBucket, type CountryFilters } from "./country-filters";
import type { Country } from "@/data/countries";

function makeCountry(overrides: Partial<Country>): Country {
  return {
    name: "Testland",
    flag: "🏳️",
    code: "tl",
    region: "asia",
    type: "Tourist Visa",
    entry: "Single",
    processing: "5 days",
    processingDaysEstimate: 5,
    fee: "₹1,000",
    evisa: true,
    visaCategory: "evisa",
    difficulty: "Easy",
    popular: false,
    notes: "",
    imageSeed: "testland",
    ...overrides,
  };
}

const baseFilters: CountryFilters = {
  search: "",
  region: "all",
  visaCategory: "all",
  processingSpeed: "all",
};

describe("processingSpeedBucket", () => {
  it("buckets days into fast/medium/slow", () => {
    expect(processingSpeedBucket(3)).toBe("fast");
    expect(processingSpeedBucket(10)).toBe("medium");
    expect(processingSpeedBucket(30)).toBe("slow");
  });
});

describe("matchesFilters", () => {
  const france = makeCountry({
    name: "France",
    region: "europe",
    visaCategory: "embassy",
    processingDaysEstimate: 15,
    evisa: false,
  });
  const vietnam = makeCountry({
    name: "Vietnam",
    region: "asia",
    visaCategory: "evisa",
    processingDaysEstimate: 3,
    evisa: true,
  });

  it("matches by search substring, case-insensitive", () => {
    expect(matchesFilters(france, { ...baseFilters, search: "fra" })).toBe(true);
    expect(matchesFilters(france, { ...baseFilters, search: "viet" })).toBe(false);
  });

  it("matches by region", () => {
    expect(matchesFilters(france, { ...baseFilters, region: "europe" })).toBe(true);
    expect(matchesFilters(france, { ...baseFilters, region: "asia" })).toBe(false);
  });

  it("treats region 'evisa' as an e-Visa availability filter, not a region", () => {
    expect(matchesFilters(vietnam, { ...baseFilters, region: "evisa" })).toBe(true);
    expect(matchesFilters(france, { ...baseFilters, region: "evisa" })).toBe(false);
  });

  it("matches by visa category", () => {
    expect(matchesFilters(vietnam, { ...baseFilters, visaCategory: "evisa" })).toBe(true);
    expect(matchesFilters(france, { ...baseFilters, visaCategory: "evisa" })).toBe(false);
  });

  it("matches by processing speed bucket", () => {
    expect(matchesFilters(vietnam, { ...baseFilters, processingSpeed: "fast" })).toBe(true);
    expect(matchesFilters(france, { ...baseFilters, processingSpeed: "fast" })).toBe(false);
  });

  it("combines all filters with AND logic", () => {
    expect(
      matchesFilters(vietnam, { search: "viet", region: "asia", visaCategory: "evisa", processingSpeed: "fast" })
    ).toBe(true);
    expect(
      matchesFilters(vietnam, { search: "viet", region: "asia", visaCategory: "embassy", processingSpeed: "fast" })
    ).toBe(false);
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

```bash
npx vitest run src/lib/country-filters.test.ts
```

Expected: FAIL — `Cannot find module './country-filters'`.

- [ ] **Step 3: Implement**

Create `src/lib/country-filters.ts`:

```ts
import type { Country } from "@/data/countries";

export type CountryFilters = {
  search: string;
  region: string;
  visaCategory: string;
  processingSpeed: string;
};

export function processingSpeedBucket(days: number): "fast" | "medium" | "slow" {
  if (days <= 5) return "fast";
  if (days <= 21) return "medium";
  return "slow";
}

export function matchesFilters(country: Country, filters: CountryFilters): boolean {
  const matchesSearch =
    filters.search.trim() === "" ||
    country.name.toLowerCase().includes(filters.search.trim().toLowerCase());

  const matchesRegion =
    filters.region === "all" ||
    (filters.region === "evisa" ? country.evisa : country.region === filters.region);

  const matchesVisaCategory =
    filters.visaCategory === "all" || country.visaCategory === filters.visaCategory;

  const matchesProcessingSpeed =
    filters.processingSpeed === "all" ||
    processingSpeedBucket(country.processingDaysEstimate) === filters.processingSpeed;

  return matchesSearch && matchesRegion && matchesVisaCategory && matchesProcessingSpeed;
}
```

- [ ] **Step 4: Run it to verify it passes**

```bash
npx vitest run src/lib/country-filters.test.ts
```

Expected: PASS, 7 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/country-filters.ts src/lib/country-filters.test.ts
git commit -m "Add country filter predicate logic"
```

---

### Task 7: CountryCard component (+ detail modal)

**Files:**
- Create: `src/components/CountryCard.tsx`

**Interfaces:**
- Consumes: `Country` type (Task 5), `getVisaByDate`/`formatVisaByDate` (Task 5).
- Produces: `<CountryCard country={Country} />` — consumed by Home (Task 14) and Countries (Task 15) pages.

- [ ] **Step 1: Implement**

Create `src/components/CountryCard.tsx`:

```tsx
"use client";

import { useState } from "react";
import type { Country } from "@/data/countries";
import { getVisaByDate, formatVisaByDate } from "@/lib/visa-dates";

const difficultyColor: Record<Country["difficulty"], string> = {
  Easy: "text-difficulty-easy",
  Moderate: "text-difficulty-moderate",
  Hard: "text-difficulty-hard",
};

export function CountryCard({ country }: { country: Country }) {
  const [open, setOpen] = useState(false);
  const visaByDate = formatVisaByDate(getVisaByDate(country.processingDaysEstimate));

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative aspect-[3/4] w-full overflow-hidden rounded-card border border-card-border text-left"
      >
        <img
          src={`https://picsum.photos/seed/${country.imageSeed}/800/1000`}
          alt={country.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

        <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-white/80 shadow-lg">
          <img
            src={`https://flagcdn.com/w80/${country.code}.png`}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute left-2 top-2 flex gap-1">
          {country.evisa && (
            <span className="rounded-pill bg-accent/90 px-2 py-1 text-[11px] font-semibold text-white">
              e-Visa
            </span>
          )}
          {country.popular && (
            <span className="rounded-pill bg-white/90 px-2 py-1 text-[11px] font-semibold text-black">
              Popular
            </span>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 border-t border-white/20 bg-white/10 p-4 backdrop-blur-md">
          <h3 className="font-display text-lg font-semibold text-white">
            {country.flag} {country.name}
          </h3>
          <p className="text-xs text-white/80">{country.type}</p>
          <p className="mt-1 text-xs font-medium text-white">Get visa by {visaByDate}</p>
          <p className={`mt-1 text-xs font-semibold ${difficultyColor[country.difficulty]}`}>
            {country.difficulty}
          </p>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-card border border-card-border bg-surface p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h3 className="font-display text-2xl font-semibold text-foreground">
                {country.flag} {country.name}
              </h3>
              <button onClick={() => setOpen(false)} className="text-foreground-secondary" aria-label="Close">
                ✕
              </button>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-foreground-secondary">Visa Type</dt>
                <dd className="font-medium text-foreground">{country.type}</dd>
              </div>
              <div>
                <dt className="text-foreground-secondary">Entry</dt>
                <dd className="font-medium text-foreground">{country.entry}</dd>
              </div>
              <div>
                <dt className="text-foreground-secondary">Processing Time</dt>
                <dd className="font-medium text-foreground">{country.processing}</dd>
              </div>
              <div>
                <dt className="text-foreground-secondary">Fee</dt>
                <dd className="font-medium text-foreground">{country.fee}</dd>
              </div>
              <div>
                <dt className="text-foreground-secondary">Get Visa By</dt>
                <dd className="font-medium text-foreground">{visaByDate}</dd>
              </div>
              <div>
                <dt className="text-foreground-secondary">Difficulty</dt>
                <dd className={`font-medium ${difficultyColor[country.difficulty]}`}>{country.difficulty}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-foreground-secondary">{country.notes}</p>
            <a
              href="/contact"
              className="mt-6 inline-block rounded-btn bg-[linear-gradient(135deg,var(--gradient-cta-start),var(--gradient-cta-end))] px-6 py-3 text-sm font-semibold text-white"
            >
              Apply for {country.name} Visa
            </a>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/CountryCard.tsx
git commit -m "Add CountryCard component with detail modal"
```

---

### Task 8: FilterBar component

**Files:**
- Create: `src/components/FilterBar.tsx`

**Interfaces:**
- Consumes: `CountryFilters` type (Task 6).
- Produces: `<FilterBar variant="pills" | "selects" filters={CountryFilters} onChange={(f: CountryFilters) => void} />` — consumed by Home (Task 14) and Countries (Task 15) pages.

- [ ] **Step 1: Implement**

Create `src/components/FilterBar.tsx`:

```tsx
"use client";

import { Search } from "lucide-react";
import type { CountryFilters } from "@/lib/country-filters";

const REGION_OPTIONS = [
  { value: "all", label: "All Regions" },
  { value: "europe", label: "🌍 Europe / Schengen" },
  { value: "americas", label: "🌎 Americas" },
  { value: "asia", label: "🌏 Asia Pacific" },
  { value: "middleeast", label: "🕌 Middle East" },
  { value: "africa", label: "🌍 Africa" },
];

const COUNTRIES_PILL_OPTIONS = [
  { value: "all", label: "All Countries" },
  ...REGION_OPTIONS.slice(1),
  { value: "evisa", label: "⚡ e-Visa Available" },
];

const VISA_CATEGORY_OPTIONS = [
  { value: "all", label: "All Visa Types" },
  { value: "evisa", label: "⚡ e-Visa / Online" },
  { value: "arrival", label: "🛬 Visa on Arrival" },
  { value: "embassy", label: "🏛️ Embassy Visa" },
];

const PROCESSING_OPTIONS = [
  { value: "all", label: "Any Processing Time" },
  { value: "fast", label: "⚡ Fast (≤5 days)" },
  { value: "medium", label: "📅 Medium (6–21 days)" },
  { value: "slow", label: "🕐 Longer (21+ days)" },
];

type Props = {
  variant: "pills" | "selects";
  filters: CountryFilters;
  onChange: (filters: CountryFilters) => void;
};

export function FilterBar({ variant, filters, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative min-w-[220px] flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary"
          size={16}
        />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search destinations..."
          className="w-full rounded-pill border border-card-border bg-surface py-2 pl-9 pr-4 text-sm text-foreground"
        />
      </div>

      {variant === "pills" ? (
        <div className="flex flex-wrap gap-2">
          {COUNTRIES_PILL_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ ...filters, region: opt.value })}
              className={`rounded-pill border px-4 py-2 text-sm font-medium transition-colors ${
                filters.region === opt.value
                  ? "border-accent bg-accent text-white"
                  : "border-card-border text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      ) : (
        <>
          <select
            value={filters.region}
            onChange={(e) => onChange({ ...filters, region: e.target.value })}
            className="rounded-pill border border-card-border bg-surface px-4 py-2 text-sm text-foreground"
          >
            {REGION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <select
            value={filters.visaCategory}
            onChange={(e) => onChange({ ...filters, visaCategory: e.target.value })}
            className="rounded-pill border border-card-border bg-surface px-4 py-2 text-sm text-foreground"
          >
            {VISA_CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <select
            value={filters.processingSpeed}
            onChange={(e) => onChange({ ...filters, processingSpeed: e.target.value })}
            className="rounded-pill border border-card-border bg-surface px-4 py-2 text-sm text-foreground"
          >
            {PROCESSING_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/FilterBar.tsx
git commit -m "Add FilterBar component (pills + selects variants)"
```

---

### Task 9: Nav component

**Files:**
- Create: `src/components/Nav.tsx`

**Interfaces:**
- Consumes: `<ThemeToggle />` (Task 4).
- Produces: `<Nav />` — consumed by root layout (Task 12).

- [ ] **Step 1: Implement**

Create `src/components/Nav.tsx`:

```tsx
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/countries", label: "Countries" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-[68px] border-b border-card-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[linear-gradient(135deg,var(--gradient-cta-start),var(--gradient-cta-end))] font-display text-lg font-bold text-white">
            G
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-bold text-foreground">GVS</span>
            <span className="text-[10px] font-semibold tracking-[2px] text-foreground-secondary">
              GET VISA SERVICES
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/contact"
            className="rounded-btn bg-[linear-gradient(135deg,var(--gradient-cta-start),var(--gradient-cta-end))] px-5 py-2 text-sm font-semibold text-white"
          >
            Get Free Consultation
          </Link>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "Add Nav component"
```

---

### Task 10: Footer component

**Files:**
- Create: `src/components/Footer.tsx`

**Interfaces:**
- Produces: `<Footer />` — consumed by root layout (Task 12).

- [ ] **Step 1: Implement**

Create `src/components/Footer.tsx`:

```tsx
import Link from "next/link";

const SERVICE_LINKS = ["Tourist Visa", "Business Visa", "Work Visa", "Student Visa", "Visa Renewal", "Attestation"];
const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];
const COUNTRY_LINKS = ["USA Visa", "UK Visa", "Canada Visa", "Australia Visa", "Schengen Visa", "UAE Visa"];

export function Footer() {
  return (
    <footer className="bg-nav-surface px-8 py-16 text-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[linear-gradient(135deg,var(--gradient-cta-start),var(--gradient-cta-end))] font-display text-lg font-bold text-white">
              G
            </span>
            <span className="font-display text-base font-bold">GVS</span>
          </div>
          <p className="mt-4 text-sm text-white/70">
            India&apos;s trusted visa service partner for businesses and corporates since 2009.
          </p>
          <p className="mt-4 text-sm text-white/70">📞 +91 12345 67890</p>
          <p className="text-sm text-white/70">✉ info@getvisaservices.in</p>
          <p className="text-sm text-white/70">📍 Mumbai · Delhi · Bangalore</p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide">Services</h4>
          <ul className="mt-4 space-y-2">
            {SERVICE_LINKS.map((label) => (
              <li key={label}>
                <Link href="/services" className="text-sm text-white/70">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide">Company</h4>
          <ul className="mt-4 space-y-2">
            {COMPANY_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm text-white/70">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide">Countries</h4>
          <ul className="mt-4 space-y-2">
            {COUNTRY_LINKS.map((label) => (
              <li key={label}>
                <a href="#" className="text-sm text-white/70">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1200px] flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row">
        <p>© 2026 GVS - Get Visa Services. All rights reserved. | getvisaservices.in</p>
        <div className="flex gap-4">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "Add Footer component"
```

---

### Task 11: WhatsAppButton component

**Files:**
- Create: `src/components/WhatsAppButton.tsx`

**Interfaces:**
- Produces: `<WhatsAppButton />` — consumed by root layout (Task 12).

- [ ] **Step 1: Implement**

Create `src/components/WhatsAppButton.tsx`:

```tsx
export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/911234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp shadow-lg"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.13c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2 .9 2.14.07.14.12.31.02.5-.1.19-.15.31-.3.48-.15.17-.31.38-.44.51-.15.14-.3.3-.13.58.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.35 1.44.29.14.46.12.63-.07.17-.19.71-.83.9-1.11.19-.29.38-.24.63-.14.26.1 1.65.78 1.93.92.29.14.48.21.55.33.07.12.07.68-.17 1.35z" />
      </svg>
    </a>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/WhatsAppButton.tsx
git commit -m "Add floating WhatsApp button"
```

---

### Task 12: Root layout assembly

**Files:**
- Modify: `src/app/layout.tsx` (full rewrite)

**Interfaces:**
- Consumes: `ThemeProvider` (Task 4), `Nav` (Task 9), `Footer` (Task 10), `WhatsAppButton` (Task 11).
- Produces: the shared shell every page renders inside.

- [ ] **Step 1: Rewrite the root layout**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/contexts/theme-context";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "GVS - Get Visa Services",
  description: "India's trusted tourist visa consultancy for businesses and corporates.",
};

const noFlashThemeScript = `(function(){try{var t=localStorage.getItem('gvs-theme')||'light';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
      </head>
      <body className="font-body">
        <ThemeProvider>
          <Nav />
          <main className="pt-[68px]">{children}</main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify the app builds and renders the shell**

```bash
npm run build
```

Expected: succeeds (Home page still renders `null`, but Nav/Footer/WhatsApp should render around it — confirmed visually in Task 20's manual QA pass).

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "Assemble root layout with Nav, Footer, WhatsApp button, and theming"
```

---

### Task 13: Shared marketing components (StatTile, CtaBanner, OfficeCard, ValueCard, PricingTier)

**Files:**
- Create: `src/components/StatTile.tsx`
- Create: `src/components/CtaBanner.tsx`
- Create: `src/components/OfficeCard.tsx`
- Create: `src/components/ValueCard.tsx`
- Create: `src/components/PricingTier.tsx`

**Interfaces:**
- Produces: `<StatTile value={string} label={string} />`, `<CtaBanner heading={string} subcopy?={string} primary={{label,href}} secondary={{label,href}} />`, `<OfficeCard label={string} city={string} address={string} />`, `<ValueCard title={string} description={string} />`, `<PricingTier name price priceNote? features={string[]} featured? cta={{label,href}} />`. Consumed by Home (14), Services (16), About (17), Contact (19) pages.

- [ ] **Step 1: Create StatTile**

Create `src/components/StatTile.tsx`:

```tsx
export function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-card border border-card-border bg-surface p-6 text-center">
      <p className="font-display text-3xl font-bold text-accent">{value}</p>
      <p className="mt-1 text-sm text-foreground-secondary">{label}</p>
    </div>
  );
}
```

- [ ] **Step 2: Create CtaBanner**

Create `src/components/CtaBanner.tsx`:

```tsx
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
```

- [ ] **Step 3: Create OfficeCard**

Create `src/components/OfficeCard.tsx`:

```tsx
export function OfficeCard({ label, city, address }: { label: string; city: string; address: string }) {
  return (
    <div className="rounded-card border border-card-border bg-surface p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent">{label}</p>
      <h3 className="mt-2 font-display text-xl font-semibold text-foreground">{city}</h3>
      <p className="mt-2 text-sm text-foreground-secondary">{address}</p>
    </div>
  );
}
```

- [ ] **Step 4: Create ValueCard**

Create `src/components/ValueCard.tsx`:

```tsx
export function ValueCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-card border border-card-border bg-surface p-6">
      <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-foreground-secondary">{description}</p>
    </div>
  );
}
```

- [ ] **Step 5: Create PricingTier**

Create `src/components/PricingTier.tsx`:

```tsx
import { Check } from "lucide-react";

type Props = {
  name: string;
  price: string;
  priceNote?: string;
  features: string[];
  featured?: boolean;
  cta: { label: string; href: string };
};

export function PricingTier({ name, price, priceNote, features, featured, cta }: Props) {
  return (
    <div
      className={`relative rounded-card border p-8 ${
        featured ? "border-accent bg-surface shadow-lg" : "border-card-border bg-surface"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-pill bg-accent px-4 py-1 text-xs font-semibold text-white">
          Most Popular
        </span>
      )}
      <h3 className="font-display text-xl font-semibold text-foreground">{name}</h3>
      <p className="mt-2 font-display text-3xl font-bold text-foreground">
        {price}
        {priceNote && <span className="ml-1 text-sm font-normal text-foreground-secondary">{priceNote}</span>}
      </p>
      <ul className="mt-6 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-foreground-secondary">
            <Check size={16} className="mt-0.5 shrink-0 text-accent" />
            {f}
          </li>
        ))}
      </ul>
      <a
        href={cta.href}
        className="mt-8 block rounded-btn bg-[linear-gradient(135deg,var(--gradient-cta-start),var(--gradient-cta-end))] py-3 text-center text-sm font-semibold text-white"
      >
        {cta.label}
      </a>
    </div>
  );
}
```

- [ ] **Step 6: Verify everything type-checks**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/StatTile.tsx src/components/CtaBanner.tsx src/components/OfficeCard.tsx src/components/ValueCard.tsx src/components/PricingTier.tsx
git commit -m "Add shared marketing components: StatTile, CtaBanner, OfficeCard, ValueCard, PricingTier"
```

---

### Task 14: Home page

**Files:**
- Create: `src/data/testimonials.ts`
- Create: `src/data/faqs.ts`
- Create: `src/components/HowItWorks.tsx`
- Create: `src/components/InquiryForm.tsx`
- Create: `src/components/TestimonialCard.tsx`
- Create: `src/components/FaqAccordion.tsx`
- Modify: `src/app/page.tsx` (full rewrite)

**Interfaces:**
- Consumes: `countries` (Task 5), `matchesFilters`/`CountryFilters` (Task 6), `CountryCard` (Task 7), `FilterBar` (Task 8), `StatTile`/`CtaBanner` (Task 13), `isValidPhone` (Task 3).
- Produces: the `/` route.

- [ ] **Step 1: Create testimonials data**

Create `src/data/testimonials.ts`:

```ts
export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Rahul Sharma",
    role: "HR Director, Infosys",
    quote:
      "GVS handled our entire team's US business visa applications seamlessly. 12 employees, zero rejections — their attention to documentation detail is unmatched.",
  },
  {
    name: "Priya Mehta",
    role: "Travel Manager, TCS",
    quote:
      "Schengen visa for an entire delegation sorted in under a week. Communication was proactive throughout — we always knew where things stood.",
  },
  {
    name: "Amit Joshi",
    role: "CEO, Joshi Exports",
    quote:
      "We've been using GVS for 3 years for all our Canada and UK visa requirements. Reliable, fast, and honest about what's achievable.",
  },
];
```

- [ ] **Step 2: Create FAQ data**

Create `src/data/faqs.ts`:

```ts
export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "How long does visa processing typically take?",
    answer:
      "Processing time depends on the destination and visa type, ranging from same-day e-Visas to 4-8 weeks for visas like the US B-2. We give you a clear estimate before you apply.",
  },
  {
    question: "Do you offer corporate bulk visa packages?",
    answer:
      "Yes — we manage group and corporate applications with a dedicated account manager, consolidated documentation review, and monthly invoicing for teams of 5 or more.",
  },
  {
    question: "What if my visa application is rejected?",
    answer:
      "We review the rejection reason with you and, where eligible, help you re-file with corrected documentation. Our Professional and Corporate plans include free re-filing support.",
  },
  {
    question: "Can I track the status of my application?",
    answer:
      "Yes — you'll receive WhatsApp updates at every stage, from document verification through embassy submission to visa issuance.",
  },
  {
    question: "Which cities do you operate from in India?",
    answer:
      "We have offices in Mumbai (HQ), Delhi, and Bangalore, and serve clients across India via phone, WhatsApp, and courier document pickup.",
  },
];
```

- [ ] **Step 3: Create HowItWorks**

Create `src/components/HowItWorks.tsx`:

```tsx
const STEPS = [
  { title: "Consult", description: "Free consultation with our visa expert to assess eligibility and requirements." },
  { title: "Document", description: "We provide a precise checklist and verify all your documents before submission." },
  { title: "Apply", description: "We submit your application and liaise with the embassy on your behalf." },
  { title: "Travel", description: "Receive your visa and travel with confidence. We handle any follow-ups." },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-[1200px] px-8 py-[100px]">
      <p className="text-center text-xs font-semibold uppercase tracking-[2px] text-accent">How It Works</p>
      <h2 className="mt-2 text-center font-display text-4xl font-bold text-foreground">Your Visa in 4 Simple Steps</h2>
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-4">
        {STEPS.map((step, i) => (
          <div key={step.title} className="text-center">
            <div
              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full font-display text-lg font-bold text-white ${
                i % 2 === 0 ? "bg-nav-surface" : "bg-accent"
              }`}
            >
              {i + 1}
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm text-foreground-secondary">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create InquiryForm**

Create `src/components/InquiryForm.tsx`:

```tsx
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
```

- [ ] **Step 5: Create TestimonialCard**

Create `src/components/TestimonialCard.tsx`:

```tsx
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
```

- [ ] **Step 6: Create FaqAccordion**

Create `src/components/FaqAccordion.tsx`:

```tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/data/faqs";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-card-border rounded-card border border-card-border bg-surface">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.question} className="p-6">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="font-display text-base font-semibold text-foreground">{faq.question}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-accent transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && <p className="mt-3 text-sm text-foreground-secondary">{faq.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 7: Assemble the Home page**

Replace `src/app/page.tsx`:

```tsx
"use client";

import { useMemo, useState } from "react";
import { HowItWorks } from "@/components/HowItWorks";
import { InquiryForm } from "@/components/InquiryForm";
import { FilterBar } from "@/components/FilterBar";
import { CountryCard } from "@/components/CountryCard";
import { StatTile } from "@/components/StatTile";
import { TestimonialCard } from "@/components/TestimonialCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBanner } from "@/components/CtaBanner";
import { countries } from "@/data/countries";
import { testimonials } from "@/data/testimonials";
import { faqs } from "@/data/faqs";
import { matchesFilters, type CountryFilters } from "@/lib/country-filters";

const popularCountries = countries.filter((c) => c.popular);

export default function HomePage() {
  const [filters, setFilters] = useState<CountryFilters>({
    search: "",
    region: "all",
    visaCategory: "all",
    processingSpeed: "all",
  });

  const filteredCountries = useMemo(
    () => popularCountries.filter((c) => matchesFilters(c, filters)),
    [filters]
  );

  return (
    <>
      <HowItWorks />

      <section className="mx-auto max-w-[1200px] px-8 py-[100px]">
        <h2 className="text-center font-display text-4xl font-bold text-foreground">Get a Free Consultation</h2>
        <div className="mx-auto mt-8 max-w-2xl">
          <InquiryForm />
        </div>
      </section>

      <section id="countries" className="mx-auto max-w-[1200px] px-8 py-[100px]">
        <h2 className="text-center font-display text-4xl font-bold text-foreground">Popular Countries</h2>
        <div className="mt-8">
          <FilterBar variant="selects" filters={filters} onChange={setFilters} />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {filteredCountries.map((c) => (
            <CountryCard key={c.name} country={c} />
          ))}
        </div>
      </section>

      <section className="bg-surface px-8 py-[100px]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="font-display text-4xl font-bold text-foreground">India&apos;s Most Trusted Visa Service Partner</h2>
          <p className="mt-4 max-w-2xl text-foreground-secondary">
            Founded in 2009, GVS has grown from a single Mumbai office into a nationwide consultancy trusted by
            travellers and corporates alike.
          </p>
          <p className="mt-4 max-w-2xl text-foreground-secondary">
            We cover visa requirements for 150+ countries, backed by consultants who track embassy rules daily so
            your application is never based on outdated information.
          </p>
          <a href="/about" className="mt-4 inline-block text-sm font-semibold text-accent">
            Talk to an Expert →
          </a>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatTile value="15+" label="Years of Experience" />
            <StatTile value="500+" label="Corporate Clients" />
            <StatTile value="48hr" label="Avg. Processing Start" />
            <StatTile value="24/7" label="Support Available" />
          </div>
        </div>
      </section>

      <section id="testimonials" className="mx-auto max-w-[1200px] px-8 py-[100px]">
        <h2 className="text-center font-display text-4xl font-bold text-foreground">What Our Clients Say</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-[1200px] px-8 py-[100px]">
        <h2 className="text-center font-display text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
        <div className="mt-8">
          <FaqAccordion faqs={faqs} />
        </div>
        <p className="mt-6 text-center text-sm text-foreground-secondary">
          Have more questions?{" "}
          <a href="/contact" className="font-semibold text-accent">
            Contact us →
          </a>
        </p>
      </section>

      <CtaBanner
        heading="Ready to Start Your Visa Journey?"
        subcopy="Talk to a visa expert today and get a clear plan for your application."
        primary={{ label: "Book Free Consultation", href: "/contact" }}
        secondary={{ label: "📞 Call Now", href: "tel:+911234567890" }}
      />
    </>
  );
}
```

- [ ] **Step 8: Verify it builds**

```bash
npm run build
```

Expected: succeeds.

- [ ] **Step 9: Commit**

```bash
git add src/data/testimonials.ts src/data/faqs.ts src/components/HowItWorks.tsx src/components/InquiryForm.tsx src/components/TestimonialCard.tsx src/components/FaqAccordion.tsx src/app/page.tsx
git commit -m "Build Home page"
```

---

### Task 15: Countries page

**Files:**
- Create: `src/app/countries/page.tsx`

**Interfaces:**
- Consumes: `countries` (Task 5), `matchesFilters`/`CountryFilters` (Task 6), `CountryCard` (Task 7), `FilterBar` (Task 8).
- Produces: the `/countries` route.

- [ ] **Step 1: Implement**

Create `src/app/countries/page.tsx`:

```tsx
"use client";

import { useMemo, useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { CountryCard } from "@/components/CountryCard";
import { countries } from "@/data/countries";
import { matchesFilters, type CountryFilters } from "@/lib/country-filters";

export default function CountriesPage() {
  const [filters, setFilters] = useState<CountryFilters>({
    search: "",
    region: "all",
    visaCategory: "all",
    processingSpeed: "all",
  });

  const filteredCountries = useMemo(() => countries.filter((c) => matchesFilters(c, filters)), [filters]);

  return (
    <section className="mx-auto max-w-[1200px] px-8 py-[100px]">
      <h1 className="text-center font-display text-5xl font-bold text-foreground">Explore Destinations</h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-foreground-secondary">
        Browse visa requirements, processing times, and fees for every destination we cover.
      </p>
      <div className="mt-8">
        <FilterBar variant="pills" filters={filters} onChange={setFilters} />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
        {filteredCountries.map((c) => (
          <CountryCard key={c.name} country={c} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify it builds**

```bash
npm run build
```

Expected: succeeds, `/countries` route listed in the output.

- [ ] **Step 3: Commit**

```bash
git add src/app/countries/page.tsx
git commit -m "Build Countries page"
```

---

### Task 16: Services page

**Files:**
- Create: `src/app/services/page.tsx`

**Interfaces:**
- Consumes: `PricingTier` (Task 13).
- Produces: the `/services` route.

- [ ] **Step 1: Implement**

Create `src/app/services/page.tsx`:

```tsx
import { Check } from "lucide-react";
import { PricingTier } from "@/components/PricingTier";

const INCLUDED = [
  "Single & multi-entry visas",
  "Document review & verification",
  "Embassy appointment booking",
  "Application filing & tracking",
  "WhatsApp status updates",
  "150+ countries covered",
];

const DOCUMENTS = [
  { title: "Valid Passport", detail: "At least 6 months validity with 2 blank pages." },
  { title: "Passport-size Photographs", detail: "Recent, per destination's specification." },
  { title: "Bank Statements", detail: "Last 3-6 months, per destination requirements." },
  { title: "ITR / Income Proof", detail: "Last 2-3 years, for financial capacity proof." },
  { title: "Travel Insurance", detail: "Minimum coverage per destination (e.g. €30,000 for Schengen)." },
  { title: "Confirmed Travel Itinerary", detail: "Flight bookings and hotel reservations." },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,var(--gradient-hero-start),var(--gradient-hero-end))] px-8 py-[140px] pb-[72px] text-white">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-sm text-white/70">Home / Services</p>
          <h1 className="mt-4 font-display text-5xl font-bold">Tourist Visa Services</h1>
          <p className="mt-4 max-w-xl text-white/80">
            End-to-end tourist and travel visa support for individuals and corporate teams, covering 150+
            destinations.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-8 py-[100px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="font-display text-3xl font-bold text-foreground">Tourist Visa</h2>
            <p className="mt-4 text-foreground-secondary">
              Whether it&apos;s a short family holiday or a longer international trip, we handle the entire tourist
              visa process — from document checklist to embassy submission — so you can focus on planning the trip
              itself.
            </p>
            <h3 className="mt-6 font-display text-lg font-semibold text-foreground">What&apos;s Included</h3>
            <ul className="mt-4 space-y-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground-secondary">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="/contact"
              className="mt-8 inline-block rounded-btn bg-[linear-gradient(135deg,var(--gradient-cta-start),var(--gradient-cta-end))] px-6 py-3 text-sm font-semibold text-white"
            >
              Apply Now →
            </a>
          </div>
          <div className="rounded-card border border-card-border bg-surface p-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-foreground-secondary">Processing time</p>
                <p className="font-display text-lg font-semibold text-foreground">5–15 business days</p>
              </div>
              <div>
                <p className="text-xs text-foreground-secondary">Approval rate</p>
                <p className="font-display text-lg font-semibold text-foreground">98%</p>
              </div>
              <div>
                <p className="text-xs text-foreground-secondary">Countries covered</p>
                <p className="font-display text-lg font-semibold text-foreground">150+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface px-8 py-[100px]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-center font-display text-4xl font-bold text-foreground">
            Standard Document Requirements
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {DOCUMENTS.map((doc) => (
              <div key={doc.title} className="rounded-card border border-card-border bg-background p-6">
                <h3 className="font-display text-base font-semibold text-foreground">{doc.title}</h3>
                <p className="mt-2 text-sm text-foreground-secondary">{doc.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-8 py-[100px]">
        <h2 className="text-center font-display text-4xl font-bold text-foreground">Service Packages</h2>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          <PricingTier
            name="Essential"
            price="₹1,499"
            priceNote="/ application"
            features={["Document checklist", "Document review", "Application filing", "Email support"]}
            cta={{ label: "Get Started", href: "/contact" }}
          />
          <PricingTier
            name="Professional"
            price="₹2,999"
            priceNote="/ application"
            featured
            features={[
              "Everything in Essential",
              "Dedicated consultant",
              "Embassy appointment",
              "WhatsApp + call support",
              "Free re-filing on rejection",
            ]}
            cta={{ label: "Get Started", href: "/contact" }}
          />
          <PricingTier
            name="Corporate"
            price="Custom"
            priceNote="for 5+ employees"
            features={["Everything in Professional", "Volume discounts", "Dedicated account manager", "Monthly invoicing"]}
            cta={{ label: "Contact Sales", href: "/contact" }}
          />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify it builds**

```bash
npm run build
```

Expected: succeeds, `/services` route listed in the output.

- [ ] **Step 3: Commit**

```bash
git add src/app/services/page.tsx
git commit -m "Build Services page"
```

---

### Task 17: About page

**Files:**
- Create: `src/app/about/page.tsx`

**Interfaces:**
- Consumes: `StatTile`, `ValueCard`, `OfficeCard`, `CtaBanner` (Task 13).
- Produces: the `/about` route.

- [ ] **Step 1: Implement**

Create `src/app/about/page.tsx`:

```tsx
import { StatTile } from "@/components/StatTile";
import { ValueCard } from "@/components/ValueCard";
import { OfficeCard } from "@/components/OfficeCard";
import { CtaBanner } from "@/components/CtaBanner";

const VALUES = [
  {
    title: "Honesty First",
    description:
      "If your profile has a weak spot, we tell you before you pay — not after a rejection. No false promises, no guaranteed-approval claims.",
  },
  {
    title: "Speed Without Shortcuts",
    description:
      "Applications filed within 48 hours of complete documentation. Fast because our process is tight — never because we skip checks.",
  },
  {
    title: "A Human on Every Case",
    description:
      "No ticket queues. Every application has a named consultant you can reach on WhatsApp — from first call to visa in hand.",
  },
];

const OFFICES = [
  { label: "Headquarters", city: "Mumbai", address: "Level 8, Bandra Kurla Complex, Bandra East, Mumbai 400 051" },
  { label: "North India", city: "Delhi", address: "4th Floor, Connaught Place, New Delhi 110 001" },
  { label: "South India", city: "Bangalore", address: "MG Road, Bangalore 560 001" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,var(--gradient-hero-start),var(--gradient-hero-end))] px-8 py-[140px] pb-[72px] text-white">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-sm text-white/70">Home / About</p>
          <h1 className="mt-4 font-display text-5xl font-bold">About GVS</h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-8 py-[100px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Built on 15 Years of Getting Travellers Where They Need to Go
            </h2>
            <p className="mt-4 text-foreground-secondary">
              Founded in 2009 in Mumbai, GVS started as a two-person consultancy helping local exporters get
              business visas sorted quickly and correctly.
            </p>
            <p className="mt-4 text-foreground-secondary">
              Today we process thousands of applications a year across 150+ destinations, with a rejection rate
              under 2% — well below the industry average.
            </p>
            <p className="mt-4 text-foreground-secondary">
              Our consultants track embassy rule changes daily, so your application is always built on current
              requirements, not last year&apos;s checklist.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatTile value="15+" label="Years of Experience" />
            <StatTile value="10K+" label="Visas Processed" />
            <StatTile value="98%" label="Approval Rate" />
            <StatTile value="150+" label="Countries Covered" />
          </div>
        </div>
      </section>

      <section className="bg-surface px-8 py-[100px]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-center font-display text-4xl font-bold text-foreground">What We Stand For</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map((v) => (
              <ValueCard key={v.title} title={v.title} description={v.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-8 py-[100px]">
        <h2 className="text-center font-display text-4xl font-bold text-foreground">Our Offices</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {OFFICES.map((office) => (
            <OfficeCard key={office.city} {...office} />
          ))}
        </div>
      </section>

      <CtaBanner
        heading="Plan Your Next Trip With Us"
        primary={{ label: "Book Free Consultation", href: "/contact" }}
        secondary={{ label: "Browse Destinations", href: "/countries" }}
      />
    </>
  );
}
```

- [ ] **Step 2: Verify it builds**

```bash
npm run build
```

Expected: succeeds, `/about` route listed in the output.

- [ ] **Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "Build About page"
```

---

### Task 18: Blog page

**Files:**
- Create: `src/data/blog-posts.ts`
- Create: `src/components/BlogCard.tsx`
- Create: `src/app/blog/page.tsx`

**Interfaces:**
- Produces: the `/blog` route.

- [ ] **Step 1: Create blog post data**

Create `src/data/blog-posts.ts`:

```ts
export type BlogPost = {
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  imageSeed: string;
};

export const featuredPost: BlogPost = {
  title: "Schengen Visa in 2026: The Complete Application Guide",
  date: "28 Jun 2026",
  readTime: "8 min read",
  excerpt:
    "Everything that changed in the Schengen application process this year, and how to avoid the most common reasons for rejection.",
  imageSeed: "schengen-travel",
};

export const posts: BlogPost[] = [
  {
    title: "US B-2 Interview: 12 Questions You'll Actually Be Asked",
    date: "21 Jun 2026",
    readTime: "6 min read",
    excerpt: "A breakdown of the real questions consular officers ask, based on hundreds of GVS client interviews.",
    imageSeed: "us-embassy",
  },
  {
    title: "How Much Bank Balance Do You Really Need?",
    date: "14 Jun 2026",
    readTime: "5 min read",
    excerpt: "Financial proof requirements vary more than most applicants expect — here's what embassies actually check.",
    imageSeed: "bank-docs",
  },
  {
    title: "7 Countries Indians Can Get an e-Visa for This Week",
    date: "7 Jun 2026",
    readTime: "4 min read",
    excerpt: "Fast, fully-online visa options for last-minute travel plans.",
    imageSeed: "evisa-phone",
  },
  {
    title: "Visa Rejected? Here's Exactly What to Do Next",
    date: "31 May 2026",
    readTime: "7 min read",
    excerpt: "A step-by-step recovery plan for turning a rejection into an approval on your next attempt.",
    imageSeed: "rejected-stamp",
  },
  {
    title: "Applying as a Family: Common Mistakes That Split Approvals",
    date: "24 May 2026",
    readTime: "5 min read",
    excerpt: "Why some family members get approved while others don't — and how to apply as a unit.",
    imageSeed: "family-airport",
  },
  {
    title: "Travel Insurance for Visas: What Embassies Check",
    date: "17 May 2026",
    readTime: "4 min read",
    excerpt: "Minimum coverage amounts and the fine print that trips up otherwise-complete applications.",
    imageSeed: "travel-insurance-doc",
  },
];
```

- [ ] **Step 2: Create BlogCard**

Create `src/components/BlogCard.tsx`:

```tsx
import type { BlogPost } from "@/data/blog-posts";

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <a
      href="#"
      className={`block overflow-hidden rounded-card border border-card-border bg-surface ${
        featured ? "grid grid-cols-1 md:grid-cols-2" : ""
      }`}
    >
      <img
        src={`https://picsum.photos/seed/${post.imageSeed}/800/500`}
        alt={post.title}
        className={`w-full object-cover ${featured ? "h-full" : "aspect-[16/10]"}`}
      />
      <div className="p-6">
        {featured && (
          <span className="rounded-pill bg-accent px-3 py-1 text-xs font-semibold text-white">Featured</span>
        )}
        <p className="mt-3 text-xs text-foreground-secondary">
          {post.date} · {post.readTime}
        </p>
        <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{post.title}</h3>
        <p className="mt-2 text-sm text-foreground-secondary">{post.excerpt}</p>
        {featured && <p className="mt-4 text-sm font-semibold text-accent">Read the guide →</p>}
      </div>
    </a>
  );
}
```

- [ ] **Step 3: Assemble the Blog page**

Create `src/app/blog/page.tsx`:

```tsx
import { BlogCard } from "@/components/BlogCard";
import { featuredPost, posts } from "@/data/blog-posts";

export default function BlogPage() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,var(--gradient-hero-start),var(--gradient-hero-end))] px-8 py-[140px] pb-[72px] text-white">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-sm text-white/70">Home / Blog</p>
          <h1 className="mt-4 font-display text-5xl font-bold">Visa Insights &amp; Guides</h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-8 py-[100px]">
        <BlogCard post={featuredPost} featured />
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 4: Verify it builds**

```bash
npm run build
```

Expected: succeeds, `/blog` route listed in the output.

- [ ] **Step 5: Commit**

```bash
git add src/data/blog-posts.ts src/components/BlogCard.tsx src/app/blog/page.tsx
git commit -m "Build Blog page"
```

---

### Task 19: Contact page

**Files:**
- Create: `src/components/ContactForm.tsx`
- Create: `src/app/contact/page.tsx`

**Interfaces:**
- Consumes: `isValidEmail`/`isValidPhone` (Task 3), `OfficeCard`/`StatTile` (Task 13).
- Produces: the `/contact` route.

- [ ] **Step 1: Create ContactForm**

Create `src/components/ContactForm.tsx`:

```tsx
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
```

- [ ] **Step 2: Assemble the Contact page**

Create `src/app/contact/page.tsx`:

```tsx
import { ContactForm } from "@/components/ContactForm";
import { OfficeCard } from "@/components/OfficeCard";
import { StatTile } from "@/components/StatTile";

const OFFICES = [
  { label: "Headquarters (HQ)", city: "Mumbai", address: "Level 8, Bandra Kurla Complex, Bandra East, Mumbai 400 051" },
  { label: "North India", city: "Delhi", address: "4th Floor, Connaught Place, New Delhi 110 001" },
  { label: "South India", city: "Bangalore", address: "MG Road, Bangalore 560 001" },
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-[1200px] px-8 py-[100px]">
      <h1 className="text-center font-display text-5xl font-bold text-foreground">Get in Touch</h1>
      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          <ContactForm />
        </div>
        <div className="space-y-6">
          <div className="rounded-card border border-card-border bg-surface p-6">
            <p className="text-sm text-foreground-secondary">Call / WhatsApp</p>
            <a href="tel:+911234567890" className="font-display text-lg font-semibold text-foreground">
              +91 12345 67890
            </a>
            <p className="mt-4 text-sm text-foreground-secondary">Email</p>
            <a href="mailto:info@getvisaservices.in" className="font-display text-lg font-semibold text-foreground">
              info@getvisaservices.in
            </a>
            <p className="mt-4 text-sm text-foreground-secondary">Working Hours</p>
            <p className="font-display text-lg font-semibold text-foreground">Mon–Sat, 9am–7pm IST</p>
          </div>
          <StatTile value="2 hrs" label="Average Response Time" />
          {OFFICES.map((office) => (
            <OfficeCard key={office.city} {...office} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify it builds**

```bash
npm run build
```

Expected: succeeds, `/contact` route listed in the output.

- [ ] **Step 4: Commit**

```bash
git add src/components/ContactForm.tsx src/app/contact/page.tsx
git commit -m "Build Contact page"
```

---

### Task 20: Manual QA pass

**Files:** none (verification only)

**Interfaces:** none — this task exercises the whole app built in Tasks 1–19.

- [ ] **Step 1: Run the full automated check suite**

```bash
npx tsc --noEmit && npm test && npm run build
```

Expected: type-check clean, all Vitest tests pass (validation, visa-dates, country-filters — 14 tests total), build succeeds for all 6 routes (`/`, `/countries`, `/services`, `/about`, `/blog`, `/contact`).

- [ ] **Step 2: Start the dev server**

```bash
npm run dev
```

Expected: server starts on `http://localhost:3000`.

- [ ] **Step 3: Click through every page in the browser, in both themes**

For each of `/`, `/countries`, `/services`, `/about`, `/blog`, `/contact`:
- Load the page, confirm Nav, page content, Footer, and the floating WhatsApp button all render.
- Click the theme toggle in the Nav; confirm colors switch (burgundy/sand → midnight/copper) with no flash on reload, and the choice persists across a page navigation and a hard refresh (check `localStorage['gvs-theme']` in devtools).

- [ ] **Step 4: Exercise the interactive pieces**

- On `/` and `/countries`: type in the search box, change each filter dropdown/pill, confirm the country grid updates and that combining filters narrows results (AND logic).
- Click a country card; confirm the detail modal opens with the right data and the "Get visa by {date}" line shows a real, plausible near-future date; confirm closing works both via the ✕ and clicking the backdrop.
- On `/` (Quick Inquiry) and `/contact`: submit with empty required fields, confirm inline errors appear; fill in valid values, submit, confirm the inline success state appears and the form resets.
- Click the FAQ questions on `/`; confirm each expands/collapses independently.
- Click the floating WhatsApp button; confirm it opens `https://wa.me/911234567890` in a new tab.

- [ ] **Step 5: Stop the dev server and report**

```bash
# Ctrl+C in the terminal running `npm run dev`
```

If anything from Step 3/4 fails, fix it in the relevant component/page file from Tasks 1–19, re-run `npx tsc --noEmit && npm run build`, and re-check the specific broken flow before moving on — do not commit a broken interaction.

- [ ] **Step 6: Final commit (if any fixes were made during QA)**

```bash
git add -A
git commit -m "Fix issues found during manual QA pass"
```
