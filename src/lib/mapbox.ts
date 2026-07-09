import type { StyleSpecification } from 'maplibre-gl';

/** Free ESRI Satellite + Labels Hybrid Map Style */
export const MAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    satellite: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      ],
      tileSize: 256,
      attribution: "Tiles &copy; Esri"
    },
    labels: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
      ],
      tileSize: 256
    }
  },
  layers: [
    {
      id: "satellite-layer",
      type: "raster",
      source: "satellite",
      minzoom: 0,
      maxzoom: 22
    },
    {
      id: "labels-layer",
      type: "raster",
      source: "labels",
      minzoom: 0,
      maxzoom: 22
    }
  ]
};

/** Free AWS Mapzen Terrarium DEM source URL for 3D terrain */
export const TERRAIN_SOURCE_URL = "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png";
