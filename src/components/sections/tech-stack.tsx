import { techGrid } from "@/data/content";
import { Reveal } from "@/components/motion/reveal";

export function TechStack() {
  return (
    <section className="relative border-t border-border py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Toolbox</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
            Technology Stack
          </h2>
          <p className="mt-4 text-balance text-muted">
            A deliberately narrow, deeply-known set of tools rather than a scattershot resume of buzzwords.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {techGrid.map((group, i) => (
            <Reveal
              key={group.category}
              delay={(i % 4) * 0.06}
              className="group rounded-2xl border border-border bg-surface/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-surface-2"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                <group.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-sm font-semibold tracking-tight">{group.category}</h3>
              <ul className="mt-3 space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
