import { motion } from "framer-motion";
import { fadeInUp } from "../lib/animations";

const Hero = () => {
  const ease = fadeInUp.transition.ease;
  return (
    <section className="min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-5xl">
        <motion.div {...fadeInUp} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Uber Eats for Merchants
          </span>
        </motion.div>

        <motion.h1
          {...fadeInUp}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8"
        >
          Streamline your delivery
          <br />
          <span className="text-primary">with one powerful platform.</span>
        </motion.h1>

        <motion.p
          {...fadeInUp}
          transition={{ duration: 0.5, ease, delay: 0.2 }}
          className="body-text text-lg md:text-xl max-w-2xl mb-10"
        >
          Over 1 million merchants use Uber to reach more customers and
          strengthen their delivery and pickup operations.
        </motion.p>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, ease, delay: 0.3 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#calculator"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-secondary text-foreground font-medium text-base hover:bg-border transition-colors"
          >
            See the numbers
          </a>
          <a
            href="https://merchants.ubereats.com/us/en/s/signup/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-medium text-base hover:bg-primary-hover transition-colors active:scale-[0.98]"
          >
            Get started
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
