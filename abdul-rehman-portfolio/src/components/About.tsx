import { profile } from "../data/content";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-cyan-400">
            About me
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Building products people enjoy using.
          </h2>
        </div>

        <div className="space-y-4 text-slate-300">
          <p>
            I'm {profile.name}, a {profile.role.toLowerCase()} focused on turning designs and
            product ideas into fast, reliable web applications. I care about clean component
            architecture, accessible interfaces, and code that's easy for the next developer
            to pick up.
          </p>
          <p>
            My day-to-day toolkit is React and TypeScript on the frontend, paired with
            Node.js APIs and relational databases on the backend, so I can own a feature from
            UI to data layer when a project calls for it.
          </p>
          <p>
            When I'm not shipping features, I'm refining component libraries, exploring new
            tooling, or writing about the patterns I've found useful on real projects.
          </p>
        </div>
      </div>
    </section>
  );
}
