import { motion } from "framer-motion";
import { fadeInUp } from "../lib/animations";

const FinalCTA = () => {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-20">
      <motion.div
        {...fadeInUp}
        className="bg-foreground rounded-xl p-10 md:p-16 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-background mb-4">
          Get to where you want to grow with Uber.
        </h2>
        <p className="text-background/60 text-lg max-w-xl mx-auto mb-8">
          Connect with more customers and grow your business on your terms.
          Partner with us today.
        </p>
        <a
          href="https://merchants.ubereats.com/us/en/s/signup/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-medium text-base hover:bg-primary-hover transition-colors active:scale-[0.98]"
        >
          Get started
        </a>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
