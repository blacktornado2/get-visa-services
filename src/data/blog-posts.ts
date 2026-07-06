export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; seed: string; alt: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  imageSeed: string;
  content: BlogBlock[];
};

export const featuredPost: BlogPost = {
  slug: "schengen-visa-2026-complete-guide",
  title: "Schengen Visa in 2026: The Complete Application Guide",
  date: "28 Jun 2026",
  readTime: "9 min read",
  excerpt:
    "Everything that changed in the Schengen application process this year, and how to avoid the most common reasons for rejection.",
  imageSeed: "schengen-travel",
  content: [
    {
      type: "paragraph",
      text: "The Schengen visa process has tightened noticeably over the past year. Appointment slots at VFS centres in Delhi, Mumbai, and Bangalore are booking out three to five weeks in advance, and consulates are scrutinising financial documents more closely than at any point since 2020. The good news: the requirements themselves haven't changed dramatically — what's changed is how strictly they're enforced. Applicants who treat the checklist as a formality are getting refused; applicants who treat it as an argument for their trip are sailing through.",
    },
    { type: "heading", text: "Pick the right consulate — it matters more than you think" },
    {
      type: "paragraph",
      text: "The single most common structural mistake we see is applying through the wrong country. The rule is simple on paper: apply to the country where you'll spend the most nights, or if your nights are evenly split, the country you enter first. In practice, travellers book a cheap flight into Paris, spend nine nights in Italy, and apply to France anyway — because the French appointment was available sooner. Consulates cross-check your hotel bookings against your choice of consulate, and a mismatch is grounds for refusal under Article 32.",
    },
    {
      type: "paragraph",
      text: "Build your itinerary first, count the nights per country, and only then decide where to apply. If Italy is your main destination but Italian slots are six weeks out, the fix is to apply earlier — not to reroute the application through a different consulate.",
    },
    { type: "image", seed: "europe-map-planning", alt: "Traveller planning a European itinerary with a map" },
    { type: "heading", text: "The financial file: what consulates actually read" },
    {
      type: "paragraph",
      text: "Financial proof is the second big filter, and it's where most first-time applicants underestimate the level of detail involved. Your bank statements should cover the last six months, be stamped or digitally verified by the bank, and tell a coherent story: salary credits that match your employment letter, a stable closing balance, and no suspicious lump-sum deposits in the final weeks before you apply.",
    },
    {
      type: "list",
      items: [
        "Six months of stamped bank statements with a stable balance",
        "Income tax returns for the last two to three years",
        "Salary slips for the last three months, matching the bank credits",
        "An employment letter confirming role, tenure, and approved leave",
        "A cover letter tying it all together — trip purpose, funding, and your ties to India",
      ],
    },
    {
      type: "paragraph",
      text: "A note on that last item: the cover letter is the only document in the file where you get to speak directly to the visa officer. One page, factual, no flattery. State who you are, why you're travelling, who's paying, and why you'll return. Applications with a tight cover letter get processed with noticeably fewer document call-backs.",
    },
    { type: "heading", text: "Insurance, biometrics, and the timeline" },
    {
      type: "paragraph",
      text: "Travel insurance is non-negotiable: minimum €30,000 medical coverage, valid across the entire Schengen area, for the full duration of your trip including buffer days. Buy it before your appointment — several consulates now ask for the policy at submission rather than accepting it later.",
    },
    { type: "image", seed: "airport-departures-board", alt: "Departures board at an international airport" },
    {
      type: "paragraph",
      text: "Processing typically takes 10–15 working days once your biometrics are captured, stretching to three weeks in the May–August peak. Work backwards from your travel date: appointment at least five weeks out, documents finalised a week before that, and no non-refundable bookings until the visa is physically in your passport. Applicants who follow that sequence rarely need our rejection-recovery service — which is exactly the point.",
    },
  ],
};

export const posts: BlogPost[] = [
  {
    slug: "us-b2-interview-questions",
    title: "US B-2 Interview: 12 Questions You'll Actually Be Asked",
    date: "21 Jun 2026",
    readTime: "8 min read",
    excerpt: "A breakdown of the real questions consular officers ask, based on hundreds of GVS client interviews.",
    imageSeed: "us-embassy",
    content: [
      {
        type: "paragraph",
        text: "The US B-2 interview lasts, on average, two to three minutes. That's not an exaggeration — consular officers at the Delhi and Mumbai posts handle well over a hundred applicants a day, and they make most decisions within the first sixty seconds. There is no time to recover from a shaky start, so knowing what's coming matters more here than for almost any other visa in the world.",
      },
      { type: "heading", text: "The four themes every interview covers" },
      {
        type: "paragraph",
        text: "Across the hundreds of client interviews we've prepared and debriefed, the questions cluster into four themes: purpose of travel, ties to India, financial capacity, and travel history. The officer isn't working through a fixed script — they're probing whichever theme your profile makes them most curious about. A young single applicant gets more ties questions; a first-time traveller gets more purpose questions; a self-employed applicant gets more financial questions.",
      },
      {
        type: "list",
        items: [
          "\"What is the purpose of your visit?\" — answer in one sentence, not a story",
          "\"Who will you be staying with?\" — know names, relationships, and cities",
          "\"What do you do for work?\" — match your DS-160 exactly",
          "\"How will you fund this trip?\" — name the payer plainly, even if it's you",
          "\"Have you travelled abroad before?\" — never inflate; they can see your passport",
          "\"Why will you come back?\" — the question the whole interview is really about",
        ],
      },
      { type: "image", seed: "consulate-window-interview", alt: "Applicant at a consular interview window" },
      { type: "heading", text: "Consistency beats eloquence" },
      {
        type: "paragraph",
        text: "Officers are listening for consistency with your DS-160 form and your documents, not for polish. If your form says you're visiting a sibling in New Jersey but you hesitate on their address, that's a bigger red flag than imperfect English ever will be. Rehearse your own paperwork, not just your answers — reread your DS-160 the night before, especially the sections a travel agent may have filled in on your behalf.",
      },
      {
        type: "paragraph",
        text: "The most underrated question is the last one on the list: \"Why do you want to come back?\" This is where strong ties to India — a stable job, property, a business, family responsibilities — need to come through naturally. Officers hear the rehearsed version (\"I love my country\") dozens of times a day. What works is specificity: \"My daughter's school year starts in July and I run a team of eight at Infosys\" is a real answer.",
      },
      { type: "image", seed: "passport-documents-desk", alt: "Passport and supporting documents arranged on a desk" },
      { type: "heading", text: "On the day" },
      {
        type: "paragraph",
        text: "Keep answers short — one or two sentences, then stop. Don't hand over documents unless asked; most B-2 approvals happen without the officer opening a single folder. And if you get a 221(g) slip asking for more documents, that's a pending case, not a refusal — respond quickly and completely. We run a full mock interview with every B-2 client precisely because the real one is too short to learn on the job.",
      },
    ],
  },
  {
    slug: "how-much-bank-balance-do-you-need",
    title: "How Much Bank Balance Do You Really Need?",
    date: "14 Jun 2026",
    readTime: "7 min read",
    excerpt:
      "Financial proof requirements vary more than most applicants expect — here's what embassies actually check.",
    imageSeed: "bank-docs",
    content: [
      {
        type: "paragraph",
        text: "There's no single magic number embassies look for — despite what forums and WhatsApp groups will confidently tell you. We've seen applications approved with ₹80,000 in the bank and applications refused with ₹18 lakh. What matters is whether your balance is proportionate to your trip cost, consistent with your income, and stable over time. Officers aren't hunting for wealth; they're hunting for coherence.",
      },
      { type: "heading", text: "The working math, destination by destination" },
      {
        type: "paragraph",
        text: "For Schengen and UK visitor visas, a sensible working rule is your full trip cost — flights, hotels, and roughly €80–100 per day of expenses — plus a living buffer that shows the trip won't empty your account. For a ten-day European trip, that usually lands between ₹2.5 and ₹4 lakh across your accounts. For Southeast Asian e-Visas, the bar is far lower: Thailand and Vietnam rarely question a balance above ₹50,000–₹1 lakh.",
      },
      {
        type: "paragraph",
        text: "The US B-2 is the outlier: there's no fixed threshold at all, because the officer is assessing overall financial stability relative to your declared income rather than a specific figure. A salaried applicant with modest but consistent savings is in better shape than someone with a large balance and no visible income source — the second profile raises exactly the questions you don't want raised.",
      },
      { type: "image", seed: "bank-statement-review", alt: "Reviewing bank statements with a calculator" },
      { type: "heading", text: "The patterns that get applications refused" },
      {
        type: "list",
        items: [
          "A large lump-sum deposit two or three weeks before applying — officers are trained to spot borrowed 'show money'",
          "Salary credits that don't match the employment letter or salary slips",
          "A closing balance that's healthy but a transaction history full of bounced payments",
          "Round-tripping: money moving in from a relative and back out days later",
        ],
      },
      {
        type: "paragraph",
        text: "If your own finances are thin, don't manufacture a balance — use a sponsor. A parent, spouse, or employer can fund the trip on most visa types, provided the file says so explicitly: a sponsorship letter, proof of relationship, and the sponsor's own bank statements and income proof attached to your application. A transparent sponsored file beats an inflated personal one every single time.",
      },
      { type: "image", seed: "family-finances-planning", alt: "Family planning travel finances together at a table" },
      {
        type: "paragraph",
        text: "One last habit worth building: start moving your travel savings into a single account three to six months before you apply. Consolidated, gradually-built funds in one statement read far better than the same amount scattered across four accounts with last-minute transfers between them.",
      },
    ],
  },
  {
    slug: "evisa-countries-this-week",
    title: "7 Countries Indians Can Get an e-Visa for This Week",
    date: "7 Jun 2026",
    readTime: "6 min read",
    excerpt: "Fast, fully-online visa options for last-minute travel plans.",
    imageSeed: "evisa-phone",
    content: [
      {
        type: "paragraph",
        text: "If your trip is coming up fast, e-Visa destinations are your best bet — no embassy visit, no courier, no waiting weeks for an appointment slot. Everything happens online, and for the destinations below, approval reliably lands within a week for Indian passport holders. Here's the current state of play, fastest first.",
      },
      { type: "heading", text: "The instant tier: under 72 hours" },
      {
        type: "list",
        items: [
          "Sri Lanka (ETA) — often approved within hours; 30-day stay",
          "Bahrain — instant to 24 hours; 14-day stay",
          "Oman — 24–48 hours; 30-day visit visa",
          "UAE (Dubai) — 2–4 days; the most reliable option for last-minute Dubai plans",
        ],
      },
      {
        type: "paragraph",
        text: "Sri Lanka deserves a special mention: the ETA is close to instant for most applicants, and the only document you genuinely need is a passport scan. It's become our standard recommendation for travellers who decide on a Friday that they want to be on a beach by Monday.",
      },
      { type: "image", seed: "tropical-beach-arrival", alt: "Arriving at a tropical beach destination" },
      { type: "heading", text: "The fast tier: three to five days" },
      {
        type: "list",
        items: [
          "Vietnam — 2–3 days; 90-day e-Visa, single entry",
          "Singapore — 3–5 days via authorised agents; very high approval rate",
          "Saudi Arabia — 24–72 hours; one-year multiple-entry tourist e-Visa",
        ],
      },
      {
        type: "paragraph",
        text: "The catch with every e-Visa: approval speed depends almost entirely on document quality. A blurry passport scan, a photo that doesn't meet size specifications, or a name entered differently from the passport's machine-readable line are the three biggest causes of delay and rejection — even in these fast categories. The systems are automated enough that small errors don't get a human second look; they just get bounced.",
      },
      { type: "image", seed: "smartphone-travel-booking", alt: "Applying for an e-Visa on a smartphone" },
      {
        type: "paragraph",
        text: "If you're within a week of travel, have someone who processes these daily check your file before you hit submit. At that timeline you may not get a second chance to fix a bounce — and the difference between a clean submission and a sloppy one is usually about ten minutes of care.",
      },
    ],
  },
  {
    slug: "visa-rejected-what-to-do-next",
    title: "Visa Rejected? Here's Exactly What to Do Next",
    date: "31 May 2026",
    readTime: "8 min read",
    excerpt: "A step-by-step recovery plan for turning a rejection into an approval on your next attempt.",
    imageSeed: "rejected-stamp",
    content: [
      {
        type: "paragraph",
        text: "A rejection isn't the end of the process — it's information. Every refusal comes with a reason, even when it's phrased generically, and that reason should shape everything about your next attempt. The applicants who get approved on the second try are the ones who treat the first refusal as a diagnosis rather than an insult.",
      },
      { type: "heading", text: "Step one: decode the refusal letter" },
      {
        type: "paragraph",
        text: "Start by reading the rejection letter properly, not just the first line. Schengen refusals cite a specific article of the Visa Code — most commonly insufficient justification for the trip, doubts about intent to return, or unreliable financial documentation. US refusals usually reference Section 214(b), which means the officer wasn't convinced of your ties to India, or 221(g), which isn't a refusal at all but a request for more documents. UK refusal letters are the most detailed of the three and will often tell you the exact paragraph of your evidence that failed.",
      },
      { type: "image", seed: "letter-reading-desk", alt: "Reading an official letter at a desk" },
      { type: "heading", text: "Match the fix to the failure" },
      {
        type: "list",
        items: [
          "Document gaps (221(g), missing evidence): gather what was asked and respond quickly — these have the highest recovery rate",
          "Financial doubts: rebuild the file with six clean months of statements and, if needed, a transparent sponsor",
          "Ties to India (214(b) and equivalents): don't rush back — you need a material change, not a reworded cover letter",
          "Itinerary problems: rebook a coherent trip and apply to the correct consulate this time",
        ],
      },
      {
        type: "paragraph",
        text: "For ties-based refusals, reapplying immediately with the same profile almost never works — and each refusal goes on your record, making the next officer's scepticism a little stronger. A new job, a property purchase, a business registration, or simply eight more months in your current role all count as material changes. A thesaurus pass over your cover letter does not.",
      },
      { type: "image", seed: "fresh-start-planning", alt: "Planning documents laid out for a fresh application" },
      { type: "heading", text: "Before you resubmit" },
      {
        type: "paragraph",
        text: "Respect any waiting guidance the country imposes, and get a second set of eyes on the file before it goes back in. We review rejected applications at no charge specifically because a fresh read regularly finds the real issue — and it's often different from what the applicant assumed. One recent client blamed his bank balance for a Schengen refusal; the actual problem was a hotel booking that had auto-cancelled before his biometrics appointment. The fix took five minutes. Knowing what to fix took experience.",
      },
    ],
  },
  {
    slug: "applying-as-a-family-common-mistakes",
    title: "Applying as a Family: Common Mistakes That Split Approvals",
    date: "24 May 2026",
    readTime: "7 min read",
    excerpt: "Why some family members get approved while others don't — and how to apply as a unit.",
    imageSeed: "family-airport",
    content: [
      {
        type: "paragraph",
        text: "It's one of the more painful outcomes in visa processing: a family applies together, and one member — usually a young adult child or an elderly parent — gets refused while everyone else is approved. The trip either collapses or splits. In almost every case we've reviewed, the cause was the same: the family applied as a unit but documented themselves as four unrelated individuals.",
      },
      { type: "heading", text: "Every applicant is assessed alone" },
      {
        type: "paragraph",
        text: "Consulates assess each applicant on their own merits, even within a joint family application. A working parent with a stable salary has an easy story to tell. A 20-year-old with no income, or a retired grandparent with no independent assets, does not — unless their application explicitly explains who is funding them and why they'll return. The refusal doesn't mean the officer doubted the family; it means one individual file had a gap nobody addressed.",
      },
      { type: "image", seed: "family-passports-table", alt: "A family's passports and documents laid out together" },
      { type: "heading", text: "The dependent file, done properly" },
      {
        type: "list",
        items: [
          "A sponsorship letter from the earning member, naming each dependent and the amounts covered",
          "Proof of relationship — birth certificates, marriage certificate, or family register",
          "The sponsor's bank statements and income proof attached to every dependent's file, not just their own",
          "For students: an enrolment letter and leave-of-absence note showing they'll return to their course",
          "For retired parents: pension statements, property papers, or fixed deposits in their own name where available",
        ],
      },
      {
        type: "paragraph",
        text: "Itineraries need the same discipline. Keep flight bookings, hotel reservations, and travel dates identical across every family member's application. Different return dates or a hotel booking that names only two of four travellers is a classic trigger for follow-up questions — and follow-up questions on one file delay the whole family's decision.",
      },
      { type: "image", seed: "family-holiday-planning", alt: "Family planning a holiday together" },
      {
        type: "paragraph",
        text: "Finally, apply early — earlier than you would alone. Families are statistically more likely to receive at least one request for additional documents simply because there are more files in play. If one member gets flagged, you want enough runway to respond without anyone missing the flight. Six weeks before travel is comfortable; three weeks is a gamble.",
      },
    ],
  },
  {
    slug: "travel-insurance-for-visas",
    title: "Travel Insurance for Visas: What Embassies Check",
    date: "17 May 2026",
    readTime: "6 min read",
    excerpt: "Minimum coverage amounts and the fine print that trips up otherwise-complete applications.",
    imageSeed: "travel-insurance-doc",
    content: [
      {
        type: "paragraph",
        text: "Travel insurance is one of the simplest requirements to satisfy and, ironically, one of the most common reasons applications get sent back for correction — almost always because of a technicality in the policy rather than the coverage amount. Embassies don't just check that you have insurance; they check four specific attributes of the policy document, and budget insurers fail them surprisingly often.",
      },
      { type: "heading", text: "The four things a Schengen officer verifies" },
      {
        type: "list",
        items: [
          "Minimum €30,000 in medical coverage, stated in euros on the certificate itself",
          "Validity across all Schengen member states — not just your primary destination",
          "Coverage for the entire trip, including buffer days on both ends",
          "Repatriation and medical evacuation coverage, which several budget policies quietly exclude",
        ],
      },
      {
        type: "paragraph",
        text: "That first point catches more applicants than any other: a policy that states its coverage only in rupees — even when the converted amount comfortably exceeds €30,000 — is regularly flagged for clarification, which costs you a week. Buy from an insurer whose certificate is written for visa purposes; the good ones state the euro figure and the Schengen-wide validity in the first three lines.",
      },
      { type: "image", seed: "insurance-policy-reading", alt: "Reading the fine print of an insurance policy" },
      { type: "heading", text: "Dates: the silent killer" },
      {
        type: "paragraph",
        text: "A policy that lapses one day before your return flight is grounds for refusal, and it happens constantly — usually because the applicant bought insurance before finalising their return date, or because a red-eye flight lands a day later than it departs. Buy your policy after your itinerary is locked, and double-check that the end date covers the day you land back in India, not the day you take off.",
      },
      { type: "image", seed: "calendar-travel-dates", alt: "Marking travel dates on a calendar" },
      {
        type: "paragraph",
        text: "For destinations that don't mandate insurance — the US, the UK, and most e-Visa countries — it's still worth carrying. Beyond visa purposes, it's the cheapest protection you can buy against a medical emergency abroad turning into a five-figure bill. A week of coverage costs less than an airport meal; an uninsured hospital night in the US costs more than the entire trip.",
      },
    ],
  },
  {
    slug: "dubai-visa-guide-for-indians",
    title: "Dubai Visa for Indians: Rules, Fees, and Timelines in 2026",
    date: "10 May 2026",
    readTime: "7 min read",
    excerpt: "The 30-day and 60-day options, what documents you actually need, and how to avoid the peak-season crunch.",
    imageSeed: "dubai-skyline",
    content: [
      {
        type: "paragraph",
        text: "Dubai remains the most-booked international destination for Indian travellers, and its visa process is refreshingly modern: fully online, no biometrics, no embassy visit, and approvals that routinely land within two to four working days. But 'easy' isn't the same as 'automatic' — the UAE rejects sloppy applications quickly and without much explanation, so it pays to get the details right the first time.",
      },
      { type: "heading", text: "Choosing between the visa types" },
      {
        type: "list",
        items: [
          "30-day tourist visa — the standard choice for holidays and family visits",
          "60-day tourist visa — better value for longer stays or multi-stop Gulf trips",
          "Multiple-entry options — worth it if you're combining Dubai with Abu Dhabi side trips or a cruise that re-enters the UAE",
          "96-hour and 48-hour transit visas — for genuine layovers only, tied to onward tickets",
        ],
      },
      {
        type: "paragraph",
        text: "Most travellers should simply take the 30-day single entry. The one exception worth flagging: if there's any chance your plans stretch past four weeks, book the 60-day version upfront. Extending inside the UAE is possible but costs more than the difference between the two visas, and overstay fines accrue per day.",
      },
      { type: "image", seed: "dubai-marina-evening", alt: "Dubai Marina at evening" },
      { type: "heading", text: "Documents and the approval clock" },
      {
        type: "paragraph",
        text: "The core file is small: a passport scan with at least six months' validity, a passport-size photo on a white background, confirmed return flights, and proof of accommodation. Applications sponsored through a hotel or a licensed agency clear fastest, because the sponsor's track record carries weight in the UAE's system. First-time travellers with blank passports are approved every day — travel history helps but is genuinely not required here.",
      },
      {
        type: "paragraph",
        text: "Timelines stretch twice a year: the December–January holiday peak and the weeks around Eid. During those windows, the usual 2–4 day approval can drift to a week, and rush processing gets expensive. If you're travelling in peak season, apply two to three weeks before flying and treat anything faster as a bonus.",
      },
      { type: "image", seed: "desert-safari-sunset", alt: "Desert safari at sunset near Dubai" },
      {
        type: "paragraph",
        text: "One caution that surprises people: the UAE system matches names strictly against the passport's machine-readable zone. A missing middle name or a spelling that follows your Aadhaar instead of your passport is the most common cause of rejection we see for Dubai — and because rejections aren't explained, applicants often can't work out what went wrong. Copy the passport line character for character and the process is about as smooth as visas get.",
      },
    ],
  },
  {
    slug: "japan-tourist-visa-itinerary-guide",
    title: "Japan Tourist Visa: Building an Itinerary Consulates Love",
    date: "3 May 2026",
    readTime: "8 min read",
    excerpt: "Japan approves generously — but only when the paperwork is precise. Here's how to build a file that clears.",
    imageSeed: "japan-temple-street",
    content: [
      {
        type: "paragraph",
        text: "Japan is one of the most rewarding visa files to prepare, because the consulate's expectations are unusually explicit: they tell you exactly what they want, down to the format of the day-by-day itinerary. Applicants who follow the format get approved at very high rates. Applicants who submit a Schengen-style file and hope for the best get document call-backs that delay everything by a week or more.",
      },
      { type: "heading", text: "The day-by-day itinerary is the heart of the file" },
      {
        type: "paragraph",
        text: "Japan asks for a schedule of stay — a table listing each date, the activity, your accommodation, and a contact number. It doesn't need to be exciting; it needs to be plausible and internally consistent. If you land in Tokyo on the 3rd, your hotel booking should start on the 3rd. If you list a day trip to Hakone, the return to your Tokyo hotel that night should be obvious. Officers read these tables closely, and they notice when day five places you in Kyoto while your hotel booking says Osaka.",
      },
      { type: "image", seed: "tokyo-street-evening", alt: "Evening street scene in Tokyo" },
      {
        type: "list",
        items: [
          "Use the consulate's own schedule-of-stay format — don't freestyle the layout",
          "Match every night to a named, booked accommodation",
          "Keep the pace realistic: two cities in seven days reads better than five",
          "Refundable bookings are fine — confirmed doesn't mean non-refundable",
        ],
      },
      { type: "heading", text: "Money, employment, and the quiet checks" },
      {
        type: "paragraph",
        text: "Financially, Japan is moderate: recent bank statements showing you can comfortably cover a trip that typically costs ₹1.5–2.5 lakh, plus the standard employment letter and ITR set. What's distinctive is how much weight the consulate puts on tidiness — documents in the requested order, no missing signatures, photos to the exact millimetre specification. It reflects something real about how the country works, and files prepared with that mindset clear noticeably faster.",
      },
      { type: "image", seed: "kyoto-garden-autumn", alt: "A quiet garden in Kyoto in autumn" },
      {
        type: "paragraph",
        text: "Processing runs five to seven working days through the application centres in Delhi, Mumbai, Bangalore, Chennai, and Kolkata. There's no interview for tourist applications. If your dates are flexible, avoid applying in the three weeks before cherry-blossom season — volumes spike, and the consulate's otherwise-reliable clock stretches with them. A well-formatted file submitted in a quiet week is, in our experience, one of the smoothest visa processes anywhere.",
      },
    ],
  },
  {
    slug: "first-international-trip-checklist",
    title: "First International Trip? Your Complete Pre-Departure Checklist",
    date: "26 Apr 2026",
    readTime: "8 min read",
    excerpt: "Everything first-time travellers forget — from passport validity math to what actually happens at immigration.",
    imageSeed: "first-flight-window",
    content: [
      {
        type: "paragraph",
        text: "Every week we work with travellers taking their first international trip, and the anxieties are remarkably consistent: Will my blank passport get me refused? What do I say at immigration? What am I forgetting? This is the checklist we walk first-timers through — the same one, every time, because it covers the failures we actually see rather than the ones people worry about.",
      },
      { type: "heading", text: "Six weeks out: the paperwork layer" },
      {
        type: "list",
        items: [
          "Passport validity: at least six months beyond your return date, with two blank pages",
          "Visa timeline: check the processing time for your destination and add a two-week buffer",
          "Bookings: refundable flights and hotels until the visa is approved — never non-refundable first",
          "Travel insurance: buy it once dates are locked, even where it isn't mandatory",
          "Money trail: start consolidating travel funds into one account now, not the week before",
        ],
      },
      {
        type: "paragraph",
        text: "The passport-validity rule catches more first-timers than anything else on this list. Airlines enforce it at check-in, which means you can hold a valid visa and still be denied boarding because your passport expires five months after your return. Check it today; renewals take longer than you think.",
      },
      { type: "image", seed: "packing-suitcase-documents", alt: "Packing a suitcase with travel documents on top" },
      { type: "heading", text: "One week out: the practical layer" },
      {
        type: "list",
        items: [
          "Print two copies of everything: visa, tickets, hotel bookings, insurance — phones die",
          "Inform your bank you're travelling and enable international transactions on one card",
          "Carry a small amount of destination currency for the airport-to-hotel leg",
          "Save your hotel address in the local language on your phone",
          "Check baggage allowances — budget carriers abroad are far stricter than Indian domestic flights",
        ],
      },
      { type: "image", seed: "airport-immigration-queue", alt: "Travellers queuing at airport immigration" },
      { type: "heading", text: "At immigration: what actually happens" },
      {
        type: "paragraph",
        text: "Immigration on arrival is briefer than first-timers imagine: the officer wants to know why you're visiting, how long you're staying, and where. Answer plainly — 'tourism, ten days, staying at the Hilton Garden Inn' — and have your return ticket and hotel booking reachable, not buried in checked luggage. A blank passport is not a problem; a traveller who can't name their own hotel is. You've done the hard part already by getting the visa. The border is just confirming you're the person the file described.",
      },
    ],
  },
  {
    slug: "vietnam-vs-thailand-easier-visa",
    title: "Vietnam vs Thailand: Which Visa Is Easier Right Now?",
    date: "19 Apr 2026",
    readTime: "7 min read",
    excerpt: "Two favourite destinations, two very different processes — a practical comparison for Indian travellers.",
    imageSeed: "southeast-asia-boats",
    content: [
      {
        type: "paragraph",
        text: "Vietnam and Thailand compete for the same slot in most Indian travellers' plans: a five-to-ten-day tropical trip that doesn't demand Schengen-level paperwork. Both are easy by global standards, but they're easy in different ways, and the right choice depends on how you weigh cost, speed, and flexibility. Here's the honest comparison we give clients.",
      },
      { type: "heading", text: "Vietnam: the predictable one" },
      {
        type: "paragraph",
        text: "Vietnam's e-Visa is fully online, costs around ₹2,200, and clears in two to three working days with remarkable consistency. The stay is generous — up to 90 days — and the document ask is minimal: passport scan, photo, and your entry/exit points. The one rigidity worth knowing: your e-Visa is tied to the entry checkpoint you declare. Land at Da Nang with a visa that names Hanoi and you have a problem. Decide your airports before you apply, not after.",
      },
      { type: "image", seed: "halong-bay-morning", alt: "Boats on Ha Long Bay in the morning mist" },
      { type: "heading", text: "Thailand: the flexible one" },
      {
        type: "paragraph",
        text: "Thailand gives Indian travellers two live options: the e-Visa arranged in advance, or the visa on arrival at major airports. The e-Visa costs more (around ₹3,500) but removes airport risk; the visa on arrival is cheaper but means queueing after a red-eye flight with cash and documents in hand, and stay periods are shorter. For families and first-timers we recommend the e-Visa without hesitation — the arrival queue at Bangkok on a December morning is not where you want to discover a missing photocopy.",
      },
      {
        type: "list",
        items: [
          "Speed: Vietnam wins — 2–3 days versus 3–5 for Thailand's e-Visa",
          "Stay length: Vietnam wins — 90 days versus 30–60",
          "Flexibility on arrival: Thailand wins — multiple airports, visa-on-arrival fallback",
          "Cost: Vietnam wins — roughly ₹1,300 cheaper",
          "Beginner-friendliness: tie — both are gentle first international trips",
        ],
      },
      { type: "image", seed: "thai-island-longtail", alt: "Longtail boat at a Thai island beach" },
      {
        type: "paragraph",
        text: "Our verdict: if your itinerary is fixed, Vietnam is the smoother process end to end. If your plans might shift — different airports, an extra city, dates in flux — Thailand's flexibility earns its premium. And if you genuinely can't choose, note that plenty of travellers now do both in one trip: the Bangkok–Hanoi leg is under two hours, and holding both visas simultaneously is completely routine.",
      },
    ],
  },
  {
    slug: "uk-visitor-visa-documents",
    title: "UK Standard Visitor Visa: The Documents That Matter Most",
    date: "12 Apr 2026",
    readTime: "8 min read",
    excerpt: "The UK reads your file more closely than almost anyone. Here's what carries weight and what's just padding.",
    imageSeed: "london-bridge-view",
    content: [
      {
        type: "paragraph",
        text: "The UK Standard Visitor visa is unusual among major destinations: there's no interview, which means your documents do all the talking. The Home Office caseworker who decides your application will never meet you — they'll spend perhaps fifteen minutes with your file, and the decision letter they write is famously specific about what convinced or failed to convince them. That changes how you should prepare: every document either advances your case or dilutes it.",
      },
      { type: "heading", text: "What actually carries weight" },
      {
        type: "list",
        items: [
          "Six months of bank statements with a story that matches your stated income",
          "An employment letter confirming role, salary, tenure, and approved leave dates",
          "Your ITRs — the UK cross-checks declared income more than most applicants expect",
          "A concise cover letter setting out purpose, funding, and your return commitments",
          "Evidence of ties: property papers, business registration, family responsibilities",
        ],
      },
      {
        type: "paragraph",
        text: "Notice what's not on that list: hotel bookings for every night, day-by-day itineraries, or letters from friends promising you'll behave. The UK explicitly doesn't require confirmed accommodation, and padding the file with weak documents genuinely hurts — caseworkers cite irrelevant evidence as a sign the applicant didn't understand the requirements.",
      },
      { type: "image", seed: "london-underground-station", alt: "A London Underground station entrance" },
      { type: "heading", text: "The six-month statement problem" },
      {
        type: "paragraph",
        text: "More UK refusals turn on bank statements than on any other document. The caseworker isn't checking whether you're rich — they're checking whether the account behaviour matches the person described in the rest of the file. A ₹60,000 monthly salary with a ₹12 lakh balance and no explanation invites questions. Large deposits need a paper trail: a property sale deed, a maturing FD, a documented gift from a parent. The refusal letter phrase to avoid is 'the origin of these funds is unclear' — once that appears, the rest of the file barely matters.",
      },
      { type: "image", seed: "cotswolds-countryside", alt: "English countryside in the Cotswolds" },
      {
        type: "paragraph",
        text: "Timelines: standard processing is officially three weeks but has been running 15–21 working days from biometrics in practice, with priority services available at a steep premium. Apply six to eight weeks before travel and skip the priority fee entirely. And keep your file lean — twenty strong pages beat sixty mediocre ones in front of a caseworker who has fifteen minutes and a decision quota.",
      },
    ],
  },
  {
    slug: "australia-visitor-visa-600-delays",
    title: "Australia Visitor Visa (600): How to Avoid Processing Delays",
    date: "5 Apr 2026",
    readTime: "7 min read",
    excerpt: "Most 600-class delays are self-inflicted. Here's what slows files down and how to keep yours moving.",
    imageSeed: "sydney-harbour-view",
    content: [
      {
        type: "paragraph",
        text: "Australia's Visitor visa (subclass 600) has an unpredictable reputation: some applications clear in a week, others sit for two months, and the difference rarely looks random once you've seen enough files. The Department of Home Affairs processes everything online through ImmiAccount, and the single biggest factor in your timeline is whether your application is 'decision-ready' — complete enough to approve without a single follow-up request.",
      },
      { type: "heading", text: "What 'decision-ready' means in practice" },
      {
        type: "list",
        items: [
          "Every form question answered — 'see attached' counts as unanswered",
          "Financial evidence upfront: statements, ITRs, salary slips, all legible",
          "A clear purpose statement: who you're visiting, why now, for how long",
          "Health insurance evidence for applicants over 70, arranged before lodging",
          "Certified translations for any document not in English",
        ],
      },
      {
        type: "paragraph",
        text: "Each request-for-information cycle adds two to four weeks, because your file leaves the queue and re-enters it when you respond. One missing salary slip can therefore cost a month. The applicants who clear in a week are almost always the ones whose case officer never had to write to them.",
      },
      { type: "image", seed: "great-ocean-road", alt: "The Great Ocean Road coastline in Australia" },
      { type: "heading", text: "The genuine-visitor question" },
      {
        type: "paragraph",
        text: "Australia applies a 'genuine temporary entrant' lens to every visitor application: is this person actually coming back? If you're visiting children or siblings who've migrated — the most common Indian 600-class profile — address it head-on rather than hoping it goes unnoticed. A short statement acknowledging the family connection, alongside strong evidence of your own life in India (employment, property, other dependents), reads far better than silence. Officers see the migration-pathway pattern daily; what they reward is candour plus evidence.",
      },
      { type: "image", seed: "melbourne-laneway-cafe", alt: "A laneway café in Melbourne" },
      {
        type: "paragraph",
        text: "Two final timing notes. First, don't book non-refundable travel before the grant — the Department explicitly warns against it and won't expedite to match your tickets. Second, if you're travelling for a specific event like a graduation or wedding, say so and attach the invitation with dates: case officers do take fixed dates into account when triaging queues, but only if the file tells them. A decision-ready application lodged eight weeks out makes the whole process boring — which is exactly what you want a visa process to be.",
      },
    ],
  },
  {
    slug: "corporate-visa-management-guide",
    title: "Corporate Travel: How Smart Companies Manage Team Visas",
    date: "29 Mar 2026",
    readTime: "7 min read",
    excerpt: "Deputations, conferences, client visits — how HR teams cut visa turnaround without cutting corners.",
    imageSeed: "business-team-airport",
    content: [
      {
        type: "paragraph",
        text: "When a company sends one employee abroad, the visa is an errand. When it sends forty a quarter — sales teams to Dubai, engineers to client sites in Germany, leadership to conferences in Singapore — the visa becomes an operations problem, and an expensive one when it goes wrong. A missed business visa doesn't just cost a rebooked flight; it costs a delayed project milestone and an awkward client call. Here's what the companies who've solved this actually do differently.",
      },
      { type: "heading", text: "Standardise the employee file" },
      {
        type: "paragraph",
        text: "The core insight: 70% of every business visa application is identical across trips — passport, employment verification, company financials, the invitation-letter format. Companies that maintain a standing 'visa file' per travelling employee, refreshed quarterly, cut their per-trip preparation from days to hours. The variable 30% (destination, dates, purpose, invitation) is all that needs assembling per trip.",
      },
      {
        type: "list",
        items: [
          "A standing document vault per frequent traveller, audited quarterly",
          "Company-level documents (GST registration, financials, incorporation) kept current in one place",
          "Template invitation and sponsorship letters pre-approved by legal",
          "A single internal owner for visa timelines — not each traveller individually",
          "A consultant relationship with volume terms, rather than ad-hoc agents per trip",
        ],
      },
      { type: "image", seed: "office-planning-meeting", alt: "Team planning travel schedules in an office meeting" },
      { type: "heading", text: "Plan around the visa calendar, not just the business calendar" },
      {
        type: "paragraph",
        text: "The second habit is scheduling awareness. Schengen appointment availability in peak months, US interview wait times, Australia's decision-ready lead times — these are known, trackable numbers, and the best-run travel desks treat them like exchange rates: checked before commitments are made, not after. Committing a delivery date that requires a German business visa in two weeks during appointment season is a preventable failure that still happens constantly.",
      },
      { type: "image", seed: "conference-hall-international", alt: "An international business conference hall" },
      {
        type: "paragraph",
        text: "For teams of five or more travelling regularly, consolidated handling pays for itself quickly: bulk document review, a single escalation point when something stalls, and monthly invoicing instead of per-trip reimbursements. That's the model our corporate desk runs for clients from Gurgaon to Kolkata — and the metric that matters is simple: how often does travel get booked with confidence instead of contingency plans.",
      },
    ],
  },
  {
    slug: "cover-letter-mistakes-visa",
    title: "Cover Letter Mistakes That Quietly Sink Visa Applications",
    date: "22 Mar 2026",
    readTime: "6 min read",
    excerpt: "The one document where you speak directly to the officer — and the five ways applicants waste it.",
    imageSeed: "writing-letter-desk",
    content: [
      {
        type: "paragraph",
        text: "The cover letter is the only document in your visa file where you get to speak directly to the person making the decision. Every other page is evidence; this one is argument. Officers read hundreds of them, which means they've developed fast pattern-matching for the good, the useless, and the actively harmful — and a surprising number of otherwise-strong applications land in the second and third categories.",
      },
      { type: "heading", text: "The five recurring mistakes" },
      {
        type: "list",
        items: [
          "The essay: three pages of biography when the officer needed four paragraphs of facts",
          "The plea: 'it is my lifelong dream to see Paris' — emotion isn't evidence",
          "The contradiction: a letter that says self-funded while the file shows a sponsor",
          "The template: an agent's boilerplate with another applicant's destination left in (we've seen it)",
          "The omission: no mention of the refused visa from 2023 that the officer can see anyway",
        ],
      },
      {
        type: "paragraph",
        text: "That last one deserves emphasis. Prior refusals, gaps in travel history, a sponsor who isn't a blood relative — anything unusual in your file should be addressed in the letter before the officer finds it themselves. An explained anomaly is context; a discovered one is a credibility problem. The letter is where you control the narrative.",
      },
      { type: "image", seed: "typewriter-clean-page", alt: "A clean page in a typewriter" },
      { type: "heading", text: "The structure that works" },
      {
        type: "paragraph",
        text: "Four short paragraphs, one page, no adjectives doing load-bearing work. Who you are: name, occupation, employer, since when. The trip: dates, destination, purpose, who you're travelling with. The money: who is paying and where the file proves it. The return: your job, your family, your obligations — the specific life you're coming back to. Sign it, date it, address it to the consulate processing the application.",
      },
      { type: "image", seed: "signing-document-pen", alt: "Signing a formal letter with a fountain pen" },
      {
        type: "paragraph",
        text: "Read it once more before submission and cut every sentence that doesn't state a fact the officer can verify elsewhere in the file. A cover letter that makes claims the documents don't support is worse than no letter at all — but one that ties a clean file together is, in our experience, the cheapest approval-rate improvement available to any applicant.",
      },
    ],
  },
];
