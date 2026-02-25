import { Map } from "lucide-react";

const MapPage = () => (
  <main className="container py-20 text-center">
    <Map className="h-16 w-16 mx-auto text-primary mb-6 opacity-60" />
    <h1 className="text-3xl font-bold mb-3">3D Map</h1>
    <p className="text-muted-foreground max-w-md mx-auto">
      Interactive 3D terrain map with Mapbox GL JS is coming soon. All peaks and waterfalls will be plotted with contour layers.
    </p>
  </main>
);

export default MapPage;
