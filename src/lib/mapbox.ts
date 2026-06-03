export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

if (!MAPBOX_TOKEN) {
  throw new Error(
    "Missing VITE_MAPBOX_TOKEN – copy .env.example to .env and add your Mapbox public token."
  );
}
