export interface TrailFile {
  name: string;
  type: "gpx" | "kmz";
  contributor: string;
}

export interface StreamEntry {
  local_name: string;
  alt_name: string;
}

export interface ForestRegion {
  id: string;
  name: string;
  slug: string;
  political_name: string;
  total_area_km2: number;
  max_elevation_ft: number;
  min_elevation_ft: number;
  avg_rainfall_mm: number;
  stream_basin: string;
  streams: StreamEntry[];
  natural_waterbodies: number;
  forest_density_pct: number;
  max_canopy_height_ft: number;
  avg_canopy_height_ft: number;
  leaf_area_index: string;
  foliage_height_diversity: number;
  vertical_canopy_index: number;
  estimated_biomass_tonnes_per_ha: string;
  above_ground_biomass_tonnes: string;
  below_ground_biomass_tonnes: string;
  total_carbon_tonnes: string;
  canopy_timber_species: string[];
  bamboo_species: string[];
  understory_flora: string;
  notable_mammals: string[];
  birds_description: string;
  reptiles_amphibians_description: string;
}
