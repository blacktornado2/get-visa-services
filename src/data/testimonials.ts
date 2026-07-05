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
