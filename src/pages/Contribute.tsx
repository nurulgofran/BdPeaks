import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { ContributionForm } from "@/components/ContributionForm";

const Contribute = () => (
  <PageTransition>
    <main className="container py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Contribute Data</h1>
          <p className="text-muted-foreground text-lg">
            Help us improve the database. Use the interactive map below to drop a pin on a missing peak or waterfall, and submit your findings for review.
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur border border-border/50 p-6 md:p-10 rounded-2xl shadow-sm">
          <ContributionForm />
        </div>
      </motion.div>
    </main>
  </PageTransition>
);

export default Contribute;
