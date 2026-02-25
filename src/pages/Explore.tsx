import { useState, useMemo } from "react";
import { Grid3x3, List, SlidersHorizontal, X, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { PeakCard } from "@/components/PeakCard";
import { WaterfallCard } from "@/components/WaterfallCard";
import { mountains, waterfalls, forestRegions, regions, waterfallRegionTags, type Mountain, type Waterfall } from "@/data/mockData";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";

type ViewMode = "grid" | "list";

function getDifficultyLabel(d: number) {
  if (d <= 3) return "Easy";
  if (d <= 6) return "Moderate";
  return "Hard";
}

function FilterPanel({
  selectedRegions,
  toggleRegion,
  altRange,
  setAltRange,
  diffRange,
  setDiffRange,
  category,
  setCategory,
  waterfallRegion,
  setWaterfallRegion,
}: {
  selectedRegions: string[];
  toggleRegion: (r: string) => void;
  altRange: [number, number];
  setAltRange: (v: [number, number]) => void;
  diffRange: [number, number];
  setDiffRange: (v: [number, number]) => void;
  category: "all" | "peak" | "waterfall";
  setCategory: (c: "all" | "peak" | "waterfall") => void;
  waterfallRegion: string;
  setWaterfallRegion: (r: string) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Region</h3>
        <div className="space-y-2">
          {regions.map((r) => (
            <label key={r} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                checked={selectedRegions.includes(r)}
                onCheckedChange={() => toggleRegion(r)}
              />
              <span className="text-sm group-hover:text-foreground transition-colors">{r}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
          Altitude (ft)
        </h3>
        <Slider
          min={0}
          max={3500}
          step={50}
          value={altRange}
          onValueChange={(v) => setAltRange(v as [number, number])}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{altRange[0].toLocaleString()}</span>
          <span>{altRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
          Difficulty (1-10)
        </h3>
        <Slider
          min={1}
          max={10}
          step={1}
          value={diffRange}
          onValueChange={(v) => setDiffRange(v as [number, number])}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{diffRange[0]}</span>
          <span>{diffRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Category</h3>
        <div className="flex flex-wrap gap-2">
          {(["all", "peak", "waterfall"] as const).map((c) => (
            <Badge
              key={c}
              variant={category === c ? "default" : "outline"}
              className="cursor-pointer capitalize transition-all duration-200"
              onClick={() => setCategory(c)}
            >
              {c === "all" ? "All" : c}
            </Badge>
          ))}
        </div>
      </div>

      {category !== "peak" && (
        <div>
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Waterfall Region</h3>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={waterfallRegion === "all" ? "default" : "outline"}
              className="cursor-pointer transition-all duration-200"
              onClick={() => setWaterfallRegion("all")}
            >
              All
            </Badge>
            {waterfallRegionTags.map((rt) => (
              <Badge
                key={rt}
                variant={waterfallRegion === rt ? "default" : "outline"}
                className="cursor-pointer transition-all duration-200"
                onClick={() => setWaterfallRegion(rt)}
              >
                {rt}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const Explore = () => {
  const [view, setView] = useState<ViewMode>("grid");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [altRange, setAltRange] = useState<[number, number]>([0, 3500]);
  const [diffRange, setDiffRange] = useState<[number, number]>([1, 10]);
  const [category, setCategory] = useState<"all" | "peak" | "waterfall">("all");
  const [waterfallRegion, setWaterfallRegion] = useState<string>("all");
  const [mobileFilters, setMobileFilters] = useState(false);

  const toggleRegion = (r: string) =>
    setSelectedRegions((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );

  const filteredMountains = useMemo(() => {
    return mountains.filter((m) => {
      if (selectedRegions.length && !selectedRegions.includes(m.region)) return false;
      if (m.altitude_ft < altRange[0] || m.altitude_ft > altRange[1]) return false;
      if (m.difficulty < diffRange[0] || m.difficulty > diffRange[1]) return false;
      if (category === "waterfall") return false;
      return true;
    });
  }, [selectedRegions, altRange, diffRange, category]);

  const filteredWaterfalls = useMemo(() => {
    if (category === "peak") return [];
    return waterfalls.filter((w) => {
      if (selectedRegions.length && !selectedRegions.includes(w.region)) return false;
      if (waterfallRegion !== "all" && w.region_tag !== waterfallRegion) return false;
      return true;
    });
  }, [selectedRegions, category, waterfallRegion]);

  const totalCount = filteredMountains.length + filteredWaterfalls.length;

  const filterProps = { selectedRegions, toggleRegion, altRange, setAltRange, diffRange, setDiffRange, category, setCategory, waterfallRegion, setWaterfallRegion };

  return (
    <PageTransition>
      <main className="container py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold">Explore</h1>
            <p className="text-sm text-muted-foreground mt-1">{totalCount} results</p>
          </div>
          <div className="flex items-center gap-2">
            <Sheet open={mobileFilters} onOpenChange={setMobileFilters}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="h-4 w-4 mr-1" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-background">
                <SheetTitle>Filters</SheetTitle>
                <div className="mt-6">
                  <FilterPanel {...filterProps} />
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex border border-border rounded-md overflow-hidden">
              <Button
                variant={view === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="h-9 w-9 rounded-none transition-colors duration-200"
                onClick={() => setView("grid")}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "list" ? "secondary" : "ghost"}
                size="icon"
                className="h-9 w-9 rounded-none transition-colors duration-200"
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <FilterPanel {...filterProps} />
          </aside>

          <div className="flex-1 min-w-0">
            {totalCount === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-20 text-muted-foreground"
              >
                <p className="text-lg">No results match your filters.</p>
                <Button variant="link" className="mt-2" onClick={() => {
                  setSelectedRegions([]);
                  setAltRange([0, 3500]);
                  setDiffRange([1, 10]);
                  setCategory("all");
                }}>
                  Clear all filters
                </Button>
              </motion.div>
            ) : view === "grid" ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                {filteredMountains.map((peak, i) => (
                  <motion.div
                    key={peak.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.04, 0.4), duration: 0.35 }}
                    layout
                  >
                    <PeakCard peak={peak} />
                  </motion.div>
                ))}
                {filteredWaterfalls.map((wf, i) => (
                  <motion.div
                    key={wf.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min((filteredMountains.length + i) * 0.04, 0.6), duration: 0.35 }}
                    layout
                  >
                    <WaterfallCard waterfall={wf} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg border border-border overflow-hidden"
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Altitude</TableHead>
                      <TableHead>Region</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMountains.map((peak) => (
                      <TableRow key={peak.id} className="cursor-pointer hover:bg-muted/50 transition-colors duration-150">
                        <TableCell>
                          <Link to={`/peak/${peak.slug}`} className="hover:text-primary font-medium transition-colors duration-200">
                            {peak.name_en}
                            <span className="block text-xs text-muted-foreground">{peak.name_bn}</span>
                          </Link>
                        </TableCell>
                        <TableCell><Badge variant="outline" className="text-xs">Peak</Badge></TableCell>
                        <TableCell className="text-right font-mono text-sm">
                          {peak.altitude_ft.toLocaleString()} ft
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{peak.region}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredWaterfalls.map((wf) => (
                      <TableRow key={wf.id} className="cursor-pointer hover:bg-muted/50 transition-colors duration-150">
                        <TableCell>
                          <Link to={`/waterfall/${wf.slug}`} className="hover:text-blue-400 font-medium transition-colors duration-200">
                            {wf.name_en}
                            <span className="block text-xs text-muted-foreground">{wf.name_bn}</span>
                          </Link>
                        </TableCell>
                        <TableCell><Badge variant="outline" className="text-xs text-blue-400">Waterfall</Badge></TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">—</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{wf.region}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </motion.div>
            )}
          </div>
        </div>

        {/* Forest Regions Section */}
        {forestRegions.length > 0 && (
          <div className="mt-12">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold mb-4 flex items-center gap-2"
            >
              <TreePine className="h-5 w-5 text-primary" /> Forest Regions & Basins
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {forestRegions.map((fr, i) => (
                <motion.div
                  key={fr.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Link
                    to={`/region/${fr.slug}`}
                    className="group block rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-emerald p-5 transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-200">{fr.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{fr.political_name}</p>
                    <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                      <span>{fr.total_area_km2} km²</span>
                      <span>·</span>
                      <span>{fr.forest_density_pct}% density</span>
                      <span>·</span>
                      <span>{fr.streams.length} streams</span>
                      <span>·</span>
                      <span>{fr.notable_mammals.length}+ mammal species</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>
    </PageTransition>
  );
};

export default Explore;
