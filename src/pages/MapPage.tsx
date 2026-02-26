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

    // Force resize after load — fixes blank canvas when lazy-loaded with animations
    map.current.on("load", () => {
      map.current?.resize();
    });
    // Fallback resize in case the container dimensions settle after a transition
    setTimeout(() => map.current?.resize(), 300);

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

      // Build GeoJSON Features
      const peakFeatures = mountains
        .filter((p) => p.lat !== 0 && p.lng !== 0)
        .map((peak) => ({
          type: "Feature",
          geometry: { type: "Point", coordinates: [peak.lng, peak.lat] },
          properties: {
            slug: peak.slug,
            name: peak.name_en,
            info: `${peak.altitude_ft.toLocaleString()} ft · ${peak.region}`,
            type: "peak",
          },
        }));

      const waterfallFeatures = waterfalls
        .filter((wf) => !wf.coordinates_pending && wf.lat && wf.lng)
        .map((wf) => ({
          type: "Feature",
          geometry: { type: "Point", coordinates: [wf.lng, wf.lat] },
          properties: {
            slug: wf.slug,
            name: wf.name_en,
            info: wf.region,
            type: "waterfall",
          },
        }));

      // Load custom SVG Icons into the Map as SDF (SDF allows dynamic tinting)
      const loadIcon = (id: string, svg: string) => {
        const img = new Image(48, 48);
        img.onload = () => {
          if (!map.current!.hasImage(id)) {
            map.current!.addImage(id, img, { sdf: true });
          }
        };
        img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
      };

      // Mountain SVG (Filled triangle shape)
      const mountainSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
          <path d="M12 4l-8 16h16L12 4zm0 2.8l5 10H7l5-10z" />
          <path d="M12 4l-8 16h16L12 4z" />
        </svg>
      `;
      // Water / Drop SVG (Filled drop shape)
      const waterSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
          <path d="M12 21c-4.42 0-8-3.58-8-8 0-4.63 4.31-8.58 7.37-11.23.36-.31.9-.31 1.25 0C15.68 4.42 20 8.37 20 13c0 4.42-3.58 8-8 8z" />
        </svg>
      `;

      loadIcon("custom-mountain", mountainSvg);
      loadIcon("custom-water", waterSvg);

      // --- Peaks Layer ---
      map.current!.addSource("peaks-source", {
        type: "geojson",
        data: { type: "FeatureCollection", features: peakFeatures as any },
        cluster: false,
      });

      map.current!.addLayer({
        id: "peaks-layer",
        type: "symbol",
        source: "peaks-source",
        layout: {
          "icon-image": "custom-mountain",
          "icon-size": 0.5, // The 48x48 icon scaled down
          "icon-allow-overlap": true,
          "icon-pitch-alignment": "map",
        },
        paint: {
          "icon-color": "hsl(160, 60%, 45%)",
          "icon-halo-color": "rgba(255, 255, 255, 0.9)",
          "icon-halo-width": 2,
        },
      });

      // --- Waterfalls Layer ---
      map.current!.addSource("waterfalls-source", {
        type: "geojson",
        data: { type: "FeatureCollection", features: waterfallFeatures as any },
        cluster: false,
      });

      map.current!.addLayer({
        id: "waterfalls-layer",
        type: "symbol",
        source: "waterfalls-source",
        layout: {
          "icon-image": "custom-water",
          "icon-size": 0.45,
          "icon-allow-overlap": true,
          "icon-pitch-alignment": "map",
        },
        paint: {
          "icon-color": "hsl(200, 80%, 55%)",
          "icon-halo-color": "rgba(255, 255, 255, 0.9)",
          "icon-halo-width": 2,
        },
      });


      // --- Shared Popup Logic ---
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: true,
        offset: 10,
        className: "peak-popup",
      });

      const handlePointerEnter = (e: mapboxgl.MapMouseEvent) => {
        map.current!.getCanvas().style.cursor = "pointer";
      };

      const handlePointerLeave = () => {
        map.current!.getCanvas().style.cursor = "";
      };

      const handleClick = (e: mapboxgl.MapMouseEvent) => {
        const features = map.current!.queryRenderedFeatures(e.point, {
          layers: ["peaks-layer", "waterfalls-layer"],
        });
        if (!features.length) return;

        const feature = features[0];
        const props = feature.properties as any;
        const coordinates = (feature.geometry as any).coordinates.slice();

        // Ensure proper rendering across the dateline
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        const linkColor = props.type === "peak" ? "#10B981" : "#3B82F6";
        const linkPath = props.type === "peak" ? "peak" : "waterfall";

        popup
          .setLngLat(coordinates as [number, number])
          .setHTML(
            `<div style="color:#111827;padding:4px"><a href="/${linkPath}/${props.slug}" style="text-decoration:none;color:inherit"><strong>${props.name}</strong><br/><span style="font-size:11px">${props.info}</span><br/><span style="font-size:10px;color:${linkColor}">View details →</span></a></div>`
          )
          .addTo(map.current!);
      };

      // Bind events
      ["peaks-layer", "waterfalls-layer"].forEach((layer) => {
        map.current!.on("mouseenter", layer as any, handlePointerEnter);
        map.current!.on("mouseleave", layer as any, handlePointerLeave);
        map.current!.on("click", layer as any, handleClick);
      });
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => { map.current?.remove(); map.current = null; };
  }, []);

  return (
    <PageTransition>
      <main className="relative w-full" style={{ height: "calc(100vh - 56px)" }}>
        <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
        <div className="absolute bottom-4 left-4 sm:top-4 sm:bottom-auto z-10 bg-card/80 backdrop-blur-lg border border-border rounded-lg px-3 py-2 sm:px-4 sm:py-3 shadow-lg max-w-[calc(100%-2rem)]">
          <h1 className="text-sm font-bold">3D Terrain Map</h1>
          <p className="text-xs text-muted-foreground">{mountains.length} peaks · {waterfalls.filter(w => !w.coordinates_pending).length} waterfalls</p>
          <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(160,60%,45%)" }} /> Peaks</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: "hsl(200,80%,55%)" }} /> Waterfalls</span>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default MapPage;
