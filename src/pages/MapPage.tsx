import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_TOKEN } from "@/lib/mapbox";
import { mountains } from "@/data/mockData";

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

    // Add peak markers
    mountains.forEach((peak) => {
      const popup = new mapboxgl.Popup({ offset: 25, className: "peak-popup" }).setHTML(
        `<div style="color:#111827;padding:4px"><strong>${peak.name_en}</strong><br/><span style="font-size:12px">${peak.altitude_ft.toLocaleString()} ft · ${peak.region}</span></div>`
      );

      const el = document.createElement("div");
      el.style.cssText = "width:14px;height:14px;background:hsl(160,60%,45%);border:2px solid white;border-radius:50%;cursor:pointer;box-shadow:0 0 8px hsl(160,60%,45%,0.5)";

      new mapboxgl.Marker(el)
        .setLngLat([peak.lng, peak.lat])
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
        <p className="text-xs text-muted-foreground">{mountains.length} peaks plotted</p>
      </div>
    </main>
  );
};

export default MapPage;
