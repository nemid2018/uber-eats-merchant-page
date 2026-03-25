import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "../lib/animations";

const tabs = [
  {
    id: "integration",
    title: "Integration",
    headline: "Flexible integration with your existing systems.",
    points: [
      "Connect with your existing POS, aggregator, OMS, or DMP and hit the ground running",
      "Direct integration with Toast, Clover, Square, Aloha, and more",
      "Uber Eats tablet for standalone order management",
      "API access for custom integrations and enterprise setups",
    ],
  },
  {
    id: "fulfillment",
    title: "Fulfillment",
    headline: "Flexible fulfillment options you can rely on.",
    points: [
      "Deliver with Uber couriers—access a network of over 8 million delivery people worldwide",
      "Use your own couriers to reach more customers while maintaining control of deliveries",
      "Offer order pickup and remove delivery charges for customers who prefer it",
      "Combine Uber Eats and Uber Direct for maximum reach across all channels",
    ],
  },
  {
    id: "marketing",
    title: "Marketing",
    headline: "Marketing tools and insights to grow your store.",
    points: [
      "Promote your business through Uber Eats Manager and Ads Manager",
      "Use analytics to refine your marketing strategies and optimize your menu",
      "Combine ads and offers to drive more customers to your store",
      "Access cross-platform advertising opportunities across the entire Uber platform",
    ],
  },
];

const Logistics = () => {
  const [active, setActive] = useState("integration");
  const activeTab = tabs.find((t) => t.id === active)!;

  return (
    <section className="px-6 md:px-12 lg:px-20 py-20 bg-secondary">
      <motion.div {...fadeInUp} className="mb-12">
        <h2 className="section-heading">Stay in control with tools that support how you deliver.</h2>
        <p className="body-text mt-3 max-w-xl">
          Your menu, our machinery. Focus on cooking—we handle the rest.
        </p>
      </motion.div>

      <motion.div {...fadeInUp}>
        <div className="flex gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active === tab.id
                  ? "bg-foreground text-background"
                  : "bg-card text-muted-foreground hover:text-foreground shadow-card"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: fadeInUp.transition.ease }}
            className="bg-card rounded-xl p-8 md:p-10 shadow-card"
          >
            <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-6">
              {activeTab.headline}
            </h3>
            <ul className="space-y-4">
              {activeTab.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="body-text">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Logistics;
