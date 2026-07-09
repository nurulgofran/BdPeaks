export const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY as string;

if (!MAPTILER_KEY) {
  console.warn("Missing VITE_MAPTILER_KEY – copy .env.example to .env and add your MapTiler API key.");
}

/** MapTiler satellite+streets hybrid style */
export const MAP_STYLE = `https://api.maptiler.com/maps/hybrid/style.json?key=${MAPTILER_KEY}`;

/** MapTiler terrain DEM source URL */
export const TERRAIN_SOURCE_URL = `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${MAPTILER_KEY}`;
