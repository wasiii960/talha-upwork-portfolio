import { services } from "@/data/content";
import { Reveal } from "@/components/motion/reveal";

export function Services() {
  return (
    <section id="services" className="relative border-t border-border py-28 sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">What I Do</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
            Services
          </h2>
          <p className="mt-4 text-balance text-muted">
            End-to-end backend engineering — from first architecture sketch to production
            hardening.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal
              key={service.title}
              delay={(i % 4) * 0.06}
              className="group relative flex flex-col gap-4 bg-surface p-7 transition-colors hover:bg-surface-2"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                <service.icon className="size-5" />
              </div>
              <h3 className="text-base font-semibold tracking-tight">{service.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{service.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
