# GVS Marketing Site — Next.js Rebuild Design

## Overview
Rebuild the 6-page GVS ("Get Visa Services") marketing site from the high-fidelity static-HTML design prototypes (`*.dc.html`, see `README.md`) into a production Next.js codebase. Design (colors, typography, spacing, copy, layout) is final per the README and is not up for revision here — this spec covers the *implementation* architecture: stack, data model, component boundaries, and how to resolve a few places where the prototypes disagree with themselves.

No existing framework/codebase — this is a greenfield build. Node v22.19.0 / npm 10.9.3 available locally.

## Stack
- **Next.js 14+, App Router, TypeScript.** Standard server app (not static export) — deployable to Vercel or any Node host, keeps the door open for the SSR-aware theme/date behavior the README calls for and for real form backends later.
- **Tailwind CSS** for utility styling, theme extended with the design tokens below (colors, fonts, spacing, radii) as named theme values.
- **CSS variables** drive the two themes: values set on `:root` for light, overridden under `[data-theme="dark"] { ... }` for dark — no `!important` overrides (the prototype's hack). Tailwind classes reference variables via `bg-[var(--color-bg)]` etc., or via `theme()` extension mapping variable names to Tailwind color keys.
- **lucide-react** for icons (spiritual successor to the Feather icon set used in the prototypes) — except the WhatsApp glyph and the "G" logo mark, which stay as small inline SVGs (brand-specific, not in any icon set).
- **`next/font/google`** for Playfair Display + Plus Jakarta Sans (replaces the prototype's `<link>` tag — no layout shift, self-hosted by Next).
- **Vitest** for the small amount of unit-testable logic (date math, filter predicates).

## Global Design Tokens
(Reference only — full source of truth is `README.md`'s "Global Design System" section; do not deviate.)

**Light theme ("Burgundy + Sand")**: bg `#FDF6F0`, surface `#fff`, dark-section gradient `#3D1A24→#6b2d3e`, CTA gradient `#D4A96A→#e8c285`, text `#1a0a0f`, text-secondary `#5a3a3a`, accent `#D4A96A`, nav/footer surface `#3D1A24`.

**Dark theme ("Midnight + Copper")**: bg `#12121f`, surface `#1a1a2e`, dark-section gradient `#0D0D1A→#1a1a3e`, CTA gradient `#B87333→#d4905a`, text `#fff`, text-secondary `rgba(255,255,255,0.65)`, accent `#B87333`, nav/footer surface `#0D0D1A`.

Do **not** implement the legacy navy `#0B1F3A` / gold `#C9A84C` values still visible as base attributes in some prototype markup — those are retired.

Typography scale, spacing, radii: as listed in README (H1 56px/700, H2 44px/700, H3 20-22px/600, H4 18px/600, body 14-16px/400, eyebrow 12px/600/2px tracking; section padding 100px/32px (hero 140px/32px/72px); max-width 1200px; card radius 16-20px, button radius 6-8px, pill radius 100px).

## Theming Implementation
- Inline script in the root layout `<head>` (runs before hydration): reads `localStorage['gvs-theme']`, defaults to `'light'`, sets `data-theme` attribute on `<html>` — prevents flash of wrong theme.
- `ThemeProvider` React context wraps the app for the runtime toggle (click cycles light ⇄ dark, writes to localStorage, updates `data-theme`).
- All themed colors consumed via CSS variables, not per-component conditionals.

## Data Model

### Canonical country dataset
Single source of truth: `src/data/countries.ts`, a 37-entry array combining the Countries.dc.html dataset (superset) — **the divergent 20-country dataset embedded separately in Home.dc.html is dropped entirely**. Both Home's "Popular Countries" grid and the Countries page use the same `CountryCard` component and the same data array (per README's explicit "single shared component" instruction).

Each entry:
```ts
type Country = {
  name: string;
  flag: string;           // emoji
  code: string;            // ISO alpha-2, for flagcdn.com
  region: 'europe' | 'americas' | 'asia' | 'middleeast' | 'africa';
  type: string;             // display label, e.g. "Schengen Visa", "B-2 Tourist Visa"
  entry: string;            // "Single" | "Multiple" | "Single/Multiple"
  processing: string;       // display string, e.g. "10–15 days", "On arrival", "Instant"
  processingDaysEstimate: number; // derived, see below
  fee: string;              // display string, e.g. "₹8,500", "Free"
  evisa: boolean;
  visaCategory: 'evisa' | 'arrival' | 'embassy'; // derived, see below
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  popular: boolean;
  notes: string;
  unsplashSeed: string;      // or direct URL — production image
  picsumSeed: string;        // fallback preview image
};
```

**Derivation rules** (computed once, hardcoded per entry in the data file — no runtime parsing needed):
- `processingDaysEstimate`: upper bound of the processing range in days (e.g. "10–15 days" → 15; "4–8 weeks" → 56; "On arrival"/"Instant"/"Instant–24 hrs" → 1; "2–3 days" → 3). Used for the "Get visa by {date}" badge and the Home processing-speed filter (`fast` ≤5, `medium` 6–21, `slow` 22+, matching the prototype's buckets).
- `visaCategory`: `'arrival'` if `type` or `processing` indicates on-arrival issuance (e.g. type contains "Visa on Arrival", or "Tourist Card"); else `'evisa'` if `evisa === true`; else `'embassy'`.

Full 37-country data (name / flag / region / type / entry / processing / fee / evisa / difficulty / popular / code / notes), to be transcribed into `countries.ts` during implementation:

| Name | Flag | Region | Type | Entry | Processing | Fee | e-Visa | Difficulty | Popular | Code | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| France | 🇫🇷 | europe | Schengen Visa | Single/Multiple | 10–15 days | ₹8,500 | No | Moderate | Yes | fr | Bank statements last 3 months required. Cover letter recommended. |
| Germany | 🇩🇪 | europe | Schengen Visa | Single/Multiple | 10–15 days | ₹8,500 | No | Moderate | No | de | Strong financial proof required. Purpose of visit must be clearly stated. |
| Italy | 🇮🇹 | europe | Schengen Visa | Single/Multiple | 10–15 days | ₹8,500 | No | Moderate | No | it | Hotel bookings and travel itinerary mandatory. |
| Spain | 🇪🇸 | europe | Schengen Visa | Single/Multiple | 10–15 days | ₹8,500 | No | Moderate | No | es | Travel insurance minimum €30,000 required. |
| Netherlands | 🇳🇱 | europe | Schengen Visa | Single/Multiple | 10–15 days | ₹8,500 | No | Moderate | No | nl | Apply at least 3 weeks in advance. |
| Greece | 🇬🇷 | europe | Schengen Visa | Single/Multiple | 8–12 days | ₹8,500 | No | Easy | No | gr | One of the more straightforward Schengen applications. |
| Switzerland | 🇨🇭 | europe | Schengen Visa | Single/Multiple | 10–15 days | ₹9,200 | No | Moderate | No | ch | Not EU but part of Schengen. Higher funds proof needed. |
| UK | 🇬🇧 | europe | Standard Visitor Visa | Multiple | 15–21 days | ₹14,000 | No | Moderate | Yes | gb | Strong ties to home country required. Financial proof essential. |
| Portugal | 🇵🇹 | europe | Schengen Visa | Single/Multiple | 10–15 days | ₹8,500 | No | Easy | No | pt | High approval rate. Straightforward documentation. |
| USA | 🇺🇸 | americas | B-2 Tourist Visa | Multiple | 4–8 weeks | ₹14,000 | No | Hard | Yes | us | Interview at US consulate required. Strong ties to India must be demonstrated. |
| Canada | 🇨🇦 | americas | Visitor Visa (TRV) | Multiple | 2–8 weeks | ₹11,500 | No | Moderate | Yes | ca | Biometrics required. Apply well in advance. |
| Mexico | 🇲🇽 | americas | Tourist Card (FMM) | Single | On arrival | ₹1,200 | Yes | Easy | No | mx | Visa-free for Indian passport holders with valid US visa. |
| Brazil | 🇧🇷 | americas | Tourist Visa | Single | 5–10 days | ₹7,500 | Yes | Easy | No | br | e-Visa available online. Processing within 72 hours usually. |
| Argentina | 🇦🇷 | americas | Tourist Visa | Single | 5–10 days | ₹5,500 | No | Moderate | No | ar | Apply at Argentine consulate in your city. |
| Thailand | 🇹🇭 | asia | Tourist Visa (TR) | Single | 3–5 days | ₹3,500 | Yes | Easy | Yes | th | Visa on arrival also available for 30 days. e-Visa recommended for longer stays. |
| Japan | 🇯🇵 | asia | Tourist Visa | Single/Multiple | 5–7 days | ₹5,500 | No | Moderate | Yes | jp | Requires invitation or travel agency itinerary. Detailed documents needed. |
| Australia | 🇦🇺 | asia | Visitor Visa (600) | Multiple | 15–30 days | ₹16,000 | No | Moderate | Yes | au | Online application. Health insurance and financial proof needed. |
| Singapore | 🇸🇬 | asia | Tourist Visa | Single/Multiple | 3–5 days | ₹3,200 | Yes | Easy | Yes | sg | e-Visa available. Very high approval rate for Indian tourists. |
| Bali / Indonesia | 🇮🇩 | asia | Visa on Arrival | Single | On arrival | ₹3,000 | Yes | Easy | Yes | id | Visa on arrival at major airports. Also available as e-Visa. |
| Vietnam | 🇻🇳 | asia | e-Visa | Single | 3 days | ₹2,200 | Yes | Easy | Yes | vn | e-Visa fully online. Valid 90 days. Very straightforward process. |
| Malaysia | 🇲🇾 | asia | eNTRI / Visa | Single | 1–3 days | ₹2,800 | Yes | Easy | Yes | my | eNTRI available for Indian passport holders. 30-day stay. |
| South Korea | 🇰🇷 | asia | Tourist Visa (C-3) | Single/Multiple | 5–7 days | ₹6,500 | No | Moderate | No | kr | K-ETA digital travel authorization available for some nationalities. |
| New Zealand | 🇳🇿 | asia | Visitor Visa | Single | 20–30 days | ₹14,500 | No | Moderate | No | nz | NZeTA for transit only. Full visitor visa required for Indian passport. |
| Sri Lanka | 🇱🇰 | asia | ETA | Single | Instant | ₹2,000 | Yes | Easy | Yes | lk | Online ETA within hours. 30-day stay. Very easy process. |
| Nepal | 🇳🇵 | asia | Visa on Arrival | Single | On arrival | Free | Yes | Easy | No | np | Free visa on arrival for Indian passport holders. No application needed. |
| Philippines | 🇵🇭 | asia | Visa on Arrival | Single | On arrival | Free | Yes | Easy | No | ph | Visa on arrival for Indian passport, up to 30 days. |
| UAE (Dubai) | 🇦🇪 | middleeast | Tourist Visa | Single/Multiple | 2–4 days | ₹7,500 | Yes | Easy | Yes | ae | e-Visa available. 30-day and 90-day options. Very high approval. |
| Saudi Arabia | 🇸🇦 | middleeast | Tourist e-Visa | Multiple | 24–72 hrs | ₹6,800 | Yes | Easy | No | sa | Online e-Visa. Valid 1 year, multiple entry, 90 days per visit. |
| Qatar | 🇶🇦 | middleeast | Tourist Visa | Single | 2–3 days | ₹5,200 | Yes | Easy | No | qa | Visa on arrival available. e-Visa recommended for advance planning. |
| Oman | 🇴🇲 | middleeast | Tourist e-Visa | Single | 24–48 hrs | ₹4,800 | Yes | Easy | No | om | e-Visa online. 30-day visit visa. Quick processing. |
| Jordan | 🇯🇴 | middleeast | Visa on Arrival | Single | On arrival | ₹4,000 | Yes | Easy | No | jo | Visa on arrival available. Jordan Pass recommended for tourists. |
| Bahrain | 🇧🇭 | middleeast | Tourist e-Visa | Single | Instant–24 hrs | ₹3,800 | Yes | Easy | No | bh | e-Visa online. Very quick approval. Up to 14 days stay. |
| Kenya | 🇰🇪 | africa | e-Visa | Single | 3–5 days | ₹4,200 | Yes | Easy | Yes | ke | e-Visa mandatory since 2023. Apply at evisa.go.ke. |
| Tanzania | 🇹🇿 | africa | Tourist Visa | Single | 2–5 days | ₹4,800 | Yes | Easy | No | tz | e-Visa available. Visa on arrival also possible at major ports. |
| South Africa | 🇿🇦 | africa | Tourist Visa | Single | 10–15 days | ₹7,000 | No | Moderate | No | za | Apply at VFS centre. Biometrics required. |
| Morocco | 🇲🇦 | africa | Tourist Visa | Single | 5–10 days | ₹4,500 | No | Moderate | No | ma | Apply at Moroccan consulate. Itinerary and hotel bookings required. |
| Egypt | 🇪🇬 | africa | Tourist e-Visa | Single | 3–5 days | ₹3,500 | Yes | Easy | No | eg | e-Visa online. Visa on arrival also available at Cairo airport. |
| Maldives | 🇲🇻 | asia | Visa on Arrival | Single | On arrival | Free | Yes | Easy | Yes | mv | Free 30-day visa on arrival for all nationalities. No application needed. |
| Mauritius | 🇲🇺 | africa | Visa on Arrival | Single | On arrival | Free | Yes | Easy | No | mu | Free visa on arrival for Indian passport holders. Up to 90 days. |

Note: only 12 of 37 are flagged `popular: true` above (France, UK, USA, Canada, Thailand, Japan, Australia, Singapore, Bali, Vietnam, UAE, Maldives). Home's "Popular Countries" grid needs 20 for its 4×5 layout — implementation should mark 8 more as `popular: true` to reach 20 (reasonable picks: well-known/high-search destinations not already flagged, e.g. Germany, Italy, Switzerland, South Korea, New Zealand, Sri Lanka, Malaysia, Saudi Arabia — exact picks are a low-stakes implementation-time choice, not a design decision).

Country card behavior (both Home and Countries pages, shared `CountryCard` component): `aspect-ratio: 3/4`, background photo (unsplash primary, picsum fallback, `flagcdn.com/w640/un.png` final fallback), zooms 1.08x on hover, round flag badge (flagcdn.com) centered mid-card, "e-Visa"/"Popular" badges, frosted-glass bottom panel with name / type tag / "Get visa by {date}" line, difficulty pill (Easy `#1F8A5B` / Moderate `#C9A84C` / Hard `#C94C4C`), fee. Click opens a modal with full details (+ `notes`) and an "Apply for {name} Visa" CTA linking to `/contact`.

### Filter taxonomies
- **Countries page**: search (name substring) + region pill bar (`all`, `europe` 🌍 Europe/Schengen, `americas` 🌎 Americas, `asia` 🌏 Asia Pacific, `middleeast` 🕌 Middle East, `africa` 🌍 Africa, `evisa` ⚡ e-Visa Available). No visa-type/processing-time selects on this page (matches prototype).
- **Home popular-countries filter bar**: search + 3 `<select>`s — Region (same list as above minus the `evisa` pill), Visa Type (`all`/`evisa` ⚡ e-Visa/Online/`arrival` 🛬 Visa on Arrival/`embassy` 🏛️ Embassy Visa — maps to `visaCategory`), Processing Time (`all`/`fast` ⚡ ≤5 days/`medium` 📅 6–21 days/`slow` 🕐 22+ days — maps to `processingDaysEstimate`). All combine with AND logic, client-side.
- **Quick Inquiry (Home) / Contact form "Visa Type" select** is a *separate*, simpler 3-option taxonomy for lead capture only (not tied to country data): "Single Entry Tourist Visa", "Multiple Entry Tourist Visa", "e-Visa / Visa on Arrival".

## Pages & Layout

Shared root layout renders **Nav** + page content + **Footer** + floating **WhatsAppButton** (`https://wa.me/911234567890`, fixed bottom-right, 56px, brand green `#25D366`).

**Nav** (identical every page): logo (gold gradient square + "G", wordmark "GVS" / "GET VISA SERVICES"), links Home → Countries → About → Blog → Contact, theme toggle pill, "Get Free Consultation" CTA button (→ `/contact`). Fixed, 68px, `backdrop-filter: blur(12px)`.

**Footer**: one shared 4-column component used on **every** page (the prototype's Services.dc.html compact single-row footer is dropped as an inconsistency, not an intentional variant):
- Col 1: logo + tagline "India's trusted visa service partner for businesses and corporates since 2009." + `📞 +91 12345 67890`, `✉ info@getvisaservices.in`, `📍 Mumbai · Delhi · Bangalore`
- Col 2 "Services": Tourist Visa, Business Visa, Work Visa, Student Visa, Visa Renewal, Attestation → all point to `/services`
- Col 3 "Company": About Us, Testimonials, FAQ, Contact
- Col 4 "Countries": USA/UK/Canada/Australia/Schengen/UAE Visa (placeholder `#` links)
- Bottom bar: `© 2026 GVS - Get Visa Services. All rights reserved. | getvisaservices.in`, Privacy Policy / Terms of Service (placeholder `#`)

### 1. Home (`/`)
Order: Nav → **How It Works** (4 steps: Consult / Document / Apply / Travel, each with description, alternating navy/gold numbered badges + connecting gradient line) → **Quick Inquiry** form card (Full Name, Phone/WhatsApp, Visa Type select, Destination Country; submit "Submit Inquiry — We'll Call You Back →"; disclaimer "🔒 Your data is safe with us. No spam, ever.") → **Popular Countries** (filterable 20-country grid, 4×5) → **About strip** (heading "India's Most Trusted Visa Service Partner", 2 paragraphs, CTA "Talk to an Expert →", 4 stat tiles: 15+ Years of Experience / 500+ Corporate Clients / 48hr Avg. Processing Start / 24/7 Support Available) → **Testimonials** (3 cards, ★★★★★: Rahul Sharma/Infosys, Priya Mehta/TCS, Amit Joshi/Joshi Exports — quotes per extraction) → **FAQ** (5 Q&As, collapsible: processing time / corporate bulk packages / rejection handling / status tracking / city coverage; CTA "Have more questions? Contact us →") → **CTA banner** ("Ready to Start Your Visa Journey?", "Book Free Consultation" + "📞 Call Now" tel: link) → Footer.

### 2. Countries (`/countries`)
Full destination browser: same search + region-pill filter, all 37 countries in a larger grid, same shared `CountryCard`.

### 3. Services (`/services`)
Tourist/travel visa only (no business/student/work content, per README direction): Hero (breadcrumb + "Tourist Visa Services" + subcopy) → main service block (description, 6-item "What's Included" checklist, stat sidebar: 5–15 business days / 98% approval / 150+ countries, "Apply Now →") → Document Checklist (6 cards: Passport, Photos, Bank Statements, ITR/Income Proof, Travel Insurance, Travel Itinerary) → Pricing (3 tiers: Essential ₹1,499, Professional ₹2,999 "Most Popular", Corporate custom "for 5+ employees" → "Contact Sales") → Footer.

### 4. About (`/about`)
Hero (breadcrumb + title) → Our Story (heading "Built on 15 Years of Getting Travellers Where They Need to Go", 3 paragraphs + 4 stat cards: 15+ Years / 10K+ Visas Processed / 98% Approval Rate / 150+ Countries Covered) → What We Stand For (3 value cards: Honesty First / Speed Without Shortcuts / A Human on Every Case, full copy per extraction) → Our Offices (3 cards: Mumbai HQ — Level 8, BKC, Bandra East 400 051; Delhi — 4th Floor, Connaught Place 110 001; Bangalore — MG Road 560 001) → CTA banner ("Plan Your Next Trip With Us") → Footer.

### 5. Blog (`/blog`)
Hero → Featured post (2-col card: "Schengen Visa in 2026: The Complete Application Guide", 28 Jun 2026 · 8 min read) → 6-post grid (titles/dates/read-times/excerpts per extraction, picsum placeholder images) → Footer. All post links are placeholder (no detail pages) — matches prototype scope.

### 6. Contact (`/contact`)
Form (First Name*, Last Name*, Business Email*, Phone/WhatsApp*, Company Name, Number of Applicants select, Visa Type* select, Destination Country*, Expected Travel Date, Additional Details textarea; submit "Submit Inquiry — We'll Call You Back"; disclaimer) + sidebar (Call/WhatsApp, Email, Working Hours Mon–Sat 9am–7pm IST, 3 offices — Mumbai labeled "(HQ)", "2 hrs — Average Response Time" stat tile).

## Forms
Both forms (Quick Inquiry, Contact) get real client-side validation (required fields, email/phone format) and an inline success state on submit — **no network call**, per your direction to keep this client-side only for now. Built so a real submit handler (API route, Formspree, etc.) is a single-function swap later, not a rewrite.

## Components to build
`Nav`, `Footer`, `ThemeToggle` (+ `ThemeProvider`), `CountryCard` (+ detail modal), `FilterBar` (variant props for Home vs Countries), `HowItWorks`, `InquiryForm`, `ContactForm`, `StatTile`, `TestimonialCard`, `FaqAccordion`, `CtaBanner`, `WhatsAppButton`, `BlogCard` (+ featured variant), `ValueCard`, `OfficeCard`, `PricingTier`.

## Testing
Proportional to the actual logic in this site:
- **Vitest unit tests**: `processingDaysEstimate` / "get visa by" date math; the country filter predicate (region + visaCategory + processing-speed + search, combined with AND).
- **`next build` + `tsc --noEmit`** as the baseline correctness gate for the rest (mostly presentational).
- **Manual browser QA** at the end of implementation: click through all 6 pages in both light and dark themes, exercise filters and both forms, check the WhatsApp button and theme persistence across reload.

## Out of scope (explicitly, per README + your answers)
- Real backend/CRM wiring for forms.
- Replacing placeholder content (WhatsApp number, office addresses, blog posts/images, Unsplash country photos) with real production assets.
- Blog post detail pages (prototype has none).
- Business/Student/Work visa service pages (explicitly removed per prior direction in README).
