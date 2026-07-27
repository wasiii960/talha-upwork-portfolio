"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function CopyEmailButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "group flex w-full items-center justify-between gap-3 rounded-xl border border-border-strong bg-white/[0.02] px-4 py-3 text-sm text-foreground transition-colors hover:bg-white/5 sm:w-auto",
        className
      )}
    >
      <span className="flex items-center gap-2.5">
        <Mail className="size-4 text-accent" />
        {siteConfig.email}
      </span>
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {copied ? (
          <>
            <Check className="size-3.5 text-emerald-400" /> Copied
          </>
        ) : (
          <>
            <Copy className="size-3.5" /> Copy
          </>
        )}
      </span>
    </button>
  );
}
