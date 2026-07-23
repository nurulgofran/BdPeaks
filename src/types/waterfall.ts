import type { TrailFile } from "./region";

export interface WaterfallStep {
  step_number: number;
  type: string;
}

export interface WaterfallHydrology {
  watershed: string;
  primary_source: string;
  primary_source_lat: number | null;
  primary_source_lng: number | null;
  stream_gradient_pct: number | null;
  total_height_ft: string;
  largest_single_drop_ft: number | null;
  largest_single_drop_step: string;
  avg_width_ft: number | null;
  avg_discharge_m3s: string;
  beisel_rating: number | null;
  waterfall_type: string;
  steps: WaterfallStep[];
}

export interface WaterfallExtended {
  local_names?: { name: string; note: string }[];
  etymology?: string;
  discovery_history?: string;
  ecological_features?: string;
  seasonal_notes?: string;
  comments?: string;
}

export interface Waterfall {
  id: string;
  name_en: string;
  name_bn: string;
  slug: string;
  lat: number | null;
  lng: number | null;
  region: "Bandarban" | "Rangamati" | "Khagrachari" | "Chittagong" | "Sylhet";
  region_tag: "CHT" | "Sylhet" | "Chittagong";
  description: string;
  how_to_go: string;
  tips: string;
  contributor: string;
  coordinates_pending: boolean;
  nearby_peak_slugs: string[];
  images: string[];
  trail_files: TrailFile[];
  hydrology: WaterfallHydrology | null;
  extended?: WaterfallExtended;
}
