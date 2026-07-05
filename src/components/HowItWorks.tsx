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
        <p className="text-center text-xs font-semibold uppercase tracking-[2px] text-accent">How It Works</p>
        <h2 className="mt-2 text-center font-display text-4xl font-bold text-foreground">
          Your Visa in 4 Simple Steps
        </h2>
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
      </div>
    </section>
  );
}
