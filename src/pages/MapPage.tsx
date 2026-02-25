import { useEffect, useRef } from "react";
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

    // Add peak markers (green)
    mountains.forEach((peak) => {
      const popup = new mapboxgl.Popup({ offset: 25, className: "peak-popup" }).setHTML(
        `<div style="color:#111827;padding:4px"><strong>⛰ ${peak.name_en}</strong><br/><span style="font-size:12px">${peak.altitude_ft.toLocaleString()} ft · ${peak.region}</span></div>`
      );

      const el = document.createElement("div");
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/><path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19"/></svg>`;
      el.style.cssText = "width:28px;height:28px;display:flex;align-items:center;justify-content:center;background:hsl(160,60%,45%);border-radius:50%;cursor:pointer;box-shadow:0 0 10px hsl(160,60%,45%,0.5);border:2px solid white";

      new mapboxgl.Marker(el)
        .setLngLat([peak.lng, peak.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });

    // Add waterfall markers (blue)
    waterfalls.forEach((wf) => {
      if (wf.coordinates_pending || !wf.lat || !wf.lng) return;

      const popup = new mapboxgl.Popup({ offset: 25, className: "peak-popup" }).setHTML(
        `<div style="color:#111827;padding:4px"><strong>💧 ${wf.name_en}</strong><br/><span style="font-size:12px">${wf.region}</span></div>`
      );

      const el = document.createElement("div");
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>`;
      el.style.cssText = "width:28px;height:28px;display:flex;align-items:center;justify-content:center;background:hsl(200,80%,50%);border-radius:50%;cursor:pointer;box-shadow:0 0 10px hsl(200,80%,50%,0.5);border:2px solid white";

      new mapboxgl.Marker(el)
        .setLngLat([wf.lng, wf.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });

    return () => { map.current?.remove(); map.current = null; };
  }, []);

  return (
    <main className="relative w-full" style={{ height: "calc(100vh - 64px)" }}>
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute top-4 left-4 z-10 bg-card/80 backdrop-blur border border-border rounded-lg px-4 py-3">
        <h1 className="text-sm font-bold">3D Terrain Map</h1>
        <p className="text-xs text-muted-foreground">{mountains.length} peaks · {waterfalls.filter(w => !w.coordinates_pending).length} waterfalls</p>
        <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full inline-flex items-center justify-center" style={{background:"hsl(160,60%,45%)"}}><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg></span> Peaks</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full inline-flex items-center justify-center" style={{background:"hsl(200,80%,50%)"}}><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/></svg></span> Waterfalls</span>
        </div>
      </div>
    </main>
  );
};

export default MapPage;
