import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

import { caseStudies, getCaseStudyBySlug } from "@/data/case-studies";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { DiagramThumbnail } from "@/components/diagrams/diagram-thumbnail";
import { ArchitectureDiagram } from "@/components/diagrams/architecture-diagram";
import { CaseStudyCard } from "@/components/case-study-card";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.tagline,
    openGraph: {
      title: study.title,
      description: study.tagline,
      type: "article",
    },
  };
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="border-t border-border py-12 first:border-t-0 first:pt-0">
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground lg:pt-1">
          {icon}
          {title}
        </div>
        <div className="max-w-3xl">{children}</div>
      </div>
    </Reveal>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) notFound();

  const currentIndex = caseStudies.findIndex((cs) => cs.slug === slug);
  const next = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <article className="pb-28">
      <header className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 -z-10 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black_10%,transparent_70%)]" />
        <div className={`absolute inset-x-0 top-0 -z-10 h-[28rem] bg-gradient-to-b ${study.accent}`} />

        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" /> All Case Studies
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Badge variant="accent">{study.industry}</Badge>
              <Badge variant="outline">{study.timeframe}</Badge>
              <Badge variant="outline">{study.teamSize}</Badge>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
              {study.title}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-muted">
              {study.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap gap-2">
              {study.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border bg-white/[0.02] px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className={`relative mt-12 h-64 overflow-hidden rounded-2xl border border-border-strong bg-gradient-to-br sm:h-80 ${study.accent}`}>
              <DiagramThumbnail variant={study.diagram} />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6">
        <Section title="Executive Summary">
          <p className="leading-relaxed text-muted">{study.executiveSummary}</p>
        </Section>

        <Section title="Business Problem">
          <p className="leading-relaxed text-muted">{study.businessProblem}</p>
        </Section>

        <Section title="Challenges">
          <ul className="space-y-3">
            {study.challenges.map((c) => (
              <li key={c} className="flex gap-3 text-muted">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                <span className="leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Solution">
          <p className="leading-relaxed text-muted">{study.solution}</p>
        </Section>

        <Section title="Architecture Diagram">
          <ArchitectureDiagram layers={study.diagramLayers} />
        </Section>

        <Section title="System Design">
          <ul className="space-y-3">
            {study.architectureNotes.map((note) => (
              <li key={note} className="flex gap-3 text-muted">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                <span className="leading-relaxed">{note}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Technology Stack">
          <div className="grid gap-4 sm:grid-cols-2">
            {study.techStack.map((group) => (
              <div key={group.category} className="rounded-xl border border-border bg-surface/60 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {group.category}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-md border border-border bg-white/[0.02] px-2 py-1 text-xs text-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="My Role">
          <ul className="space-y-3">
            {study.role.map((r) => (
              <li key={r} className="flex gap-3 text-muted">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                <span className="leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Engineering Decisions" icon={<Lightbulb className="size-4 text-accent" />}>
          <div className="space-y-6">
            {study.engineeringDecisions.map((d) => (
              <div key={d.title} className="rounded-xl border border-border bg-surface/60 p-5">
                <p className="font-medium text-foreground">{d.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Implementation">
          <ul className="space-y-3">
            {study.implementation.map((i) => (
              <li key={i} className="flex gap-3 text-muted">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                <span className="leading-relaxed">{i}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Performance Optimisations">
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Metric</th>
                  <th className="px-4 py-3 font-medium">Before</th>
                  <th className="px-4 py-3 font-medium">After</th>
                </tr>
              </thead>
              <tbody>
                {study.performance.map((p) => (
                  <tr key={p.metric} className="border-b border-border last:border-0">
                    <td className="px-4 py-3.5 text-foreground">{p.metric}</td>
                    <td className="px-4 py-3.5 text-muted">{p.before}</td>
                    <td className="px-4 py-3.5 font-medium text-emerald-400">{p.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Results" icon={<TrendingUp className="size-4 text-accent" />}>
          <div className="grid gap-4 sm:grid-cols-3">
            {study.results.map((r) => (
              <div key={r.label} className="rounded-xl border border-border bg-surface/60 p-5 text-center">
                <p className="text-3xl font-semibold tracking-tight text-accent">{r.value}</p>
                <p className="mt-1.5 text-sm font-medium text-foreground">{r.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{r.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Lessons Learned">
          <ul className="space-y-3">
            {study.lessonsLearned.map((l) => (
              <li key={l} className="flex gap-3 text-muted">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                <span className="leading-relaxed">{l}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <div className="mx-auto mt-8 max-w-4xl px-6">
        <div className="flex flex-col gap-6 border-t border-border pt-12 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild variant="accent" size="lg">
            <Link href="/#contact">
              Discuss a similar project <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/case-studies">All Case Studies</Link>
          </Button>
        </div>

        <div className="mt-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Next Case Study</p>
          <div className="mt-6 max-w-md">
            <CaseStudyCard study={next} />
          </div>
        </div>
      </div>
    </article>
  );
}
