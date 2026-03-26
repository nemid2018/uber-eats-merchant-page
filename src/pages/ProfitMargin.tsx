import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../lib/animations";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Car, CreditCard, Shield, Smartphone, Megaphone, TrendingUp } from "lucide-react";

const ProfitMargin = () => {
  const [orderValue, setOrderValue] = useState(20);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 25% commission (Plus plan, most common)
  const commission = orderValue * 0.25;

  // Breakdown of where the commission goes (based on Uber's public financials)
  const breakdown = [
    {
      label: "Delivery partner pay",
      pct: 0.46,
      hex: "#06C167",
      textColor: "white",
      Icon: Car,
      description: "The driver who picks up & delivers the food",
    },
    {
      label: "Technology & support",
      pct: 0.12,
      hex: "#1a1a1a",
      textColor: "white",
      Icon: Smartphone,
      description: "The app, GPS routing, 24/7 customer support, order tracking",
    },
    {
      label: "Payment processing",
      pct: 0.10,
      hex: "#6B7280",
      textColor: "white",
      Icon: CreditCard,
      description: "Credit card fees, fraud protection, refunds",
    },
    {
      label: "Insurance & safety",
      pct: 0.06,
      hex: "#9CA3AF",
      textColor: "white",
      Icon: Shield,
      description: "Driver insurance, accident coverage, background checks",
    },
    {
      label: "Marketing & promos",
      pct: 0.10,
      hex: "#D1D5DB",
      textColor: "#374151",
      Icon: Megaphone,
      description: "Bringing new customers to your restaurant",
    },
    {
      label: "Uber's actual profit",
      pct: 0.16,
      hex: "#F3F4F6",
      textColor: "#374151",
      Icon: TrendingUp,
      description: "What Uber actually keeps at the end of the day",
    },
  ];

  const uberProfit = commission * 0.16;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-16">
        {/* Hero — the hook */}
        <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              "Uber takes all the money"
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              We hear it a lot. Let's break down exactly where Uber's cut
              actually goes — dollar by dollar. Spoiler: it's not what you think.
            </p>
          </motion.div>
        </section>

        {/* The simple breakdown */}
        <section className="px-6 md:px-12 lg:px-20 pb-16">
          <motion.div {...fadeInUp} className="max-w-3xl mx-auto">

            {/* Slider */}
            <div className="mb-12">
              <label className="text-sm font-medium text-muted-foreground block mb-4">
                Adjust order value
              </label>
              <div className="flex items-center gap-6">
                <input
                  type="range"
                  min={10}
                  max={50}
                  value={orderValue}
                  onChange={(e) => setOrderValue(Number(e.target.value))}
                  className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #06C167 0%, #06C167 ${((orderValue - 10) / 40) * 100}%, #e5e7eb ${((orderValue - 10) / 40) * 100}%, #e5e7eb 100%)`,
                  }}
                />
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      autoFocus
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => {
                        setTimeout(() => {
                          const val = Math.max(1, Math.min(999, Number(editValue) || 20));
                          setOrderValue(val);
                          setIsEditing(false);
                        }, 100);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const val = Math.max(1, Math.min(999, Number(editValue) || 20));
                          setOrderValue(val);
                          setIsEditing(false);
                        }
                      }}
                      className="text-2xl font-mono font-bold w-20 text-right bg-transparent border-b-2 border-primary outline-none"
                    />
                    <button
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        const val = Math.max(1, Math.min(999, Number(editValue) || 20));
                        setOrderValue(val);
                        setIsEditing(false);
                      }}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-colors active:scale-95 text-sm"
                      title="Confirm"
                    >
                      ✓
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditValue(String(orderValue));
                      setIsEditing(true);
                    }}
                    className="text-2xl font-mono font-bold w-16 text-right cursor-pointer hover:text-primary transition-colors"
                    title="Click to type a custom amount"
                  >
                    ${orderValue}
                  </button>
                )}
              </div>
            </div>

            {/* The big picture */}
            <div className="mb-10">
              {/* Segmented bar — muted premium palette */}
              <div className="flex rounded-full overflow-hidden h-10 mb-4">
                {breakdown.map((item) => (
                  <div
                    key={item.label}
                    className="relative"
                    style={{ width: `${item.pct * 100}%`, backgroundColor: item.hex }}
                    title={`${item.label}: $${(commission * item.pct).toFixed(2)}`}
                  >
                    <span
                      className="absolute inset-0 flex items-center justify-center text-xs font-semibold"
                      style={{ color: item.textColor }}
                    >
                      {Math.round(item.pct * 100)}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
                {breakdown.map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/10"
                      style={{ backgroundColor: item.hex }}
                    />
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1">Customer pays</span>
                  <span className="text-4xl font-mono font-bold">${orderValue.toFixed(2)}</span>
                </div>
                <div className="flex-1">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1">You keep</span>
                  <span className="text-4xl font-mono font-bold text-primary">${(orderValue - commission).toFixed(2)}</span>
                </div>
                <div className="flex-1">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1">Uber's cut</span>
                  <span className="text-4xl font-mono font-bold text-[#1a1a1a]">${commission.toFixed(2)}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-4">
                On the Plus plan (25% commission). But that ${commission.toFixed(2)} doesn't go into Uber's pocket ↓
              </p>
            </div>

            {/* The punchline */}
            <div className="border-l-4 border-primary pl-6 mb-12">
              <p className="text-sm text-muted-foreground mb-1">
                Out of a ${orderValue.toFixed(2)} order, Uber's actual profit is
              </p>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-mono font-bold text-primary">
                  ${uberProfit.toFixed(2)}
                </span>
                <span className="text-muted-foreground text-lg">
                  ({((uberProfit / orderValue) * 100).toFixed(1)}% of order value)
                </span>
              </div>
            </div>

            {/* Where every dollar goes */}
            <h2 className="text-xl font-bold mb-2 text-foreground">
              Where your ${commission.toFixed(2)} actually goes
            </h2>
            <p className="text-sm text-muted-foreground mb-8">Breakdown of Uber's 25% commission</p>

            {/* Line items — borderless with dividers */}
            <div className="mb-4">
              {breakdown.map((item, i) => {
                const { Icon } = item;
                const amount = commission * item.pct;
                const isLast = i === breakdown.length - 1;
                return (
                  <div
                    key={item.label}
                    className={`flex items-center gap-4 py-5 ${!isLast ? "border-b border-border" : ""}`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center shrink-0 text-muted-foreground">
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-foreground">{item.label}</span>
                      <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                    </div>
                    <span className="font-mono font-bold text-base text-foreground shrink-0">
                      ${amount.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Summary line */}
            <div className="flex items-center justify-between py-5 border-t-2 border-primary">
              <span className="font-bold text-foreground">Your earnings</span>
              <span className="font-mono font-bold text-xl text-primary">
                ${(orderValue - commission).toFixed(2)}
              </span>
            </div>

          </motion.div>
        </section>

        {/* Context */}
        <section className="px-6 md:px-12 lg:px-20 pb-16">
          <motion.div {...fadeInUp} className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Putting it in context</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card rounded-xl p-6 border border-border">
                <span className="text-3xl block mb-3">🏦</span>
                <h3 className="font-semibold mb-2">
                  Uber's company-wide profit margin
                </h3>
                <p className="text-sm text-muted-foreground">
                  In 2024 Uber's Adjusted EBITDA margin was just{" "}
                  <span className="font-bold text-foreground">4%</span> of gross
                  bookings — and the delivery segment is even thinner than the
                  rides business.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <span className="text-3xl block mb-3">🍕</span>
                <h3 className="font-semibold mb-2">
                  Compare: typical restaurant margin
                </h3>
                <p className="text-sm text-muted-foreground">
                  The average restaurant runs on a{" "}
                  <span className="font-bold text-foreground">3–9%</span> net
                  profit margin. Uber's delivery margin is in the same ballpark
                  — razor-thin.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <span className="text-3xl block mb-3">🚗</span>
                <h3 className="font-semibold mb-2">Half goes to the driver</h3>
                <p className="text-sm text-muted-foreground">
                  The single biggest expense is paying the delivery partner. If
                  you hired your own driver, you'd be paying similar or more —
                  plus insurance, gas, and management overhead.
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <span className="text-3xl block mb-3">📱</span>
                <h3 className="font-semibold mb-2">You get the tech for free</h3>
                <p className="text-sm text-muted-foreground">
                  Building your own ordering app, payment system, GPS tracking,
                  and customer support would cost{" "}
                  <span className="font-bold text-foreground">
                    $50K–$200K/year
                  </span>
                  . It's baked into the commission.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Sources */}
        <section className="px-6 md:px-12 lg:px-20 pb-12">
          <motion.div {...fadeInUp} className="max-w-3xl mx-auto">
            <p className="text-xs text-muted-foreground">
              Breakdown estimated from Uber's{" "}
              <a
                href="https://investor.uber.com/news-events/news/press-release-details/2025/Uber-Announces-Results-for-Fourth-Quarter-and-Full-Year-2024/default.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Q4 2024 earnings
              </a>
              ,{" "}
              <a
                href="https://www.businessofapps.com/data/uber-eats-statistics/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Business of Apps
              </a>
              , and{" "}
              <a
                href="https://merchants.ubereats.com/us/en/pricing/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                official Uber Eats pricing
              </a>
              . Commission split is illustrative based on public financial data.
              Actual allocations vary by market.
            </p>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 lg:px-20 py-20 bg-primary">
          <motion.div {...fadeInUp} className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-primary-foreground">
              See your own numbers
            </h2>
            <p className="text-base font-bold text-primary-foreground/90 mb-8">
              Use our earnings calculator to estimate your monthly profit on
              Uber Eats.
            </p>
            <Link
              to="/earnings"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-background text-foreground font-medium hover:opacity-90 transition-colors active:scale-[0.98]"
            >
              Open Earnings Calculator →
            </Link>
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

export default ProfitMargin;
