import { skills } from "../data/content";

export function Skills() {
  return (
    <section id="skills" className="border-t border-white/10 bg-slate-900/40">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-sm font-medium uppercase tracking-widest text-cyan-400">
          Skills
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Tools I use to get the job done.
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-6"
            >
              <h3 className="text-lg font-semibold text-white">{group.category}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
