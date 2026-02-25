import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ChevronDown, ArrowRight, Mountain, Droplets } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MountainSilhouette } from "@/components/MountainSilhouette";
import { PeakCard } from "@/components/PeakCard";
import { mountains, waterfalls } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";

const Index = () => {
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const featured = mountains.slice(0, 3);

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    const peaks = mountains
      .filter((m) => m.name_en.toLowerCase().includes(q) || m.name_bn.includes(q) || m.region.toLowerCase().includes(q) || m.altitude_ft.toString().includes(q))
      .slice(0, 5)
      .map((m) => ({ type: "peak" as const, slug: m.slug, name: m.name_en, sub: `${m.altitude_ft.toLocaleString()} ft · ${m.region}` }));
    const wfs = waterfalls
      .filter((w) => w.name_en.toLowerCase().includes(q) || w.name_bn.includes(q) || w.region.toLowerCase().includes(q))
      .slice(0, 5)
      .map((w) => ({ type: "waterfall" as const, slug: w.slug, name: w.name_en, sub: w.region }));
    return [...peaks, ...wfs].slice(0, 8);
  }, [search]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowResults(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <PageTransition>
      <main>
        {/* Hero */}
        <section className="relative min-h-[92vh] flex flex-col items-center justify-center bg-gradient-hero overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, hsl(160 60% 45%) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 text-center px-4 max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <Mountain className="h-6 w-6 text-primary" />
              <span className="text-sm font-semibold tracking-widest uppercase text-primary">BD Peaks Archive</span>
              <Droplets className="h-5 w-5 text-primary" />
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4 sm:mb-6">
              Discover Bangladesh's
              <br />
              <span className="text-gradient-emerald">Hidden Peaks & Waterfalls</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-8 sm:mb-10 px-2">
              The definitive database of mountains, waterfalls, and trails across Bandarban, Rangamati & Khagrachari.
            </p>

            {/* Search with live results */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative max-w-md mx-auto"
              ref={searchRef}
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
              <Input
                placeholder="Search peaks, waterfalls, regions…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setShowResults(true); }}
                onFocus={() => setShowResults(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchResults.length > 0) {
                    const r = searchResults[0];
                    navigate(`/${r.type === "peak" ? "peak" : "waterfall"}/${r.slug}`);
                    setShowResults(false);
                  }
                }}
                className="pl-12 h-13 rounded-full border-border bg-card/60 backdrop-blur text-base placeholder:text-muted-foreground/60 focus-visible:ring-primary"
              />

              <AnimatePresence>
                {showResults && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 w-full rounded-xl border border-border bg-card shadow-xl overflow-hidden z-20"
                  >
                    {searchResults.map((r) => (
                      <Link
                        key={`${r.type}-${r.slug}`}
                        to={`/${r.type === "peak" ? "peak" : "waterfall"}/${r.slug}`}
                        onClick={() => setShowResults(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border/30 last:border-0"
                      >
                        {r.type === "peak" ? (
                          <Mountain className="h-4 w-4 text-primary shrink-0" />
                        ) : (
                          <Droplets className="h-4 w-4 text-blue-400 shrink-0" />
                        )}
                        <div className="text-left min-w-0">
                          <p className="text-sm font-medium truncate">{r.name}</p>
                          <p className="text-xs text-muted-foreground">{r.sub}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          <MountainSilhouette className="absolute bottom-0 left-0 right-0 w-full h-40 md:h-56" />

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute bottom-8 z-10"
          >
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          </motion.div>
        </section>

        {/* Featured Peaks */}
        <section className="container py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Featured Peaks</h2>
              <p className="text-muted-foreground mt-1">The most iconic summits of Bangladesh</p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex text-primary hover:text-primary">
              <Link to="/explore">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((peak, i) => (
              <motion.div
                key={peak.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <PeakCard peak={peak} />
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link to="/explore">View all peaks <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>

        {/* Stats */}
        <section className="border-t border-border">
          <div className="container py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: mountains.length, label: "Peaks Documented" },
                { value: waterfalls.length, label: "Waterfalls Mapped" },
                { value: waterfalls.filter(w => !w.coordinates_pending).length, label: "GPS Verified" },
                { value: "3", label: "Hill Districts" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <p className="text-3xl md:text-4xl font-bold text-gradient-emerald">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Updates */}
        <section className="border-t border-border">
          <div className="container py-16">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold mb-6"
            >
              Latest Trail Updates
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Tahjindong trail rerouted due to landslide", date: "Feb 2026", region: "Bandarban" },
                { title: "New campsite established near Boga Lake", date: "Jan 2026", region: "Bandarban" },
                { title: "Dumlong trek guide updated with GPS waypoints", date: "Dec 2025", region: "Rangamati" },
                { title: "Community mapping initiative launched in Khagrachari", date: "Nov 2025", region: "Khagrachari" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border hover:border-primary/30 transition-all duration-300 hover:bg-muted/30"
                >
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.date} · {item.region}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default Index;
