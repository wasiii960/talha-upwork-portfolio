import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { CaseStudiesExplorer } from "@/components/case-studies-explorer";

export const metadata: Metadata = {
  title: "Engineering Case Studies",
  description:
    "Anonymised, in-depth engineering case studies covering healthcare integrations, LIMS platforms, order processing systems, legacy modernisation, cloud migration, and high-performance API gateways.",
};

export default function CaseStudiesPage() {
  return (
    <div className="pt-36 pb-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Portfolio</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            Engineering Case Studies
          </h1>
          <p className="mt-4 text-balance text-muted">
            Six anonymised deep-dives into enterprise systems — the business problem, the
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
