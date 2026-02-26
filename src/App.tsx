import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

// Eagerly load the homepage for fastest initial render
import Index from "./pages/Index";

// Lazy load all other pages — they only download when navigated to
const Explore = lazy(() => import("./pages/Explore"));
const PeakDetail = lazy(() => import("./pages/PeakDetail"));
const WaterfallDetail = lazy(() => import("./pages/WaterfallDetail"));
const MapPage = lazy(() => import("./pages/MapPage"));
const RegionDetail = lazy(() => import("./pages/RegionDetail"));
const Contribute = lazy(() => import("./pages/Contribute"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
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
