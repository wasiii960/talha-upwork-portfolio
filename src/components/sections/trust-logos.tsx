import { trustLogos } from "@/data/content";

export function TrustLogos() {
  const loop = [...trustLogos, ...trustLogos];

  return (
    <section className="border-y border-border bg-surface/40 py-10">
      <p className="mx-auto mb-6 max-w-6xl px-6 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Trusted enterprise technology stack
      </p>
      <div className="relative mx-auto max-w-6xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-12 py-1">
          {loop.map((logo, i) => (
            <span
              key={`${logo}-${i}`}
              className="flex shrink-0 items-center whitespace-nowrap text-lg font-medium text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
