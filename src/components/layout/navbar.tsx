"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Command, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const modifierKeyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (modifierKeyRef.current) {
      modifierKeyRef.current.textContent = /Mac|iPhone|iPod|iPad/.test(navigator.userAgent)
        ? "⌘K"
        : "Ctrl K";
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300",
            scrolled ? "glass shadow-lg shadow-black/20" : "border border-transparent"
          )}
        >
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <span className="font-mono text-sm">{"{ }"}</span>
            </span>
            <span className="hidden sm:inline">{siteConfig.name}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-foreground hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const event = new KeyboardEvent("keydown", { key: "k", metaKey: true });
                document.dispatchEvent(event);
              }}
              className="hidden sm:flex items-center gap-2 rounded-full border border-border-strong bg-white/[0.02] px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground hover:bg-white/5"
            >
              <Command className="size-3.5" />
              <span>Search</span>
              <kbd ref={modifierKeyRef} className="rounded border border-border px-1 text-[10px]">
                ⌘K
              </kbd>
            </button>
            <Button asChild size="sm" variant="accent" className="hidden sm:inline-flex">
              <Link href="/#contact">Hire Me</Link>
            </Button>
            <button
              className="flex md:hidden size-9 items-center justify-center rounded-full border border-border-strong"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden mx-4 mt-2 rounded-2xl border border-border-strong bg-surface/95 backdrop-blur-xl p-4 shadow-2xl"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:text-foreground hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild variant="accent" className="mt-2 w-full">
                <Link href="/#contact" onClick={() => setMobileOpen(false)}>
                  Hire Me
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
