import Link from "next/link";
import { Mail } from "lucide-react";

import { navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="flex size-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <span className="font-mono text-sm">{"{ }"}</span>
              </span>
              {siteConfig.name}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">Navigate</p>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">Connect</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={siteConfig.social.upwork} target="_blank" rel="noreferrer" className="text-sm text-muted transition-colors hover:text-foreground">
                  Upwork
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">Get in touch</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground">
                  <Mail className="size-3.5" /> {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-center gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Designed &amp; engineered for production-grade AI/ML systems.</p>
        </div>
      </div>
    </footer>
  );
}
