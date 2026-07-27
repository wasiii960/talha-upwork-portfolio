"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-28 pb-20">
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black_20%,transparent_75%)] animate-grid-pan" />

      <div
        className="absolute -top-40 left-1/2 -z-10 h-[42rem] w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.22),transparent)] blur-2xl"
        aria-hidden
      />
      <div
        className="absolute top-1/3 right-[8%] -z-10 size-64 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.16),transparent)] blur-2xl animate-float"
        aria-hidden
      />
      <div
        className="absolute bottom-10 left-[10%] -z-10 size-48 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.14),transparent)] blur-2xl animate-float"
        style={{ animationDelay: "-3s" }}
        aria-hidden
      />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border-strong bg-white/[0.03] px-4 py-1.5 text-xs text-muted"
        >
          <Sparkles className="size-3.5 text-accent" />
          Available for select enterprise engagements
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl"
        >
          Building Enterprise Software
          <br />
          <span className="bg-gradient-to-br from-white via-white to-slate-400 bg-clip-text text-transparent">
            That Solves Real Business Problems.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg"
        >
          {siteConfig.role} specialising in scalable healthcare systems, enterprise
          integrations, REST APIs, distributed systems, and cloud-ready architectures.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button asChild size="lg" variant="accent">
            <Link href="/case-studies">
              View Case Studies <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/#contact">Hire Me</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid w-full max-w-2xl grid-cols-3 gap-6 border-t border-border pt-8"
        >
          {[
            { label: "Years Experience", value: `${siteConfig.yearsExperience}+` },
            { label: "Enterprise Systems Shipped", value: "20+" },
            { label: "Facilities / Services Integrated", value: "250+" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-semibold tracking-tight sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
