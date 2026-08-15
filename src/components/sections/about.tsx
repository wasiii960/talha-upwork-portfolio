import Image from "next/image";
import { Code2, Layers, ShieldCheck, Target } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site";

const pillars = [
  {
    icon: Target,
    title: "Constraint-first modeling",
    description: "Cycle time, edge hardware limits, and shop-floor conditions shape the model — not the other way around.",
  },
  {
    icon: Layers,
    title: "Edge-ready by design",
    description: "Quantized inference, offline-first architecture — models built to run reliably on Raspberry Pi and PLC-integrated hardware.",
  },
  {
    icon: ShieldCheck,
    title: "Production-grade by default",
    description: "Monitoring, alerting, and fallback behavior are part of the build from day one, not bolted on after a pilot.",
  },
  {
    icon: Code2,
    title: "Results teams actually use",
    description: "Dashboards and alerts land in the tools maintenance and production teams already work in — not a notebook nobody opens.",
  },
];

export function About() {
  return (
    <section id="about" className="relative border-t border-border py-28 sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-border-strong bg-gradient-to-br from-surface-2 to-surface">
              <Image
                src="/talha-rehman-khan.jpg"
                alt={siteConfig.name}
                fill
                priority
                className="object-cover object-top"
                sizes="(min-width: 1024px) 384px, 90vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
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
An engineering mindset, not just a model.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-muted leading-relaxed">
                <p>
                  I&apos;m an AI/ML engineer with {siteConfig.yearsExperience}+ years building computer
                  vision and machine learning systems that run in real production environments —
                  on a fuel-cell manufacturing line, on edge devices wired directly into PLCs, and
                  on servers processing hundreds of gigabytes of sensor data a day.
                </p>
                <p>
                  My background is in problems that don&apos;t have a clean off-the-shelf answer:
                  quantizing a CNN to fit inside a 3-second robot cycle on a Raspberry Pi, building
                  an autonomous vehicle from scratch with camera-based PID control, and turning
                  500+ motors&apos; worth of noisy time-series data into an early-warning system
                  maintenance teams actually trust.
                </p>
                <p>
                  I care less about chasing the newest model architecture and more about whether
                  the system keeps working reliably on a shop floor, with real lighting, real
                  hardware constraints, and zero tolerance for downtime.
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
