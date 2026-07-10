import { Reveal } from "@/components/Reveal";

const STEPS = [
  { title: "Consult", description: "Free consultation with our visa expert to assess eligibility and requirements." },
  { title: "Document", description: "We provide a precise checklist and verify all your documents before submission." },
  { title: "Apply", description: "We submit your application and liaise with the embassy on your behalf." },
  { title: "Travel", description: "Receive your visa and travel with confidence. We handle any follow-ups." },
];

export function HowItWorks() {
  return (
    <section className="bg-surface px-8 py-[100px]">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[2px] text-accent">How It Works</p>
          <h2 className="mt-2 text-center font-display text-4xl font-bold text-foreground">
            Your Visa in 4 Simple Steps
          </h2>
        </Reveal>

        {/* Mobile: vertical zig-zag timeline, text alternating left/right of a centered line. */}
        <div className="relative mt-12 md:hidden">
          <div
            className="absolute top-7 bottom-7 left-1/2 w-0.5 -translate-x-1/2"
            style={{
              backgroundImage: "linear-gradient(180deg, var(--nav-surface), var(--card-border) 50%, var(--accent))",
            }}
          />
          <div className="grid grid-cols-1 gap-10">
            {STEPS.map((step, i) => {
              const textOnRight = i % 2 === 0;
              const textBlock = (
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-foreground-secondary">{step.description}</p>
                </div>
              );
              return (
                <Reveal key={step.title} delay={i * 120} className="relative flex">
                  <div className="w-1/2 pr-8 text-right">{!textOnRight && textBlock}</div>
                  <div
                    className={`absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-display text-lg font-bold text-white ${
                      i % 2 === 0 ? "bg-nav-surface" : "bg-accent"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="w-1/2 pl-8 text-left">{textOnRight && textBlock}</div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Desktop: horizontal line, steps centered underneath. */}
        <div className="relative mt-12 hidden md:block">
          <div
            className="absolute top-7 left-[12.5%] right-[12.5%] h-0.5"
            style={{
              backgroundImage: "linear-gradient(90deg, var(--nav-surface), var(--card-border) 50%, var(--accent))",
            }}
          />
          <div className="grid grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 120} className="text-center">
                <div
                  className={`relative mx-auto flex h-14 w-14 items-center justify-center rounded-full font-display text-lg font-bold text-white ${
                    i % 2 === 0 ? "bg-nav-surface" : "bg-accent"
                  }`}
                >
                  {i + 1}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-foreground-secondary">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
