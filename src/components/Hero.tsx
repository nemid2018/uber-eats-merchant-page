import { motion } from "framer-motion";
import { fadeInUp } from "../lib/animations";

const Hero = () => {
  const ease = fadeInUp.transition.ease;
  return (
    <section className="min-h-[90vh] flex items-center px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left — original single-column content, untouched */}
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

        {/* Right — phone mockup, hidden below lg */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, ease, delay: 0.4 }}
          className="hidden lg:flex justify-center items-center"
        >
          {/* Outer phone shell */}
          <div className="relative rotate-3" style={{ width: 260, height: 540 }}>

            {/* Black bezel */}
            <div className="absolute inset-0 rounded-[3rem] bg-black" />

            {/* Screen inset */}
            <div
              className="absolute overflow-hidden bg-white flex flex-col"
              style={{
                top: 10,
                left: 10,
                right: 10,
                bottom: 10,
                borderRadius: "2.5rem",
              }}
            >
              {/* Status bar row */}
              <div className="flex items-center justify-center pt-3 pb-1">
                <div className="w-16 h-4 bg-black rounded-full" />
              </div>

              {/* Green confirmation header */}
              <div className="bg-[#06C167] px-5 pt-3 pb-5 flex-shrink-0">
                <p className="text-white text-[9px] font-bold tracking-[0.15em] uppercase mb-1.5 opacity-80">
                  Order confirmed
                </p>
                <p className="text-white text-[17px] font-bold leading-snug">
                  Your food is<br />being prepared
                </p>
              </div>

              {/* Order body */}
              <div className="flex-1 flex flex-col px-5 py-4 overflow-hidden">
                <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-gray-400 mb-3">
                  Your order
                </p>

                <div className="flex flex-col gap-2.5">
                  {[
                    { qty: 1, name: "Spicy Ramen Bowl",   price: "$14.99" },
                    { qty: 2, name: "Gyoza (6 pcs)",       price: "$9.50"  },
                    { qty: 1, name: "Matcha Lemonade",     price: "$4.99"  },
                  ].map((item) => (
                    <div key={item.name} className="flex justify-between items-baseline">
                      <div className="flex gap-1.5 min-w-0">
                        <span className="text-[11px] text-gray-400 shrink-0">{item.qty}×</span>
                        <span className="text-[11px] text-gray-800 font-medium truncate">{item.name}</span>
                      </div>
                      <span className="text-[11px] text-gray-800 font-medium ml-2 shrink-0">{item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between">
                  <span className="text-[11px] font-bold text-black">Total</span>
                  <span className="text-[11px] font-bold text-black">$29.48</span>
                </div>
              </div>

              {/* Track order button */}
              <div className="px-5 pb-6 flex-shrink-0">
                <div className="bg-black rounded-xl py-3 flex items-center justify-center">
                  <span className="text-white text-[11px] font-bold tracking-wide">Track order</span>
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
