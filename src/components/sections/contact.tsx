"use client";

import { useState } from "react";
import { Loader2, Mail, Send } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { CopyEmailButton } from "@/components/copy-email-button";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "submitting" | "sent";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(`Project inquiry from ${data.get("name")}`);
    const body = encodeURIComponent(
      `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`
    );
    window.setTimeout(() => {
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
    }, 600);
  }

  return (
    <section id="contact" className="relative border-t border-border py-28 sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Contact</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
              Let&apos;s build something that lasts.
            </h2>
            <p className="mt-4 max-w-md text-balance text-muted">
              Tell me about the problem you&apos;re solving. I respond to every serious inquiry
              within one business day.
            </p>

            <div className="mt-8 space-y-3">
              <CopyEmailButton />
              <div className="flex items-center gap-3 pt-2">
                <Button asChild variant="outline" size="icon">
                  <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <LinkedinIcon className="size-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="icon">
                  <a href={siteConfig.social.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                    <GithubIcon className="size-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="icon">
                  <a href={siteConfig.social.upwork} target="_blank" rel="noreferrer" aria-label="Upwork">
                    <span className="text-xs font-bold">Up</span>
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface/60 p-6 sm:p-8">
              <div className="grid gap-5">
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-medium text-muted">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="rounded-lg border border-border-strong bg-white/[0.02] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-accent"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-medium text-muted">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="rounded-lg border border-border-strong bg-white/[0.02] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-accent"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-medium text-muted">
                    Project details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="resize-none rounded-lg border border-border-strong bg-white/[0.02] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-accent"
                    placeholder="What are you building, and what problem are you trying to solve?"
                  />
                </div>
                <Button type="submit" variant="accent" size="lg" disabled={status !== "idle"} className="w-full">
                  {status === "idle" && (
                    <>
                      Send Message <Send className="size-4" />
                    </>
                  )}
                  {status === "submitting" && (
                    <>
                      Opening your email client <Loader2 className="size-4 animate-spin" />
                    </>
                  )}
                  {status === "sent" && (
                    <>
                      Ready to send <Mail className="size-4" />
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  This opens your email client with the message pre-filled to {siteConfig.email}.
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
