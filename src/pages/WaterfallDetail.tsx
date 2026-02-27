import { useParams, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowLeft, Droplets, MapPin, AlertTriangle, Route, Utensils, Info, User, FileDown, File, Waves, Ruler, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { waterfalls, mountains } from "@/data/mockData";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_TOKEN } from "@/lib/mapbox";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";

mapboxgl.accessToken = MAPBOX_TOKEN;

const WaterfallDetail = () => {
  const { slug } = useParams();
  const wf = waterfalls.find((w) => w.slug === slug);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const nearbyPeaks = wf
    ? mountains.filter((m) => wf.nearby_peak_slugs.includes(m.slug))
    : [];

  useEffect(() => {
    if (!wf || wf.coordinates_pending || !mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [wf.lng!, wf.lat!],
      zoom: 13,
      pitch: 50,
      bearing: -20,
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
    el.style.cssText =
      "width:16px;height:16px;background:hsl(200,80%,50%);border:2px solid white;border-radius:50%;box-shadow:0 0 10px hsl(200,80%,50%,0.6)";
    new mapboxgl.Marker(el).setLngLat([wf.lng!, wf.lat!]).addTo(map.current);

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [wf]);

  if (!wf) {
    return (
      <PageTransition>
        <main className="container py-20 text-center">
          <p className="text-muted-foreground text-lg">Waterfall not found.</p>
          <Button variant="link" asChild className="mt-4">
            <Link to="/explore">← Back to Explore</Link>
          </Button>
        </main>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <main className="container py-6 sm:py-8 max-w-5xl px-4 sm:px-8">
        <Button variant="ghost" size="sm" asChild className="mb-6 text-muted-foreground">
          <Link to="/explore">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Explore
          </Link>
        </Button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs" variant="outline">
              <Droplets className="h-3 w-3 mr-1" /> Waterfall
            </Badge>
            <Badge variant="outline" className="text-xs">{wf.region}</Badge>
            <Badge variant="outline" className="text-xs">{wf.region_tag}</Badge>
            {wf.coordinates_pending && (
              <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-500/30">
                Coordinates Pending
              </Badge>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">{wf.name_en}</h1>
          <p className="text-lg sm:text-xl text-muted-foreground mt-1">{wf.name_bn}</p>
          {wf.contributor && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-primary/20 bg-primary/5">
              <User className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Contributed by <span className="text-primary">{wf.contributor}</span></span>
            </div>
          )}
        </motion.div>

        {/* 3D Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {!wf.coordinates_pending ? (
            <div ref={mapContainer} className="rounded-xl border border-border h-72 mb-10 overflow-hidden" />
          ) : (
            <div className="rounded-xl border border-border h-72 mb-10 flex items-center justify-center bg-muted/30">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-10 w-10 mx-auto mb-2 opacity-40" />
                <p className="text-sm">Exact coordinates are pending verification</p>
              </div>
            </div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" /> About
              </h2>
              <p className="text-muted-foreground leading-relaxed">{wf.description}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Route className="h-4 w-4 text-primary" /> How to Go
              </h2>
              <p className="text-muted-foreground leading-relaxed">{wf.how_to_go}</p>
            </div>



            {nearbyPeaks.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> Nearby Peaks
                </h2>
                <div className="space-y-2">
                  {nearbyPeaks.map((p) => (
                    <Link
                      key={p.id}
                      to={`/peak/${p.slug}`}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/40 transition-all duration-300 hover:bg-muted/30"
                    >
                      <span className="font-medium text-sm">{p.name_en}</span>
                      <span className="text-xs text-muted-foreground">
                        {p.altitude_ft.toLocaleString()} ft
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-8"
          >
            {wf.hydrology && (
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                  <Waves className="h-4 w-4" /> Hydrological Analysis
                </h2>

                <dl className="space-y-2.5">
                  {[
                    { label: "Watershed", value: wf.hydrology.watershed },
                    { label: "Primary Source", value: wf.hydrology.primary_source },
                    { label: "Stream Gradient", value: wf.hydrology.stream_gradient_pct ? `${wf.hydrology.stream_gradient_pct}%` : "—" },
                    { label: "Total Height", value: `${wf.hydrology.total_height_ft} ft` },
                    { label: "Largest Single Drop", value: wf.hydrology.largest_single_drop_ft ? `${wf.hydrology.largest_single_drop_ft} ft (${wf.hydrology.largest_single_drop_step})` : "—" },
                    { label: "Average Width", value: wf.hydrology.avg_width_ft ? `${wf.hydrology.avg_width_ft} ft` : "—" },
                    { label: "Avg Discharge", value: `${wf.hydrology.avg_discharge_m3s} m³/s` },
                    { label: "Beisel Rating", value: wf.hydrology.beisel_rating?.toString() ?? "—" },
                    { label: "Type", value: wf.hydrology.waterfall_type },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-border/30">
                      <dt className="text-xs text-muted-foreground">{item.label}</dt>
                      <dd className="text-sm font-medium text-right max-w-[60%]">{item.value}</dd>
                    </div>
                  ))}
                </dl>

                {wf.hydrology.steps.length > 0 && (
                  <div className="mt-5">
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Ruler className="h-3.5 w-3.5 text-primary" /> Step Breakdown
                    </h3>
                    <div className="space-y-1.5">
                      {wf.hydrology.steps.map((step) => (
                        <div
                          key={step.step_number}
                          className="flex items-center gap-3 py-2 px-3 rounded-md bg-muted/30"
                        >
                          <span className="w-7 h-7 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                            {step.step_number}
                          </span>
                          <span className="text-sm font-medium">{step.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-yellow-400">
                <AlertTriangle className="h-4 w-4" /> Tips & Advice
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">{wf.tips}</p>

              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Droplets className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                  <span>Monsoon (Jun-Sep) gives the best flow but trails are slippery and leeches are common.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Utensils className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>Carry your own food and water. Local villages may offer rice and dal if asked politely.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>Always respect indigenous customs. Ask permission before photographing people or their homes.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </PageTransition>
  );
};

export default WaterfallDetail;
