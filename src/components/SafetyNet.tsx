import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../lib/animations";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "Dependable delivery network",
    description: "Tap into a vast network of couriers to meet delivery demand with speed and flexibility. Over 8 million delivery people worldwide.",
    backDetails: [
      "Real-time courier matching algorithms",
      "Batched deliveries for efficiency",
      "Surge capacity during peak hours",
      "Quality ratings and courier training",
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Valuable, incremental audience",
    description: "Gain access to Uber's high-value audience to help maximize your business's potential, no matter your size.",
    backDetails: [
      "Reach new customers beyond your usual radius",
      "Uber cross-promotes rides → eats users",
      "Targeted push notifications to nearby users",
      "First-party data insights on preferences",
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Ads, offers & insights",
    description: "Use analytics to refine your marketing strategies, and combine ads and offers to drive more customers to your store.",
    backDetails: [
      "Sponsored listings boost visibility by up to 80%",
      "BOGO and discount offers drive trial",
      "Uber Eats Manager dashboard analytics",
      "Track ROI on every marketing dollar spent",
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 14.5M14.25 3.104c.251.023.501.05.75.082M19.8 14.5l-2.547 2.547a4.119 4.119 0 01-5.506 0L9.2 14.5m10.6 0a24.5 24.5 0 01-9.8 0" />
      </svg>
    ),
    title: "Innovative technology",
    description: "The delivery world moves fast. With our innovative tools and integrations, we'll help you move faster.",
    backDetails: [
      "POS integration with 20+ major systems",
      "API access for custom workflows",
      "Automated menu syncing and updates",
      "Real-time order management dashboard",
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "Advanced AI capabilities",
    description: "After customers ride with Uber for a night out, we give them restaurant suggestions on Uber Eats for a night in.",
    backDetails: [
      "AI-powered personalized recommendations",
      "Smart pricing suggestions based on demand",
      "Predictive prep-time optimization",
      "Automated photo enhancement for menus",
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
      </svg>
    ),
    title: "Cross-platform advertising",
    description: "Reach customers in real time with targeted ads across the entire Uber platform—rides, eats, and more.",
    backDetails: [
      "Journey Ads shown during active rides",
      "Post-trip restaurant suggestions",
      "Sponsored placements across Uber & Eats",
      "Geo-targeted campaigns by neighborhood",
    ],
  },
];

const FlipCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const [flipped, setFlipped] = useState(false);
  const ease = fadeInUp.transition.ease;

  return (
    <motion.div
      {...fadeInUp}
      transition={{ duration: 0.5, ease, delay: index * 0.08 }}
      className="perspective-[1000px] cursor-pointer h-[220px]"
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
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-foreground mb-5">
            {feature.icon}
          </div>
          <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
          <p className="body-text text-sm">{feature.description}</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-primary text-primary-foreground rounded-xl p-8 overflow-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">{feature.title}</h3>
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
              {feature.icon}
            </div>
          </div>
          <ul className="space-y-3">
            {feature.backDetails.map((detail) => (
              <li key={detail} className="flex items-start gap-2 text-sm font-medium">
                <span className="mt-0.5">✓</span>
                {detail}
              </li>
            ))}
          </ul>
          <p className="text-xs opacity-50 mt-4">Click to flip back</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SafetyNet = () => {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-20">
      <motion.div {...fadeInUp} className="mb-12">
        <h2 className="section-heading">The Uber advantage.</h2>
        <p className="body-text mt-3 max-w-xl">
          Flexible, innovative, and dependable—discover why we're different.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <FlipCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
};

export default SafetyNet;
