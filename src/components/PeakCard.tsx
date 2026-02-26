import { Link } from "react-router-dom";
import { MapPin, TrendingUp } from "lucide-react";
import type { Mountain } from "@/data/mockData";

function difficultyLabel(d: number) {
  if (d <= 3) return { text: "Easy", cls: "text-emerald-400" };
  if (d <= 6) return { text: "Moderate", cls: "text-amber-400" };
  return { text: "Hard", cls: "text-red-400" };
}

/** Generative ridge-line unique to each peak */
function RidgeLine({ seed }: { seed: number }) {
  const pts: string[] = ["0,60"];
  for (let i = 1; i <= 9; i++) {
    const x = i * 11;
    const y = 18 + ((seed * i * 7 + i * 13) % 30);
    pts.push(`${x},${y}`);
  }
  pts.push("100,55", "100,60");

  return (
    <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-16">
      <defs>
        <linearGradient id={`rg-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={pts.join(" ")} fill={`url(#rg-${seed})`} />
      <polyline
        points={pts.slice(0, -2).join(" ")}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="0.6"
        strokeOpacity="0.35"
      />
    </svg>
  );
}

export function PeakCard({ peak }: { peak: Mountain }) {
  const seed = peak.altitude_ft + peak.difficulty * 37;
  const diff = difficultyLabel(peak.difficulty);

  return (
    <Link
      to={`/peak/${peak.slug}`}
      className="group relative flex flex-col justify-between rounded-xl bg-secondary/50 border border-transparent hover:border-primary/20 transition-all duration-300 overflow-hidden h-52"
    >
      {/* Top content */}
      <div className="relative z-10 p-4 pb-0 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-bold leading-tight truncate group-hover:text-primary transition-colors duration-200">
              {peak.name_en}
            </h3>
            <p className="text-[11px] text-muted-foreground/60 mt-0.5 truncate">{peak.name_bn}</p>
          </div>
          <span className={`shrink-0 text-[10px] font-bold uppercase tracking-widest ${diff.cls}`}>
            D{peak.difficulty}
          </span>
        </div>

        {/* Big altitude number */}
        <span className="mt-auto text-3xl font-black tracking-tight text-foreground/90 leading-none">
          {peak.altitude_ft.toLocaleString()}
          <span className="text-xs font-medium text-muted-foreground/50 ml-1">ft</span>
        </span>
      </div>

      {/* Ridge line visual */}
      <RidgeLine seed={seed} />

      {/* Bottom bar */}
      <div className="relative z-10 px-4 pb-3 flex items-center gap-3 text-[10px] text-muted-foreground/60">
        <span className="flex items-center gap-1">
          <MapPin className="h-2.5 w-2.5" />
          {peak.region}
        </span>
        <span className="ml-auto text-muted-foreground/40">{peak.range}</span>
      </div>
    </Link>
  );
}
