import { motion } from "framer-motion";
import { fadeInUp } from "../lib/animations";

const Hero = () => {
  const ease = fadeInUp.transition.ease;
  return (
    <section className="min-h-[90vh] flex items-center px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Left column — existing content unchanged */}
        <div className="flex flex-col justify-center">
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

        {/* Right column — dashboard mockup, desktop only */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, ease, delay: 0.4 }}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-border bg-card text-sm font-medium">

            {/* Header bar */}
            <div className="bg-foreground px-5 py-4 flex items-center justify-between">
              <span className="text-background font-semibold tracking-tight">Merchant Dashboard</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Live
              </span>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
              {[
                { label: "Today's Orders", value: "84" },
                { label: "Revenue", value: "$1,240" },
                { label: "Avg Rating", value: "4.8 ★" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center py-5 px-3 gap-1">
                  <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                  <span className="text-xs text-muted-foreground text-center">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Recent orders */}
            <div className="px-5 py-4">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Recent Orders</p>
              <div className="flex flex-col gap-3">
                {[
                  { id: "#4821", item: "Spicy Ramen Bowl", status: "Preparing", badge: "bg-yellow-100 text-yellow-700" },
                  { id: "#4820", item: "Avocado Burger", status: "On the way", badge: "bg-blue-100 text-blue-700" },
                  { id: "#4819", item: "Margherita Pizza", status: "Delivered", badge: "bg-green-100 text-green-700" },
                ].map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-foreground font-semibold">{order.item}</span>
                      <span className="text-xs text-muted-foreground">{order.id}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${order.badge}`}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer bar */}
            <div className="bg-primary px-5 py-3 flex items-center justify-between">
              <span className="text-primary-foreground text-xs font-semibold">3 active deliveries</span>
              <span className="text-primary-foreground text-xs opacity-80">Updated just now</span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
