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

function FilterPanel({
  selectedRegions,
  toggleRegion,
  altRange,
  setAltRange,
  category,
  setCategory,
}: {
  selectedRegions: string[];
  toggleRegion: (r: string) => void;
  altRange: [number, number];
  setAltRange: (v: [number, number]) => void;
  category: "all" | "peak" | "waterfall";
  setCategory: (c: "all" | "peak" | "waterfall") => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-base font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Region</h3>
        <div className="space-y-2.5">
          {regions.map((r) => (
            <label key={r} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                checked={selectedRegions.includes(r)}
                onCheckedChange={() => toggleRegion(r)}
                className="scale-110"
              />
              <span className="text-base group-hover:text-foreground transition-colors">{r}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-base font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
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
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{altRange[0].toLocaleString()}</span>
          <span>{altRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-base font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Category</h3>
        <div className="flex flex-wrap gap-2.5">
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
    </div>
  );
}

const Explore = () => {
  const [view, setView] = useState<ViewMode>("grid");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [altRange, setAltRange] = useState<[number, number]>([0, 3500]);
  const [category, setCategory] = useState<"all" | "peak" | "waterfall">("all");
  const [mobileFilters, setMobileFilters] = useState(false);

  const toggleRegion = (r: string) =>
    setSelectedRegions((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );

  const filteredMountains = useMemo(() => {
    return mountains
      .filter((m) => {
        if (selectedRegions.length && !selectedRegions.includes(m.region)) return false;
        if (m.altitude_ft < altRange[0] || m.altitude_ft > altRange[1]) return false;
        if (category === "waterfall") return false;
        return true;
      })
      .sort((a, b) => b.altitude_ft - a.altitude_ft);
  }, [selectedRegions, altRange, category]);

  const filteredWaterfalls = useMemo(() => {
    if (category === "peak") return [];

    // Waterfalls don't have altitude data. If the user is actively filtering 
    // by altitude (not default [0, 3500]) AND they haven't explicitly asked for 
    // ONLY waterfalls, we should hide waterfalls so they don't pollute peak results.
    const isDefaultAltitude = altRange[0] === 0 && altRange[1] === 3500;
    if (!isDefaultAltitude && category !== "waterfall") return [];

    return waterfalls.filter((w) => {
      if (selectedRegions.length && !selectedRegions.includes(w.region)) return false;
      return true;
    });
  }, [selectedRegions, category, altRange]);

  const totalCount = filteredMountains.length + filteredWaterfalls.length;

  const filterProps = { selectedRegions, toggleRegion, altRange, setAltRange, category, setCategory };

  return (
    <PageTransition>
      <main className="container py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between mb-8 sm:mb-10 gap-3">
          <div className="min-w-0">
            <h1 className="text-3xl sm:text-4xl font-bold">Explore</h1>
            <p className="text-base text-muted-foreground mt-2">{totalCount} results</p>
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
                          <Link to={`/peak/${peak.slug}`} className="hover:text-primary font-medium transition-colors duration-200 text-base">
                            {peak.name_en}
                            <span className="block text-sm text-muted-foreground mt-0.5">{peak.name_bn}</span>
                          </Link>
                        </TableCell>
                        <TableCell><Badge variant="outline" className="text-sm">Peak</Badge></TableCell>
                        <TableCell className="text-right font-mono text-base">
                          {peak.altitude_ft.toLocaleString()} ft
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-sm">{peak.region}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredWaterfalls.map((wf) => (
                      <TableRow key={wf.id} className="cursor-pointer hover:bg-muted/50 transition-colors duration-150">
                        <TableCell>
                          <Link to={`/waterfall/${wf.slug}`} className="hover:text-blue-400 font-medium transition-colors duration-200 text-base">
                            {wf.name_en}
                            <span className="block text-sm text-muted-foreground mt-0.5">{wf.name_bn}</span>
                          </Link>
                        </TableCell>
                        <TableCell><Badge variant="outline" className="text-sm text-blue-400">Waterfall</Badge></TableCell>
                        <TableCell className="text-right text-base text-muted-foreground">—</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-sm">{wf.region}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </motion.div>
            )}
          </div>
        </div>


      </main>
    </PageTransition>
  );
};

export default Explore;
