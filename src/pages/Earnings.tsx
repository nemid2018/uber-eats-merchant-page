import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../lib/animations";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

interface EditableValueProps {
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  width?: string;
  format?: boolean;
}

const EditableValue = ({ value, onChange, prefix = "", suffix = "", min = 0, max = 999999, width = "w-16", format = false }: EditableValueProps) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const startEdit = () => {
    setDraft(String(value));
    setEditing(true);
  };

  const commit = () => {
    const parsed = Number(draft);
    if (!isNaN(parsed)) {
      onChange(Math.max(min, Math.min(max, parsed)));
    }
    setEditing(false);
  };

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus();
  }, [editing]);

  if (editing) {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="number"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => setTimeout(commit, 100)}
          onKeyDown={(e) => e.key === "Enter" && commit()}
          className={`text-2xl font-mono font-medium ${width} text-right bg-secondary border border-border rounded-lg px-2 py-1 outline-none focus:border-primary`}
        />
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={commit}
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-colors active:scale-95"
          title="Confirm"
        >
          ✓
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={startEdit}
      className={`text-2xl font-mono font-medium ${width} text-right cursor-pointer hover:text-primary transition-colors`}
      title="Click to type a value"
    >
      {prefix}{format ? value.toLocaleString() : value}{suffix}
    </button>
  );
};

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

const Earnings = () => {
  const [avgOrder, setAvgOrder] = useState(25);
  const [ordersPerDay, setOrdersPerDay] = useState(20);
  const [selectedPlan, setSelectedPlan] = useState("plus");
  const [foodCost, setFoodCost] = useState(4500);
  const [laborCost, setLaborCost] = useState(0);
  const [overheadCost, setOverheadCost] = useState(0);
  const [costMode, setCostMode] = useState<"dollar" | "percent">("percent");
  const [foodPct, setFoodPct] = useState(30);
  const [laborPct, setLaborPct] = useState(0);
  const [overheadPct, setOverheadPct] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plan = plans.find((p) => p.id === selectedPlan)!;
  const monthlyOrders = ordersPerDay * 30;
  const grossRevenue = monthlyOrders * avgOrder;
  const marketplaceCommission = grossRevenue * plan.marketplaceFee;
  const pickupRevenue = grossRevenue * 0.3;
  const pickupCommission = pickupRevenue * plan.pickupFee;
  const totalUberFees = marketplaceCommission + pickupCommission;
  const revenueAfterFees = grossRevenue - totalUberFees;

  const effectiveFoodCost = costMode === "dollar" ? foodCost : grossRevenue * (foodPct / 100);
  const effectiveLaborCost = costMode === "dollar" ? laborCost : grossRevenue * (laborPct / 100);
  const effectiveOverheadCost = costMode === "dollar" ? overheadCost : grossRevenue * (overheadPct / 100);
  const totalOperatingCosts = effectiveFoodCost + effectiveLaborCost + effectiveOverheadCost;
  const netProfit = revenueAfterFees - totalOperatingCosts;
  const profitMargin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;
  const newCustomerOrders = Math.round(monthlyOrders * plan.newCustomerRate);

  const annualNetProfit = netProfit * 12;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-16">
        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              How much will I earn?
            </h1>
            <p className="body-text text-lg md:text-xl max-w-2xl">
              Get a detailed breakdown of your projected revenue, costs, and
              profit on the Uber Eats platform.
            </p>
          </motion.div>
        </section>

        {/* Plan selector */}
        <section className="px-6 md:px-12 lg:px-20 pb-8">
          <motion.div {...fadeInUp}>
            <h2 className="text-xl font-semibold mb-4">1. Choose your plan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
                  <span className="text-sm text-muted-foreground block mb-3">
                    {p.tagline}
                  </span>
                  <div className="h-5 mb-1">
                    {p.intro && (
                      <span className="text-xs text-primary font-medium">
                        {p.intro}
                      </span>
                    )}
                  </div>
                  <span className="text-3xl font-mono font-bold block">
                    {Math.round(p.marketplaceFee * 100)}%
                  </span>
                  <span className="text-xs text-muted-foreground block mb-2">
                    {p.feeLabel}
                  </span>
                  <div className="border-t border-border pt-2 mt-2">
                    <span className="text-lg font-mono font-bold block">
                      {Math.round(p.pickupFee * 100)}%
                    </span>
                    <span className="text-xs text-muted-foreground block">
                      Pickup Fee
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Sliders */}
        <section className="px-6 md:px-12 lg:px-20 pb-8">
          <motion.div {...fadeInUp} className="bg-card rounded-xl p-8 md:p-10 shadow-card">
            <h2 className="text-xl font-semibold mb-6">2. Set your numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Revenue sliders */}
              <div className="space-y-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Revenue</h3>
                <div>
                  <label className="data-label block mb-3">Average order value</label>
                  <div className="flex items-center gap-4">
                    <input type="range" min={10} max={80} value={avgOrder} onChange={(e) => setAvgOrder(Number(e.target.value))} className="flex-1 h-2 rounded-full appearance-none bg-border cursor-pointer accent-primary" />
                    <EditableValue value={avgOrder} onChange={setAvgOrder} prefix="$" min={1} max={500} />
                  </div>
                </div>
                <div>
                  <label className="data-label block mb-3">Estimated orders per day</label>
                  <div className="flex items-center gap-4">
                    <input type="range" min={5} max={100} value={ordersPerDay} onChange={(e) => setOrdersPerDay(Number(e.target.value))} className="flex-1 h-2 rounded-full appearance-none bg-border cursor-pointer accent-primary" />
                    <EditableValue value={ordersPerDay} onChange={setOrdersPerDay} min={1} max={1000} />
                  </div>
                </div>
              </div>

              {/* Cost sliders */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Your Monthly Costs</h3>
                   <div className="flex items-center bg-secondary rounded-lg p-0.5">
                     <button
                       onClick={() => setCostMode("percent")}
                       className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${costMode === "percent" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                     >
                       %
                     </button>
                     <button
                       onClick={() => setCostMode("dollar")}
                       className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${costMode === "dollar" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                     >
                       $
                     </button>
                   </div>
                </div>
                {costMode === "dollar" ? (
                  <>
                    <div>
                      <label className="data-label block mb-3">Food & ingredients</label>
                      <div className="flex items-center gap-4">
                        <input type="range" min={0} max={20000} step={250} value={foodCost} onChange={(e) => setFoodCost(Number(e.target.value))} className="flex-1 h-2 rounded-full appearance-none bg-border cursor-pointer accent-primary" />
                        <EditableValue value={foodCost} onChange={setFoodCost} prefix="$" min={0} max={100000} width="w-24" format />
                      </div>
                    </div>
                    <div>
                      <label className="data-label block mb-3">Labor & staffing</label>
                      <div className="flex items-center gap-4">
                        <input type="range" min={0} max={20000} step={250} value={laborCost} onChange={(e) => setLaborCost(Number(e.target.value))} className="flex-1 h-2 rounded-full appearance-none bg-border cursor-pointer accent-primary" />
                        <EditableValue value={laborCost} onChange={setLaborCost} prefix="$" min={0} max={100000} width="w-24" format />
                      </div>
                    </div>
                    <div>
                      <label className="data-label block mb-3">Rent & overhead</label>
                      <div className="flex items-center gap-4">
                        <input type="range" min={0} max={20000} step={250} value={overheadCost} onChange={(e) => setOverheadCost(Number(e.target.value))} className="flex-1 h-2 rounded-full appearance-none bg-border cursor-pointer accent-primary" />
                        <EditableValue value={overheadCost} onChange={setOverheadCost} prefix="$" min={0} max={100000} width="w-24" format />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="data-label block mb-3">Food & ingredients</label>
                      <div className="flex items-center gap-4">
                        <input type="range" min={0} max={100} value={foodPct} onChange={(e) => setFoodPct(Number(e.target.value))} className="flex-1 h-2 rounded-full appearance-none bg-border cursor-pointer accent-primary" />
                        <EditableValue value={foodPct} onChange={setFoodPct} suffix="%" min={0} max={100} />
                      </div>
                    </div>
                    <div>
                      <label className="data-label block mb-3">Labor & staffing</label>
                      <div className="flex items-center gap-4">
                        <input type="range" min={0} max={100} value={laborPct} onChange={(e) => setLaborPct(Number(e.target.value))} className="flex-1 h-2 rounded-full appearance-none bg-border cursor-pointer accent-primary" />
                        <EditableValue value={laborPct} onChange={setLaborPct} suffix="%" min={0} max={100} />
                      </div>
                    </div>
                    <div>
                      <label className="data-label block mb-3">Rent & overhead</label>
                      <div className="flex items-center gap-4">
                        <input type="range" min={0} max={100} value={overheadPct} onChange={(e) => setOverheadPct(Number(e.target.value))} className="flex-1 h-2 rounded-full appearance-none bg-border cursor-pointer accent-primary" />
                        <EditableValue value={overheadPct} onChange={setOverheadPct} suffix="%" min={0} max={100} />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Results */}
        <section className="px-6 md:px-12 lg:px-20 pb-20">
          <motion.div {...fadeInUp} className="bg-card rounded-xl p-8 md:p-10 shadow-card">
            <h2 className="text-xl font-semibold mb-8">3. Your profit breakdown</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Revenue breakdown */}
              <div className="space-y-5">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider border-b border-border pb-2">Revenue</h3>
                <div>
                  <span className="data-label block mb-1">Gross monthly revenue</span>
                  <span className="text-3xl font-mono font-bold">${grossRevenue.toLocaleString()}</span>
                </div>
                <div>
                  <span className="data-label block mb-1">Monthly orders</span>
                  <span className="text-2xl font-mono font-medium">{monthlyOrders.toLocaleString()}</span>
                </div>
                <div>
                  <span className="data-label block mb-1">New customers reached</span>
                  <span className="text-2xl font-mono font-medium text-primary">~{newCustomerOrders.toLocaleString()}</span>
                </div>
              </div>

              {/* Costs breakdown */}
              <div className="space-y-5">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider border-b border-border pb-2">Costs</h3>
                <div>
                  <span className="data-label block mb-1">{plan.feeLabel} ({Math.round(plan.marketplaceFee * 100)}%)</span>
                  <span className="text-xl font-mono font-medium text-muted-foreground">−${Math.round(marketplaceCommission).toLocaleString()}</span>
                </div>
                <div>
                  <span className="data-label block mb-1">Pickup fee ({Math.round(plan.pickupFee * 100)}% on ~30% of orders)</span>
                  <span className="text-xl font-mono font-medium text-muted-foreground">−${Math.round(pickupCommission).toLocaleString()}</span>
                </div>
                <div className="border-t border-border pt-3">
                  <span className="data-label block mb-1">Food & ingredients</span>
                  <span className="text-xl font-mono font-medium text-muted-foreground">−${Math.round(effectiveFoodCost).toLocaleString()}</span>
                </div>
                <div>
                  <span className="data-label block mb-1">Labor & staffing</span>
                  <span className="text-xl font-mono font-medium text-muted-foreground">−${Math.round(effectiveLaborCost).toLocaleString()}</span>
                </div>
                <div>
                  <span className="data-label block mb-1">Rent & overhead</span>
                  <span className="text-xl font-mono font-medium text-muted-foreground">−${Math.round(effectiveOverheadCost).toLocaleString()}</span>
                </div>
              </div>

              {/* Profit summary */}
              <div className="space-y-5">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider border-b border-border pb-2">Profit</h3>
                <div>
                  <span className="data-label block mb-1">Revenue after Uber fees</span>
                  <span className="text-2xl font-mono font-medium">${Math.round(revenueAfterFees).toLocaleString()}</span>
                </div>
                <div>
                  <span className="data-label block mb-1">Total operating costs</span>
                  <span className="text-2xl font-mono font-medium text-muted-foreground">−${Math.round(totalOperatingCosts).toLocaleString()}</span>
                </div>
                <div className="border-t-2 border-primary pt-4">
                  <span className="data-label block mb-1">Est. monthly net profit</span>
                  <span className={`text-4xl font-mono font-bold ${netProfit >= 0 ? "text-primary" : "text-destructive"}`}>
                    ${Math.round(netProfit).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="data-label block mb-1">Profit margin</span>
                  <span className={`text-2xl font-mono font-bold ${profitMargin >= 0 ? "text-primary" : "text-destructive"}`}>
                    {profitMargin.toFixed(1)}%
                  </span>
                </div>
                <div className="bg-secondary rounded-lg p-4">
                  <span className="data-label block mb-1">Projected annual profit</span>
                  <span className={`text-3xl font-mono font-bold ${annualNetProfit >= 0 ? "text-primary" : "text-destructive"}`}>
                    ${Math.round(annualNetProfit).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-8">
              *Estimates based on average Uber Eats merchant data. Actual results may vary. Pickup fee applied to ~30% of orders. Operating costs are your own estimates and may differ.
            </p>
          </motion.div>
        </section>

        {/* Profit margin link */}
        <section className="px-6 md:px-12 lg:px-20 pb-12">
          <motion.div {...fadeInUp} className="bg-secondary rounded-xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Want to understand Uber Eats' margins?</h3>
              <p className="text-sm text-muted-foreground">See a full breakdown of platform fees, take rates, and financials.</p>
            </div>
            <Link
              to="/profit-margin"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-colors active:scale-[0.98] whitespace-nowrap"
            >
              Profit Margin Breakdown →
            </Link>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 lg:px-20 py-20 bg-primary">
          <motion.div {...fadeInUp} className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-primary-foreground">
              Ready to start earning?
            </h2>
            <p className="text-base font-bold text-primary-foreground/90 mb-8">
              Join thousands of merchants growing their business with Uber Eats.
            </p>
            <a
              href="https://merchants.ubereats.com/us/en/s/signup/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-background text-foreground font-medium hover:opacity-90 transition-colors active:scale-[0.98]"
            >
              Get started today
            </a>
          </motion.div>
        </section>
      </div>

      <footer className="px-6 md:px-12 lg:px-20 py-8 border-t border-border">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Uber Technologies, Inc. For merchant partnership inquiries only.
        </p>
      </footer>
    </div>
  );
};

export default Earnings;
