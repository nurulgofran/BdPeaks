import { Link } from "react-router-dom";
import { Droplets, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Waterfall } from "@/data/mockData";

export function WaterfallCard({ waterfall }: { waterfall: Waterfall }) {
  return (
    <Link
      to={`/waterfall/${waterfall.slug}`}
      className="group block rounded-xl border border-border bg-card hover:border-blue-500/40 hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-44 rounded-t-xl bg-gradient-to-br from-blue-900/30 to-secondary overflow-hidden">
        <Droplets className="absolute inset-0 m-auto h-16 w-16 text-blue-400/30 group-hover:scale-110 transition-transform duration-500" />
        <Badge
          className="absolute top-3 right-3 border bg-blue-500/20 text-blue-400 border-blue-500/30"
          variant="outline"
        >
          Waterfall
        </Badge>
        {waterfall.coordinates_pending && (
          <Badge
            className="absolute top-3 left-3 border text-yellow-400 border-yellow-500/30 text-[10px]"
            variant="outline"
          >
            Coords Pending
          </Badge>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold leading-tight group-hover:text-blue-400 transition-colors">
          {waterfall.name_en}
        </h3>
        <p className="text-sm text-muted-foreground">{waterfall.name_bn}</p>

        <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {waterfall.region}
          </span>
        </div>
      </div>
    </Link>
  );
}
