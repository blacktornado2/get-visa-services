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
