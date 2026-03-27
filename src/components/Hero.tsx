import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "../lib/animations";

// ─── All orderable items (every restaurant) ──────────────────────────────────
const ALL_ITEMS = [
  // Sakura Noodle House
  { id: "sakura-ramen",   name: "Spicy Ramen Bowl",       sub: "Tonkotsu broth, chashu pork, soft egg",    price: 14.99 },
  { id: "sakura-gyoza",   name: "Pan-Fried Gyoza (6)",    sub: "Pork & cabbage, ponzu dipping sauce",      price: 9.50  },
  { id: "sakura-udon",    name: "Beef Udon",              sub: "Thick udon noodles, wagyu beef, mushrooms", price: 16.99 },
  { id: "sakura-matcha",  name: "Matcha Lemonade",        sub: "House-made, lightly sweet",                price: 4.99  },
  // Stacked
  { id: "stack-classic",  name: "The Classic",            sub: "Smash patty, American cheese, pickles",    price: 12.99 },
  { id: "stack-double",   name: "Double Stack",           sub: "Two smash patties, secret sauce, onion",   price: 16.99 },
  { id: "stack-fries",    name: "Crispy Fries",           sub: "Sea salt, house seasoning",                price: 4.99  },
  { id: "stack-shake",    name: "Vanilla Shake",          sub: "Thick-cut, house-made",                    price: 6.99  },
  // Casa Fuego
  { id: "fuego-tacos",    name: "Street Tacos (3)",       sub: "Carnitas, salsa verde, cilantro",          price: 13.99 },
  { id: "fuego-burrito",  name: "Carne Asada Burrito",   sub: "Full-size, rice, beans, guac",             price: 14.99 },
  { id: "fuego-queso",    name: "Queso Dip + Chips",     sub: "Warm house-made queso",                    price: 7.99  },
  { id: "fuego-agua",     name: "Agua Fresca",            sub: "Hibiscus or tamarind, house-made",         price: 4.49  },
  // Crust Theory
  { id: "crust-marg",     name: "Margherita",             sub: "San Marzano tomato, fresh mozzarella",     price: 17.99 },
  { id: "crust-pepp",     name: "Pepperoni",              sub: "Cup-and-char pepperoni, red sauce",        price: 19.99 },
  { id: "crust-knots",    name: "Garlic Knots (6)",      sub: "Parmesan, herb butter",                    price: 6.99  },
  { id: "crust-soda",     name: "Italian Soda",           sub: "Blood orange or lemon",                    price: 3.99  },
  // The Green Bowl
  { id: "green-acai",     name: "Açaí Power Bowl",       sub: "Granola, banana, honey drizzle",           price: 13.99 },
  { id: "green-caesar",   name: "Kale Caesar",            sub: "House dressing, parmesan, croutons",       price: 12.99 },
  { id: "green-wrap",     name: "Avocado Chicken Wrap",  sub: "Grilled chicken, avocado, greens",         price: 14.99 },
  { id: "green-juice",    name: "Cold Press Juice",       sub: "Ginger, lemon, apple",                     price: 7.99  },
  // Omakase Express
  { id: "oma-dragon",     name: "Dragon Roll (8 pcs)",   sub: "Shrimp tempura, avocado, tobiko",          price: 18.99 },
  { id: "oma-salmon",     name: "Salmon Nigiri (4 pcs)", sub: "Day-boat salmon, sushi rice",              price: 16.99 },
  { id: "oma-edamame",    name: "Edamame",                sub: "Sea salt, sesame oil",                     price: 5.99  },
  { id: "oma-miso",       name: "Miso Soup",              sub: "Tofu, wakame, green onion",                price: 4.49  },
];

// ─── Restaurant definitions ───────────────────────────────────────────────────
const RESTAURANTS = [
  {
    id: "sakura", name: "Sakura Noodle House", cuisine: "Japanese",
    rating: 4.8, reviews: "320+", time: "20–30 min", fee: "$0.99", minOrder: "$10",
    badge: null as string | null,
    gradient: "linear-gradient(135deg,#d4a373 0%,#8b5e3c 100%)", emoji: "🍜", headerColor: "#8b5e3c",
    sections: [
      { name: "Popular", itemIds: ["sakura-ramen","sakura-gyoza"] },
      { name: "Mains",   itemIds: ["sakura-ramen","sakura-udon"] },
      { name: "Sides",   itemIds: ["sakura-gyoza"] },
      { name: "Drinks",  itemIds: ["sakura-matcha"] },
    ],
  },
  {
    id: "stacked", name: "Stacked", cuisine: "American Burgers",
    rating: 4.6, reviews: "180+", time: "15–25 min", fee: "Free", minOrder: "$8",
    badge: null as string | null,
    gradient: "linear-gradient(135deg,#c0392b 0%,#6c1a1a 100%)", emoji: "🍔", headerColor: "#6c1a1a",
    sections: [
      { name: "Popular", itemIds: ["stack-classic","stack-double"] },
      { name: "Burgers", itemIds: ["stack-classic","stack-double"] },
      { name: "Sides",   itemIds: ["stack-fries"] },
      { name: "Drinks",  itemIds: ["stack-shake"] },
    ],
  },
  {
    id: "fuego", name: "Casa Fuego", cuisine: "Mexican",
    rating: 4.7, reviews: "540+", time: "25–35 min", fee: "$1.99", minOrder: "$12",
    badge: "Promoted" as string | null,
    gradient: "linear-gradient(135deg,#f39c12 0%,#e74c3c 100%)", emoji: "🌮", headerColor: "#c0392b",
    sections: [
      { name: "Popular", itemIds: ["fuego-tacos","fuego-burrito"] },
      { name: "Mains",   itemIds: ["fuego-tacos","fuego-burrito"] },
      { name: "Sides",   itemIds: ["fuego-queso"] },
      { name: "Drinks",  itemIds: ["fuego-agua"] },
    ],
  },
  {
    id: "crust", name: "Crust Theory", cuisine: "Pizza",
    rating: 4.5, reviews: "210+", time: "20–30 min", fee: "Free", minOrder: "$10",
    badge: "New" as string | null,
    gradient: "linear-gradient(135deg,#e74c3c 0%,#922b21 100%)", emoji: "🍕", headerColor: "#922b21",
    sections: [
      { name: "Popular", itemIds: ["crust-marg","crust-pepp"] },
      { name: "Pizzas",  itemIds: ["crust-marg","crust-pepp"] },
      { name: "Sides",   itemIds: ["crust-knots"] },
      { name: "Drinks",  itemIds: ["crust-soda"] },
    ],
  },
  {
    id: "green", name: "The Green Bowl", cuisine: "Healthy · Salads",
    rating: 4.9, reviews: "90+", time: "15–20 min", fee: "$0.99", minOrder: "$8",
    badge: null as string | null,
    gradient: "linear-gradient(135deg,#27ae60 0%,#1a6b3e 100%)", emoji: "🥗", headerColor: "#1a6b3e",
    sections: [
      { name: "Popular", itemIds: ["green-acai","green-caesar"] },
      { name: "Bowls",   itemIds: ["green-acai"] },
      { name: "Salads",  itemIds: ["green-caesar"] },
      { name: "Mains",   itemIds: ["green-wrap"] },
      { name: "Drinks",  itemIds: ["green-juice"] },
    ],
  },
  {
    id: "omakase", name: "Omakase Express", cuisine: "Sushi · Japanese",
    rating: 4.8, reviews: "410+", time: "30–40 min", fee: "$2.49", minOrder: "$15",
    badge: null as string | null,
    gradient: "linear-gradient(135deg,#2980b9 0%,#1a3a6e 100%)", emoji: "🍣", headerColor: "#1a3a6e",
    sections: [
      { name: "Popular", itemIds: ["oma-dragon","oma-salmon"] },
      { name: "Rolls",   itemIds: ["oma-dragon"] },
      { name: "Nigiri",  itemIds: ["oma-salmon"] },
      { name: "Sides",   itemIds: ["oma-edamame"] },
      { name: "Soups",   itemIds: ["oma-miso"] },
    ],
  },
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

const BackArrow = ({ onBack, light = false }: { onBack: () => void; light?: boolean }) => (
  <button
    onClick={onBack}
    className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors shrink-0 ${light ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
    aria-label="Back"
  >
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke={light ? "white" : "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  </button>
);

// ─── Interactive app screens ─────────────────────────────────────────────────
type CartMap   = Record<string, number>;
type AppScreen = "home" | "cart" | "confirmed" | "tracking" | "contact" | "message" | "restaurant";

const DELIVERY_FEE = 2.99;

const appVariants = {
  enter:  { opacity: 0, x: 16  },
  center: { opacity: 1, x: 0   },
  exit:   { opacity: 0, x: -16 },
};

// Home
const FILTERS = [
  { label: "Free delivery", icon: "🛵" },
  { label: "Top rated",     icon: "⭐" },
  { label: "Under 30 min",  icon: "🕐" },
  { label: "Noodles",       icon: "🍜" },
  { label: "Sushi",         icon: "🍣" },
  { label: "Burgers",       icon: "🍔" },
  { label: "Mexican",       icon: "🌮" },
];
const CATEGORIES = [
  { label: "Burgers", emoji: "🍔" }, { label: "Pizza",   emoji: "🍕" },
  { label: "Sushi",   emoji: "🍣" }, { label: "Noodles", emoji: "🍜" },
  { label: "Mexican", emoji: "🌮" }, { label: "Salads",  emoji: "🥗" },
  { label: "Dessert", emoji: "🍰" },
];

const HomeScreen = ({
  cart, go, openRestaurant,
}: { cart: CartMap; add: (id: string) => void; go: (s: AppScreen) => void; openRestaurant: (id: string) => void }) => {
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal   = ALL_ITEMS.reduce((s, i) => s + (cart[i.id] || 0) * i.price, 0);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full bg-white">

      {/* ── Fixed top header ── */}
      <div className="flex-shrink-0 bg-white">
        {/* Address + ETA */}
        <div className="flex items-center justify-between px-4 pt-3 pb-1.5">
          <button className="flex items-center gap-1">
            <span className="text-[11px] font-bold text-black">📍 247 W 35th St</span>
            <svg viewBox="0 0 24 24" className="w-3 h-3 flex-shrink-0" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <span className="text-[10px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full font-medium">25–35 min</span>
        </div>
        {/* Search */}
        <div className="px-4 pb-1.5">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <span className="text-[11px] text-gray-400">Search Uber Eats</span>
          </div>
        </div>
        {/* Filter chips */}
        <div className="flex gap-2 px-4 pb-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {FILTERS.map((f) => (
            <button
              key={f.label}
              onClick={() => setActiveFilter(activeFilter === f.label ? null : f.label)}
              className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-semibold transition-colors ${
                activeFilter === f.label ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              <span>{f.icon}</span><span>{f.label}</span>
            </button>
          ))}
        </div>
        <div className="h-px bg-gray-100" />
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-auto">
        {/* Promo banner */}
        <div className="mx-4 mt-3 mb-3 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg,#06C167 0%,#047a42 100%)" }}>
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-white text-[11px] font-black leading-snug">Free delivery on<br />your first order 🎉</p>
              <p className="text-white/70 text-[9px] mt-0.5">Use code FIRST at checkout</p>
            </div>
            <span className="text-3xl">🛵</span>
          </div>
        </div>

        {/* Category icons */}
        <div className="px-4 mb-3">
          <p className="text-[11px] font-bold text-black mb-2">Categories</p>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-xl">{c.emoji}</span>
                </div>
                <span className="text-[9px] text-gray-600 font-medium">{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Restaurant list */}
        <div className="px-4 pb-3">
          <p className="text-[11px] font-bold text-black mb-2">Featured restaurants</p>
          <div className="flex flex-col gap-3">
            {RESTAURANTS.map((r) => (
              <button
                key={r.id}
                onClick={() => openRestaurant(r.id)}
                className="text-left rounded-2xl overflow-hidden border border-gray-100 active:scale-[0.98] transition-transform w-full shadow-sm"
              >
                {/* Banner */}
                <div className="h-[70px] w-full flex items-center justify-center relative" style={{ background: r.gradient }}>
                  <span className="text-4xl">{r.emoji}</span>
                  {r.badge && (
                    <span className={`absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-sm text-white ${r.badge === "Promoted" ? "bg-black/40" : "bg-[#06C167]"}`}>
                      {r.badge}
                    </span>
                  )}
                </div>
                {/* Info */}
                <div className="px-3 py-2 bg-white">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-[12px] font-bold text-black">{r.name}</p>
                    <div className="flex items-center gap-0.5">
                      <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="#f59e0b"><path d="M6 1l1.4 3h3.1l-2.5 1.8.9 3L6 7.3 3.1 8.8l.9-3L1.5 4H4.6z"/></svg>
                      <span className="text-[10px] font-semibold text-black">{r.rating}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500">{r.cuisine}</p>
                  <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                    <span className="text-[10px] text-gray-400">({r.reviews})</span>
                    <span className="text-[9px] text-gray-300">·</span>
                    <span className="text-[10px] text-gray-500">{r.time}</span>
                    <span className="text-[9px] text-gray-300">·</span>
                    <span className={`text-[10px] font-medium ${r.fee === "Free" ? "text-[#06C167]" : "text-gray-500"}`}>
                      {r.fee === "Free" ? "Free delivery" : `${r.fee} delivery`}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Go to cart bar ── */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            key="cart-bar"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0,  opacity: 1 }}
            exit={{   y: 60, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 320 }}
            className="px-4 pb-2 pt-1.5 flex-shrink-0"
          >
            <button
              onClick={() => go("cart")}
              className="w-full bg-[#06C167] rounded-full flex items-center px-3 py-2.5 active:scale-[0.98] transition-transform"
            >
              <span className="w-6 h-6 rounded-md bg-black/20 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">{totalItems}</span>
              <span className="flex-1 text-center text-white text-[12px] font-bold tracking-wide">Go to cart</span>
              <span className="text-white text-[11px] font-bold flex-shrink-0">${subtotal.toFixed(2)}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom nav ── */}
      <div className="flex-shrink-0 border-t border-gray-100 bg-white">
        <div className="flex">
          {([
            { label: "Home",    active: true,  icon: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></> },
            { label: "Search",  active: false, icon: <><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></> },
            { label: "Orders",  active: false, icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/> },
            { label: "Account", active: false, icon: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></> },
          ] as const).map(({ label, active, icon }) => (
            <button key={label} className="flex-1 flex flex-col items-center py-2 gap-0.5">
              <svg viewBox="0 0 24 24" className={`w-5 h-5 ${active ? "stroke-[#06C167]" : "stroke-gray-400"}`} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {icon}
              </svg>
              <span className={`text-[9px] font-medium ${active ? "text-[#06C167]" : "text-gray-400"}`}>{label}</span>
              {active && <div className="w-4 h-0.5 bg-[#06C167] rounded-full" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Cart
const CartScreen = ({
  cart, add, remove, go,
}: { cart: CartMap; add: (id: string) => void; remove: (id: string) => void; go: (s: AppScreen) => void }) => {
  const cartItems  = ALL_ITEMS.filter((i) => (cart[i.id] || 0) > 0);
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal   = ALL_ITEMS.reduce((s, i) => s + (cart[i.id] || 0) * i.price, 0);

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
  const cartItems = ALL_ITEMS.filter((i) => (cart[i.id] || 0) > 0);
  const subtotal  = ALL_ITEMS.reduce((s, i) => s + (cart[i.id] || 0) * i.price, 0);

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
        <button
          onClick={() => go("contact")}
          className="w-full border border-gray-200 rounded-xl py-3 flex items-center justify-center active:scale-[0.98] transition-transform hover:bg-gray-50"
        >
          <span className="text-black text-[11px] font-bold tracking-wide">Contact driver</span>
        </button>
      </div>
    </div>
  );
};

// ─── Call overlay (iOS incoming call style) ───────────────────────────────────
const CallOverlay = ({ onEnd }: { onEnd: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 30 }}
    transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
    className="absolute inset-0 z-20 flex flex-col"
    style={{ background: "linear-gradient(180deg, #1a2a1a 0%, #0d0d0d 100%)" }}
  >
    {/* Top info */}
    <div className="flex-1 flex flex-col items-center justify-center gap-2 px-6">
      <p className="text-[#06C167] text-[10px] font-semibold tracking-widest uppercase mb-1">Uber Eats</p>
      <p className="text-gray-400 text-[11px] mb-4">Incoming call…</p>
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mb-4 ring-4 ring-white/10">
        <svg viewBox="0 0 48 48" className="w-14 h-14" fill="none">
          <circle cx="24" cy="18" r="9" fill="#9ca3af" />
          <path d="M6 44c0-9.94 8.06-18 18-18s18 8.06 18 18" fill="#9ca3af" />
        </svg>
      </div>
      <p className="text-white text-[22px] font-bold tracking-tight">Marcus T.</p>
      <p className="text-gray-400 text-[11px]">Your driver</p>
    </div>

    {/* Secondary controls (decorative) */}
    <div className="flex justify-center gap-10 mb-8">
      {[
        { label: "Remind me", path: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></> },
        { label: "Message",   path: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /> },
      ].map(({ label, path }) => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              {path}
            </svg>
          </div>
          <span className="text-white text-[9px] opacity-50">{label}</span>
        </div>
      ))}
    </div>

    {/* Decline / Answer */}
    <div className="flex justify-around items-end pb-10 px-8">
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={onEnd}
          className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center active:scale-95 transition-transform shadow-lg"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 rotate-[135deg]" fill="white">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1-.22 1.1.45 2.3.68 3.6.68.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.18 21 3 13.82 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.3.22 2.5.67 3.6.12.32.04.7-.22 1L6.6 10.8z" />
          </svg>
        </button>
        <span className="text-white text-[10px] opacity-60">Decline</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={onEnd}
          className="w-16 h-16 rounded-full bg-[#06C167] flex items-center justify-center active:scale-95 transition-transform shadow-lg"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1-.22 1.1.45 2.3.68 3.6.68.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.18 21 3 13.82 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.3.22 2.5.67 3.6.12.32.04.7-.22 1L6.6 10.8z" />
          </svg>
        </button>
        <span className="text-white text-[10px] opacity-60">Answer</span>
      </div>
    </div>
  </motion.div>
);

// ─── Contact driver screen ────────────────────────────────────────────────────
const ContactDriverScreen = ({ go }: { go: (s: AppScreen) => void }) => {
  const [calling, setCalling] = useState(false);

  return (
    <div className="flex flex-col h-full relative bg-white">

      {/* ── Black header ── */}
      <div className="bg-black px-4 pt-4 pb-3 flex-shrink-0 relative flex items-center justify-center">
        <div className="absolute left-4">
          <BackArrow light onBack={() => go("tracking")} />
        </div>
        <div className="flex items-center gap-1.5">
          <p className="text-white text-[14px] font-bold">Marcus</p>
          <span className="w-2 h-2 rounded-full bg-[#06C167] inline-block" />
        </div>
      </div>

      {/* ── Driver card ── */}
      <div className="bg-white px-5 pt-4 pb-3 flex-shrink-0">
        {/* Avatar + info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <svg viewBox="0 0 56 56" className="w-full h-full" fill="none">
              <rect width="56" height="56" fill="#e5e7eb" />
              <circle cx="28" cy="21" r="10" fill="#9ca3af" />
              <path d="M6 52c0-12.15 9.85-22 22-22s22 9.85 22 22" fill="#9ca3af" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-black leading-tight">Marcus T.</p>
            <div className="flex items-center gap-1 mt-0.5">
              <svg viewBox="0 0 12 12" className="w-3 h-3 flex-shrink-0" fill="#f59e0b">
                <path d="M6 1l1.4 3h3.1l-2.5 1.8.9 3L6 7.3 3.1 8.8l.9-3L1.5 4H4.6z" />
              </svg>
              <span className="text-[11px] text-gray-500">4.97 · 2,341 trips</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">Toyota Camry · Silver · 7KLM 423</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Three action pills */}
        <div className="flex gap-2 pt-3">
          {[
            {
              label: "Call",
              onClick: () => setCalling(true),
              icon: <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1-.22 1.1.45 2.3.68 3.6.68.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.18 21 3 13.82 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.3.22 2.5.67 3.6.12.32.04.7-.22 1L6.6 10.8z" />,
            },
            {
              label: "Message",
              onClick: () => go("message"),
              icon: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />,
            },
            {
              label: "Share location",
              onClick: () => {},
              icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></>,
            },
          ].map(({ label, onClick, icon }) => (
            <button
              key={label}
              onClick={onClick}
              className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-full py-2 hover:bg-gray-50 active:scale-95 transition-transform"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {icon}
              </svg>
              <span className="text-[10px] font-semibold text-black leading-none truncate">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Chat area ── */}
      <div className="flex-1 overflow-auto px-4 py-3" style={{ background: "#f5f5f5" }}>
        {/* Received bubble */}
        <div className="flex justify-start mb-2">
          <div className="bg-[#222] text-white text-[11px] px-3 py-2 rounded-2xl rounded-bl-sm max-w-[80%] leading-snug">
            On my way! About 3 min away 🚗
            <p className="text-[8px] text-white/50 mt-1">8:39 PM</p>
          </div>
        </div>
      </div>

      {/* ── Quick replies + input ── */}
      <div className="bg-white flex-shrink-0 border-t border-gray-100">
        {/* Quick reply chips */}
        <div className="flex gap-2 px-4 pt-3 pb-2 overflow-x-auto">
          {["I'm outside", "Almost there", "Thanks!"].map((q) => (
            <button
              key={q}
              onClick={() => go("message")}
              className="flex-shrink-0 px-3 py-1.5 rounded-full border border-gray-200 text-[10px] font-medium text-gray-700 hover:bg-gray-50 active:scale-95 transition-transform"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Text input */}
        <div className="flex items-center gap-2 px-4 pb-4">
          <button
            onClick={() => go("message")}
            className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2.5 text-left"
          >
            <span className="text-[11px] text-gray-400 flex-1">Send a message…</span>
          </button>
          <button
            onClick={() => go("message")}
            className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Call overlay */}
      <AnimatePresence>
        {calling && <CallOverlay onEnd={() => setCalling(false)} />}
      </AnimatePresence>
    </div>
  );
};

// ─── Message screen ───────────────────────────────────────────────────────────
const MessageScreen = ({ go }: { go: (s: AppScreen) => void }) => {
  const [messages, setMessages] = useState([
    { from: "driver" as const, text: "On my way! 2 minutes away 🚗", time: "8:40 PM" },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { from: "me" as const, text, time: "8:41 PM" }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Dark header */}
      <div className="bg-black px-4 pt-4 pb-3 flex items-center gap-3 flex-shrink-0">
        <BackArrow light onBack={() => go("contact")} />
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center">
            <span className="text-[11px] font-bold text-white">M</span>
          </div>
          <div>
            <p className="text-white text-[13px] font-bold leading-tight">Marcus</p>
            <p className="text-white text-[9px] opacity-50 leading-tight">Your driver</p>
          </div>
        </div>
      </div>

      {/* Message thread */}
      <div className="flex-1 px-4 py-4 overflow-auto flex flex-col gap-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] px-3 py-2 rounded-2xl text-[11px] leading-snug ${
                m.from === "me"
                  ? "bg-[#06C167] text-white rounded-br-sm"
                  : "bg-gray-100 text-gray-800 rounded-bl-sm"
              }`}
            >
              {m.text}
              <p className={`text-[8px] mt-1 ${m.from === "me" ? "opacity-70" : "text-gray-400"}`}>{m.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick replies + input */}
      <div className="px-4 pb-5 flex-shrink-0 border-t border-gray-100 pt-3">
        <div className="flex gap-1.5 mb-2.5 overflow-x-auto pb-0.5">
          {["I'm outside", "Almost there", "Thank you!"].map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="px-3 py-1 rounded-full border border-gray-200 text-[10px] text-gray-600 whitespace-nowrap flex-shrink-0 hover:bg-gray-50 active:scale-95 transition-transform"
            >
              {q}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(input); }}
            placeholder="Message…"
            className="flex-1 text-[11px] border border-gray-200 rounded-full px-4 py-2 outline-none"
          />
          <button
            onClick={() => send(input)}
            className="w-7 h-7 rounded-full bg-black flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Restaurant menu screen ───────────────────────────────────────────────────
const RestaurantScreen = ({
  restaurantId, cart, add, go,
}: { restaurantId: string; cart: CartMap; add: (id: string) => void; go: (s: AppScreen) => void }) => {
  const restaurant = RESTAURANTS.find((r) => r.id === restaurantId);
  if (!restaurant) return null;

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal   = ALL_ITEMS.reduce((s, i) => s + (cart[i.id] || 0) * i.price, 0);

  return (
    <div className="flex flex-col h-full bg-white">

      {/* Banner header */}
      <div className="flex-shrink-0 relative" style={{ height: 90, background: restaurant.gradient }}>
        <button
          onClick={() => go("home")}
          className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/30 flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <div className="flex items-center justify-center h-full">
          <span className="text-5xl">{restaurant.emoji}</span>
        </div>
      </div>

      {/* Info row */}
      <div className="px-4 py-3 border-b border-gray-100 flex-shrink-0">
        <p className="text-[14px] font-black text-black leading-tight">{restaurant.name}</p>
        <div className="flex items-center gap-1 mt-0.5 flex-wrap">
          <svg viewBox="0 0 12 12" className="w-3 h-3 flex-shrink-0" fill="#f59e0b"><path d="M6 1l1.4 3h3.1l-2.5 1.8.9 3L6 7.3 3.1 8.8l.9-3L1.5 4H4.6z"/></svg>
          <span className="text-[11px] font-semibold">{restaurant.rating}</span>
          <span className="text-[10px] text-gray-400">({restaurant.reviews})</span>
          <span className="text-[9px] text-gray-300">·</span>
          <span className="text-[10px] text-gray-500">{restaurant.cuisine}</span>
        </div>
        <div className="flex items-center gap-3 mt-1.5">
          {[
            { icon: "🕐", label: restaurant.time },
            { icon: "🛵", label: `${restaurant.fee === "Free" ? "Free" : restaurant.fee} delivery` },
            { icon: "💰", label: `${restaurant.minOrder} min.` },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-0.5">
              <span className="text-[9px]">{icon}</span>
              <span className="text-[10px] text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Menu sections */}
      <div className="flex-1 overflow-auto pb-2">
        {restaurant.sections.map((section) => {
          const items = section.itemIds.flatMap((id) => ALL_ITEMS.filter((i) => i.id === id));
          return (
            <div key={section.name}>
              <p className="px-4 pt-4 pb-2 text-[11px] font-black text-black uppercase tracking-wider">{section.name}</p>
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-3 px-4 py-2.5 border-b border-gray-50">
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-gray-900">{item.name}</p>
                    <p className="text-[10px] text-gray-400 leading-snug mt-0.5">{item.sub}</p>
                    <p className="text-[11px] font-bold text-black mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="relative flex-shrink-0 mt-0.5">
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
          );
        })}
      </div>

      {/* Go to cart bar */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            key="cart-bar"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0,  opacity: 1 }}
            exit={{   y: 60, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 320 }}
            className="px-4 pb-4 pt-2 flex-shrink-0"
          >
            <button
              onClick={() => go("cart")}
              className="w-full bg-[#06C167] rounded-full flex items-center px-3 py-2.5 active:scale-[0.98] transition-transform"
            >
              <span className="w-6 h-6 rounded-md bg-black/20 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">{totalItems}</span>
              <span className="flex-1 text-center text-white text-[12px] font-bold tracking-wide">Go to cart</span>
              <span className="text-white text-[11px] font-bold flex-shrink-0">${subtotal.toFixed(2)}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Interactive app shell ───────────────────────────────────────────────────
const InteractiveApp = ({ onOrderConfirmed }: { onOrderConfirmed?: (cart: CartMap) => void }) => {
  const [screen,            setScreen           ] = useState<AppScreen>("home");
  const [cart,              setCart             ] = useState<CartMap>({});
  const [activeRestaurant,  setActiveRestaurant ] = useState<string | null>(null);

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

  const openRestaurant = (id: string) => {
    setActiveRestaurant(id);
    setScreen("restaurant");
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
          {screen === "home"       && <HomeScreen         cart={cart} add={add}                 go={go} openRestaurant={openRestaurant} />}
          {screen === "restaurant" && activeRestaurant    && <RestaurantScreen restaurantId={activeRestaurant} cart={cart} add={add} go={go} />}
          {screen === "cart"       && <CartScreen         cart={cart} add={add} remove={remove} go={go} />}
          {screen === "confirmed"  && <ConfirmedScreen    cart={cart}                            go={go} />}
          {screen === "tracking"   && <TrackingScreen                                             go={go} />}
          {screen === "contact"    && <ContactDriverScreen                                        go={go} />}
          {screen === "message"    && <MessageScreen                                              go={go} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ─── Merchant Tablet ─────────────────────────────────────────────────────────
const MerchantTablet = ({ cart, onAccept }: { cart: CartMap; onAccept: () => void }) => {
  const [accepted, setAccepted] = useState(false);
  const cartItems = ALL_ITEMS.filter((i) => (cart[i.id] || 0) > 0);
  const subtotal  = ALL_ITEMS.reduce((s, i) => s + (cart[i.id] || 0) * i.price, 0);

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
      {/* Landscape tablet — matches phone bezel style */}
      <div className="relative shadow-2xl" style={{ width: 900, height: 580 }}>
        {/* Bezel layer — same pattern as phone */}
        <div className="absolute inset-0 bg-black rounded-[2rem]" />
        {/* Screen inset — 12px bezel, matching phone */}
        <div className="absolute bg-white overflow-hidden flex flex-col" style={{ top: 12, left: 12, right: 12, bottom: 12, borderRadius: "1.5rem" }}>
          {/* Header */}
          <div className="px-10 py-6 flex items-center gap-4 bg-[#06C167] flex-shrink-0">
            {!accepted && (
              <motion.span
                className="w-4 h-4 rounded-full bg-white shrink-0"
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ repeat: Infinity, duration: 0.75, ease: "easeInOut" }}
              />
            )}
            {accepted && (
              <svg viewBox="0 0 10 8" className="w-5 h-5 shrink-0" fill="none">
                <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            <p className="text-white font-black text-[22px] tracking-widest uppercase">
              {accepted ? "ORDER ACCEPTED — Preparing" : "NEW ORDER"}
            </p>
          </div>

          {/* Order items + actions side by side */}
          <div className="flex flex-1 overflow-hidden">
            {/* Order list */}
            <div className="flex-1 px-10 py-7 border-r border-gray-100 overflow-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0">
                  <span className="text-[18px] text-gray-600">{cart[item.id]}× {item.name}</span>
                  <span className="text-[18px] font-semibold text-gray-900">${(item.price * cart[item.id]).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between text-[19px] font-bold pt-4 mt-3 border-t border-gray-200">
                <span>Total</span>
                <span>${(subtotal + DELIVERY_FEE).toFixed(2)}</span>
              </div>
            </div>

            {/* Action panel */}
            <div className="flex flex-col items-center justify-center px-8 gap-4" style={{ width: 260 }}>
              <AnimatePresence>
                {!accepted && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-4 w-full"
                  >
                    <button
                      onClick={handleAccept}
                      className="w-full bg-[#06C167] text-white text-[18px] font-bold py-4 rounded-2xl active:scale-95 transition-transform hover:opacity-90"
                    >
                      Accept
                    </button>
                    <button className="w-full border border-gray-200 text-gray-500 text-[18px] font-bold py-4 rounded-2xl active:scale-95 transition-transform hover:bg-gray-50">
                      Decline
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              {accepted && (
                <p className="text-[15px] text-gray-400 text-center leading-relaxed">Notified kitchen — est. prep 15 min</p>
              )}
            </div>
          </div>

          {/* Home pill at bottom */}
          <div className="flex justify-center pb-2 pt-1 flex-shrink-0">
            <div className="w-24 h-1 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Receipt Printer ─────────────────────────────────────────────────────────
const ReceiptPrinter = ({ printing, cart }: { printing: boolean; cart: CartMap }) => {
  const cartItems = ALL_ITEMS.filter((i) => (cart[i.id] || 0) > 0);
  const subtotal  = ALL_ITEMS.reduce((s, i) => s + (cart[i.id] || 0) * i.price, 0);

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
