import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "../lib/animations";

const screens = [
  // Screen 1 — Order confirmation
  <div key="confirm" className="flex flex-col h-full">
    <div className="bg-[#06C167] px-5 pt-3 pb-5 flex-shrink-0">
      <p className="text-white text-[9px] font-bold tracking-[0.15em] uppercase mb-1.5 opacity-80">
        Order confirmed
      </p>
      <p className="text-white text-[17px] font-bold leading-snug">
        Your food is<br />being prepared
      </p>
    </div>
    <div className="flex-1 flex flex-col px-5 py-4 overflow-hidden">
      <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-gray-400 mb-3">Your order</p>
      <div className="flex flex-col gap-2.5">
        {[
          { qty: 1, name: "Spicy Ramen Bowl", price: "$14.99" },
          { qty: 2, name: "Gyoza (6 pcs)",    price: "$9.50"  },
          { qty: 1, name: "Matcha Lemonade",  price: "$4.99"  },
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
    <div className="px-5 pb-6 flex-shrink-0">
      <div className="bg-black rounded-xl py-3 flex items-center justify-center">
        <span className="text-white text-[11px] font-bold tracking-wide">Track order</span>
      </div>
    </div>
  </div>,

  // Screen 2 — Browsing
  <div key="browse" className="flex flex-col h-full">
    <div className="px-5 pt-5 pb-3 flex-shrink-0 border-b border-gray-100">
      <p className="text-[11px] text-gray-400 mb-1">Good evening 👋</p>
      <p className="text-[15px] font-bold text-black">What are you craving?</p>
    </div>
    <div className="flex-1 flex flex-col px-5 py-4 overflow-hidden">
      <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-gray-400 mb-3">Popular near you</p>
      <div className="flex flex-col gap-0">
        {[
          { name: "Spicy Ramen Bowl",    sub: "Noodles · 20–30 min", price: "$14.99" },
          { name: "Truffle Margherita",  sub: "Pizza · 25–35 min",   price: "$18.50" },
          { name: "Avocado Smash Toast", sub: "Brunch · 15–25 min",  price: "$12.00" },
        ].map((item, i) => (
          <div
            key={item.name}
            className={`flex items-center justify-between py-3 ${i < 2 ? "border-b border-gray-100" : ""}`}
          >
            <div className="flex flex-col gap-0.5 min-w-0 pr-2">
              <span className="text-[11px] font-semibold text-gray-900 truncate">{item.name}</span>
              <span className="text-[10px] text-gray-400">{item.sub}</span>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <span className="text-[11px] font-bold text-black">{item.price}</span>
              <div className="mt-1 w-5 h-5 rounded-full bg-black flex items-center justify-center">
                <span className="text-white text-[10px] font-bold leading-none">+</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>,

  // Screen 3 — Delivery tracking
  <div key="track" className="flex flex-col h-full">
    <div className="bg-black px-5 pt-4 pb-4 flex-shrink-0">
      <p className="text-white text-[9px] font-bold tracking-[0.15em] uppercase mb-1.5 opacity-60">
        On the way
      </p>
      <p className="text-white text-[17px] font-bold leading-snug">
        Driver is<br />3 min away
      </p>
    </div>

    {/* Animated progress bar */}
    <div className="h-1 w-full bg-gray-100 flex-shrink-0">
      <motion.div
        className="h-full bg-[#06C167]"
        initial={{ width: "30%" }}
        animate={{ width: "85%" }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />
    </div>

    <div className="flex-1 flex flex-col px-5 py-4">
      {/* ETA pill */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-[#06C167]" />
        <span className="text-[11px] font-semibold text-gray-700">Arriving by <span className="text-black">8:42 PM</span></span>
      </div>

      {/* Simple step list */}
      <div className="flex flex-col gap-3">
        {[
          { label: "Order placed",    done: true  },
          { label: "Being prepared",  done: true  },
          { label: "Picked up",       done: true  },
          { label: "Delivered",       done: false },
        ].map((step) => (
          <div key={step.label} className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                step.done ? "bg-[#06C167]" : "border-2 border-gray-200"
              }`}
            >
              {step.done && (
                <svg viewBox="0 0 10 8" className="w-2.5 h-2.5" fill="none">
                  <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className={`text-[11px] font-medium ${step.done ? "text-gray-800" : "text-gray-300"}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>

    <div className="px-5 pb-6 flex-shrink-0">
      <div className="border border-gray-200 rounded-xl py-3 flex items-center justify-center">
        <span className="text-black text-[11px] font-bold tracking-wide">Contact driver</span>
      </div>
    </div>
  </div>,
];

const screenVariants = {
  enter: { opacity: 0, y: 8 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const PhoneMockup = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % screens.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative rotate-3" style={{ width: 260, height: 540 }}>
      {/* Black bezel */}
      <div className="absolute inset-0 rounded-[3rem] bg-black" />

      {/* Inset screen */}
      <div
        className="absolute bg-white flex flex-col overflow-hidden"
        style={{ top: 10, left: 10, right: 10, bottom: 10, borderRadius: "2.5rem" }}
      >
        {/* Notch */}
        <div className="flex items-center justify-center pt-3 pb-1 flex-shrink-0 bg-white relative z-10">
          <div className="w-16 h-4 bg-black rounded-full" />
        </div>

        {/* Animated screen content */}
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
              className="absolute inset-0 flex flex-col"
            >
              {screens[index]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const ease = fadeInUp.transition.ease;
  return (
    <section className="min-h-[90vh] flex items-center px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left — original content unchanged */}
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

        {/* Right — animated phone, desktop only */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, ease, delay: 0.4 }}
          className="hidden lg:flex justify-center items-center"
        >
          <PhoneMockup />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
