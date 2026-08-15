import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { CaseStudiesExplorer } from "@/components/case-studies-explorer";

export const metadata: Metadata = {
  title: "AI/ML Engineering Case Studies",
  description:
    "Anonymised, in-depth AI/ML case studies covering industrial computer vision, edge AI, robotics, large-scale time-series data engineering, and predictive maintenance on live production lines.",
};

export default function CaseStudiesPage() {
  return (
    <div className="pt-36 pb-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Portfolio</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            AI/ML Engineering Case Studies
          </h1>
          <p className="mt-4 text-balance text-muted">
            Anonymised deep-dives into production AI/ML systems: the business problem, the
            architecture, the engineering decisions, and the measurable outcome.
          </p>
        </Reveal>

        <div className="mt-16">
          <CaseStudiesExplorer />
        </div>
      </div>
    </div>
  );
}
