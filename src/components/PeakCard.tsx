import { Link } from "react-router-dom";
import { MapPin, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Mountain } from "@/data/mockData";

function getDifficultyColor(d: number) {
  if (d <= 3) return "bg-emerald-500/15 text-emerald-400 border-emerald-500/25";
  if (d <= 6) return "bg-amber-500/15 text-amber-400 border-amber-500/25";
  return "bg-red-500/15 text-red-400 border-red-500/25";
}

/** Minimal topo-line SVG — unique per peak */
function TopoLines({ seed }: { seed: number }) {
  const lines = Array.from({ length: 5 }, (_, i) => {
    const y = 20 + i * 14 + (seed + i * 7) % 8;
    const cx = 50 + ((seed * (i + 1)) % 40) - 20;
    const cy = y - 6 - (i * 2);
    return `M 0 ${y} Q ${cx} ${cy} 100 ${y + ((seed + i) % 6) - 3}`;
  });

  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full opacity-[0.06] group-hover:opacity-[0.1] transition-opacity duration-700"
      preserveAspectRatio="none"
    >
      {lines.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
      ))}
    </svg>
  );
}

export function PeakCard({ peak }: { peak: Mountain }) {
  const seed = peak.altitude_ft + peak.difficulty * 100;

  return (
    <Link
      to={`/peak/${peak.slug}`}
      className="group relative flex flex-col rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Visual header */}
      <div className="relative h-36 rounded-t-2xl overflow-hidden bg-muted/40">
        <TopoLines seed={seed} />

        {/* Altitude watermark */}
        <span className="absolute bottom-2 right-3 text-[2rem] font-black leading-none text-foreground/[0.04] tracking-tighter select-none">
          {peak.altitude_ft.toLocaleString()}
        </span>

        <Badge
          className={`absolute top-3 right-3 text-[10px] font-semibold border ${getDifficultyColor(peak.difficulty)}`}
          variant="outline"
        >
          D{peak.difficulty}
        </Badge>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 p-4 pt-3">
        <h3 className="text-base font-semibold leading-snug group-hover:text-primary transition-colors duration-200">
          {peak.name_en}
        </h3>
        <p className="text-xs text-muted-foreground/70">{peak.name_bn}</p>

        <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-1.5 pt-2 border-t border-border/40">
          <span className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-primary/70" />
            {peak.altitude_ft.toLocaleString()} ft
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-muted-foreground/50" />
            {peak.region}
          </span>
        </div>
      </div>
    </Link>
  );
}
