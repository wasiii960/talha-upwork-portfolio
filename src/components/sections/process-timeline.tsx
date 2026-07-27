import { processSteps } from "@/data/content";
import { Reveal } from "@/components/motion/reveal";

export function ProcessTimeline() {
  return (
    <section id="process" className="relative border-t border-border py-28 sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">How It Works</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
            Development Process
          </h2>
          <p className="mt-4 text-balance text-muted">
            A consistent, transparent process regardless of project size — so you always know
            what&apos;s happening and why.
          </p>
        </Reveal>

        <div className="relative mt-20">
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-border md:block" />
          <div className="grid gap-10 md:grid-cols-6 md:gap-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08} className="relative flex flex-col items-start md:items-center md:text-center">
                <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface text-sm font-medium text-accent">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-sm font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted md:px-2">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
