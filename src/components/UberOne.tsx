import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../lib/animations";

const benefits = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
    title: "$0 Delivery Fee",
    description: "Members get free delivery on orders over the minimum subtotal—meaning they order more often from your store.",
    backDetails: [
      "Free delivery on eligible orders over $15+",
      "Members order 2x more frequently on average",
      "Lower friction = higher conversion rates",
      "Applies to food, grocery, and retail orders",
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Up to 10% off orders",
    description: "Discounts encourage larger baskets and repeat orders, driving higher average order values for your business.",
    backDetails: [
      "Savings on delivery and pickup orders",
      "Encourages larger basket sizes per order",
      "Members save an avg of $25/month",
      "Drives repeat purchases and loyalty",
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Higher-value customers",
    description: "Uber One members spend 2–4x more than non-members and order more frequently—they're your most valuable audience.",
    backDetails: [
      "2–4x higher spend vs. non-members",
      "25M+ active subscribers globally",
      "Higher retention and lifetime value",
      "Cross-platform users (rides + eats)",
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "Priority placement",
    description: "Premium plan merchants stand out to Uber One customers at no additional cost, boosting your visibility to top spenders.",
    backDetails: [
      "Featured placement for Uber One users",
      "No additional cost on Premium plan",
      "Increased visibility to top spenders",
      "Higher conversion from premium audience",
    ],
  },
];

const FlipCard = ({ benefit, index }: { benefit: typeof benefits[0]; index: number }) => {
  const [flipped, setFlipped] = useState(false);
  const ease = fadeInUp.transition.ease;

  return (
    <motion.div
      {...fadeInUp}
      transition={{ duration: 0.5, ease, delay: index * 0.08 }}
      className="cursor-pointer h-[280px]"
      style={{ perspective: "1000px" }}
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
            {benefit.icon}
          </div>
          <h3 className="text-lg font-medium mb-2">{benefit.title}</h3>
          <p className="body-text text-sm">{benefit.description}</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-primary text-primary-foreground rounded-xl p-6"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">{benefit.title}</h3>
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
              {benefit.icon}
            </div>
          </div>
          <ul className="space-y-3">
            {benefit.backDetails.map((detail) => (
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

const UberOne = () => {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              Uber One
            </div>
          </div>
          <h2 className="section-heading">
            Uber One members spend more—and they'll find you first.
          </h2>
          <p className="body-text mt-3 max-w-xl">
            With 25M+ Uber One subscribers paying $9.99/month, these high-intent
            customers order more frequently and spend 2–4x more per order. Here's
            what that means for your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, i) => (
            <FlipCard key={benefit.title} benefit={benefit} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UberOne;
