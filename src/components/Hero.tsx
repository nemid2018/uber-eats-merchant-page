import { motion } from "framer-motion";
import { fadeInUp } from "../lib/animations";

const Hero = () => {
  const ease = fadeInUp.transition.ease;
  return (
    <section className="min-h-[90vh] flex items-center px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left column */}
        <div>
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

        {/* Right column — phone mockup, desktop only */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, ease, delay: 0.4 }}
          className="hidden lg:flex justify-center items-center"
        >
          {/* Phone frame */}
          <div className="relative w-64 h-[540px] rounded-[3rem] bg-black border-[6px] border-black rotate-3">
            {/* Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" />

            {/* Screen */}
            <div className="w-full h-full rounded-[2.4rem] overflow-hidden bg-white flex flex-col">

              {/* Green header */}
              <div className="bg-[#06C167] px-5 pt-10 pb-5">
                <p className="text-white text-xs font-semibold tracking-widest uppercase mb-1">Order confirmed</p>
                <p className="text-white text-xl font-bold leading-tight">Your food<br />is being prepared</p>
              </div>

              {/* Order items */}
              <div className="flex-1 px-5 py-4 flex flex-col gap-3">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">Your order</p>

                {[
                  { qty: 1, name: "Spicy Ramen Bowl", price: "$14.99" },
                  { qty: 2, name: "Gyoza (6 pcs)", price: "$9.50" },
                  { qty: 1, name: "Matcha Lemonade", price: "$4.99" },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between items-start">
                    <div className="flex gap-2">
                      <span className="text-xs text-gray-400 w-4">{item.qty}×</span>
                      <span className="text-xs text-gray-800 font-medium leading-tight">{item.name}</span>
                    </div>
                    <span className="text-xs text-gray-800 font-medium shrink-0">{item.price}</span>
                  </div>
                ))}

                <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between">
                  <span className="text-xs font-bold text-gray-900">Total</span>
                  <span className="text-xs font-bold text-gray-900">$29.48</span>
                </div>
              </div>

              {/* Track button */}
              <div className="px-5 pb-6">
                <div className="w-full bg-black rounded-xl py-3 flex items-center justify-center">
                  <span className="text-white text-xs font-bold tracking-wide">Track order</span>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
