"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { CaseStudy } from "@/data/case-studies";
import { Badge } from "@/components/ui/badge";
import { DiagramThumbnail } from "@/components/diagrams/diagram-thumbnail";

export function CaseStudyCard({ study, index = 0 }: { study: CaseStudy; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/case-studies/${study.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/60 transition-all duration-300 hover:-translate-y-1.5 hover:border-border-strong hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
      >
        <div className={`relative h-44 overflow-hidden border-b border-border bg-gradient-to-br ${study.accent}`}>
          <DiagramThumbnail variant={study.diagram} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="accent">{study.industry}</Badge>
          </div>

          <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
            {study.title}
          </h3>

          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
            {study.tagline}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {study.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-white/[0.02] px-2 py-1 text-[11px] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm font-medium text-foreground">
            Read Full Case Study
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-accent" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
