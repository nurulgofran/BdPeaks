import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mountain, MapPin, TrendingUp, Calendar, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mountains } from "@/data/mockData";

const PeakDetail = () => {
  const { slug } = useParams();
  const peak = mountains.find((m) => m.slug === slug);

  if (!peak) {
    return (
      <main className="container py-20 text-center">
        <p className="text-muted-foreground text-lg">Peak not found.</p>
        <Button variant="link" asChild className="mt-4">
          <Link to="/explore">← Back to Explore</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="container py-8 max-w-5xl">
      <Button variant="ghost" size="sm" asChild className="mb-6 text-muted-foreground">
        <Link to="/explore"><ArrowLeft className="h-4 w-4 mr-1" /> Back to Explore</Link>
      </Button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="outline" className="text-xs">{peak.region}</Badge>
          <Badge variant="outline" className="text-xs">Difficulty {peak.difficulty}/10</Badge>
        </div>
        <h1 className="text-4xl font-bold">{peak.name_en}</h1>
        <p className="text-xl text-muted-foreground mt-1">{peak.name_bn}</p>
      </div>

      {/* Map placeholder */}
      <div className="rounded-xl border border-border bg-muted/30 h-64 flex items-center justify-center mb-10">
        <div className="text-center text-muted-foreground">
          <Mountain className="h-10 w-10 mx-auto mb-2 opacity-40" />
          <p className="text-sm">3D Mapbox terrain view coming soon</p>
          <p className="text-xs mt-1 font-mono">{peak.lat}°N, {peak.lng}°E</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Specs */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Technical Specs</h2>
          <dl className="space-y-3">
            {[
              { icon: TrendingUp, label: "Altitude", value: `${peak.altitude_ft.toLocaleString()} ft` },
              { icon: TrendingUp, label: "Prominence", value: `${peak.prominence} ft` },
              { icon: Mountain, label: "Range", value: peak.range },
              { icon: MapPin, label: "Region", value: peak.region },
              { icon: Calendar, label: "First Ascent", value: peak.first_ascent_date ?? "Unknown" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 py-2 border-b border-border/50">
                <item.icon className="h-4 w-4 text-primary shrink-0" />
                <dt className="text-sm text-muted-foreground w-28">{item.label}</dt>
                <dd className="text-sm font-medium">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Description</h2>
          <p className="text-muted-foreground leading-relaxed">{peak.description}</p>

          <h2 className="text-lg font-semibold mt-8 mb-4">Historical Ascents</h2>
          <p className="text-sm text-muted-foreground italic">No ascent records have been submitted yet.</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-12 flex gap-3">
        <Button variant="outline" disabled>
          <Download className="h-4 w-4 mr-2" /> Download GPX
        </Button>
      </div>
    </main>
  );
};

export default PeakDetail;
