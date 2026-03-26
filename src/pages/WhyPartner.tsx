import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeInUp } from "../lib/animations";
import Navbar from "../components/Navbar";

const revenueRealities = [
  {
    metric: "Up to 30%",
    label: "incremental revenue",
    detail:
      "Merchants on Uber Eats report up to 30% additional revenue from delivery orders that would never have walked through the door. This isn't cannibalizing your dine-in—it's net new business from customers who weren't coming to you before.",
  },
  {
    metric: "2–3x",
    label: "more orders during off-peak hours",
    detail:
      "Delivery fills the gaps in your day. Late-night, mid-afternoon, rainy days—these are exactly when delivery demand spikes. You're already paying rent and staff during slow hours. Delivery turns dead time into revenue.",
  },
  {
    metric: "40–85%",
    label: "of delivery orders are from new customers",
    detail:
      "Depending on your plan tier, 40% to 85% of your delivery orders come from customers who have never visited your restaurant. That's a customer acquisition channel that works while you cook.",
  },
  {
    metric: "$0",
    label: "upfront cost to join",
    detail:
      "There's no sign-up fee, no monthly subscription, and no minimum order requirement. You only pay a commission when you actually make a sale. If delivery doesn't work for you, you can pause or leave anytime.",
  },
];

const objectionBusters = [
  {
    objection: "\"The commission fees are too high.\"",
    response:
      "Think about what it costs to acquire a new customer through traditional marketing: flyers, social ads, promotions. The average restaurant spends 3–6% of revenue on marketing with uncertain results. Uber Eats commissions include delivery logistics, payment processing, customer support, dispute resolution, AND customer acquisition—all in one. A single new regular customer acquired through the platform can generate thousands in lifetime value. The question isn't whether 15–30% sounds high—it's whether the alternative (not reaching these customers at all) costs you more.",
    stat: "Merchants using ads on Uber Eats see an average 4.2x return on ad spend",
  },
  {
    objection: "\"I already have my own delivery drivers.\"",
    response:
      "Great—you can keep them. The Self-Delivery plan (15% commission) lets you use your own drivers while still being listed on Uber Eats. You get the visibility and customer acquisition without changing your operations. Or use Uber Direct to power deliveries from your own website. Many of our most successful partners use a hybrid approach: their own drivers during peak hours, Uber couriers to handle overflow and late-night demand.",
    stat: "Self-Delivery plan: only 15% commission while using your own staff",
  },
  {
    objection: "\"I don't want to hurt my dine-in business.\"",
    response:
      "Data consistently shows delivery is additive, not cannibalistic. Customers who order delivery are largely a different audience than your dine-in crowd—think parents at home, office workers, and people outside your walkable radius. In fact, many merchants report that delivery actually increases brand awareness, which drives MORE dine-in traffic. Customers discover you on the app, love the food, and then visit in person.",
    stat: "Research shows 70% of delivery customers live outside the typical dine-in radius",
  },
  {
    objection: "\"I can't handle more orders right now.\"",
    response:
      "You're in complete control. Set your own hours, pause orders during rushes, limit the number of simultaneous delivery orders, and adjust your delivery menu to only include items that travel well and are easy to prepare. Many restaurants start with a simplified delivery menu during off-peak hours only, then expand as they build confidence. There's no obligation to be available 24/7.",
    stat: "You can pause incoming orders at any time with one tap",
  },
  {
    objection: "\"The food quality suffers during delivery.\"",
    response:
      "This is a real concern—and solvable. Top-performing delivery merchants curate a separate delivery menu with items that travel well. Invest in quality packaging (insulated bags, vented containers) and mark items with clear prep instructions. Uber's average delivery time is under 30 minutes, and real-time tracking means customers know exactly when food arrives. Many merchants find their delivery ratings are actually higher than expected once they optimize packaging.",
    stat: "Average Uber Eats delivery time: under 30 minutes from order to door",
  },
  {
    objection: "\"I tried delivery before and it didn't work.\"",
    response:
      "The delivery landscape has matured dramatically. Uber now offers marketing tools (ads, offers, loyalty programs), operational analytics, and dedicated account support that didn't exist a few years ago. Many merchants who struggled initially found success after optimizing three things: menu (simplify for delivery), packaging (invest in quality), and visibility (use ads and offers during the first 30 days to build momentum). Plus, you get a 0% intro rate for the first 30 days to test the waters risk-free.",
    stat: "0% intro rate for your first 30 days—zero risk to test",
  },
];

const faqs = [
  {
    question: "How much does it actually cost to get started?",
    answer:
      "Nothing upfront. There are no sign-up fees, no monthly fees, and no minimum commitments. You only pay a commission on completed orders. Commission rates range from 15% (Lite/Self-Delivery) to 30% (Premium) for delivery, plus 7% for pickup orders. All plans include a 0% intro rate for the first 30 days so you can try it risk-free. You can change plans or cancel at any time.",
  },
  {
    question: "How long does it take to get set up and start receiving orders?",
    answer:
      "Most restaurants go live within 3–5 business days. The process involves submitting your business details, uploading your menu (you can use the Uber Eats Manager portal or get help from the onboarding team), and setting up your payment info. If you already have a POS system like Toast, Square, or Clover, the integration is even faster.",
  },
  {
    question: "Can I control which orders I accept and when I'm available?",
    answer:
      "Absolutely. You set your own hours, can pause orders at any time during a rush, set maximum prep times, and limit how many active delivery orders you handle simultaneously. You can also create a separate, simplified delivery menu so you're not overwhelmed. Many merchants start delivery during off-peak hours only and expand from there.",
  },
  {
    question: "What if I get a bad review or a customer complains?",
    answer:
      "Uber Eats has a dedicated customer support team that handles disputes, refunds, and complaints. If an order is damaged in transit by a courier, Uber covers the refund—not you. You'll also have access to customer feedback and ratings in your Uber Eats Manager dashboard so you can identify and fix issues quickly. Merchants are protected from fraudulent claims through Uber's dispute resolution process.",
  },
  {
    question: "Will I lose money on small orders?",
    answer:
      "You can set minimum order amounts for delivery to ensure every order is profitable. You also control your menu pricing on the platform—many merchants price delivery menu items slightly higher (10–15%) to offset commission costs. Customers understand and accept this as standard practice for delivery convenience. Between menu pricing strategy and minimum order thresholds, you stay in control of your margins.",
  },
  {
    question: "Do I need to buy special equipment or packaging?",
    answer:
      "No special equipment is required. Uber provides an order management tablet if you need one, or you can receive orders directly through your existing POS system. For packaging, we recommend using insulated bags and sturdy containers for food that travels well, but these are items you likely already have or can source affordably. Good packaging is a smart investment—it directly improves customer ratings and repeat orders.",
  },
  {
    question: "What happens if I want to leave or pause my account?",
    answer:
      "There's no lock-in contract. You can pause your listing at any time (useful for vacations, renovations, or seasonal closures) and reactivate whenever you're ready. If you decide to leave entirely, you can deactivate your account with no penalties or exit fees. Your menu and account data are preserved in case you want to come back later.",
  },
  {
    question: "How do I actually get customers to find me on the app?",
    answer:
      "New merchants get a visibility boost in their first 30 days. Beyond that, Uber Eats offers sponsored listings (ads), promotional offers (BOGO, % off, free delivery), and loyalty programs to drive repeat orders. Premium plan merchants get up to $100/month in matched ad spend. The key is to be active in your first month—merchants who run at least one promotion in their first 30 days see 2x more orders than those who don't.",
  },
  {
    question: "Is it worth it for a small, single-location restaurant?",
    answer:
      "Small restaurants often benefit the most. You don't need a marketing department or a delivery fleet—Uber provides both. The Lite plan (15% delivery commission) keeps costs low while still giving you access to thousands of potential new customers. Many single-location restaurants report that delivery revenue covers their rent during slow months. Start small with a limited delivery menu during off-peak hours and scale up as you see results.",
  },
  {
    question: "What about taxes on delivery orders?",
    answer:
      "Uber Eats collects and remits sales tax on behalf of merchants in most jurisdictions, simplifying your tax obligations. You'll receive regular statements and can download detailed transaction reports from Uber Eats Manager for your accountant. Delivery revenue is treated the same as any other sales revenue for tax purposes—no surprises.",
  },
];

const WhyPartner = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [avgOrder, setAvgOrder] = useState(30);
  const [ordersPerDay, setOrdersPerDay] = useState(15);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const startEditing = (field: string, currentValue: number) => {
    setEditingField(field);
    setEditValue(String(currentValue));
  };

  const confirmEdit = (field: string) => {
    const num = parseInt(editValue, 10);
    if (!isNaN(num) && num > 0) {
      if (field === "avgOrder") setAvgOrder(Math.min(999, num));
      if (field === "ordersPerDay") setOrdersPerDay(Math.min(999, num));
    }
    setEditingField(null);
  };
  const commissionRate = 0.25; // Plus plan default
  const monthlyOrders = ordersPerDay * 30;
  const grossRevenue = monthlyOrders * avgOrder;
  const commission = grossRevenue * commissionRate;
  const netRevenue = grossRevenue - commission;
  const newCustomers = Math.round(monthlyOrders * 0.65);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-16">
        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              The real case for
              <br />
              <span className="text-primary">partnering with Uber&nbsp;Eats.</span>
            </h1>
            <p className="body-text text-lg md:text-xl max-w-2xl">
              No fluff. Here's what delivery actually means for your bottom
              line—the revenue, the customers, and honest answers to every
              concern you have.
            </p>
          </motion.div>
        </section>

        {/* Revenue Reality */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-20 bg-secondary">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              What delivery actually does for your revenue
            </h2>
            <p className="body-text text-lg max-w-2xl mb-12">
              These aren't projections—they're what merchants on the platform
              experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {revenueRealities.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                  ease: [0.2, 0, 0, 1],
                }}
                className="bg-card border border-border rounded-[var(--radius)] p-8"
              >
                <p className="text-4xl md:text-5xl font-bold text-primary mb-1">
                  {item.metric}
                </p>
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  {item.label}
                </p>
                <p className="body-text text-sm leading-relaxed">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Objection Busters */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              We've heard every objection. Here are real answers.
            </h2>
            <p className="body-text text-lg max-w-2xl mb-12">
              These are the most common concerns from restaurant owners—and why
              they end up partnering anyway.
            </p>
          </motion.div>

          <div className="space-y-6">
            {objectionBusters.map((item, i) => (
              <motion.div
                key={item.objection}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.06,
                  ease: [0.2, 0, 0, 1],
                }}
                className="bg-card border border-border rounded-[var(--radius)] p-8"
              >
                <h3 className="text-lg md:text-xl font-bold tracking-tight mb-4 text-foreground">
                  {item.objection}
                </h3>
                <p className="body-text text-sm leading-relaxed mb-4">
                  {item.response}
                </p>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 w-fit">
                  <span className="text-primary font-bold text-sm">→</span>
                  <span className="text-sm font-medium text-primary">
                    {item.stat}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mini Calculator */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-20 bg-secondary">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Let's do the math
            </h2>
            <p className="body-text text-lg mb-8">
              Adjust the sliders to see what delivery could mean for your business.
            </p>

            <div className="bg-card border border-border rounded-[var(--radius)] p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Sliders */}
                <div className="space-y-8">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-3">
                      Average order value
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min={10}
                        max={80}
                        value={avgOrder}
                        onChange={(e) => setAvgOrder(Number(e.target.value))}
                        className="flex-1 h-2 rounded-full appearance-none bg-border cursor-pointer accent-primary"
                      />
                      <span className="text-2xl font-mono font-medium w-20 text-right">
                        {editingField === "avgOrder" ? (
                          <span className="inline-flex items-center gap-1">
                            <span className="text-muted-foreground">$</span>
                            <input
                              type="number"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && confirmEdit("avgOrder")}
                              autoFocus
                              className="w-16 bg-transparent border-b-2 border-primary outline-none text-right font-mono text-2xl"
                            />
                            <button
                              onClick={() => confirmEdit("avgOrder")}
                              className="text-primary font-bold text-lg ml-1"
                            >
                              ✓
                            </button>
                          </span>
                        ) : (
                          <span
                            onClick={() => startEditing("avgOrder", avgOrder)}
                            className="cursor-pointer hover:text-primary transition-colors"
                          >
                            ${avgOrder}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-3">
                      Estimated orders per day
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min={5}
                        max={100}
                        value={ordersPerDay}
                        onChange={(e) => setOrdersPerDay(Number(e.target.value))}
                        className="flex-1 h-2 rounded-full appearance-none bg-border cursor-pointer accent-primary"
                      />
                      <span className="text-2xl font-mono font-medium w-20 text-right">
                        {editingField === "ordersPerDay" ? (
                          <span className="inline-flex items-center gap-1">
                            <input
                              type="number"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && confirmEdit("ordersPerDay")}
                              autoFocus
                              className="w-16 bg-transparent border-b-2 border-primary outline-none text-right font-mono text-2xl"
                            />
                            <button
                              onClick={() => confirmEdit("ordersPerDay")}
                              className="text-primary font-bold text-lg ml-1"
                            >
                              ✓
                            </button>
                          </span>
                        ) : (
                          <span
                            onClick={() => startEditing("ordersPerDay", ordersPerDay)}
                            className="cursor-pointer hover:text-primary transition-colors"
                          >
                            {ordersPerDay}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-5 md:border-l md:border-border md:pl-10">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                      Est. monthly revenue (after fees)
                    </span>
                    <span className="text-3xl font-mono font-bold text-primary">
                      ${Math.round(netRevenue).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                      Marketplace fee (25%)
                    </span>
                    <span className="text-xl font-mono font-medium text-muted-foreground">
                      −${Math.round(commission).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                      Monthly orders
                    </span>
                    <span className="text-xl font-mono font-medium">
                      {monthlyOrders.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                      New customers reached
                    </span>
                    <span className="text-xl font-mono font-medium text-primary">
                      ~{newCustomers.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    *Based on Plus plan (25% fee). Actual results may vary.
                  </p>
                  <Link
                    to="/earnings"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-colors active:scale-[0.98]"
                  >
                    How much will I earn?
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Common questions & concerns
            </h2>
            <p className="body-text text-lg max-w-2xl mb-12">
              Straight answers to what merchants ask before signing up.
            </p>
          </motion.div>

          <div className="max-w-3xl space-y-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.03,
                  ease: [0.2, 0, 0, 1],
                }}
                className="border border-border rounded-[var(--radius)] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/50 transition-colors"
                >
                  <span className="font-semibold text-sm md:text-base pr-4">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xl text-muted-foreground flex-shrink-0"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 body-text text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 lg:px-20 py-20 bg-primary">
          <motion.div {...fadeInUp} className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-primary-foreground">
              Still on the fence? Try it risk-free.
            </h2>
            <p className="text-base font-bold text-primary-foreground/90 mb-8">
              0% commission for your first 30 days. No contracts. No sign-up
              fees. Cancel anytime.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://merchants.ubereats.com/us/en/s/signup/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-background text-foreground font-medium hover:opacity-90 transition-colors active:scale-[0.98]"
              >
                Start your free trial
              </a>
              <Link
                to="/earnings"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary-foreground/20 text-primary-foreground font-medium hover:bg-primary-foreground/30 transition-colors active:scale-[0.98]"
              >
                Calculate your earnings
              </Link>
            </div>
          </motion.div>
        </section>
      </div>

      <footer className="px-6 md:px-12 lg:px-20 py-8 border-t border-border">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Uber Technologies, Inc. For merchant
          partnership inquiries only.
        </p>
      </footer>
    </div>
  );
};

export default WhyPartner;
