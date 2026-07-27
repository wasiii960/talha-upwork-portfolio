import { Quote } from "lucide-react";

import { testimonials } from "@/data/content";
import { Reveal } from "@/components/motion/reveal";

export function Testimonials() {
  return (
    <section className="relative border-t border-border py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Client Feedback</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
            What Clients Say
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={(i % 2) * 0.08}
              className="flex flex-col justify-between rounded-2xl border border-border bg-surface/60 p-8"
            >
              <Quote className="size-6 text-accent/60" />
              <p className="mt-5 flex-1 text-[15px] leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
