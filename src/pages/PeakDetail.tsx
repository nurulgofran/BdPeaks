import { useParams, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowLeft, Mountain, MapPin, TrendingUp, Calendar, Download, Droplets } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mountains, waterfalls } from "@/data/mockData";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_TOKEN } from "@/lib/mapbox";

mapboxgl.accessToken = MAPBOX_TOKEN;

const PeakDetail = () => {
  const { slug } = useParams();
  const peak = mountains.find((m) => m.slug === slug);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!peak || !mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [peak.lng, peak.lat],
      zoom: 13,
      pitch: 60,
      bearing: -30,
      antialias: true,
    });

    map.current.on("style.load", () => {
      map.current!.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      map.current!.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    const el = document.createElement("div");
    el.style.cssText = "width:16px;height:16px;background:hsl(160,60%,45%);border:2px solid white;border-radius:50%;box-shadow:0 0 10px hsl(160,60%,45%,0.6)";
    new mapboxgl.Marker(el).setLngLat([peak.lng, peak.lat]).addTo(map.current);

    return () => { map.current?.remove(); map.current = null; };
  }, [peak]);

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
        {peak.alt_name && (
          <p className="text-sm text-muted-foreground mt-1">Also known as: {peak.alt_name}</p>
        )}
      </div>

      {/* 3D Map */}
      <div ref={mapContainer} className="rounded-xl border border-border h-72 mb-10 overflow-hidden" />

      <div className="grid md:grid-cols-2 gap-10">
        {/* Specs */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Technical Specs</h2>
          <dl className="space-y-3">
            {[
              { icon: TrendingUp, label: "Altitude", value: `${peak.altitude_ft.toLocaleString()} ft (${peak.altitude_m} m)` },
              { icon: TrendingUp, label: "Source", value: peak.height_source === "gps" ? "GPS Survey" : "Google Earth" },
              { icon: TrendingUp, label: "Prominence", value: peak.prominence ? `${peak.prominence} ft` : "N/A" },
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

          {/* Nearby Waterfalls */}
          {(() => {
            const nearby = waterfalls.filter((w) => w.nearby_peak_slugs.includes(peak.slug));
            if (nearby.length === 0) return null;
            return (
              <>
                <h2 className="text-lg font-semibold mt-8 mb-4 flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-400" /> Nearby Waterfalls
                </h2>
                <div className="space-y-2">
                  {nearby.map((wf) => (
                    <Link
                      key={wf.id}
                      to={`/waterfall/${wf.slug}`}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-blue-500/40 transition-colors"
                    >
                      <span className="font-medium text-sm">{wf.name_en}</span>
                      <Badge variant="outline" className="text-xs text-blue-400">Waterfall</Badge>
                    </Link>
                  ))}
                </div>
              </>
            );
          })()}
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
