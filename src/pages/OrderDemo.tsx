import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const ORDER_ID = "UE-4829";
const ITEMS = [
  { name: "Spicy Ramen Bowl", qty: 1, unitPrice: 14.99 },
  { name: "Gyoza (6 pcs)",    qty: 2, unitPrice: 9.50  },
];
const DELIVERY = 2.99;
const TOTAL = ITEMS.reduce((s, i) => s + i.qty * i.unitPrice, 0) + DELIVERY; // 36.98

// ─────────────────────────────────────────────────────────────────────────────
// Stage types
// -1 = idle/pre-demo
//  0 = Order Placed
//  1 = Accepted
//  2 = Picked Up
//  3 = Delivered
// ─────────────────────────────────────────────────────────────────────────────
type Stage = -1 | 0 | 1 | 2 | 3;

const STAGE_LABELS = ["Order Placed", "Accepted", "Picked Up", "Delivered"];

// ─────────────────────────────────────────────────────────────────────────────
// Checkmark SVG
// ─────────────────────────────────────────────────────────────────────────────
const Checkmark = ({ size = 11, color = "white" }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 10 8" style={{ width: size, height: size * 0.8 }} fill="none">
    <path d="M1 4l3 3 5-6" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// Customer iPhone
// ─────────────────────────────────────────────────────────────────────────────
const CustomerPhone = ({ stage }: { stage: Stage }) => {
  const isConfirmed = stage <= 0;
  const isOnTheWay  = stage === 1 || stage === 2;
  const isDelivered = stage === 3;
  const headerBg    = isConfirmed ? "#06C167" : "#111111";

  const timelineSteps = [
    { label: "Order placed",   done: stage >= 0 },
    { label: "Being prepared", done: stage >= 1 },
    { label: "Picked up",      done: stage >= 2 },
    { label: "Delivered",      done: stage >= 3 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <p style={{ color: "#6b7280", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>
        Customer iPhone
      </p>

      {/* iPhone outer frame */}
      <div style={{
        width: 280, background: "#111", borderRadius: 44, padding: 11,
        boxShadow: "0 0 0 1px #333, 0 0 0 2px #222, 0 32px 80px rgba(0,0,0,0.7)",
        position: "relative",
      }}>
        {/* Side buttons */}
        <div style={{ position: "absolute", left: -3, top: 100, width: 3, height: 28, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -3, top: 136, width: 3, height: 52, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -3, top: 196, width: 3, height: 52, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", right: -3, top: 148, width: 3, height: 70, background: "#2a2a2a", borderRadius: "0 2px 2px 0" }} />

        {/* Screen */}
        <div style={{ background: "white", borderRadius: 34, overflow: "hidden", height: 558, display: "flex", flexDirection: "column" }}>

          {/* Notch bar */}
          <div style={{ background: headerBg, paddingTop: 10, display: "flex", justifyContent: "center", transition: "background 0.5s ease", flexShrink: 0 }}>
            <div style={{ width: 118, height: 28, background: "#111", borderRadius: "0 0 20px 20px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#2a2a2a" }} />
              <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#1a1a1a", border: "1px solid #333" }} />
            </div>
          </div>

          {/* Header */}
          <div style={{ background: headerBg, padding: "14px 20px 18px", transition: "background 0.5s ease", flexShrink: 0 }}>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 6 }}>
              {isDelivered ? "Delivered" : isOnTheWay ? "On the way" : "Order confirmed"}
            </p>
            <p style={{ color: "white", fontSize: 19, fontWeight: 800, lineHeight: 1.2, margin: 0 }}>
              {isDelivered
                ? "Order delivered!"
                : isOnTheWay
                  ? <>Your order is<br />on the way</>
                  : <>Your food is<br />being prepared</>
              }
            </p>
          </div>

          {/* Progress bar */}
          <div style={{ height: 3, background: "#f0f0f0", flexShrink: 0 }}>
            <div style={{
              height: "100%", background: "#06C167",
              width: stage <= 0 ? "0%" : stage === 1 ? "50%" : stage === 2 ? "82%" : "100%",
              transition: "width 0.9s ease",
            }} />
          </div>

          {/* Body */}
          <div style={{ flex: 1, padding: "16px 20px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {isConfirmed ? (
              /* Confirmed body */
              <>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 12 }}>
                  Your order
                </p>
                {ITEMS.map(item => (
                  <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                    <div style={{ display: "flex", gap: 6, minWidth: 0 }}>
                      <span style={{ fontSize: 11, color: "#9ca3af", flexShrink: 0 }}>{item.qty}×</span>
                      <span style={{ fontSize: 11, color: "#1f2937", fontWeight: 500 }}>{item.name}</span>
                    </div>
                    <span style={{ fontSize: 11, color: "#1f2937", fontWeight: 600, marginLeft: 8, flexShrink: 0 }}>${(item.qty * item.unitPrice).toFixed(2)}</span>
                  </div>
                ))}
                <div style={{ marginTop: "auto", paddingTop: 10, borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>Total</span>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>${TOTAL.toFixed(2)}</span>
                </div>
              </>
            ) : (
              /* Tracking body */
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 18 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#06C167" }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>
                    {isDelivered ? "Delivered at 8:42 PM" : <>Arriving by <span style={{ color: "#111", fontWeight: 700 }}>8:42 PM</span></>}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {timelineSteps.map((step, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: "50%",
                        background: step.done ? "#06C167" : "transparent",
                        border: step.done ? "none" : "2px solid #e5e7eb",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, transition: "all 0.4s ease",
                      }}>
                        {step.done && <Checkmark />}
                      </div>
                      <span style={{ fontSize: 12, fontWeight: step.done ? 600 : 400, color: step.done ? "#111" : "#d1d5db", transition: "color 0.4s ease" }}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Bottom button */}
          <div style={{ padding: "10px 20px 4px", flexShrink: 0 }}>
            <div style={{
              background: isConfirmed ? "#111" : "transparent",
              border: isConfirmed ? "none" : "1.5px solid #e5e7eb",
              borderRadius: 14, padding: "13px 0", textAlign: "center",
              transition: "all 0.3s ease",
            }}>
              <span style={{ color: isConfirmed ? "white" : "#111", fontSize: 12, fontWeight: 700, letterSpacing: "0.04em" }}>
                {isConfirmed ? "Track order" : "Contact driver"}
              </span>
            </div>
          </div>

          {/* Home indicator */}
          <div style={{ height: 28, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <div style={{ width: 120, height: 4, background: "#d1d5db", borderRadius: 2 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Merchant Tablet
// ─────────────────────────────────────────────────────────────────────────────
const MerchantTablet = ({ stage, onAccept }: { stage: Stage; onAccept: () => void }) => {
  const isIdle     = stage === -1;
  const isNewOrder = stage === 0;
  const isAccepted = stage >= 1 && stage <= 2;
  const isComplete = stage === 3;

  const headerBg = isNewOrder ? "#06C167" : isAccepted ? "#06C167" : "#1f2937";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <p style={{ color: "#6b7280", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>
        Merchant Tablet
      </p>

      {/* Tablet bezel */}
      <div style={{
        width: 400, background: "#1a1a1a",
        borderRadius: 18, padding: 10,
        boxShadow: "0 0 0 1px #333, 0 0 0 2px #111, 0 32px 80px rgba(0,0,0,0.7)",
        position: "relative",
      }}>
        {/* Front camera */}
        <div style={{ position: "absolute", top: 18, left: "50%", transform: "translateX(-50%)", width: 8, height: 8, borderRadius: "50%", background: "#111", border: "1px solid #2a2a2a", zIndex: 2 }} />

        {/* Screen */}
        <div style={{ background: "white", borderRadius: 10, overflow: "hidden", minHeight: 520, display: "flex", flexDirection: "column" }}>

          {/* Tablet status bar */}
          <div style={{ background: "#f9fafb", padding: "8px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f3f4f6", flexShrink: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>Uber Eats Merchant</span>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 10, color: "#9ca3af" }}>8:42 PM</span>
              <div style={{ width: 16, height: 10, border: "1.5px solid #9ca3af", borderRadius: 2, position: "relative" }}>
                <div style={{ position: "absolute", top: 1, left: 1, bottom: 1, width: "70%", background: "#06C167", borderRadius: 1 }} />
              </div>
            </div>
          </div>

          {/* Main content */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {isIdle && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 40 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg viewBox="0 0 24 24" style={{ width: 28, height: 28 }} fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                    <rect x="9" y="3" width="6" height="4" rx="1" />
                    <path d="M9 12h6M9 16h4" />
                  </svg>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 16, fontWeight: 600, color: "#374151", margin: 0 }}>Waiting for orders...</p>
                  <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 6 }}>New orders will appear here</p>
                </div>
              </div>
            )}

            {(isNewOrder || isAccepted) && (
              <>
                {/* Header banner */}
                <div style={{ background: headerBg, padding: "14px 20px", display: "flex", alignItems: "center", gap: 10, transition: "background 0.4s ease", flexShrink: 0 }}>
                  {isNewOrder ? (
                    /* Pulsing dot for new order */
                    <div style={{ position: "relative", width: 10, height: 10, flexShrink: 0 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "white", opacity: 0.9 }} />
                    </div>
                  ) : (
                    <div style={{ flexShrink: 0 }}><Checkmark size={14} color="white" /></div>
                  )}
                  <p style={{ color: "white", fontSize: 14, fontWeight: 900, letterSpacing: "0.16em", textTransform: "uppercase", margin: 0 }}>
                    {isNewOrder ? "NEW ORDER" : "ORDER ACCEPTED — PREPARING"}
                  </p>
                </div>

                {/* Order items */}
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6", flexShrink: 0 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 10 }}>
                    Order #{ORDER_ID}
                  </p>
                  {ITEMS.map(item => (
                    <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 8, marginBottom: 8, borderBottom: "1px solid #f9fafb" }}>
                      <span style={{ fontSize: 13, color: "#374151" }}>{item.qty}× {item.name}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>${(item.qty * item.unitPrice).toFixed(2)}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>Total</span>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>${TOTAL.toFixed(2)}</span>
                  </div>
                </div>

                {/* Actions / status */}
                <div style={{ padding: "16px 20px" }}>
                  {isNewOrder ? (
                    <div style={{ display: "flex", gap: 12 }}>
                      <button
                        onClick={onAccept}
                        style={{ flex: 1, background: "#06C167", border: "none", borderRadius: 10, padding: "14px 0", color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: "0.04em" }}
                      >
                        Accept
                      </button>
                      <button
                        style={{ flex: 1, background: "transparent", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "14px 0", color: "#6b7280", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#06C167", flexShrink: 0 }} />
                      <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
                        Notified kitchen — estimated prep time 15 min
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}

            {isComplete && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 40 }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#06C167", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Checkmark size={22} color="white" />
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 18, fontWeight: 700, color: "#111", margin: 0 }}>Order complete ✓</p>
                  <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 6 }}>Order #{ORDER_ID} delivered</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Receipt Printer
// ─────────────────────────────────────────────────────────────────────────────
const ReceiptPrinter = ({ stage }: { stage: Stage }) => {
  const printing = stage >= 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <p style={{ color: "#6b7280", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>
        Receipt Printer
      </p>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Paper growing from slot */}
        <div style={{
          width: 164, overflow: "hidden",
          maxHeight: printing ? 240 : 0,
          transition: "max-height 2.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}>
          {/* Receipt content */}
          <div style={{ background: "white", padding: "10px 12px 0", fontFamily: "'Courier New', Courier, monospace" }}>
            <p style={{ fontSize: 10, fontWeight: 700, textAlign: "center", letterSpacing: "0.15em", margin: "0 0 2px" }}>UBER EATS</p>
            <p style={{ fontSize: 8, color: "#9ca3af", textAlign: "center", margin: "0 0 8px" }}>Order Receipt</p>
            {/* Dashes */}
            <div style={{ borderTop: "1px dashed #d1d5db", marginBottom: 6 }} />
            {ITEMS.map(item => (
              <div key={item.name} style={{ display: "flex", justifyContent: "space-between", fontSize: 8, color: "#374151", marginBottom: 4 }}>
                <span>{item.qty}x {item.name.length > 14 ? item.name.slice(0, 13) + "…" : item.name}</span>
                <span>${(item.qty * item.unitPrice).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px dashed #d1d5db", margin: "6px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, fontWeight: 700, marginBottom: 6 }}>
              <span>TOTAL</span>
              <span>${TOTAL.toFixed(2)}</span>
            </div>
            <p style={{ fontSize: 7, textAlign: "center", color: "#9ca3af", margin: "0 0 4px" }}>Order #{ORDER_ID}</p>
            <div style={{ borderTop: "1px dashed #d1d5db", marginBottom: 0 }} />
          </div>
          {/* Torn / jagged bottom edge */}
          <svg width="164" height="10" viewBox="0 0 164 10" preserveAspectRatio="none" style={{ display: "block" }}>
            <path
              d="M0,0 L164,0 L164,10 L156,2 L148,10 L140,2 L132,10 L124,2 L116,10 L108,2 L100,10 L92,2 L84,10 L76,2 L68,10 L60,2 L52,10 L44,2 L36,10 L28,2 L20,10 L12,2 L4,10 L0,4 Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Printer body */}
        <div style={{
          width: 200, height: 120,
          background: "linear-gradient(160deg, #2a2a2a 0%, #1a1a1a 100%)",
          borderRadius: 10,
          boxShadow: "0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 16,
        }}>
          {/* Paper slot — narrow horizontal slit across the top */}
          <div style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 164,
            height: 6,
            background: "#0a0a0a",
            borderRadius: "0 0 3px 3px",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.8)",
          }} />

          {/* Front panel detail line */}
          <div style={{ width: 170, height: 1, background: "rgba(255,255,255,0.05)", marginTop: 8, marginBottom: 16 }} />

          {/* LEDs + label row */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 7, height: 7, borderRadius: "50%",
              background: printing ? "#06C167" : "#1f3d2a",
              boxShadow: printing ? "0 0 6px 2px rgba(6,193,103,0.5)" : "none",
              transition: "all 0.6s ease",
            }} />
            <div style={{
              width: 7, height: 7, borderRadius: "50%",
              background: printing ? "#06C167" : "#1f3d2a",
              boxShadow: printing ? "0 0 6px 2px rgba(6,193,103,0.4)" : "none",
              transition: "all 0.6s ease 0.15s",
            }} />
            <span style={{
              fontSize: 8, fontWeight: 700, letterSpacing: "0.22em",
              color: "#444", marginLeft: 6, textTransform: "uppercase",
            }}>
              PRINT
            </span>
          </div>

          {/* Bottom vent lines */}
          <div style={{ position: "absolute", bottom: 12, display: "flex", gap: 3 }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{ width: 12, height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 1 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main Demo
// ─────────────────────────────────────────────────────────────────────────────
const OrderDemo = () => {
  const [stage, setStage] = useState<Stage>(-1);

  const advance = () => setStage(s => (s < 3 ? (s + 1) as Stage : s));
  const reset   = () => setStage(-1);

  const buttonLabel =
    stage === -1 ? "Start Demo"
    : stage === 0 ? "Merchant accepts order →"
    : stage === 1 ? "Driver picks up order →"
    : stage === 2 ? "Deliver order →"
    : null;

  return (
    <div style={{
      minHeight: "100vh", background: "#1a1a1a",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "48px 32px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
    }}>
      {/* Title */}
      <div style={{ marginBottom: 36, textAlign: "center" }}>
        <p style={{ color: "#06C167", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 8px" }}>
          Interactive Demo
        </p>
        <h1 style={{ color: "white", fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
          Full order lifecycle — one view
        </h1>
      </div>

      {/* Stage pills */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 44 }}>
        {STAGE_LABELS.map((label, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              padding: "6px 18px", borderRadius: 20,
              background: i <= stage ? "#06C167" : "rgba(255,255,255,0.07)",
              color: i <= stage ? "white" : "#555",
              fontSize: 12, fontWeight: 600,
              transition: "all 0.35s ease",
              border: i === stage ? "1px solid #06C167" : "1px solid transparent",
            }}>
              {i <= stage && i < stage && <span style={{ marginRight: 5 }}>✓</span>}
              {label}
            </div>
            {i < STAGE_LABELS.length - 1 && (
              <div style={{ width: 20, height: 1, background: i < stage ? "#06C167" : "#333", transition: "background 0.35s ease" }} />
            )}
          </div>
        ))}
      </div>

      {/* Devices */}
      <div style={{ display: "flex", gap: 48, alignItems: "flex-end" }}>
        <CustomerPhone stage={stage} />
        <MerchantTablet stage={stage} onAccept={advance} />
        <ReceiptPrinter stage={stage} />
      </div>

      {/* Control */}
      <div style={{ marginTop: 48 }}>
        {stage === 3 ? (
          <button
            onClick={reset}
            style={{
              padding: "14px 36px", borderRadius: 12, border: "1.5px solid #333",
              background: "transparent", color: "#9ca3af", fontSize: 14, fontWeight: 600,
              cursor: "pointer", letterSpacing: "0.03em", transition: "all 0.2s ease",
            }}
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.borderColor = "#555"; (e.target as HTMLButtonElement).style.color = "white"; }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.borderColor = "#333"; (e.target as HTMLButtonElement).style.color = "#9ca3af"; }}
          >
            ↺ Reset Demo
          </button>
        ) : (
          <button
            onClick={advance}
            style={{
              padding: "14px 36px", borderRadius: 12, border: "none",
              background: "#06C167", color: "white", fontSize: 14, fontWeight: 700,
              cursor: "pointer", letterSpacing: "0.03em",
              boxShadow: "0 4px 20px rgba(6,193,103,0.35)",
              transition: "opacity 0.2s ease, transform 0.1s ease",
            }}
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.opacity = "0.9"; }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.opacity = "1"; }}
          >
            {buttonLabel}
          </button>
        )}
      </div>

      {/* Back link */}
      <a
        href="/uber-eats-merchant-page/"
        style={{ marginTop: 32, color: "#555", fontSize: 12, textDecoration: "none", letterSpacing: "0.05em" }}
        onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = "#888"; }}
        onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = "#555"; }}
      >
        ← Back to home
      </a>
    </div>
  );
};

export default OrderDemo;
