import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, ArrowRight, Mountain, Droplets } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MountainSilhouette } from "@/components/MountainSilhouette";
import { PeakCard } from "@/components/PeakCard";
import { mountains } from "@/data/mockData";
import { motion } from "framer-motion";

const Index = () => {
  const [search, setSearch] = useState("");
  const featured = mountains.slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center bg-gradient-hero overflow-hidden">
        {/* Decorative dots */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, hsl(160 60% 45%) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-3xl"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Mountain className="h-6 w-6 text-primary" />
            <span className="text-sm font-semibold tracking-widest uppercase text-primary">BD Peaks Archive</span>
            <Droplets className="h-5 w-5 text-primary" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
            Discover Bangladesh's
            <br />
            <span className="text-gradient-emerald">Hidden Peaks & Waterfalls</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            The definitive database of mountains, waterfalls, and trails across Bandarban, Rangamati & Khagrachari.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by peak name, height, or area…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-13 rounded-full border-border bg-card/60 backdrop-blur text-base placeholder:text-muted-foreground/60 focus-visible:ring-primary"
            />
          </div>
        </motion.div>

        {/* Mountain silhouette */}
        <MountainSilhouette className="absolute bottom-0 left-0 right-0 w-full h-40 md:h-56" />

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 z-10"
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </section>

      {/* Featured Peaks */}
      <section className="container py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Featured Peaks</h2>
            <p className="text-muted-foreground mt-1">The most iconic summits of Bangladesh</p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex text-primary hover:text-primary">
            <Link to="/explore">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((peak, i) => (
            <motion.div
              key={peak.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
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

      {/* Latest Updates */}
      <section className="border-t border-border">
        <div className="container py-16">
          <h2 className="text-2xl font-bold mb-6">Latest Trail Updates</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Tahjindong trail rerouted due to landslide", date: "Feb 2026", region: "Bandarban" },
              { title: "New campsite established near Boga Lake", date: "Jan 2026", region: "Bandarban" },
              { title: "Dumlong trek guide updated with GPS waypoints", date: "Dec 2025", region: "Rangamati" },
              { title: "Community mapping initiative launched in Khagrachari", date: "Nov 2025", region: "Khagrachari" },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-4 rounded-lg border border-border hover:border-primary/30 transition-colors"
              >
                <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.date} · {item.region}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
