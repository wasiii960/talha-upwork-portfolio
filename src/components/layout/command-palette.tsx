"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  FileText,
  FolderGit2,
  Mail,
  MessageSquareText,
  Sparkles,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { caseStudies } from "@/data/case-studies";
import { siteConfig } from "@/lib/site";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (e.key === "/" && document.activeElement?.tagName === "INPUT") return;
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search case studies, pages, or actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Case Studies">
          {caseStudies.map((cs) => (
            <CommandItem
              key={cs.slug}
              value={`${cs.title} ${cs.industry} ${cs.technologies.join(" ")}`}
              onSelect={() => go(`/case-studies/${cs.slug}`)}
            >
              <FolderGit2 className="size-4 text-muted" />
              <div className="flex flex-col">
                <span>{cs.title}</span>
                <span className="text-xs text-muted-foreground">{cs.industry}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Pages">
          <CommandItem value="all case studies" onSelect={() => go("/case-studies")}>
            <Sparkles className="size-4 text-muted" /> All Case Studies
          </CommandItem>
          <CommandItem value="services" onSelect={() => go("/#services")}>
            <Briefcase className="size-4 text-muted" /> Services
          </CommandItem>
          <CommandItem value="about" onSelect={() => go("/#about")}>
            <MessageSquareText className="size-4 text-muted" /> About
          </CommandItem>
          <CommandItem value="contact" onSelect={() => go("/#contact")}>
            <Mail className="size-4 text-muted" /> Contact
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Actions">
          <CommandItem
            value="copy email"
            onSelect={() => {
              navigator.clipboard.writeText(siteConfig.email);
              setOpen(false);
            }}
          >
            <Mail className="size-4 text-muted" /> Copy Email Address
          </CommandItem>
          <CommandItem
            value="resume download cv"
            onSelect={() => {
              setOpen(false);
              window.open(siteConfig.resumeUrl, "_blank");
            }}
          >
            <FileText className="size-4 text-muted" /> Download Resume
          </CommandItem>
          <CommandItem
            value="github"
            onSelect={() => {
              setOpen(false);
              window.open(siteConfig.social.github, "_blank");
            }}
          >
            <GithubIcon className="size-4 text-muted" /> Open GitHub
          </CommandItem>
          <CommandItem
            value="linkedin"
            onSelect={() => {
              setOpen(false);
              window.open(siteConfig.social.linkedin, "_blank");
            }}
          >
            <LinkedinIcon className="size-4 text-muted" /> Open LinkedIn
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
