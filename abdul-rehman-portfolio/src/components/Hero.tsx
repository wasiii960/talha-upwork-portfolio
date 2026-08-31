import { ArrowRight, Download } from "lucide-react";
import { profile, stats } from "../data/content";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_-10%,rgba(34,211,238,0.18),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(99,102,241,0.15),transparent_40%)]"
      />

      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-cyan-400">
          {profile.location}
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Hi, I'm {profile.name}.
          <span className="block text-slate-400">{profile.role}.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-slate-300">{profile.tagline}</p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-transform hover:scale-105"
          >
            View my work
            <ArrowRight size={16} />
          </a>
          <a
            href={profile.resumeUrl}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/30"
          >
            <Download size={16} />
            Download resume
          </a>
        </div>

        <dl className="mt-16 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-sm text-slate-400">{stat.label}</dt>
              <dd className="mt-1 text-2xl font-semibold text-white">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
