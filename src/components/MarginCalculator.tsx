import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../lib/animations";
import { Link } from "react-router-dom";

interface Plan {
  id: string;
  name: string;
  tagline: string;
  intro?: string;
  marketplaceFee: number;
  pickupFee: number;
  feeLabel: string;
  features: string[];
  newCustomerRate: number;
}

const plans: Plan[] = [
  {
    id: "lite",
    name: "Lite",
    tagline: "Keep costs low",
    marketplaceFee: 0.20,
    pickupFee: 0.07,
    feeLabel: "Marketplace Fee",
    newCustomerRate: 0.4,
    features: [
      "Discoverability in the Uber Eats app when customers search for your store",
    ],
  },
  {
    id: "plus",
    name: "Plus",
    tagline: "Grow sales",
    intro: "0% intro rate for 30 days",
    marketplaceFee: 0.25,
    pickupFee: 0.07,
    feeLabel: "Marketplace Fee",
    newCustomerRate: 0.65,
    features: [
      "Increased discoverability in the Uber Eats app",
      "Get shown with a lower Delivery Fee",
      "Boost visibility with ads and offers",
      "Stand out to Uber One customers (+5% for Uber One orders)",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Maximize your sales",
    intro: "0% intro rate for 30 days",
    marketplaceFee: 0.30,
    pickupFee: 0.07,
    feeLabel: "Marketplace Fee",
    newCustomerRate: 0.85,
    features: [
      "Increased discoverability in the Uber Eats app",
      "Get shown with lowest available Delivery Fee",
      "Stand out to Uber One customers at no additional cost",
      "Ad spend matching up to $100/mo ($1,200/yr)",
      "Complimentary menu photo package ($250+ value)",
      "Complimentary Uber One Membership for 1 year",
    ],
  },
  {
    id: "self-delivery",
    name: "Self-delivery",
    tagline: "Use your own staff",
    marketplaceFee: 0.15,
    pickupFee: 0.07,
    feeLabel: "Self-delivery Fee",
    newCustomerRate: 0.5,
    features: [
      "Available on homescreen, search results, and store categories",
      "Uber One benefits apply to member customers",
      "Use Uber's delivery network for farther deliveries (25% fee)",
    ],
  },
];

const MarginCalculator = () => {
  const [avgOrder, setAvgOrder] = useState(25);
  const [ordersPerDay, setOrdersPerDay] = useState(20);
  const [selectedPlan, setSelectedPlan] = useState("plus");
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

  const plan = plans.find((p) => p.id === selectedPlan)!;
  const monthlyOrders = ordersPerDay * 30;
  const grossRevenue = monthlyOrders * avgOrder;
  const marketplaceCommission = grossRevenue * plan.marketplaceFee;
  const pickupRevenue = grossRevenue * 0.3; // ~30% of orders are pickup
  const pickupCommission = pickupRevenue * plan.pickupFee;
  const totalCommission = marketplaceCommission + pickupCommission;
  const netRevenue = grossRevenue - totalCommission;
  const newCustomerOrders = Math.round(monthlyOrders * plan.newCustomerRate);

  return (
    <section id="calculator" className="px-6 md:px-12 lg:px-20 py-20 bg-secondary">
      <motion.div {...fadeInUp} className="mb-12 max-w-5xl mx-auto">
        <h2 className="section-heading text-center">See your growth projection.</h2>
        <p className="body-text mt-3 max-w-xl mx-auto text-center">
          Pick a plan, adjust the sliders, and see your estimated monthly earnings.
        </p>
      </motion.div>

      {/* Plan selector */}
      <motion.div {...fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8 max-w-5xl mx-auto items-stretch">
        {plans.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPlan(p.id)}
            className={`relative px-5 py-5 rounded-xl border-2 transition-all duration-200 text-left flex flex-col h-full ${
              selectedPlan === p.id
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-muted-foreground/30"
            }`}
          >
            <span className="text-lg font-semibold block">{p.name}</span>
            <span className="text-sm text-muted-foreground block mb-3">{p.tagline}</span>

            <div className="h-5 mb-1">
              {p.intro ? (
                <span className="text-xs text-primary font-medium">{p.intro}</span>
              ) : null}
            </div>

            <span className="text-3xl font-mono font-bold block">
              {Math.round(p.marketplaceFee * 100)}%
            </span>
            <span className="text-xs text-muted-foreground block mb-2">{p.feeLabel}</span>

            <div className="border-t border-border pt-2 mt-2">
              <span className="text-lg font-mono font-bold block">{Math.round(p.pickupFee * 100)}%</span>
              <span className="text-xs text-muted-foreground block">Pickup Fee</span>
            </div>

            <ul className="mt-4 space-y-2 border-t border-border pt-3 flex-1">
              {p.features.map((f) => (
                <li key={f} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-primary mt-0.5 shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </motion.div>

      <motion.div
        {...fadeInUp}
        className="bg-card rounded-xl p-8 md:p-10 shadow-card max-w-5xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div>
              <label className="data-label block mb-3">Average order value</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={10}
                  max={80}
                  value={avgOrder}
                  onChange={(e) => setAvgOrder(Number(e.target.value))}
                  className="flex-1 h-2 rounded-full appearance-none bg-border cursor-pointer accent-primary"
                />
                <div className="flex items-center gap-2">
                  {editingField === "avgOrder" ? (
                    <>
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && confirmEdit("avgOrder")}
                        autoFocus
                        className="text-2xl font-mono font-medium w-16 text-right bg-secondary border border-border rounded-lg px-2 py-1 outline-none focus:border-primary"
                      />
                      <button
                        onClick={() => confirmEdit("avgOrder")}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-colors active:scale-95"
                      >
                        ✓
                      </button>
                    </>
                  ) : (
                    <span onClick={() => startEditing("avgOrder", avgOrder)} className="text-2xl font-mono font-medium cursor-pointer hover:text-primary transition-colors">
                      ${avgOrder}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <label className="data-label block mb-3">Estimated orders per day</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={5}
                  max={100}
                  value={ordersPerDay}
                  onChange={(e) => setOrdersPerDay(Number(e.target.value))}
                  className="flex-1 h-2 rounded-full appearance-none bg-border cursor-pointer accent-primary"
                />
                <div className="flex items-center gap-2">
                  {editingField === "ordersPerDay" ? (
                    <>
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && confirmEdit("ordersPerDay")}
                        autoFocus
                        className="text-2xl font-mono font-medium w-16 text-right bg-secondary border border-border rounded-lg px-2 py-1 outline-none focus:border-primary"
                      />
                      <button
                        onClick={() => confirmEdit("ordersPerDay")}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-colors active:scale-95"
                      >
                        ✓
                      </button>
                    </>
                  ) : (
                    <span onClick={() => startEditing("ordersPerDay", ordersPerDay)} className="text-2xl font-mono font-medium cursor-pointer hover:text-primary transition-colors">
                      {ordersPerDay}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:border-l md:border-border md:pl-10">
            <div>
              <span className="data-label block mb-1">Est. monthly revenue (after fees)</span>
              <span className="data-value text-3xl">${Math.round(netRevenue).toLocaleString()}</span>
            </div>
            <div>
              <span className="data-label block mb-1">{plan.feeLabel} ({Math.round(plan.marketplaceFee * 100)}%)</span>
              <span className="text-2xl font-mono font-medium text-muted-foreground">
                −${Math.round(marketplaceCommission).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="data-label block mb-1">Monthly orders</span>
              <span className="text-2xl font-mono font-medium">{monthlyOrders.toLocaleString()}</span>
            </div>
            <div>
              <span className="data-label block mb-1">New customers reached</span>
              <span className="text-2xl font-mono font-medium text-primary">~{newCustomerOrders.toLocaleString()}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              *Estimates based on average Uber Eats merchant data. Actual results may vary. Pickup fee applied to ~30% of orders.
            </p>
            <Link
              to="/earnings"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-colors active:scale-[0.98]"
            >
              How much will I earn?
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default MarginCalculator;