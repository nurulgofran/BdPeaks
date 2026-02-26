import { useEffect, useRef } from "react";
import { PageTransition } from "@/components/PageTransition";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_TOKEN } from "@/lib/mapbox";
import { mountains, waterfalls } from "@/data/mockData";

mapboxgl.accessToken = MAPBOX_TOKEN;

const MapPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [92.3, 21.9],
      zoom: 9,
      pitch: 60,
      bearing: -20,
      antialias: true,
      fadeDuration: 0,
    });

    map.current.setMaxPitch(85);
    map.current.touchZoomRotate.enable();
    map.current.dragRotate.enable();

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

    // Add peak markers (green) — minimal dot style
    mountains.filter((p) => p.lat !== 0 && p.lng !== 0).forEach((peak) => {
      const popup = new mapboxgl.Popup({ offset: 12, className: "peak-popup" }).setHTML(
        `<div style="color:#111827;padding:4px"><a href="/peak/${peak.slug}" style="text-decoration:none;color:inherit"><strong>${peak.name_en}</strong><br/><span style="font-size:11px">${peak.altitude_ft.toLocaleString()} ft · ${peak.region}</span><br/><span style="font-size:10px;color:#10B981">View details →</span></a></div>`
      );

      const el = document.createElement("div");
      el.className = "peak-marker";
      el.style.cssText = "width:18px;height:18px;background:hsl(160,60%,45%);border-radius:50%;cursor:pointer;box-shadow:0 0 6px hsl(160,60%,45%,0.6);border:2px solid rgba(255,255,255,0.9)";

      new mapboxgl.Marker(el)
        .setLngLat([peak.lng, peak.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });

    // Add waterfall markers (blue) — minimal dot style
    waterfalls.forEach((wf) => {
      if (wf.coordinates_pending || !wf.lat || !wf.lng) return;

      const popup = new mapboxgl.Popup({ offset: 12, className: "peak-popup" }).setHTML(
        `<div style="color:#111827;padding:4px"><a href="/waterfall/${wf.slug}" style="text-decoration:none;color:inherit"><strong>${wf.name_en}</strong><br/><span style="font-size:11px">${wf.region}</span><br/><span style="font-size:10px;color:#3B82F6">View details →</span></a></div>`
      );

      const el = document.createElement("div");
      el.className = "waterfall-marker";
      el.style.cssText = "width:14px;height:14px;background:hsl(200,80%,55%);border-radius:50%;cursor:pointer;box-shadow:0 0 6px hsl(200,80%,55%,0.6);border:2px solid rgba(255,255,255,0.9)";

      new mapboxgl.Marker(el)
        .setLngLat([wf.lng, wf.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });

    return () => { map.current?.remove(); map.current = null; };
  }, []);

  return (
    <PageTransition>
      <main className="relative w-full" style={{ height: "calc(100vh - 56px)" }}>
        <div ref={mapContainer} className="absolute inset-0" />
        <div className="absolute bottom-4 left-4 sm:top-4 sm:bottom-auto z-10 bg-card/80 backdrop-blur-lg border border-border rounded-lg px-3 py-2 sm:px-4 sm:py-3 shadow-lg max-w-[calc(100%-2rem)]">
          <h1 className="text-sm font-bold">3D Terrain Map</h1>
          <p className="text-xs text-muted-foreground">{mountains.length} peaks · {waterfalls.filter(w => !w.coordinates_pending).length} waterfalls</p>
          <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{background:"hsl(160,60%,45%)"}} /> Peaks</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{background:"hsl(200,80%,55%)"}} /> Waterfalls</span>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default MapPage;
