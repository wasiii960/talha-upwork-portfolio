import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { caseStudies } from "@/data/case-studies";
import { CaseStudyCard } from "@/components/case-study-card";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function FeaturedCaseStudies() {
  const featured = caseStudies.slice(0, 6);

  return (
    <section className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Selected Work</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
            Engineering Case Studies
          </h2>
          <p className="mt-4 text-balance text-muted">
            Anonymised deep-dives into enterprise systems I&apos;ve architected and shipped —
            the business problem, the engineering decisions, and the measurable outcome.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((study, i) => (
            <CaseStudyCard key={study.slug} study={study} index={i} />
          ))}
        </div>

        <Reveal className="mt-14 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/case-studies">
              View All Case Studies <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
