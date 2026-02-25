import { useState, useMemo } from "react";
import { Grid3x3, List, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { PeakCard } from "@/components/PeakCard";
import { mountains, regions, type Mountain } from "@/data/mockData";
import { Link } from "react-router-dom";

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
}: {
  selectedRegions: string[];
  toggleRegion: (r: string) => void;
  altRange: [number, number];
  setAltRange: (v: [number, number]) => void;
  diffRange: [number, number];
  setDiffRange: (v: [number, number]) => void;
  category: "all" | "peak" | "waterfall";
  setCategory: (c: "all" | "peak" | "waterfall") => void;
}) {
  return (
    <div className="space-y-8">
      {/* Region */}
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

      {/* Altitude */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
          Altitude (ft)
        </h3>
        <Slider
          min={0}
          max={4000}
          step={100}
          value={altRange}
          onValueChange={(v) => setAltRange(v as [number, number])}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{altRange[0].toLocaleString()}</span>
          <span>{altRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Difficulty */}
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

      {/* Category */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Category</h3>
        <div className="flex flex-wrap gap-2">
          {(["all", "peak", "waterfall"] as const).map((c) => (
            <Badge
              key={c}
              variant={category === c ? "default" : "outline"}
              className="cursor-pointer capitalize"
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
  const [altRange, setAltRange] = useState<[number, number]>([0, 4000]);
  const [diffRange, setDiffRange] = useState<[number, number]>([1, 10]);
  const [category, setCategory] = useState<"all" | "peak" | "waterfall">("all");
  const [mobileFilters, setMobileFilters] = useState(false);

  const toggleRegion = (r: string) =>
    setSelectedRegions((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );

  const filtered = useMemo(() => {
    return mountains.filter((m) => {
      if (selectedRegions.length && !selectedRegions.includes(m.region)) return false;
      if (m.altitude_ft < altRange[0] || m.altitude_ft > altRange[1]) return false;
      if (m.difficulty < diffRange[0] || m.difficulty > diffRange[1]) return false;
      if (category !== "all" && m.category !== category) return false;
      return true;
    });
  }, [selectedRegions, altRange, diffRange, category]);

  const filterProps = { selectedRegions, toggleRegion, altRange, setAltRange, diffRange, setDiffRange, category, setCategory };

  return (
    <main className="container py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Explore</h1>
          <p className="text-muted-foreground mt-1">{filtered.length} results</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile filter toggle */}
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

          {/* View toggle */}
          <div className="flex border border-border rounded-md">
            <Button
              variant={view === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-9 w-9 rounded-r-none"
              onClick={() => setView("grid")}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-9 w-9 rounded-l-none"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <FilterPanel {...filterProps} />
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">No peaks match your filters.</p>
              <Button variant="link" className="mt-2" onClick={() => {
                setSelectedRegions([]);
                setAltRange([0, 4000]);
                setDiffRange([1, 10]);
                setCategory("all");
              }}>
                Clear all filters
              </Button>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((peak) => (
                <PeakCard key={peak.id} peak={peak} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Altitude</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead className="text-center">Difficulty</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((peak) => (
                    <TableRow key={peak.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <Link to={`/peak/${peak.slug}`} className="hover:text-primary font-medium">
                          {peak.name_en}
                          <span className="block text-xs text-muted-foreground">{peak.name_bn}</span>
                        </Link>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {peak.altitude_ft.toLocaleString()} ft
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">{peak.region}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="text-xs">
                          {peak.difficulty}/10 · {getDifficultyLabel(peak.difficulty)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Explore;
