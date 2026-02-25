import { Link } from "react-router-dom";
import { Mountain, Droplets, Github } from "lucide-react";
import { mountains, waterfalls } from "@/data/mockData";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">BD <span className="text-primary">Peaks</span></span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The definitive open-source archive for Bangladesh's mountains, waterfalls, and trekking trails.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Explore</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/explore" className="text-sm hover:text-primary transition-colors">All Peaks & Waterfalls</Link>
              <Link to="/map" className="text-sm hover:text-primary transition-colors">3D Terrain Map</Link>
              <Link to="/contribute" className="text-sm hover:text-primary transition-colors">Contribute Data</Link>
            </nav>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Database</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><Mountain className="h-3.5 w-3.5 text-primary" /> {mountains.length} peaks documented</p>
              <p className="flex items-center gap-2"><Droplets className="h-3.5 w-3.5 text-blue-400" /> {waterfalls.length} waterfalls mapped</p>
              <p>{waterfalls.filter(w => !w.coordinates_pending).length} GPS-verified locations</p>
            </div>
          </div>

          {/* Credits */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Credits</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Built with data from GPS surveys, community contributors, and trekking expeditions across the Chittagong Hill Tracts.
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} BD Peaks Archive. Open data for adventure.</p>
          <p>Maps powered by Mapbox · Elevation data from SRTM & GPS surveys</p>
        </div>
      </div>
    </footer>
  );
}
