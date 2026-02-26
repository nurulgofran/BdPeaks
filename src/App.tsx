import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import PeakDetail from "./pages/PeakDetail";
import WaterfallDetail from "./pages/WaterfallDetail";
import MapPage from "./pages/MapPage";
import RegionDetail from "./pages/RegionDetail";
import Contribute from "./pages/Contribute";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import { ScrollToTop } from "@/components/ScrollToTop";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  const isMapPage = location.pathname === "/map";
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/peak/:slug" element={<PeakDetail />} />
        <Route path="/waterfall/:slug" element={<WaterfallDetail />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/region/:slug" element={<RegionDetail />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function FooterWrapper() {
  const location = useLocation();
  if (location.pathname === "/map") return null;
  return <Footer />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Navbar />
        <AnimatedRoutes />
        <FooterWrapper />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
