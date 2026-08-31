import { experience } from "../data/content";

export function Experience() {
  return (
    <section id="experience" className="border-t border-white/10 bg-slate-900/40">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-sm font-medium uppercase tracking-widest text-cyan-400">
          Experience
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Where I've worked.</h2>

        <ol className="mt-12 space-y-8 border-l border-white/10 pl-8">
          {experience.map((item) => (
            <li key={`${item.role}-${item.company}`} className="relative">
              <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-cyan-400" />
              <p className="text-sm text-slate-400">{item.period}</p>
              <h3 className="mt-1 text-lg font-semibold text-white">
                {item.role} · {item.company}
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
