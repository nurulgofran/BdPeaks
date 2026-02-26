import { Link } from "react-router-dom";
import { MapPin, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Mountain } from "@/data/mockData";

function getDifficultyColor(d: number) {
  if (d <= 3) return "bg-emerald/20 text-primary border-primary/30";
  if (d <= 6) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  return "bg-red-500/20 text-red-400 border-red-500/30";
}

/** Generate a unique gradient based on peak properties */
function peakGradient(peak: Mountain) {
  const hue1 = (peak.altitude_ft * 0.05 + peak.difficulty * 20) % 360;
  const hue2 = (hue1 + 40) % 360;
  return `linear-gradient(135deg, hsl(${hue1} 35% 18%) 0%, hsl(${hue2} 40% 12%) 100%)`;
}

/** Simple SVG mountain silhouette unique per peak */
function MountainSilhouetteSVG({ peak }: { peak: Mountain }) {
  const h = peak.altitude_ft;
  const p1 = 20 + (h % 30);
  const p2 = 50 + (h % 20) - 10;
  const p3 = 80 - (h % 25);
  const peak1Y = 25 + (peak.difficulty % 5) * 3;
  const peak2Y = 15 + (h % 7) * 2;
  const peak3Y = 30 + (h % 9) * 2;

  return (
    <svg
      viewBox="0 0 200 80"
      className="absolute bottom-0 left-0 w-full h-3/5 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
      preserveAspectRatio="none"
    >
      <polygon
        points={`0,80 ${p1},${peak1Y} ${p2},${peak2Y} ${p3},${peak3Y} 200,80`}
        fill="currentColor"
        className="text-foreground"
      />
      <polygon
        points={`0,80 ${p1 + 15},${peak1Y + 12} ${p2 + 10},${peak2Y + 15} 200,80`}
        fill="currentColor"
        className="text-foreground/50"
      />
    </svg>
  );
}

export function PeakCard({ peak }: { peak: Mountain }) {
  return (
    <Link
      to={`/peak/${peak.slug}`}
      className="group block rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-emerald transition-all duration-300 overflow-hidden"
    >
      <div
        className="relative h-44 rounded-t-xl overflow-hidden"
        style={{ background: peakGradient(peak) }}
      >
        <MountainSilhouetteSVG peak={peak} />
        <span className="absolute bottom-3 left-3 text-[10px] font-mono tracking-wider text-foreground/30 uppercase">
          {peak.altitude_ft.toLocaleString()} ft · {peak.range}
        </span>
        <Badge
          className={`absolute top-3 right-3 border ${getDifficultyColor(peak.difficulty)}`}
          variant="outline"
        >
          D{peak.difficulty}
        </Badge>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
          {peak.name_en}
        </h3>
        <p className="text-sm text-muted-foreground">{peak.name_bn}</p>

        <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
          <span className="flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            {peak.altitude_ft.toLocaleString()} ft
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {peak.region}
          </span>
        </div>
      </div>
    </Link>
  );
}
