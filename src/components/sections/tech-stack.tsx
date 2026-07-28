import { Check } from "lucide-react";

import { techGrid } from "@/data/content";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { ParallaxOrbs } from "@/components/motion/parallax-orbs";

export function TechStack() {
  return (
    <section className="relative overflow-hidden border-t border-border py-28 sm:py-32">
      <ParallaxOrbs />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Toolbox</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
            Technology Stack
          </h2>
          <p className="mt-4 text-balance text-muted">
            A deliberately narrow, deeply-known set of tools rather than a scattershot resume of buzzwords.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {techGrid.map((group, i) => (
            <Reveal key={group.category} delay={(i % 4) * 0.06} className="h-full">
              <TiltCard className="h-full">
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-surface/80 to-surface/40 p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] transition-colors duration-300 group-hover/tilt:border-accent/40">
                  <div
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
                    aria-hidden
                  />

                  <div className="flex items-start justify-between">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent/25 to-accent/5 text-accent ring-1 ring-inset ring-accent/20 transition-transform duration-300 group-hover/tilt:scale-110">
                      <group.icon className="size-5" />
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-5 text-sm font-semibold tracking-tight text-foreground">
                    {group.category}
                  </h3>

                  <ul className="mt-3 flex-1 space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted">
                        <Check className="size-3.5 shrink-0 text-accent/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
