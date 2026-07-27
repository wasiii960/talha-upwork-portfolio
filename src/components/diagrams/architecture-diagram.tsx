import { ArrowRight } from "lucide-react";

import type { DiagramLayer } from "@/data/case-studies";

export function ArchitectureDiagram({ layers }: { layers: DiagramLayer[] }) {
  return (
    <div className="relative overflow-x-auto rounded-2xl border border-border bg-surface/60 p-6 sm:p-10">
      <div className="absolute inset-0 bg-grid opacity-[0.15]" aria-hidden />
      <div className="relative flex min-w-[640px] items-stretch gap-4 sm:gap-6">
        {layers.map((layer, i) => (
          <div key={layer.label} className="flex flex-1 items-center gap-4 sm:gap-6">
            <div className="flex flex-1 flex-col gap-3">
              <p className="text-center text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                {layer.label}
              </p>
              <div className="flex flex-1 flex-col justify-center gap-2.5">
                {layer.nodes.map((node) => (
                  <div
                    key={node}
                    className="rounded-xl border border-border-strong bg-surface-2/80 px-3.5 py-2.5 text-center text-xs font-medium text-foreground shadow-sm sm:text-sm"
                  >
                    {node}
                  </div>
                ))}
              </div>
            </div>
            {i < layers.length - 1 && (
              <ArrowRight className="size-5 shrink-0 text-accent/70" aria-hidden />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
