import { Link } from "react-router-dom";
import { Mountain as MountainIcon, MapPin, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Mountain } from "@/data/mockData";

function getDifficultyColor(d: number) {
  if (d <= 3) return "bg-emerald/20 text-primary border-primary/30";
  if (d <= 6) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  return "bg-red-500/20 text-red-400 border-red-500/30";
}

export function PeakCard({ peak }: { peak: Mountain }) {
  return (
    <Link
      to={`/peak/${peak.slug}`}
      className="group block rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-emerald transition-all duration-300"
    >
      {/* Image placeholder */}
      <div className="relative h-44 rounded-t-xl bg-gradient-to-br from-muted to-secondary overflow-hidden">
        <MountainIcon className="absolute inset-0 m-auto h-16 w-16 text-muted-foreground/30 group-hover:scale-110 transition-transform duration-500" />
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
