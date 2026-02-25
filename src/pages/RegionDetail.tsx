import { useParams, Link } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import {
  ArrowLeft, TreePine, Droplets, Leaf, Bug, Bird, Waves,
  BarChart3, Ruler, CloudRain, Mountain,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { forestRegions } from "@/data/mockData";

const RegionDetail = () => {
  const { slug } = useParams();
  const region = forestRegions.find((r) => r.slug === slug);

  if (!region) {
    return (
      <PageTransition>
        <main className="container py-20 text-center">
          <p className="text-muted-foreground text-lg">Region not found.</p>
          <Button variant="link" asChild className="mt-4">
            <Link to="/explore">← Back to Explore</Link>
          </Button>
        </main>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
    <main className="container py-8 max-w-5xl">
      <Button variant="ghost" size="sm" asChild className="mb-6 text-muted-foreground">
        <Link to="/explore">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Explore
        </Link>
      </Button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs" variant="outline">
            <TreePine className="h-3 w-3 mr-1" /> Forest Region
          </Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">{region.name}</h1>
        <p className="text-lg text-muted-foreground mt-1">Political name: {region.political_name}</p>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Total Area", value: `${region.total_area_km2} km²`, icon: Ruler },
          { label: "Elevation Range", value: `${region.min_elevation_ft}–${region.max_elevation_ft} ft`, icon: Mountain },
          { label: "Avg Rainfall", value: `${region.avg_rainfall_mm} mm`, icon: CloudRain },
          { label: "Forest Density", value: `${region.forest_density_pct}%`, icon: TreePine },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
            <stat.icon className="h-5 w-5 text-primary mb-2" />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Canopy Metrics */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TreePine className="h-4 w-4 text-primary" /> Canopy & Vegetation
            </h2>
            <dl className="space-y-3">
              {[
                { label: "Max Canopy Height", value: `${region.max_canopy_height_ft} ft` },
                { label: "Avg Canopy Height", value: `${region.avg_canopy_height_ft} ft` },
                { label: "Leaf Area Index", value: region.leaf_area_index },
                { label: "Foliage Height Diversity", value: `~${region.foliage_height_diversity}` },
                { label: "Vertical Canopy Index", value: `~${region.vertical_canopy_index}` },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/50">
                  <dt className="text-sm text-muted-foreground">{item.label}</dt>
                  <dd className="text-sm font-medium font-mono">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Carbon & Biomass */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" /> Biomass & Carbon
            </h2>
            <dl className="space-y-3">
              {[
                { label: "Biomass per Hectare", value: `${region.estimated_biomass_tonnes_per_ha} t/ha` },
                { label: "Above Ground Biomass", value: `${region.above_ground_biomass_tonnes} tonnes` },
                { label: "Below Ground Biomass", value: `${region.below_ground_biomass_tonnes} tonnes` },
                { label: "Total Carbon (AGB+BGB+SOC+Deadwood+Litter)", value: `${region.total_carbon_tonnes} tonnes` },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/50">
                  <dt className="text-sm text-muted-foreground">{item.label}</dt>
                  <dd className="text-sm font-medium font-mono">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Streams */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Waves className="h-4 w-4 text-primary" /> Stream Network ({region.stream_basin})
            </h2>
            <p className="text-xs text-muted-foreground mb-3">3rd & 4th order streams · {region.natural_waterbodies} discovered natural static waterbody</p>
            <div className="grid grid-cols-1 gap-1.5">
              {region.streams.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-sm py-1.5 px-3 rounded-md bg-muted/30">
                  <Droplets className="h-3 w-3 text-blue-400 shrink-0" />
                  <span className="font-medium">{s.local_name}</span>
                  {s.alt_name && <span className="text-muted-foreground">/ {s.alt_name}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column — Biodiversity */}
        <div className="space-y-8">
          {/* Flora */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Leaf className="h-4 w-4 text-primary" /> Key Flora
            </h2>

            <h3 className="text-sm font-medium text-muted-foreground mb-2">Canopy & Timber Species (Emergent & Canopy Layer)</h3>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {region.canopy_timber_species.map((s) => (
                <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
              ))}
            </div>

            <h3 className="text-sm font-medium text-muted-foreground mb-2">Major Bamboo Species (Canopy & Understory)</h3>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {region.bamboo_species.map((s) => (
                <Badge key={s} variant="outline" className="text-xs italic">{s}</Badge>
              ))}
            </div>

            <h3 className="text-sm font-medium text-muted-foreground mb-2">Understory & Forest Floor</h3>
            <p className="text-sm text-muted-foreground">{region.understory_flora}</p>
          </div>

          {/* Mammals */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bug className="h-4 w-4 text-primary" /> Notable Mammals
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {region.notable_mammals.map((m) => (
                <Badge key={m} variant="outline" className="text-xs">{m}</Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Distributed throughout canopy, understory, and forest floors.</p>
          </div>

          {/* Birds */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bird className="h-4 w-4 text-primary" /> Birds
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{region.birds_description}</p>
          </div>

          {/* Reptiles */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bug className="h-4 w-4 text-primary" /> Reptiles & Amphibians
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{region.reptiles_amphibians_description}</p>
          </div>
        </div>
      </div>
    </main>
    </PageTransition>
  );
};

export default RegionDetail;
