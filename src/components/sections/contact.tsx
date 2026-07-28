"use client";

import { useState } from "react";
import { AlertCircle, Check, Loader2, Send } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { CopyEmailButton } from "@/components/copy-email-button";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "submitting" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          botcheck: data.get("botcheck"),
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
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
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  disabled={status === "submitting" || status === "sent"}
                  className="w-full"
                >
                  {status === "idle" && (
                    <>
                      Send Message <Send className="size-4" />
                    </>
                  )}
                  {status === "submitting" && (
                    <>
                      Sending <Loader2 className="size-4 animate-spin" />
                    </>
                  )}
                  {status === "sent" && (
                    <>
                      Message Sent <Check className="size-4" />
                    </>
                  )}
                  {status === "error" && (
                    <>
                      Try Again <Send className="size-4" />
                    </>
                  )}
                </Button>
                {status === "sent" ? (
                  <p className="text-center text-xs text-emerald-400">
                    Thanks — your message is on its way. I&apos;ll reply within one business day.
                  </p>
                ) : status === "error" ? (
                  <p className="flex items-center justify-center gap-1.5 text-center text-xs text-red-400">
                    <AlertCircle className="size-3.5" /> Something went wrong. Please try again or
                    email {siteConfig.email} directly.
                  </p>
                ) : (
                  <p className="text-center text-xs text-muted-foreground">
                    Sent directly to {siteConfig.email}.
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
