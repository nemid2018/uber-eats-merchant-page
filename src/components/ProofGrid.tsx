import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../lib/animations";

const stats = [
  {
    value: "170M",
    label: "Monthly active consumers",
    description:
      "Uber's massive consumer base gives you instant access to millions of potential customers already using the platform.",
    backTitle: "Consumer reach details",
    backDetails: [
      "Available in 10,000+ cities worldwide",
      "High-intent users actively looking to order",
      "Personalized recommendations drive discovery",
      "Peak hours see 3x higher engagement rates",
    ],
  },
  {
    value: "8.5M",
    label: "Monthly active drivers & couriers",
    description:
      "A vast, dependable delivery network ensures your food arrives fresh and fast—every single order.",
    backTitle: "Delivery network details",
    backDetails: [
      "Average delivery time under 30 minutes",
      "Real-time GPS tracking for every order",
      "Dynamic courier allocation for peak demand",
      "Quality ratings ensure consistent service",
    ],
  },
  {
    value: "1M+",
    label: "Merchant partners",
    description:
      "Join over a million businesses already partnering with Uber to grow their delivery and pickup operations.",
    backTitle: "Merchant partnership details",
    backDetails: [
      "Restaurants, grocers, retailers & more",
      "Flexible commission structures available",
      "Dedicated merchant support teams",
      "Free onboarding and menu setup assistance",
    ],
  },
];

const FlipCard = ({ stat, index }: { stat: typeof stats[0]; index: number }) => {
  const [flipped, setFlipped] = useState(false);
  const ease = fadeInUp.transition.ease;

  return (
    <motion.div
      {...fadeInUp}
      transition={{ duration: 0.5, ease, delay: index * 0.1 }}
      className="perspective-[1000px] cursor-pointer h-[260px]"
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 group bg-card rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full bg-primary transition-all duration-500 ease-out" />
          <span className="data-value">{stat.value}</span>
          <span className="data-label block mt-3 mb-4">{stat.label}</span>
          <p className="body-text text-sm">{stat.description}</p>
          <p className="text-xs text-muted-foreground mt-4 opacity-60">Click to learn more →</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-primary text-primary-foreground rounded-xl p-8 overflow-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="data-value text-primary-foreground">{stat.value}</span>
              <h3 className="text-lg font-bold mt-1">{stat.backTitle}</h3>
            </div>
          </div>
          <ul className="space-y-3">
            {stat.backDetails.map((detail) => (
              <li key={detail} className="flex items-start gap-2 text-sm font-medium">
                <span className="mt-0.5">✓</span>
                {detail}
              </li>
            ))}
          </ul>
          <p className="text-xs opacity-50 mt-6">Click to flip back</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProofGrid = () => {
  return (
    <section id="proof" className="px-6 md:px-12 lg:px-20 py-20">
      <motion.div {...fadeInUp} className="mb-12">
        <h2 className="section-heading">Why over 1 million businesses choose Uber.</h2>
        <p className="body-text mt-3 max-w-xl">
          Real numbers from the Uber platform, as of March 2025.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <FlipCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
};

export default ProofGrid;
