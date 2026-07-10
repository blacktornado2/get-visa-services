import { Reveal } from "@/components/Reveal";

const PRESS = [
  { name: "The Tribune", src: "/press/tribune.jpg" },
  { name: "The Week", src: "/press/the-week.jpg" },
  { name: "The Wire", src: "/press/wire.svg" },
  { name: "The Eastern Herald", src: "/press/eastern-herald.png" },
];

export function AsSeenOn() {
  return (
    <section className="px-8 py-16">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="text-center font-display text-3xl font-bold text-foreground">
            As <span className="text-accent">Seen</span> On
          </p>
        </Reveal>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {PRESS.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div className="flex h-16 w-40 items-center justify-center rounded-xl bg-white px-6 shadow-sm">
                <img src={p.src} alt={p.name} className="max-h-8 w-auto object-contain" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
