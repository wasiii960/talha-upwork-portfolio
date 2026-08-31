import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/content";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <p className="text-sm font-medium uppercase tracking-widest text-cyan-400">
        Selected work
      </p>
      <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
        A few things I've built.
      </h2>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/40 p-6 transition-colors hover:border-cyan-400/40"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                {project.link && (
                  <ArrowUpRight
                    size={18}
                    className="mt-1 shrink-0 text-slate-500 transition-colors group-hover:text-cyan-400"
                  />
                )}
              </div>
              <p className="mt-3 text-sm text-slate-300">{project.description}</p>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-400"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
