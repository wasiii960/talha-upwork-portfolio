"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { caseStudies } from "@/data/case-studies";
import { CaseStudyCard } from "@/components/case-study-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function CaseStudiesExplorer() {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState<string | null>(null);

  const industries = useMemo(
    () => Array.from(new Set(caseStudies.map((cs) => cs.industry))),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return caseStudies.filter((cs) => {
      const matchesQuery =
        !q ||
        cs.title.toLowerCase().includes(q) ||
        cs.tagline.toLowerCase().includes(q) ||
        cs.technologies.some((t) => t.toLowerCase().includes(q)) ||
        cs.industry.toLowerCase().includes(q);
      const matchesIndustry = !industry || cs.industry === industry;
      return matchesQuery && matchesIndustry;
    });
  }, [query, industry]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search case studies..."
            className="w-full rounded-full border border-border-strong bg-white/[0.02] py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-accent"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={() => setIndustry(null)}>
            <Badge
              variant={industry === null ? "accent" : "outline"}
              className={cn("cursor-pointer transition-colors", industry === null ? "" : "hover:border-border-strong")}
            >
              All Industries
            </Badge>
          </button>
          {industries.map((ind) => (
            <button key={ind} onClick={() => setIndustry(ind)}>
              <Badge
                variant={industry === ind ? "accent" : "outline"}
                className="cursor-pointer transition-colors hover:border-border-strong"
              >
                {ind}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-20 text-center text-sm text-muted">
          No case studies match &ldquo;{query}&rdquo;. Try a different search term.
        </p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((study, i) => (
            <CaseStudyCard key={study.slug} study={study} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
