import { Link } from "react-router-dom";
import { MapPin, TrendingUp } from "lucide-react";
import type { Mountain } from "@/data/mockData";

function difficultyDot(d: number) {
  if (d <= 3) return "bg-emerald-400";
  if (d <= 6) return "bg-amber-400";
  return "bg-red-400";
}

/** Subtle abstract circle cluster unique per peak */
function AbstractDecor({ seed }: { seed: number }) {
  const circles = Array.from({ length: 3 }, (_, i) => ({
    cx: 55 + ((seed * (i + 1) * 3) % 35),
    cy: 30 + ((seed * (i + 2) * 5) % 25),
    r: 18 + ((seed + i * 11) % 20),
  }));

  return (
    <svg viewBox="0 0 120 80" className="absolute top-0 right-0 w-28 h-20 opacity-[0.04]" aria-hidden>
      {circles.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="currentColor" className="text-foreground" />
      ))}
    </svg>
  );
}

export function PeakCard({ peak }: { peak: Mountain }) {
  const seed = peak.altitude_ft + peak.difficulty * 37;

  return (
    <Link
      to={`/peak/${peak.slug}`}
      className="group relative flex flex-col rounded-xl border border-border/50 bg-card p-5 hover:border-primary/30 hover:bg-accent/30 transition-all duration-250 overflow-hidden"
    >
      <AbstractDecor seed={seed} />

      {/* Header row */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors duration-200 truncate">
            {peak.name_en}
          </h3>
          <p className="text-sm text-muted-foreground/50 mt-0.5">{peak.name_bn}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
          <span className={`w-2.5 h-2.5 rounded-full ${difficultyDot(peak.difficulty)}`} />
          <span className="text-xs font-medium text-muted-foreground">D{peak.difficulty}</span>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-border/30 my-3" />

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground relative z-10">
        <span className="flex items-center gap-1.5">
          <TrendingUp className="h-4 w-4 text-primary/60" />
          <span className="font-medium text-foreground/80">{peak.altitude_ft.toLocaleString()}</span>
          <span className="text-muted-foreground/40">ft</span>
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-muted-foreground/40" />
          {peak.region}
        </span>
      </div>

      {/* Range tag */}
      <span className="mt-3 self-start text-xs text-muted-foreground/60 bg-muted/40 px-2.5 py-1 rounded-full relative z-10">
        {peak.range}
      </span>
    </Link>
  );
}
