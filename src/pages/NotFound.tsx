import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="flex min-h-[80vh] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Mountain className="h-16 w-16 mx-auto text-muted-foreground/40 mb-6" />
          <h1 className="mb-3 text-6xl font-bold text-gradient-emerald">404</h1>
          <p className="mb-6 text-lg text-muted-foreground">This trail doesn't exist yet</p>
          <Button asChild>
            <Link to="/">Return to Base Camp</Link>
          </Button>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
