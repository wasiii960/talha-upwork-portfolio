import { Code2, Layers, ShieldCheck, Target } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site";

const pillars = [
  {
    icon: Target,
    title: "Problem-first thinking",
    description: "Every architecture decision starts from the business problem, not the technology I like best.",
  },
  {
    icon: Layers,
    title: "Systems that scale",
    description: "Designing for the load you'll actually have — 6 months out, not a hypothetical 10 years out.",
  },
  {
    icon: ShieldCheck,
    title: "Production-grade by default",
    description: "Testing, observability, and rollback plans are part of the build, not an afterthought.",
  },
  {
    icon: Code2,
    title: "Code that outlives me",
    description: "Clear, well-documented systems the next engineer can pick up without a handoff call.",
  },
];

export function About() {
  return (
    <section id="about" className="relative border-t border-border py-28 sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-border-strong bg-gradient-to-br from-surface-2 to-surface">
              <div className="absolute inset-0 bg-grid opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex size-28 items-center justify-center rounded-full border border-border-strong bg-white/5 text-4xl font-semibold text-muted">
                  {siteConfig.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-surface/80 p-5 backdrop-blur-sm">
                <p className="text-sm font-medium text-foreground">{siteConfig.name}</p>
                <p className="text-xs text-muted">{siteConfig.role}</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">About</p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
                An engineering mindset, not just a tech stack.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-muted leading-relaxed">
                <p>
                  I&apos;m a backend engineer with {siteConfig.yearsExperience}+ years building systems that
                  enterprises actually depend on — healthcare data platforms, financial transaction
                  systems, and high-throughput integration layers that can&apos;t afford to go down.
                </p>
                <p>
                  My background is in solving problems that don&apos;t have a clean textbook answer:
                  legacy systems that need modernising without downtime, integrations across
                  incompatible vendors, and architectures that have to hold up under real,
                  unpredictable production load.
                </p>
                <p>
                  I care less about using the newest framework and more about whether the system
                  will still make sense to the engineer maintaining it two years from now.
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {pillars.map((pillar, i) => (
                <Reveal key={pillar.title} delay={0.15 + i * 0.05} className="flex gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <pillar.icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{pillar.title}</p>
                    <p className="mt-1 text-sm text-muted">{pillar.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
