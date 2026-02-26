import { useParams, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowLeft, Mountain, MapPin, TrendingUp, Calendar, Download, Droplets, Globe, Layers, Navigation, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mountains, waterfalls } from "@/data/mockData";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_TOKEN } from "@/lib/mapbox";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import sakaHaphongImg from "@/assets/peaks/saka-haphong.png";

mapboxgl.accessToken = MAPBOX_TOKEN;

const heroImages: Record<string, string> = {
  "saka-haphong": sakaHaphongImg,
};

const PeakDetail = () => {
  const { slug } = useParams();
  const peak = mountains.find((m) => m.slug === slug);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!peak || !mapContainer.current || map.current || peak.lat === 0 || peak.lng === 0) return;

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
      <PageTransition>
        <main className="container py-20 text-center">
          <p className="text-muted-foreground text-lg">Peak not found.</p>
          <Button variant="link" asChild className="mt-4">
            <Link to="/explore">← Back to Explore</Link>
          </Button>
        </main>
      </PageTransition>
    );
  }

  const ext = peak.extended;
  const heroImg = ext?.hero_image ? heroImages[ext.hero_image] : null;

  return (
    <PageTransition>
      <main className="container py-6 sm:py-8 max-w-5xl px-4 sm:px-8">
        <Button variant="ghost" size="sm" asChild className="mb-6 text-muted-foreground">
          <Link to="/explore"><ArrowLeft className="h-4 w-4 mr-1" /> Back to Explore</Link>
        </Button>

        {/* Hero Image */}
        {heroImg && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 rounded-xl overflow-hidden border border-border"
          >
            <img
              src={heroImg}
              alt={peak.name_en}
              className="w-full h-48 sm:h-72 md:h-96 object-cover"
              loading="lazy"
            />
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">{peak.region}</Badge>
            <Badge variant="outline" className="text-xs">Difficulty {peak.difficulty}/10</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">{peak.name_en}</h1>
          <p className="text-lg sm:text-xl text-muted-foreground mt-1">{peak.name_bn}</p>
          {peak.alt_name && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">Also known as: {peak.alt_name}</p>
          )}
          {ext?.survey_name && (
            <p className="text-xs text-muted-foreground mt-1">Survey Name: <span className="font-medium text-foreground">{ext.survey_name}</span></p>
          )}
        </motion.div>

        {/* 3D Map */}
        {(peak.lat !== 0 && peak.lng !== 0) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            ref={mapContainer}
            className="rounded-xl border border-border h-56 sm:h-72 mb-8 sm:mb-10 overflow-hidden"
          />
        )}

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
          {/* Specs */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h2 className="text-lg font-semibold mb-4">Technical Specs</h2>
            <dl className="space-y-3">
              {[
                { icon: TrendingUp, label: "Measured Elev.", value: `${peak.altitude_ft.toLocaleString()} ft (${peak.altitude_m} m)` },
                ...(ext?.google_earth_elevation_ft ? [{ icon: TrendingUp, label: "GE Elevation", value: `${ext.google_earth_elevation_ft.toLocaleString()} ft` }] : []),
                ...(ext?.earlier_survey_elevation_ft ? [{ icon: TrendingUp, label: "Survey (1935)", value: `${ext.earlier_survey_elevation_ft.toLocaleString()} ft` }] : []),
                ...(ext?.geoid_elevation_ft ? [{ icon: TrendingUp, label: "Geoid Elev.", value: `${ext.geoid_elevation_ft} ft` }] : []),
                { icon: TrendingUp, label: "Source", value: peak.height_source === "gps" ? "GPS Survey" : "Google Earth" },
                { icon: TrendingUp, label: "Prominence", value: ext?.topographic_prominence ?? (peak.prominence ? `${peak.prominence} ft` : "N/A") },
                ...(ext?.proportional_prominence ? [{ icon: TrendingUp, label: "Prop. Prom.", value: ext.proportional_prominence }] : []),
                ...(ext?.geographic_isolation ? [{ icon: Navigation, label: "Isolation", value: `${ext.geographic_isolation} ${ext.isolation_direction ?? ""}` }] : []),
                { icon: Mountain, label: "Range", value: peak.range },
                { icon: MapPin, label: "Region", value: peak.region },
                { icon: Calendar, label: "First Ascent", value: peak.first_ascent_date ?? "Unknown" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 py-2 border-b border-border/50">
                  <item.icon className="h-4 w-4 text-primary shrink-0" />
                  <dt className="text-sm text-muted-foreground w-28 shrink-0">{item.label}</dt>
                  <dd className="text-sm font-medium">{item.value}</dd>
                </div>
              ))}
            </dl>

            {/* Location Details */}
            {ext && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" /> Location Details
                </h2>
                <dl className="space-y-3">
                  {ext.original_location && (
                    <div className="py-2 border-b border-border/50">
                      <dt className="text-xs text-muted-foreground mb-1">Original Geographic Location</dt>
                      <dd className="text-sm font-medium font-mono">{ext.original_location}</dd>
                      {ext.original_location_note && <dd className="text-xs text-muted-foreground mt-0.5">{ext.original_location_note}</dd>}
                    </div>
                  )}
                  {ext.google_earth_location && (
                    <div className="py-2 border-b border-border/50">
                      <dt className="text-xs text-muted-foreground mb-1">Google Earth Highest Point</dt>
                      <dd className="text-sm font-medium font-mono">{ext.google_earth_location}</dd>
                      {ext.google_earth_location_note && <dd className="text-xs text-muted-foreground mt-0.5">{ext.google_earth_location_note}</dd>}
                    </div>
                  )}
                  {ext.political_location && (
                    <div className="py-2 border-b border-border/50">
                      <dt className="text-xs text-muted-foreground mb-1">Political Location</dt>
                      <dd className="text-sm font-medium">{ext.political_location}</dd>
                    </div>
                  )}
                  {ext.geological_location && (
                    <div className="py-2 border-b border-border/50">
                      <dt className="text-xs text-muted-foreground mb-1">Geological Location</dt>
                      <dd className="text-sm font-medium">{ext.geological_location}</dd>
                    </div>
                  )}
                  {ext.anthropological_location && ext.anthropological_location.length > 0 && (
                    <div className="py-2 border-b border-border/50">
                      <dt className="text-xs text-muted-foreground mb-1">Anthropological Geographic Location</dt>
                      {ext.anthropological_location.map((loc) => (
                        <dd key={loc} className="text-sm font-medium">{loc}</dd>
                      ))}
                    </div>
                  )}
                </dl>
              </div>
            )}

            {/* Topographic Analysis */}
            {ext && (ext.key_col_location || ext.line_parent || ext.prominence_parent) && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" /> Topographic Analysis
                </h2>
                <dl className="space-y-3">
                  {ext.key_col_location && (
                    <div className="py-2 border-b border-border/50">
                      <dt className="text-xs text-muted-foreground mb-1">Key Col</dt>
                      <dd className="text-sm font-medium font-mono">{ext.key_col_location}</dd>
                      {ext.key_col_distance && <dd className="text-xs text-muted-foreground mt-0.5">{ext.key_col_distance} · Elev: {ext.key_col_elevation}</dd>}
                    </div>
                  )}
                  {ext.line_parent && (
                    <div className="py-2 border-b border-border/50">
                      <dt className="text-xs text-muted-foreground mb-1">Line Parent / Nearest Higher Neighbour</dt>
                      <dd className="text-sm font-medium font-mono">{ext.line_parent}</dd>
                      {ext.line_parent_note && <dd className="text-xs text-muted-foreground mt-0.5">{ext.line_parent_note}</dd>}
                    </div>
                  )}
                  {ext.prominence_parent && (
                    <div className="py-2 border-b border-border/50">
                      <dt className="text-xs text-muted-foreground mb-1">Prominence Parent</dt>
                      <dd className="text-sm font-medium">{ext.prominence_parent}</dd>
                      {ext.prominence_parent_note && <dd className="text-xs text-muted-foreground mt-0.5">{ext.prominence_parent_note}</dd>}
                    </div>
                  )}
                  {ext.island_parent_location && (
                    <div className="py-2 border-b border-border/50">
                      <dt className="text-xs text-muted-foreground mb-1">Island Parent</dt>
                      <dd className="text-sm font-medium font-mono">{ext.island_parent_location}</dd>
                      {ext.island_parent_note && <dd className="text-xs text-muted-foreground mt-0.5">{ext.island_parent_note}</dd>}
                    </div>
                  )}
                </dl>
              </div>
            )}
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <p className="text-muted-foreground leading-relaxed">{peak.description}</p>

            {/* Local Names */}
            {ext?.local_names && ext.local_names.length > 0 && (
              <>
                <h2 className="text-lg font-semibold mt-8 mb-4 flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" /> Local Names & Etymology
                </h2>
                <div className="space-y-3">
                  {ext.local_names.map((ln) => (
                    <div key={ln.name} className="p-3 rounded-lg border border-border bg-muted/20">
                      <p className="text-sm font-semibold">{ln.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{ln.note}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Survey Name History */}
            {ext?.survey_name_note && (
              <>
                <h2 className="text-lg font-semibold mt-8 mb-4">Survey Name History</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{ext.survey_name_note}</p>
              </>
            )}

            {/* Hydrology / Drainage */}
            {ext?.drainage && (
              <>
                <h2 className="text-lg font-semibold mt-8 mb-4 flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-400" /> Drainage
                </h2>
                <p className="text-sm text-muted-foreground">{ext.drainage}</p>
                {ext.nearest_settlement && (
                  <p className="text-sm text-muted-foreground mt-2">Nearest Settlement: <span className="font-medium text-foreground">{ext.nearest_settlement}</span></p>
                )}
              </>
            )}

            {/* Elevation Notes */}
            {ext && (ext.google_earth_elevation_note || ext.earlier_survey_elevation_note || ext.geoid_elevation_note) && (
              <>
                <h2 className="text-lg font-semibold mt-8 mb-4">Elevation Notes</h2>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {ext.google_earth_elevation_note && (
                    <p><span className="font-medium text-foreground">Google Earth ({ext.google_earth_elevation_ft} ft):</span> {ext.google_earth_elevation_note}</p>
                  )}
                  {ext.earlier_survey_elevation_note && (
                    <p><span className="font-medium text-foreground">Survey of India ({ext.earlier_survey_elevation_ft} ft):</span> {ext.earlier_survey_elevation_note}</p>
                  )}
                  {ext.geoid_elevation_note && (
                    <p><span className="font-medium text-foreground">Geoid Reference ({ext.geoid_elevation_ft} ft):</span> {ext.geoid_elevation_note}</p>
                  )}
                </div>
              </>
            )}

            {/* Comments */}
            {ext?.comments && (
              <>
                <h2 className="text-lg font-semibold mt-8 mb-4">Comments</h2>
                <p className="text-sm text-muted-foreground italic">{ext.comments}</p>
              </>
            )}

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
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-blue-500/40 transition-all duration-300 hover:bg-muted/30"
                      >
                        <span className="font-medium text-sm">{wf.name_en}</span>
                        <Badge variant="outline" className="text-xs text-blue-400">Waterfall</Badge>
                      </Link>
                    ))}
                  </div>
                </>
              );
            })()}
          </motion.div>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-12 flex gap-3"
        >
          <Button variant="outline" disabled>
            <Download className="h-4 w-4 mr-2" /> Download GPX
          </Button>
        </motion.div>
      </main>
    </PageTransition>
  );
};

export default PeakDetail;