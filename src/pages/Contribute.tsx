import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";

const Contribute = () => (
  <PageTransition>
    <main className="container py-20 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <PlusCircle className="h-16 w-16 mx-auto text-primary mb-6 opacity-60" />
        <h1 className="text-3xl font-bold mb-3">Contribute Data</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          The multi-step submission form for trekkers to add new peaks, waterfalls, and trail data is coming soon.
        </p>
      </motion.div>
    </main>
  </PageTransition>
);

export default Contribute;
