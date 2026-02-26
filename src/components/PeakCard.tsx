import { Link } from "react-router-dom";
import { MapPin, TrendingUp } from "lucide-react";
import type { Mountain } from "@/data/mockData";

export function PeakCard({ peak }: { peak: Mountain }) {
  return (
    <Link
      to={`/peak/${peak.slug}`}
      className="group relative flex flex-col rounded-xl border border-border/50 bg-card p-5 hover:border-primary/30 hover:bg-accent/30 transition-all duration-250 overflow-hidden"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors duration-200 truncate">
            {peak.name_en}
          </h3>
          <p className="text-sm text-muted-foreground/50 mt-0.5">{peak.name_bn}</p>
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
      <div className="mt-3 flex gap-2 self-start flex-wrap relative z-10">
        <span className="text-xs text-muted-foreground/60 bg-muted/40 px-2.5 py-1 rounded-full">
          {peak.range}
        </span>
        {peak.coordinates_pending && (
          <span className="text-xs text-amber-500/80 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            Pending Coordinates
          </span>
        )}
      </div>
    </Link>
  );
}
