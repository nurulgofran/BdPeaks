import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries — rarely change, cached long-term
          "vendor-core": [
            "react",
            "react-dom",
            "react-router-dom",
          ],
          // Mapbox — heaviest dependency, only needed on Map page
          "vendor-map": [
            "mapbox-gl",
          ],
          // Animation library
          "vendor-motion": [
            "framer-motion",
          ],
          // UI component libraries
          "vendor-ui": [
            "recharts",
            "@tanstack/react-query",
          ],
        },
      },
    },
  },
}));
