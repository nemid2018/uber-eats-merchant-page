import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "../lib/animations";

// ─── Shared food data ────────────────────────────────────────────────────────
const FOOD_ITEMS = [
  { id: "ramen",    name: "Spicy Ramen Bowl",  sub: "Noodles · 20–30 min",  price: 14.99 },
  { id: "gyoza",    name: "Gyoza (6 pcs)",      sub: "Japanese · 15–25 min", price: 9.50  },
  { id: "lemonade", name: "Matcha Lemonade",    sub: "Drinks · 10 min",      price: 4.99  },
];

// ─── Background teaser screens (static, no interactivity) ───────────────────
const teaserScreens = [
  <div key="confirm" className="flex flex-col h-full">
    <div className="bg-[#06C167] px-5 pt-3 pb-5 flex-shrink-0">
      <p className="text-white text-[9px] font-bold tracking-[0.15em] uppercase mb-1.5 opacity-80">Order confirmed</p>
      <p className="text-white text-[17px] font-bold leading-snug">Your food is<br />being prepared</p>
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

  <div key="browse" className="flex flex-col h-full">
    <div className="px-5 pt-5 pb-3 flex-shrink-0 border-b border-gray-100">
      <p className="text-[11px] text-gray-400 mb-1">Good evening 👋</p>
      <p className="text-[15px] font-bold text-black">What are you craving?</p>
    </div>
    <div className="flex-1 flex flex-col px-5 py-4 overflow-hidden">
      <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-gray-400 mb-3">Popular near you</p>
      {[
        { name: "Spicy Ramen Bowl",    sub: "Noodles · 20–30 min", price: "$14.99" },
        { name: "Truffle Margherita",  sub: "Pizza · 25–35 min",   price: "$18.50" },
        { name: "Avocado Smash Toast", sub: "Brunch · 15–25 min",  price: "$12.00" },
      ].map((item, i) => (
        <div key={item.name} className={`flex items-center justify-between py-3 ${i < 2 ? "border-b border-gray-100" : ""}`}>
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
  </div>,

  <div key="track" className="flex flex-col h-full">
    <div className="bg-black px-5 pt-4 pb-4 flex-shrink-0">
      <p className="text-white text-[9px] font-bold tracking-[0.15em] uppercase mb-1.5 opacity-60">On the way</p>
      <p className="text-white text-[17px] font-bold leading-snug">Driver is<br />3 min away</p>
    </div>
    <div className="h-1 w-full bg-gray-100 flex-shrink-0">
      <motion.div className="h-full bg-[#06C167]" initial={{ width: "30%" }} animate={{ width: "85%" }} transition={{ duration: 2.5, ease: "easeInOut" }} />
    </div>
    <div className="flex-1 flex flex-col px-5 py-4">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-[#06C167]" />
        <span className="text-[11px] font-semibold text-gray-700">Arriving by <span className="text-black">8:42 PM</span></span>
      </div>
      <div className="flex flex-col gap-3">
        {[
          { label: "Order placed",   done: true  },
          { label: "Being prepared", done: true  },
          { label: "Picked up",      done: true  },
          { label: "Delivered",      done: false },
        ].map((step) => (
          <div key={step.label} className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${step.done ? "bg-[#06C167]" : "border-2 border-gray-200"}`}>
              {step.done && <svg viewBox="0 0 10 8" className="w-2.5 h-2.5" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
            <span className={`text-[11px] font-medium ${step.done ? "text-gray-800" : "text-gray-300"}`}>{step.label}</span>
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

const teaserVariants = {
  enter:  { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0  },
  exit:   { opacity: 0, y: -20 },
};

// ─── Shared mini-components ──────────────────────────────────────────────────
const Check = () => (
  <svg viewBox="0 0 10 8" className="w-2.5 h-2.5" fill="none">
    <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BackArrow = ({ onBack }: { onBack: () => void }) => (
  <button
    onClick={onBack}
    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors shrink-0"
    aria-label="Back"
  >
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  </button>
);

// ─── Interactive app screens ─────────────────────────────────────────────────
type CartMap   = Record<string, number>;
type AppScreen = "home" | "cart" | "confirmed" | "tracking";

const DELIVERY_FEE = 2.99;

const appVariants = {
  enter:  { opacity: 0, x: 16  },
  center: { opacity: 1, x: 0   },
  exit:   { opacity: 0, x: -16 },
};

// Home
const HomeScreen = ({
  cart, add, go,
}: { cart: CartMap; add: (id: string) => void; go: (s: AppScreen) => void }) => {
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
        <div>
          <p className="text-[11px] text-gray-400">Good evening 👋</p>
          <p className="text-[15px] font-bold text-black">What are you craving?</p>
        </div>
        <button onClick={() => go("cart")} className="relative p-1" aria-label="Cart">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span
                key="badge"
                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#06C167] text-white text-[9px] font-bold flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <div className="flex-1 overflow-auto px-5 py-4">
        <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-gray-400 mb-3">Popular near you</p>
        {FOOD_ITEMS.map((item, i) => (
          <div key={item.id} className={`flex items-center justify-between py-3 ${i < FOOD_ITEMS.length - 1 ? "border-b border-gray-100" : ""}`}>
            <div className="min-w-0 pr-2">
              <p className="text-[12px] font-semibold text-gray-900">{item.name}</p>
              <p className="text-[10px] text-gray-400">{item.sub}</p>
              <p className="text-[11px] font-bold text-black mt-0.5">${item.price.toFixed(2)}</p>
            </div>
            <div className="relative shrink-0">
              <button
                onClick={() => add(item.id)}
                className="w-7 h-7 rounded-full bg-black flex items-center justify-center active:scale-90 transition-transform"
              >
                <span className="text-white text-sm font-bold leading-none">+</span>
              </button>
              <AnimatePresence>
                {(cart[item.id] || 0) > 0 && (
                  <motion.span
                    key="qty"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#06C167] text-white text-[9px] font-bold flex items-center justify-center"
                  >
                    {cart[item.id]}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Cart
const CartScreen = ({
  cart, add, remove, go,
}: { cart: CartMap; add: (id: string) => void; remove: (id: string) => void; go: (s: AppScreen) => void }) => {
  const cartItems  = FOOD_ITEMS.filter((i) => (cart[i.id] || 0) > 0);
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal   = FOOD_ITEMS.reduce((s, i) => s + (cart[i.id] || 0) * i.price, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 pt-5 pb-3 border-b border-gray-100 flex-shrink-0">
        <BackArrow onBack={() => go("home")} />
        <p className="text-[14px] font-bold text-black">Your Cart</p>
        {totalItems > 0 && <span className="ml-auto text-[10px] text-gray-400">{totalItems} item{totalItems !== 1 ? "s" : ""}</span>}
      </div>

      <div className="flex-1 overflow-auto px-5 py-4">
        {cartItems.length === 0 ? (
          <p className="text-[12px] text-gray-400 text-center mt-10">Your cart is empty</p>
        ) : (
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-gray-900 truncate">{item.name}</p>
                  <p className="text-[11px] text-gray-400">${(item.price * cart[item.id]).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2 ml-3 shrink-0">
                  <button onClick={() => remove(item.id)} className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-[13px] text-gray-600 active:scale-90 transition-transform">−</button>
                  <span className="text-[12px] font-bold w-4 text-center">{cart[item.id]}</span>
                  <button onClick={() => add(item.id)}    className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-[13px] text-white active:scale-90 transition-transform">+</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="px-5 pb-5 flex-shrink-0 border-t border-gray-100 pt-3">
          <div className="flex justify-between text-[11px] text-gray-400 mb-1"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-[11px] text-gray-400 mb-3"><span>Delivery</span><span>${DELIVERY_FEE.toFixed(2)}</span></div>
          <div className="flex justify-between text-[13px] font-bold text-black mb-3"><span>Total</span><span>${(subtotal + DELIVERY_FEE).toFixed(2)}</span></div>
          <button
            onClick={() => go("confirmed")}
            className="w-full bg-[#06C167] rounded-xl py-3 text-white text-[12px] font-bold tracking-wide active:scale-[0.98] transition-transform"
          >
            Place order
          </button>
        </div>
      )}
    </div>
  );
};

// Confirmed
const ConfirmedScreen = ({
  cart, go,
}: { cart: CartMap; go: (s: AppScreen) => void }) => {
  const cartItems = FOOD_ITEMS.filter((i) => (cart[i.id] || 0) > 0);
  const subtotal  = FOOD_ITEMS.reduce((s, i) => s + (cart[i.id] || 0) * i.price, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#06C167] px-5 pt-5 pb-5 flex-shrink-0">
        <BackArrow onBack={() => go("home")} />
        <p className="text-white text-[9px] font-bold tracking-[0.15em] uppercase mt-3 mb-1.5 opacity-80">Order confirmed</p>
        <p className="text-white text-[17px] font-bold leading-snug">Your food is<br />being prepared</p>
      </div>

      <div className="flex-1 flex flex-col px-5 py-4 overflow-auto">
        <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-gray-400 mb-3">Your order</p>
        <div className="flex flex-col gap-2.5">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-baseline">
              <div className="flex gap-1.5 min-w-0">
                <span className="text-[11px] text-gray-400 shrink-0">{cart[item.id]}×</span>
                <span className="text-[11px] text-gray-800 font-medium truncate">{item.name}</span>
              </div>
              <span className="text-[11px] text-gray-800 font-medium ml-2 shrink-0">${(item.price * cart[item.id]).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between">
          <span className="text-[11px] font-bold text-black">Total</span>
          <span className="text-[11px] font-bold text-black">${(subtotal + DELIVERY_FEE).toFixed(2)}</span>
        </div>
      </div>

      <div className="px-5 pb-5 flex-shrink-0">
        <button
          onClick={() => go("tracking")}
          className="w-full bg-black rounded-xl py-3 text-white text-[12px] font-bold tracking-wide active:scale-[0.98] transition-transform"
        >
          Track order
        </button>
      </div>
    </div>
  );
};

// Tracking
const TrackingScreen = ({ go }: { go: (s: AppScreen) => void }) => {
  const [delivered, setDelivered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDelivered(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const steps = [
    { label: "Order placed",   done: true      },
    { label: "Being prepared", done: true      },
    { label: "Picked up",      done: true      },
    { label: "Delivered",      done: delivered },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="bg-black px-5 pt-5 pb-4 flex-shrink-0">
        <BackArrow onBack={() => go("confirmed")} />
        <p className="text-white text-[9px] font-bold tracking-[0.15em] uppercase mt-3 mb-1.5 opacity-60">On the way</p>
        <p className="text-white text-[17px] font-bold">{delivered ? "Order delivered!" : "Driver is 3 min away"}</p>
      </div>

      <div className="h-1.5 w-full bg-gray-100 flex-shrink-0">
        <motion.div
          className="h-full bg-[#06C167]"
          initial={{ width: "75%" }}
          animate={{ width: delivered ? "100%" : "75%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </div>

      <div className="flex-1 flex flex-col px-5 py-4">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-2 h-2 rounded-full bg-[#06C167]" />
          <span className="text-[11px] font-semibold text-gray-700">
            {delivered ? "Delivered at 8:42 PM" : <>Arriving by <span className="text-black">8:42 PM</span></>}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {steps.map((step) => (
            <div key={step.label} className="flex items-center gap-3">
              <motion.div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 ${step.done ? "bg-[#06C167] border-[#06C167]" : "border-gray-200"}`}
                animate={step.done ? { scale: [1, 1.25, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {step.done && <Check />}
              </motion.div>
              <span className={`text-[12px] font-medium ${step.done ? "text-gray-900" : "text-gray-300"}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pb-5 flex-shrink-0">
        <div className="border border-gray-200 rounded-xl py-3 flex items-center justify-center">
          <span className="text-black text-[11px] font-bold tracking-wide">Contact driver</span>
        </div>
      </div>
    </div>
  );
};

// ─── Interactive app shell ───────────────────────────────────────────────────
const InteractiveApp = ({ onOrderConfirmed }: { onOrderConfirmed?: (cart: CartMap) => void }) => {
  const [screen, setScreen] = useState<AppScreen>("home");
  const [cart,   setCart  ] = useState<CartMap>({});

  const add = (id: string) =>
    setCart((p) => ({ ...p, [id]: (p[id] || 0) + 1 }));

  const remove = (id: string) =>
    setCart((p) => {
      const n = { ...p };
      if ((n[id] || 0) > 1) n[id]--;
      else delete n[id];
      return n;
    });

  const go = (s: AppScreen) => {
    if (s === "confirmed") onOrderConfirmed?.(cart);
    setScreen(s);
  };

  return (
    <div className="h-full relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          variants={appVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
          className="absolute inset-0"
        >
          {screen === "home"      && <HomeScreen      cart={cart} add={add}                   go={go} />}
          {screen === "cart"      && <CartScreen      cart={cart} add={add} remove={remove}   go={go} />}
          {screen === "confirmed" && <ConfirmedScreen cart={cart}                              go={go} />}
          {screen === "tracking"  && <TrackingScreen                                           go={go} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ─── Merchant Tablet ─────────────────────────────────────────────────────────
const MerchantTablet = ({ cart, onAccept }: { cart: CartMap; onAccept: () => void }) => {
  const [accepted, setAccepted] = useState(false);
  const cartItems = FOOD_ITEMS.filter((i) => (cart[i.id] || 0) > 0);
  const subtotal  = FOOD_ITEMS.reduce((s, i) => s + (cart[i.id] || 0) * i.price, 0);

  const handleAccept = () => {
    setAccepted(true);
    onAccept();
  };

  return (
    <motion.div
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.2, 0, 0, 1], delay: 0.15 }}
    >
      <p className="text-[11px] text-gray-400 font-semibold mb-2 tracking-widest uppercase">Merchant tablet</p>
      {/* Landscape tablet — dark bezel */}
      <div className="relative bg-[#1a1a1a] rounded-[2rem] p-3 shadow-2xl" style={{ width: 580, height: 400 }}>
        {/* Home bar on right side */}
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-14 bg-[#333] rounded-full" />
        <div className="bg-white rounded-[1.5rem] overflow-hidden flex flex-col" style={{ height: "100%" }}>
          {/* Header */}
          <div className="px-6 py-4 flex items-center gap-3 bg-[#06C167] flex-shrink-0">
            {!accepted && (
              <motion.span
                className="w-3 h-3 rounded-full bg-white shrink-0"
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ repeat: Infinity, duration: 0.75, ease: "easeInOut" }}
              />
            )}
            {accepted && (
              <svg viewBox="0 0 10 8" className="w-4 h-4 shrink-0" fill="none">
                <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            <p className="text-white font-black text-[16px] tracking-widest uppercase">
              {accepted ? "ORDER ACCEPTED — Preparing" : "NEW ORDER"}
            </p>
          </div>

          {/* Order items + actions side by side */}
          <div className="flex flex-1 overflow-hidden">
            {/* Order list */}
            <div className="flex-1 px-6 py-5 border-r border-gray-100 overflow-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
                  <span className="text-[14px] text-gray-600">{cart[item.id]}× {item.name}</span>
                  <span className="text-[14px] font-semibold text-gray-900">${(item.price * cart[item.id]).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between text-[15px] font-bold pt-3 mt-2 border-t border-gray-100">
                <span>Total</span>
                <span>${(subtotal + DELIVERY_FEE).toFixed(2)}</span>
              </div>
            </div>

            {/* Action panel */}
            <div className="flex flex-col items-center justify-center px-6 gap-3" style={{ width: 180 }}>
              <AnimatePresence>
                {!accepted && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-3 w-full"
                  >
                    <button
                      onClick={handleAccept}
                      className="w-full bg-[#06C167] text-white text-[14px] font-bold py-3.5 rounded-xl active:scale-95 transition-transform hover:opacity-90"
                    >
                      Accept
                    </button>
                    <button className="w-full border border-gray-200 text-gray-500 text-[14px] font-bold py-3.5 rounded-xl active:scale-95 transition-transform hover:bg-gray-50">
                      Decline
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              {accepted && (
                <p className="text-[12px] text-gray-400 text-center">Notified kitchen — est. prep 15 min</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Receipt Printer ─────────────────────────────────────────────────────────
const ReceiptPrinter = ({ printing, cart }: { printing: boolean; cart: CartMap }) => {
  const cartItems = FOOD_ITEMS.filter((i) => (cart[i.id] || 0) > 0);
  const subtotal  = FOOD_ITEMS.reduce((s, i) => s + (cart[i.id] || 0) * i.price, 0);

  return (
    <motion.div
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.2, 0, 0, 1], delay: 0.3 }}
    >
      <p className="text-[11px] text-gray-400 font-semibold mb-2 tracking-widest uppercase">Receipt printer</p>
      <div style={{ width: 160 }}>
        {/* Printer body */}
        <div className="bg-[#2a2a2a] rounded-2xl shadow-lg flex flex-col items-center py-4 px-5">
          {/* Status lights */}
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              className="w-2.5 h-2.5 rounded-full"
              animate={{ backgroundColor: printing ? "#06C167" : "#4b5563" }}
              transition={{ duration: 0.5 }}
              style={printing ? { boxShadow: "0 0 0 4px #06c16733" } : {}}
            />
            {printing && (
              <motion.div
                className="w-2.5 h-2.5 rounded-full bg-[#06C167]"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
              />
            )}
          </div>
          <span className="text-[8px] font-bold tracking-[0.2em] text-gray-500">PRINT</span>
          {/* Paper slot */}
          <div className="mt-4 bg-black rounded-full" style={{ width: 100, height: 3 }} />
        </div>

        {/* Paper grows downward from slot */}
        <div className="overflow-hidden mx-auto" style={{ width: 120 }}>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: printing ? 200 : 0 }}
            transition={{ duration: 2.2, ease: "easeOut", delay: printing ? 0.5 : 0 }}
            className="bg-white border-l border-r border-b border-gray-200 overflow-hidden"
          >
            <div className="px-3 pt-3 pb-3 font-mono">
              <p className="text-center font-black text-[11px] mb-0.5 tracking-widest">UBER EATS</p>
              <p className="text-center text-gray-400 text-[9px] mb-2">Order Receipt</p>
              <div className="border-t border-dashed border-gray-300 mb-2" />
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-[9px] text-gray-700 leading-5">
                  <span>{cart[item.id]}x {item.name.length > 10 ? item.name.slice(0, 10) + "…" : item.name}</span>
                  <span>${(item.price * cart[item.id]).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-dashed border-gray-300 mt-2 mb-2" />
              <div className="flex justify-between font-bold text-[10px]">
                <span>TOTAL</span>
                <span>${(subtotal + DELIVERY_FEE).toFixed(2)}</span>
              </div>
              <p className="text-center text-[8px] text-gray-300 mt-2.5">Thank you!</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Background teaser phone ─────────────────────────────────────────────────
const PhoneMockup = ({ onClick }: { onClick: () => void }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % teaserScreens.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="relative rotate-2 cursor-pointer"
        style={{ width: 260, height: 540 }}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute inset-0 rounded-[3rem] bg-black" />
        <div className="absolute bg-white flex flex-col overflow-hidden" style={{ top: 10, left: 10, right: 10, bottom: 10, borderRadius: "2.5rem" }}>
          <div className="flex items-center justify-center pt-3 pb-1 flex-shrink-0 bg-white z-10">
            <div className="w-16 h-4 bg-black rounded-full" />
          </div>
          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                variants={teaserVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
                className="absolute inset-0 flex flex-col"
              >
                {teaserScreens[index]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Tap hint */}
        <div className="absolute bottom-16 inset-x-0 flex justify-center pointer-events-none">
          <span className="bg-black/70 text-white text-[9px] font-semibold px-3 py-1 rounded-full tracking-wide">
            Tap to explore
          </span>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Fullscreen interactive overlay ─────────────────────────────────────────
const PhoneOverlay = ({ onClose }: { onClose: () => void }) => {
  const [confirmedCart, setConfirmedCart] = useState<CartMap | null>(null);
  const [orderAccepted, setOrderAccepted] = useState(false);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-8 overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="flex flex-row items-start gap-10">

        {/* Phone */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1,    opacity: 1 }}
          exit={  { scale: 0.85, opacity: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 300 }}
          className="relative flex-shrink-0"
          style={{ width: 320, height: 640 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          {/* Bezel */}
          <div className="absolute inset-0 rounded-[3rem] bg-black" />
          <div className="absolute bg-white flex flex-col overflow-hidden" style={{ top: 12, left: 12, right: 12, bottom: 12, borderRadius: "2.6rem" }}>
            {/* Notch */}
            <div className="flex items-center justify-center pt-3 pb-1 flex-shrink-0 bg-white z-10">
              <div className="w-16 h-4 bg-black rounded-full" />
            </div>
            {/* App */}
            <div className="flex-1 overflow-hidden">
              <InteractiveApp onOrderConfirmed={(cart) => setConfirmedCart(cart)} />
            </div>
          </div>
        </motion.div>

        {/* Tablet — slides in after order confirmed */}
        {confirmedCart && (
          <MerchantTablet
            cart={confirmedCart}
            onAccept={() => setOrderAccepted(true)}
          />
        )}

        {/* Receipt printer — slides in alongside tablet */}
        {confirmedCart && (
          <ReceiptPrinter
            printing={orderAccepted}
            cart={confirmedCart}
          />
        )}

      </div>
    </motion.div>
  );
};

// ─── Hero ────────────────────────────────────────────────────────────────────
const Hero = () => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const ease = fadeInUp.transition.ease;

  return (
    <>
      <section className="min-h-[90vh] flex items-center px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
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

          {/* Right — teaser phone */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease, delay: 0.4 }}
            className="hidden lg:flex justify-center items-center"
          >
            <PhoneMockup onClick={() => setOverlayOpen(true)} />
          </motion.div>

        </div>
      </section>

      {/* Interactive overlay */}
      <AnimatePresence>
        {overlayOpen && <PhoneOverlay onClose={() => setOverlayOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Hero;
