import { useState, useEffect, useRef } from "react";
import { BIKE_SIZES, MANUFACTURED_SIZES, getSizeAvailability, getDealersForSelection } from "./mockDealers.js";

const IMG_XR97_OLD = "/images/xr97-old.png";
const IMG_XR97_NEW = "/images/xr97-new.png";
const IMG_BIKE_A = "/images/bike-a.png";
const IMG_BIKE_B = "/images/bike-b.png";

const T = {
  black: "#000000", darkGrey: "#5a5a5a", midGrey: "#979797", lightGrey: "#d8d8d8",
  bgGrey: "#f9f9f9", white: "#ffffff", sale: "#e10000", green: "#2E7D32", lightYellow: "#fff6d1",
  fontH: "'DM Sans', sans-serif", fontB: "'DM Sans', sans-serif", fontM: "'Space Mono', monospace",
};

const BIKES = [
  { id: "xr-9-7-gf", family: "XR 9.7 GF", category: "Gran Fondo", variants: [
    { id: "xr-9-7-gf-26", name: "XR 9.7 GF", subtitle: "DT Swiss Carbon Wheels, Shimano Ultegra Di2", price: 144990, salePrice: null, colors: ["#111"], img: IMG_XR97_NEW, weight:"7.95 kg", frame:"SU-51-01, Carbon XR Race High Modulus", groupset:"Shimano Ultegra Di2 R8170", wheels:"DT Swiss ERC 1600 SPLINE, Carbon", brakes:"Shimano Ultegra R8170, Hydraulic Disc", cockpit:"ONE Race ICR Alloy Stem + ONE Alloy X-Race Aero Handlebar", headset:"ACROS AIX-318R1", tires:"Schwalbe Pro One Evo, 30-622", saddle:"Fizi:k Vento Argo R5", cassette:"Shimano Ultegra CS-R8101, 11-34", sizes:["XS","S","M","L","XL","XXL"] },
    { id: "xr-9-7-gf-25", name: "XR 9.7 GF", subtitle: "DT Swiss Alloy Wheels, Shimano Ultegra Di2", price: 129990, salePrice: 99990, colors: ["#4a1520"], img: IMG_XR97_OLD, weight:"7.95 kg", frame:"SU-51-01, Carbon XR Race High Modulus", groupset:"Shimano Ultegra Di2 R8170", wheels:"DT Swiss ER 1600 SPLINE, Alloy", brakes:"Shimano Ultegra R8170, Hydraulic Disc", cockpit:"ONE Carbon Integrated Cockpit ICR", headset:"ACROS AIX-525R3S", tires:"Schwalbe Pro One Evo, 30-622", saddle:"Fizi:k Vento Argo R5", cassette:"Shimano Ultegra CS-R8101, 11-34", sizes:["S","M","L","XL"] },
  ]},
  { id: "xr-9-8-gf", family: "XR 9.8 GF", category: "Gran Fondo", variants: [
    { id: "xr-9-8-gf-26", name: "XR 9.8 GF", subtitle: "DT Swiss Aero Wheels, Shimano Ultegra Di2", price: 169990, salePrice: 149990, colors: ["#1a1a2e","#cc0000","#d4d4d4"], img: IMG_BIKE_A, weight:"7.4 kg", frame:"Carbon XR Race High Modulus", groupset:"Shimano Ultegra Di2 R8170", wheels:"DT Swiss ARC 1600 SPLINE, Carbon", brakes:"Shimano Ultegra R8170, Hydraulic Disc", cockpit:"ONE Carbon Integrated Cockpit ICR", tires:"Schwalbe Pro One Evo, 30-622", saddle:"Fizi:k Vento Argo R5", sizes:["XS","S","M","L","XL"] },
    { id: "xr-9-8-gf-25", name: "XR 9.8 GF", subtitle: "DT Swiss Alloy Wheels, Shimano Ultegra Di2", price: 139990, salePrice: null, colors: ["#cc0000"], img: IMG_XR97_OLD, weight:"7.5 kg", frame:"Carbon XR Race High Modulus", groupset:"Shimano Ultegra Di2 R8170", wheels:"DT Swiss ER 1600 SPLINE, Alloy", brakes:"Shimano Ultegra R8170, Hydraulic Disc", cockpit:"ONE Carbon Integrated Cockpit ICR", tires:"Schwalbe Pro One Evo, 30-622", saddle:"Fizi:k Vento Argo R5", sizes:["S","M","L","XL"] },
  ]},
  { id: "xr-9-9-gr", family: "XR 9.9 GR", category: "Gravel", variants: [
    { id: "xr-9-9-gr-26", name: "XR 9.9 GR", subtitle: "SRAM Red AXS XPLR, Carbon Wheels", price: 194990, salePrice: 174990, colors: ["#1a1a2e","#cc0000","#d4d4d4"], img: IMG_BIKE_B, weight:"7.9 kg", frame:"Carbon XR Race High Modulus", groupset:"SRAM Red AXS XPLR", wheels:"DT Swiss GRC 1600 SPLINE, Carbon", brakes:"SRAM Red AXS, Hydraulic Disc", cockpit:"ONE Carbon Integrated Cockpit ICR", tires:"Schwalbe G-One R, 40-622", saddle:"Fizi:k Vento Argo R5", sizes:["S","M","L","XL"] },
    { id: "xr-9-9-gr-25", name: "XR 9.9 GR", subtitle: "SRAM Red AXS XPLR, Alloy Wheels", price: 174990, salePrice: 154990, colors: ["#cc0000","#d4d4d4"], img: IMG_BIKE_A, weight:"8.0 kg", frame:"Carbon XR Race High Modulus", groupset:"SRAM Red AXS XPLR", wheels:"DT Swiss GR 1600 SPLINE, Alloy", brakes:"SRAM Red AXS, Hydraulic Disc", cockpit:"ONE Carbon Integrated Cockpit ICR", tires:"Schwalbe G-One R, 40-622", saddle:"Fizi:k Vento Argo R5", sizes:["S","M","L","XL","XXL"] },
  ]},
  { id: "xr-9-9-gr-ltd", family: "XR 9.9 GR LTD", category: "Gravel", variants: [
    { id: "xr-9-9-gr-ltd-25", name: "XR 9.9 GR LTD", subtitle: "SRAM Red AXS XPLR, Carbon Wheels", price: 216990, salePrice: null, colors: ["#cc0000"], img: IMG_BIKE_B, weight:"7.8 kg", frame:"Carbon XR Race High Modulus", groupset:"SRAM Red AXS XPLR", wheels:"DT Swiss GRC 1400 SPLINE, Carbon", brakes:"SRAM Red AXS, Hydraulic Disc", cockpit:"ONE Carbon Integrated Cockpit ICR", tires:"Schwalbe G-One R, 40-622", saddle:"Fizi:k Vento Argo R5", sizes:["S","M","L","XL"] },
    { id: "xr-9-9-gr-ltd-24", name: "XR 9.9 GR LTD", subtitle: "SRAM Force AXS XPLR, Carbon Wheels", price: 184990, salePrice: 169990, colors: ["#1a1a2e","#cc0000"], img: IMG_BIKE_A, weight:"8.0 kg", frame:"Carbon XR Race High Modulus", groupset:"SRAM Force AXS XPLR", wheels:"DT Swiss GRC 1600 SPLINE, Carbon", brakes:"SRAM Force AXS, Hydraulic Disc", cockpit:"ONE Carbon Integrated Cockpit ICR", tires:"Schwalbe G-One R, 40-622", saddle:"Fizi:k Vento Argo R5", sizes:["S","M","L","XL","XXL"] },
    { id: "xr-9-9-gr-ltd-23", name: "XR 9.9 GR LTD", subtitle: "Shimano Ultegra Di2, Alloy Wheels", price: 154990, salePrice: null, colors: ["#d4d4d4"], img: IMG_XR97_NEW, weight:"8.3 kg", frame:"Carbon XR Race High Modulus", groupset:"Shimano Ultegra Di2 R8170", wheels:"DT Swiss GR 1600 SPLINE, Alloy", brakes:"Shimano Ultegra R8170, Hydraulic Disc", cockpit:"ONE Carbon Integrated Cockpit ICR", tires:"Schwalbe G-One R, 40-622", saddle:"Fizi:k Vento Argo R5", sizes:["XS","S","M","L","XL"] },
  ]},
  { id: "rr-9-8", family: "RR 9.8", category: "Road", variants: [
    { id: "rr-9-8-25", name: "RR 9.8", subtitle: "Shimano Ultegra Di2, DT Swiss Aero Wheels", price: 139990, salePrice: 119990, colors: ["#1a1a2e","#cc0000","#d4d4d4"], img: IMG_BIKE_A, weight:"7.6 kg", frame:"Carbon RR Race High Modulus", groupset:"Shimano Ultegra Di2 R8170", wheels:"DT Swiss ARC 1600 SPLINE, Carbon", brakes:"Shimano Ultegra R8170, Hydraulic Disc", cockpit:"ONE Carbon Integrated Cockpit ICR", tires:"Schwalbe Pro One Evo, 28-622", saddle:"Fizi:k Vento Argo R5", sizes:["XS","S","M","L","XL","XXL"] }
  ]},
  { id: "xr-9-8-gr", family: "XR 9.8 GR", category: "Gravel", variants: [
    { id: "xr-9-8-gr-25", name: "XR 9.8 GR", subtitle: "SRAM Force 12 speed", price: 159990, salePrice: null, colors: ["#1a1a2e","#cc0000","#d4d4d4"], img: IMG_BIKE_B, weight:"8.1 kg", frame:"Carbon XR Race High Modulus", groupset:"SRAM Force AXS XPLR", wheels:"DT Swiss GRC 1600 SPLINE", brakes:"SRAM Force AXS, Hydraulic Disc", cockpit:"ONE Carbon Integrated Cockpit ICR", tires:"Schwalbe G-One R, 40-622", saddle:"Fizi:k Vento Argo R5", sizes:["S","M","L","XL"] }
  ]},
];

const PRICE_MIN = Math.min(...BIKES.flatMap(b => b.variants.map(v => v.salePrice !== null ? v.salePrice : v.price)));
const PRICE_MAX = Math.max(...BIKES.flatMap(b => b.variants.map(v => v.salePrice !== null ? v.salePrice : v.price)));

const SPEC_KEYS = [
  {key:"weight",label:"Weight"},{key:"frame",label:"Frame"},{key:"groupset",label:"Groupset"},
  {key:"wheels",label:"Wheels"},{key:"brakes",label:"Brakes"},{key:"cockpit",label:"Cockpit"},
  {key:"headset",label:"Headset"},{key:"tires",label:"Tires"},{key:"cassette",label:"Cassette"},
  {key:"saddle",label:"Saddle"},{key:"sizes",label:"Sizes"},
];

const fmt = (p) => p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const effectivePrice = (v) => v.salePrice !== null ? v.salePrice : v.price;
const familyHasSale = (bike) => bike.variants.some(v => v.salePrice !== null);
const salePct = (orig, sale) => Math.round((1 - sale / orig) * 100);

const COLOR_MAP = {
  "#000": "Black", "#111": "Black", "#1a1a2e": "Black",
  "#cc0000": "Red", "#d4d4d4": "White", "#4a1520": "Brown",
};
const COLOR_ID_MAP = {
  "#cc0000": "red", "#1a1a2e": "black", "#d4d4d4": "grey",
  "#111": "black", "#4a1520": "brown",
};
const getMaterial = (frame) => {
  if (!frame) return "Other";
  const f = frame.toLowerCase();
  if (f.includes("carbon")) return "Carbon";
  if (f.includes("alloy") || f.includes("aluminum")) return "Alloy";
  return "Other";
};
const FILTER_SIZES = ["XS","S","M","L","XL","XXL"];
const FILTER_COLORS_LIST = [
  { name: "Black", hex: "#1a1a2e" },
  { name: "Red", hex: "#cc0000" },
  { name: "White", hex: "#d4d4d4" },
  { name: "Brown", hex: "#4a1520" },
];
const FILTER_MATERIALS = ["Carbon","Alloy"];
const FRAME_SHAPES = [...new Set(BIKES.map(b => b.category))];
const EMPTY_FILTERS = { price: { min: null, max: null }, sizes: [], materials: [], colors: [], frameShape: null, sort: "recommended" };

function ColorDot({ color, size = 14 }) {
  const light = color==="#d4d4d4"||color==="#ffffff";
  return <span style={{display:"inline-block",width:size,height:size,borderRadius:"50%",background:color,border:light?"1px solid "+T.lightGrey:"1px solid transparent",flexShrink:0}} />;
}

function Badge({ label, variant = "dark" }) {
  return <span style={{ background: variant === "sale" ? T.sale : T.black, color: T.white, fontFamily: T.fontM, fontSize: 11, fontWeight: 400, padding: "4px 10px", borderRadius: 4, letterSpacing: "0.04em", textTransform: "uppercase", lineHeight: 1, display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}>{label}</span>;
}

function CompareButton({ isCompared, onClick, visible }) {
  return <button onClick={onClick} style={{ position: "absolute", top: 12, right: 12, background: isCompared ? T.black : T.white, color: isCompared ? T.white : T.black, border: "1px solid "+T.lightGrey, borderRadius: 6, padding: "7px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, opacity: visible ? 1 : 0, transition: "opacity 0.2s,background 0.15s,color 0.15s", fontFamily: T.fontB, lineHeight: 1 }}>
    <span style={{ fontSize: 15, lineHeight: 1 }}>{isCompared ? "\u2715" : "+"}</span>Compare
  </button>;
}

function GridPrice({ variants }) {
  const multi = variants.length > 1;
  const mono = { fontFamily: T.fontM, fontSize: 16, fontWeight: 400, lineHeight: 1, textTransform: "uppercase" };
  if (multi) {
    const prices = variants.map(v => effectivePrice(v)).sort((a, b) => a - b);
    return <div style={{ ...mono, color: T.black }}>{fmt(prices[0])} {"\u2013"} {fmt(prices[prices.length - 1])} czk</div>;
  }
  const v = variants[0];
  if (v.salePrice !== null) {
    return <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
      <span style={{ ...mono, textDecoration: "line-through", color: T.midGrey }}>{fmt(v.price)} czk</span>
      <span style={{ ...mono, color: T.sale, fontWeight: 700 }}>{fmt(v.salePrice)} czk</span>
    </div>;
  }
  return <div style={{ ...mono, color: T.black }}>{fmt(v.price)} czk</div>;
}

// ─── Accordion Section ───────────────────────────────────────────────────────

function ClearLink({ onClear }) {
  const [hov, setHov] = useState(false);
  return (
    <span onClick={e => { e.stopPropagation(); onClear(); }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ fontFamily: T.fontB, fontSize: 13, fontWeight: 570, color: hov ? T.black : T.midGrey, cursor: "pointer", flexShrink: 0 }}>
      Clear
    </span>
  );
}

function AccordionSection({ title, expanded, onToggle, summary, onClear, children }) {
  return (
    <div style={{ borderBottom: "1px solid "+T.lightGrey }}>
      {/* Entire header area is one click target for expand/collapse */}
      <div onClick={onToggle} style={{ paddingTop: 20, paddingBottom: 20, cursor: "pointer" }}>
        {/* Title row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: (!expanded && summary) ? 8 : 0 }}>
          <div style={{ fontFamily: T.fontB, fontSize: 16, fontWeight: 570, color: T.black, lineHeight: 1.3 }}>{title}</div>
          <button onClick={e => e.stopPropagation()}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: T.black, padding: "0 0 0 16px", lineHeight: 1, flexShrink: 0, pointerEvents: "none" }}>
            {expanded ? "\u2212" : "+"}
          </button>
        </div>
        {/* Collapsed + has selection: summary left, Clear right */}
        {!expanded && summary && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: T.fontB, fontSize: 13, fontWeight: 400, color: T.midGrey, marginRight: 16 }}>{summary}</div>
            <ClearLink onClear={onClear} />
          </div>
        )}
      </div>
      {/* Expanded: content, then Clear below if selection active */}
      {expanded && (
        <div style={{ paddingBottom: 24 }}>
          {children}
          {summary && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
              <ClearLink onClear={onClear} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Filter Drawer ────────────────────────────────────────────────────────────

function FilterDrawer({ open, onClose, pendingFilters, onChange, liveCount, onApply, onClearPending }) {
  const [expanded, setExpanded] = useState([]);
  const toggle = (key) => setExpanded(p => p.includes(key) ? p.filter(x => x !== key) : [...p, key]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const priceMin = pendingFilters.price.min ?? PRICE_MIN;
  const priceMax = pendingFilters.price.max ?? PRICE_MAX;
  const pctMin = ((priceMin - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const pctMax = ((priceMax - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  const setPrice = (min, max) => onChange({ ...pendingFilters, price: { min: min === PRICE_MIN ? null : min, max: max === PRICE_MAX ? null : max } });
  const toggleMulti = (key, val) => {
    const arr = pendingFilters[key];
    onChange({ ...pendingFilters, [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] });
  };

  const summary = {
    sort: pendingFilters.sort !== "recommended" ? ({ "price-desc": "Price (High to Low)", "price-asc": "Price (Low to High)" })[pendingFilters.sort] : null,
    price: (pendingFilters.price.min !== null || pendingFilters.price.max !== null) ? `${fmt(priceMin)} \u2013 ${fmt(priceMax)} CZK` : null,
    sizes: pendingFilters.sizes.length > 0 ? pendingFilters.sizes.join(", ") : null,
    materials: pendingFilters.materials.length > 0 ? pendingFilters.materials.join(", ") : null,
    colors: pendingFilters.colors.length > 0 ? pendingFilters.colors.join(", ") : null,
    frameShape: pendingFilters.frameShape || null,
  };

  const clearSection = (key) => {
    if (key === "sort") onChange({ ...pendingFilters, sort: "recommended" });
    else if (key === "price") onChange({ ...pendingFilters, price: { min: null, max: null } });
    else if (key === "frameShape") onChange({ ...pendingFilters, frameShape: null });
    else onChange({ ...pendingFilters, [key]: [] });
  };

  const hasAnyPending = Object.values(summary).some(Boolean);
  const SORT_OPTS = [["recommended","Recommended"],["price-desc","Price (High to Low)"],["price-asc","Price (Low to High)"]];

  return (
    <>
      <style>{`.pr-range{-webkit-appearance:none;position:absolute;width:100%;background:transparent;pointer-events:none;margin:0;height:20px;top:0;outline:none}.pr-range::-webkit-slider-thumb{-webkit-appearance:none;pointer-events:all;width:16px;height:16px;background:#000;border-radius:50%;cursor:pointer;margin-top:-7px}.pr-range::-webkit-slider-runnable-track{height:2px;background:transparent}.pr-range::-moz-range-thumb{pointer-events:all;width:16px;height:16px;background:#000;border-radius:50%;cursor:pointer;border:none}.pr-range::-moz-range-track{height:2px;background:transparent}`}</style>
      {/* Overlay */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, top: 56, zIndex: 299, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)", pointerEvents: open ? "all" : "none", opacity: open ? 1 : 0, transition: "opacity 0.2s" }} />
      {/* Drawer */}
      <div style={{ position: "fixed", left: 0, top: 56, bottom: 0, width: 380, zIndex: 300, background: T.white, transform: open ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.25s ease-out", display: "flex", flexDirection: "column", boxShadow: "4px 0 32px rgba(0,0,0,0.12)" }}>
        {/* Sticky header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid "+T.lightGrey, flexShrink: 0 }}>
          <span style={{ fontFamily: T.fontB, fontSize: 20, fontWeight: 570, color: T.black }}>Filter & Sort</span>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontFamily: T.fontB, fontSize: 13, fontWeight: 570, color: T.midGrey }}>Showing {liveCount} bikes</span>
            <button onClick={onClose}
              style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid "+T.lightGrey, background: T.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: T.darkGrey, transition: "border-color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = T.black}
              onMouseLeave={e => e.currentTarget.style.borderColor = T.lightGrey}>{"\u2715"}</button>
          </div>
        </div>

        {/* Scrollable sections */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 24px" }}>
          {/* Sort */}
          <AccordionSection title="Sort" expanded={expanded.includes("sort")} onToggle={() => toggle("sort")} summary={summary.sort} onClear={() => clearSection("sort")}>
            {SORT_OPTS.map(([val, label]) => {
              const sel = pendingFilters.sort === val;
              return (
                <div key={val} onClick={() => onChange({ ...pendingFilters, sort: val })} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", cursor: "pointer" }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", border: sel ? "5px solid "+T.black : "1.5px solid "+T.lightGrey, flexShrink: 0, transition: "border 0.1s" }} />
                  <span style={{ fontFamily: T.fontB, fontSize: 14, fontWeight: 570, color: T.black }}>{label}</span>
                </div>
              );
            })}
          </AccordionSection>

          {/* Price */}
          <AccordionSection title="Price" expanded={expanded.includes("price")} onToggle={() => toggle("price")} summary={summary.price} onClear={() => clearSection("price")}>
            <div style={{ position: "relative", height: 20, marginBottom: 20 }}>
              <div style={{ position: "absolute", top: 9, left: 0, right: 0, height: 2, background: T.lightGrey, borderRadius: 1 }} />
              <div style={{ position: "absolute", top: 9, left: pctMin+"%", right: (100-pctMax)+"%", height: 2, background: T.black, borderRadius: 1 }} />
              <input className="pr-range" type="range" min={PRICE_MIN} max={PRICE_MAX} step={1000} value={priceMin}
                onChange={e => setPrice(Math.max(PRICE_MIN, Math.min(Number(e.target.value), priceMax - 5000)), priceMax)}
                style={{ zIndex: priceMin > PRICE_MIN + (PRICE_MAX - PRICE_MIN) * 0.5 ? 5 : 3 }} />
              <input className="pr-range" type="range" min={PRICE_MIN} max={PRICE_MAX} step={1000} value={priceMax}
                onChange={e => setPrice(priceMin, Math.min(PRICE_MAX, Math.max(Number(e.target.value), priceMin + 5000)))}
                style={{ zIndex: priceMin > PRICE_MIN + (PRICE_MAX - PRICE_MIN) * 0.5 ? 3 : 5 }} />
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1, border: "1px solid "+T.lightGrey, borderRadius: 6, padding: "10px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                <input type="number" value={priceMin} onChange={e => { const v = Number(e.target.value); if (!isNaN(v)) setPrice(Math.max(PRICE_MIN, Math.min(v, priceMax - 5000)), priceMax); }}
                  style={{ flex: 1, border: "none", outline: "none", fontFamily: T.fontB, fontSize: 14, color: T.black, background: "transparent", minWidth: 0 }} />
                <span style={{ fontFamily: T.fontB, fontSize: 14, color: T.midGrey, flexShrink: 0 }}>CZK</span>
              </div>
              <div style={{ flex: 1, border: "1px solid "+T.lightGrey, borderRadius: 6, padding: "10px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                <input type="number" value={priceMax} onChange={e => { const v = Number(e.target.value); if (!isNaN(v)) setPrice(priceMin, Math.min(PRICE_MAX, Math.max(v, priceMin + 5000))); }}
                  style={{ flex: 1, border: "none", outline: "none", fontFamily: T.fontB, fontSize: 14, color: T.black, background: "transparent", minWidth: 0 }} />
                <span style={{ fontFamily: T.fontB, fontSize: 14, color: T.midGrey, flexShrink: 0 }}>CZK</span>
              </div>
            </div>
          </AccordionSection>

          {/* Sizes */}
          <AccordionSection title="Sizes" expanded={expanded.includes("sizes")} onToggle={() => toggle("sizes")} summary={summary.sizes} onClear={() => clearSection("sizes")}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {FILTER_SIZES.map(s => {
                const sel = pendingFilters.sizes.includes(s);
                return <span key={s} onClick={() => toggleMulti("sizes", s)} style={{ padding: "8px 16px", border: "1px solid "+(sel ? T.black : T.lightGrey), borderRadius: 100, fontFamily: T.fontB, fontSize: 13, fontWeight: 570, color: sel ? T.white : T.black, background: sel ? T.black : T.white, cursor: "pointer", transition: "all 0.1s" }}>{s}</span>;
              })}
            </div>
          </AccordionSection>

          {/* Material */}
          <AccordionSection title="Material" expanded={expanded.includes("materials")} onToggle={() => toggle("materials")} summary={summary.materials} onClear={() => clearSection("materials")}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {FILTER_MATERIALS.map(m => {
                const sel = pendingFilters.materials.includes(m);
                return <span key={m} onClick={() => toggleMulti("materials", m)} style={{ padding: "8px 16px", border: "1px solid "+(sel ? T.black : T.lightGrey), borderRadius: 100, fontFamily: T.fontB, fontSize: 13, fontWeight: 570, color: sel ? T.white : T.black, background: sel ? T.black : T.white, cursor: "pointer", transition: "all 0.1s" }}>{m}</span>;
              })}
            </div>
          </AccordionSection>

          {/* Colours */}
          <AccordionSection title="Colours" expanded={expanded.includes("colors")} onToggle={() => toggle("colors")} summary={summary.colors} onClear={() => clearSection("colors")}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {FILTER_COLORS_LIST.map(({ name, hex }) => {
                const sel = pendingFilters.colors.includes(name);
                const isLight = hex === "#d4d4d4" || hex === "#ffffff";
                return (
                  <div key={name} onClick={() => toggleMulti("colors", name)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", border: "1px solid "+(sel ? T.black : T.lightGrey), borderRadius: 100, cursor: "pointer", transition: "border-color 0.1s" }}>
                    <span style={{ width: 20, height: 20, borderRadius: "50%", background: hex, flexShrink: 0, border: isLight ? "1px solid "+T.lightGrey : "none" }} />
                    <span style={{ fontFamily: T.fontB, fontSize: 13, fontWeight: 570, color: T.black }}>{name}</span>
                  </div>
                );
              })}
            </div>
          </AccordionSection>

          {/* Frame shape */}
          <AccordionSection title="Frame shape" expanded={expanded.includes("frameShape")} onToggle={() => toggle("frameShape")} summary={summary.frameShape} onClear={() => clearSection("frameShape")}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {FRAME_SHAPES.map(shape => {
                const sel = pendingFilters.frameShape === shape;
                return <span key={shape} onClick={() => onChange({ ...pendingFilters, frameShape: sel ? null : shape })} style={{ padding: "8px 16px", border: "1px solid "+(sel ? T.black : T.lightGrey), borderRadius: 100, fontFamily: T.fontB, fontSize: 13, fontWeight: 570, color: sel ? T.white : T.black, background: sel ? T.black : T.white, cursor: "pointer", transition: "all 0.1s" }}>{shape}</span>;
              })}
            </div>
          </AccordionSection>

          <div style={{ height: 16 }} />
        </div>

        {/* Sticky footer */}
        <div style={{ padding: "16px 24px 24px", borderTop: "1px solid "+T.lightGrey, flexShrink: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          {hasAnyPending && (
            <button onClick={onClearPending}
              style={{ width: "100%", padding: "14px 0", background: T.white, color: T.black, border: "1px solid "+T.black, borderRadius: 100, fontFamily: T.fontB, fontSize: 14, fontWeight: 570, cursor: "pointer" }}>
              Clear Filters
            </button>
          )}
          <button onClick={onApply}
            style={{ width: "100%", padding: "14px 0", background: T.black, color: T.white, border: "none", borderRadius: 100, fontFamily: T.fontB, fontSize: 14, fontWeight: 570, cursor: "pointer", transition: "opacity 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            Show {liveCount} bikes
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Product Card ───────────────────────────────────────────────────────────

function ProductCard({ bike, displayVariants, onSelect, onCompare, isCompared }) {
  const [h, setH] = useState(false);
  const variants = displayVariants || bike.variants;
  const v = variants[0];
  const multi = variants.length > 1;
  const hasSale = variants.some(v => v.salePrice !== null);

  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={() => onSelect(bike)}
      style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 24, cursor: "pointer" }}>
      <div style={{ position: "relative", width: "100%", borderRadius: 8, overflow: "hidden", background: T.bgGrey, aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={v.img} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
          {multi && <Badge label={variants.length+" variants"} />}
          {!multi && hasSale && <Badge label={"-"+salePct(v.price, v.salePrice)+"%"} variant="sale" />}
          {multi && hasSale && <Badge label="sale" variant="sale" />}
        </div>
        <CompareButton isCompared={isCompared} visible={h || isCompared} onClick={(e) => { e.stopPropagation(); onCompare(v.id); }} />
      </div>
      <div style={{ display: "flex", paddingRight: 16, flexDirection: "column", alignItems: "flex-start", gap: 20, alignSelf: "stretch" }}>
        <div style={{ display: "flex", gap: 6 }}>{v.colors.map((c, i) => <ColorDot key={i} color={c} />)}</div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12, alignSelf: "stretch" }}>
          <div style={{ color: T.black, fontFamily: T.fontH, fontSize: 18, fontWeight: 570, lineHeight: 1 }}>{bike.family}</div>
          <div style={{ color: T.darkGrey, fontFamily: T.fontB, fontSize: 14, fontWeight: 570, lineHeight: 1.5 }}>{v.subtitle}</div>
          <GridPrice variants={variants} />
        </div>
      </div>
    </div>
  );
}

// ─── Modal Variant Column ───────────────────────────────────────────────────

function ModalVariantColumn({ v, vi, total, onCompare, isCompared, onSelectVariant, diffKeys, sameKeys, getVal, passes }) {
  const [h, setH] = useState(false);
  const onSale = v.salePrice !== null;
  const pct = onSale ? salePct(v.price, v.salePrice) : 0;

  return (
    <div style={{ borderRight: vi < total - 1 ? "1px solid "+T.lightGrey : "none", padding: vi === 0 ? "0 20px 0 0" : vi === total - 1 ? "0 0 0 20px" : "0 20px" }}>
      {/* Image */}
      <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{ background: T.bgGrey, borderRadius: 10, overflow: "hidden", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, position: "relative" }}>
        <img src={v.img} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
        {onSale && <div style={{ position: "absolute", top: 10, left: 10 }}><Badge label={"-"+pct+"%"} variant="sale" /></div>}
        <CompareButton isCompared={isCompared} visible={h || isCompared} onClick={(e) => { e.stopPropagation(); onCompare(v.id); }} />
      </div>
      {/* Colors */}
      <div style={{ display: "flex", gap: 5, marginBottom: 12 }}>{v.colors.map((c, i) => <ColorDot key={i} color={c} />)}</div>
      {/* Info */}
      <div style={{ fontFamily: T.fontH, fontSize: 16, fontWeight: 570, lineHeight: 1.2, color: T.black, marginBottom: 4 }}>{v.name}</div>
      <div style={{ color: T.darkGrey, fontFamily: T.fontB, fontSize: 13, fontWeight: 570, lineHeight: 1.5, marginBottom: 12 }}>{v.subtitle}</div>
      {/* Price */}
      {onSale ? (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: T.fontM, fontSize: 14, fontWeight: 400, lineHeight: 1, textDecoration: "line-through", color: T.midGrey, textTransform: "uppercase" }}>{fmt(v.price)} czk</div>
          <div style={{ fontFamily: T.fontM, fontSize: 18, fontWeight: 700, lineHeight: 1, color: T.sale, textTransform: "uppercase", marginTop: 4 }}>{fmt(v.salePrice)} czk</div>
          {passes === false && <div style={{ fontFamily: T.fontB, fontSize: 12, fontWeight: 400, color: T.midGrey, lineHeight: 1.4, marginTop: 6 }}>{"\u25cb"} Outside your price filter</div>}
        </div>
      ) : (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: T.fontM, fontSize: 18, fontWeight: 700, lineHeight: 1, color: T.black, textTransform: "uppercase" }}>{fmt(v.price)} czk</div>
          {passes === false && <div style={{ fontFamily: T.fontB, fontSize: 12, fontWeight: 400, color: T.midGrey, lineHeight: 1.4, marginTop: 6 }}>{"\u25cb"} Outside your price filter</div>}
        </div>
      )}
      {/* CTA */}
      <button onClick={() => onSelectVariant(v)}
        style={{ width: "100%", padding: "12px 14px", background: T.black, color: T.white, border: "none", borderRadius: 100, fontSize: 13, fontWeight: 570, cursor: "pointer", fontFamily: T.fontB, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, transition: "opacity 0.15s" }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"} onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
        <span>View detail</span><span>{"\u2192"}</span>
      </button>
      {/* Key diffs only */}
      {diffKeys.length > 0 && (
        <>
          <div style={{ borderTop: "2px solid "+T.black }} />
          {diffKeys.map(({ key, label }) => {
            const val = getVal(v, key);
            return (
              <div key={key} style={{ padding: "10px 0", borderBottom: "1px solid "+T.lightGrey }}>
                <div style={{ fontFamily: T.fontB, fontSize: 10, fontWeight: 570, color: val ? T.darkGrey : T.midGrey, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 3 }}>{label}</div>
                <div style={{ fontFamily: T.fontB, fontSize: 12, fontWeight: 570, color: val ? T.black : T.midGrey, lineHeight: 1.4 }}>{val || "\u2014"}</div>
              </div>
            );
          })}
        </>
      )}
      {/* Identical specs */}
      {sameKeys.length > 0 && (
        <>
          <div style={{ padding: "14px 0 6px" }}>
            <span style={{ fontFamily: T.fontB, fontSize: 10, fontWeight: 570, color: T.midGrey, textTransform: "uppercase", letterSpacing: "0.04em" }}>Identical specs</span>
          </div>
          {sameKeys.map(({ key, label }) => {
            const val = getVal(v, key);
            if (!val) return null;
            return (
              <div key={key} style={{ padding: "8px 0", borderBottom: "1px solid "+T.bgGrey }}>
                <div style={{ fontFamily: T.fontB, fontSize: 10, fontWeight: 400, color: T.midGrey, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 2 }}>{label}</div>
                <div style={{ fontFamily: T.fontB, fontSize: 12, color: T.darkGrey, lineHeight: 1.4 }}>{val}</div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

// ─── Variant Modal ──────────────────────────────────────────────────────────

function VariantModal({ bike, onClose, onSelectVariant, compared, onCompare, variantPassesFilter }) {
  const overlayRef = useRef(null);
  const vs = bike.variants;
  const getVal = (v, k) => { const val = v[k]; return Array.isArray(val) ? val.join(", ") : val || null; };
  const diffKeys = SPEC_KEYS.filter(({ key }) => {
    const vals = vs.map(v => getVal(v, key) || "\u2014");
    return new Set(vals).size > 1;
  });
  const sameKeys = SPEC_KEYS.filter(({ key }) => {
    const vals = vs.map(v => getVal(v, key) || "\u2014");
    return new Set(vals).size === 1 && vals[0] !== "\u2014";
  });

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleEsc); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div ref={overlayRef} onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "fadeIn 0.2s ease" }}>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{ background: T.white, borderRadius: 16, maxWidth: 920, width: "100%", maxHeight: "90vh", overflow: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.2)", animation: "slideUp 0.25s ease" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "24px 28px 0", position: "sticky", top: 0, background: T.white, zIndex: 2, borderRadius: "16px 16px 0 0", paddingBottom: 20, borderBottom: "1px solid "+T.bgGrey }}>
          <div>
            <h2 style={{ fontFamily: T.fontH, fontSize: 24, fontWeight: 570, lineHeight: 1, color: T.black, marginBottom: 6 }}>Choose your {bike.family}</h2>
            <p style={{ fontFamily: T.fontB, fontSize: 13, fontWeight: 570, lineHeight: 1.5, color: T.darkGrey }}>{vs.length} variants available</p>
          </div>
          <button onClick={onClose}
            style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid "+T.lightGrey, background: T.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: T.darkGrey, flexShrink: 0, transition: "border-color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = T.black}
            onMouseLeave={e => e.currentTarget.style.borderColor = T.lightGrey}>{"\u2715"}</button>
        </div>
        {/* Columns */}
        <div style={{ padding: "24px 28px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat("+vs.length+", 1fr)", gap: 0 }}>
            {vs.map((v, vi) => (
              <ModalVariantColumn key={v.id} v={v} vi={vi} total={vs.length}
                onCompare={onCompare} isCompared={compared.includes(v.id)}
                onSelectVariant={onSelectVariant} diffKeys={diffKeys} sameKeys={sameKeys} getVal={getVal}
                passes={variantPassesFilter ? variantPassesFilter(v) : true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Dealer + Reservation Components ────────────────────────────────────────

function DealerCard({ dealer, colorName, sizeId, onReserve }) {
  return (
    <div style={{ border: "1px solid #E8E8E8", borderRadius: 8, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
        <div style={{ fontFamily: T.fontB, fontSize: 16, fontWeight: 570, color: T.black }}>{dealer.name}</div>
        <button onClick={() => onReserve(dealer)}
          style={{ background: T.black, color: T.white, border: "none", borderRadius: 4, padding: "10px 20px", fontFamily: T.fontB, fontSize: 14, fontWeight: 570, cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap", transition: "opacity 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.8"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
          Reserve {"\u2192"}
        </button>
      </div>
      <div style={{ fontFamily: T.fontB, fontSize: 14, color: T.darkGrey, marginBottom: 3 }}>{"\ud83d\udccd"} {dealer.address}</div>
      <a href={"tel:"+dealer.phone} style={{ fontFamily: T.fontB, fontSize: 14, color: T.darkGrey, textDecoration: "none", display: "block", marginBottom: 10 }}>{"\ud83d\udcde"} {dealer.phone}</a>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: T.green, flexShrink: 0 }} />
        <span style={{ fontFamily: T.fontB, fontSize: 13, color: T.green }}>In stock</span>
        <span style={{ fontFamily: T.fontB, fontSize: 13, color: T.darkGrey }}>{"\u00b7"} {colorName}, Size {sizeId}</span>
      </div>
    </div>
  );
}

function FindDealerLink({ onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <span onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ fontFamily: T.fontB, fontSize: 14, fontWeight: 570, color: T.black, cursor: "pointer", textDecoration: hov ? "underline" : "none" }}>
      Find a dealer {"\u2192"}
    </span>
  );
}

function DealerList({ colorId, colorName, sizeId, onReserve }) {
  const [toast, setToast] = useState(false);
  const { dealers, allConnectedOutOfStock, hasNoDealerData } = getDealersForSelection(colorId, sizeId);

  const handleFindDealer = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <div style={{ marginTop: 16, position: "relative" }}>
      {/* Dealer cards — only connected dealers with confirmed stock */}
      {dealers.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
          {dealers.map(d => <DealerCard key={d.id} dealer={d} colorName={colorName} sizeId={sizeId} onReserve={onReserve} />)}
        </div>
      )}

      {/* Fallback block */}
      {dealers.length > 0 ? (
        // Some dealers have stock — show brief inline note below cards
        <div style={{ fontFamily: T.fontB, fontSize: 14, color: T.darkGrey, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span>This bike may also be available at other authorized dealers.</span>
          <FindDealerLink onClick={handleFindDealer} />
        </div>
      ) : (
        // No dealer cards — show message box
        <div style={{ background: T.bgGrey, padding: 20, borderRadius: 8 }}>
          <p style={{ fontFamily: T.fontB, fontSize: 14, fontWeight: 400, color: T.darkGrey, lineHeight: 1.6, margin: "0 0 12px" }}>
            {hasNoDealerData
              ? "We don\u2019t have live stock data for this combination. It may be available at an authorized dealer."
              : "This combination is not currently in stock at dealers with live availability. It may still be available at other authorized dealers."}
          </p>
          <FindDealerLink onClick={handleFindDealer} />
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)", background: T.black, color: T.white, padding: "12px 24px", borderRadius: 8, fontFamily: T.fontB, fontSize: 14, zIndex: 2000, pointerEvents: "none" }}>
          Dealer finder coming soon
        </div>
      )}
    </div>
  );
}

function ReservationDrawer({ dealer, variant, family, colorName, sizeId, onClose }) {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const onSale = variant.salePrice !== null;
  const price = onSale ? variant.salePrice : variant.price;

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const handleSubmit = () => { setSubmitted(true); setTimeout(() => onClose(), 2000); };

  const inputStyle = { width: "100%", border: "1px solid "+T.lightGrey, borderRadius: 4, padding: 12, fontSize: 14, fontFamily: T.fontB, color: T.black, boxSizing: "border-box", outline: "none" };
  const labelStyle = { fontFamily: T.fontB, fontSize: 12, fontWeight: 500, color: T.darkGrey, textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 };

  return (
    <>
      <style>{`@keyframes slideInRight{from{transform:translateX(100%)}to{transform:translateX(0)}}.res-inp:focus{border-color:#000!important}`}</style>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1099, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)" }} />
      <div style={{ position: "fixed", top: 0, right: 0, width: 480, height: "100vh", background: T.white, zIndex: 1100, overflowY: "auto", padding: "32px 32px 48px", boxSizing: "border-box", animation: "slideInRight 0.3s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: T.fontH, fontSize: 20, fontWeight: 600, color: T.black, margin: 0 }}>Reserve this bike</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: T.black, padding: 4, lineHeight: 1 }}>{"\u2715"}</button>
        </div>
        <div style={{ borderTop: "1px solid #E8E8E8", marginBottom: 24 }} />

        {/* Bike summary */}
        <div style={{ background: T.bgGrey, borderRadius: 8, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: T.fontB, fontSize: 16, fontWeight: 570, color: T.black, marginBottom: 4 }}>{family}</div>
            <div style={{ fontFamily: T.fontB, fontSize: 14, color: T.darkGrey, marginBottom: 6 }}>{colorName} {"\u00b7"} Size {sizeId}</div>
            <div style={{ fontFamily: T.fontM, fontSize: 16, color: T.black }}>{fmt(price)} CZK</div>
          </div>
          <img src={variant.img} alt="" style={{ width: 80, height: 60, objectFit: "contain", mixBlendMode: "multiply", flexShrink: 0 }} />
        </div>

        {/* Dealer */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: T.fontB, fontSize: 12, fontWeight: 500, color: T.darkGrey, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Reserving at:</div>
          <div style={{ fontFamily: T.fontB, fontSize: 16, fontWeight: 570, color: T.black, marginBottom: 2 }}>{dealer.name}</div>
          <div style={{ fontFamily: T.fontB, fontSize: 14, color: T.darkGrey }}>{dealer.address}</div>
        </div>
        <div style={{ borderTop: "1px solid #E8E8E8", marginBottom: 24 }} />

        {submitted ? (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>{"\u2713"}</div>
            <div style={{ fontFamily: T.fontH, fontSize: 20, fontWeight: 570, color: T.black }}>Reservation sent!</div>
            <div style={{ fontFamily: T.fontB, fontSize: 14, color: T.darkGrey, marginTop: 8 }}>The dealer will contact you shortly.</div>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
              {[
                { label: "Name", type: "text", ph: "Jan" },
                { label: "Surname", type: "text", ph: "Nov\u00e1k" },
                { label: "Street", type: "text", ph: "Vinohrads\u00e1 123" },
                { label: "City", type: "text", ph: "Praha" },
                { label: "ZIP", type: "text", ph: "110 00" },
                { label: "Email", type: "email", ph: "jan@email.cz" },
                { label: "Phone", type: "tel", ph: "+420 123 456 789" },
              ].map(f => (
                <div key={f.label}>
                  <label style={labelStyle}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph} className="res-inp" style={inputStyle} />
                </div>
              ))}
              <div>
                <label style={labelStyle}>Message for dealer</label>
                <textarea rows={3} placeholder="Any questions or notes for the dealer..." className="res-inp" style={{ ...inputStyle, resize: "vertical" }} />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 24 }}>
              <div onClick={() => setAgreed(!agreed)}
                style={{ width: 18, height: 18, border: "1px solid "+(agreed ? T.black : T.lightGrey), borderRadius: 3, background: agreed ? T.black : T.white, flexShrink: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                {agreed && <span style={{ color: T.white, fontSize: 11, lineHeight: 1 }}>{"\u2713"}</span>}
              </div>
              <span style={{ fontFamily: T.fontB, fontSize: 13, color: T.darkGrey }}>
                I agree with the <span style={{ textDecoration: "underline", cursor: "pointer" }}>terms and conditions</span> of reservation
              </span>
            </div>

            <button onClick={handleSubmit}
              style={{ width: "100%", padding: 14, background: T.black, color: T.white, border: "none", borderRadius: 4, fontFamily: T.fontB, fontSize: 16, fontWeight: 570, cursor: "pointer", marginBottom: 32, transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#333"}
              onMouseLeave={e => e.currentTarget.style.background = T.black}>
              Confirm reservation
            </button>
          </>
        )}
      </div>
    </>
  );
}

// ─── Detail Page ────────────────────────────────────────────────────────────

function DetailPage({ variant, family, onBack, bike, onCompareVariants, variantPassesFilter }) {
  const [sz, setSz] = useState(null);
  const [selColor, setSelColor] = useState(variant.colors[0]);
  const [reserveDealer, setReserveDealer] = useState(null);
  const [stickyToast, setStickyToast] = useState(false);
  const dealerSectionRef = useRef(null);
  const colorId = COLOR_ID_MAP[selColor] || "unknown";
  const colorName = COLOR_MAP[selColor] || selColor;
  const stickyHasStock = sz ? getSizeAvailability(colorId, sz) === "in-stock" : false;
  const effectiveVariantPrice = variant.salePrice !== null ? variant.salePrice : variant.price;
  const handleStickyFindDealer = () => { setStickyToast(true); setTimeout(() => setStickyToast(false), 2500); };
  const onSale = variant.salePrice !== null;
  const pct = onSale ? salePct(variant.price, variant.salePrice) : 0;
  const category = bike?.category || "";
  const keySpecs = [variant.weight, variant.groupset, variant.wheels].filter(Boolean);
  const otherVariants = bike ? bike.variants.filter(v => v.id !== variant.id) : [];

  return (
    <div>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
      {/* Sub-nav */}
      <div style={{ position: "sticky", top: 56, zIndex: 99, height: 62, background: T.white, borderBottom: "1px solid "+T.lightGrey, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: T.fontB, fontSize: 14, fontWeight: 570, color: T.black, display: "flex", alignItems: "center", gap: 8, padding: 0 }}>
          {"\u2190"} {family}
        </button>
        <nav style={{ display: "flex", gap: 32, fontFamily: T.fontB, fontSize: 14, color: T.darkGrey }}>
          {["Overview", "Features", "Specifications", "Resources"].map(l => (
            <span key={l} style={{ cursor: "pointer", lineHeight: 1 }}>{l}</span>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {sz && (
            <>
              <span style={{ fontFamily: T.fontB, fontSize: 13, fontWeight: 500, color: T.black, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 300 }}>
                {family} {"\u00b7"} {colorName}, {sz} {"\u00b7"} {fmt(effectiveVariantPrice)} CZK
              </span>
              {stickyHasStock ? (
                <button onClick={() => dealerSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })}
                  style={{ padding: "8px 16px", background: T.black, color: T.white, border: "none", borderRadius: 4, fontFamily: T.fontB, fontSize: 13, fontWeight: 570, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
                  Reserve {"\u2192"}
                </button>
              ) : (
                <button onClick={handleStickyFindDealer}
                  style={{ padding: "8px 16px", background: T.white, color: T.black, border: "1px solid "+T.black, borderRadius: 4, fontFamily: T.fontB, fontSize: 13, fontWeight: 570, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
                  Find a dealer {"\u2192"}
                </button>
              )}
            </>
          )}
          <button style={{ padding: "8px 20px", background: T.white, color: T.black, border: "1px solid "+T.lightGrey, borderRadius: 100, fontFamily: T.fontB, fontSize: 13, fontWeight: 570, cursor: "pointer", flexShrink: 0 }}>Compare</button>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {/* Left: large image */}
        <div style={{ flex: 1, background: "#fafafa", minHeight: "calc(100vh - 118px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 64, position: "relative" }}>
          <img src={variant.img} alt="" style={{ maxWidth: "100%", maxHeight: "calc(100vh - 200px)", objectFit: "contain", mixBlendMode: "multiply" }} />
          {onSale && <div style={{ position: "absolute", top: 24, left: 24 }}><Badge label={"-"+pct+"%"} variant="sale" /></div>}
        </div>

        {/* Right: config panel */}
        <div style={{ width: 424, flexShrink: 0, position: "sticky", top: 118, maxHeight: "calc(100vh - 118px)", overflowY: "auto", padding: "40px 40px 64px", borderLeft: "1px solid "+T.lightGrey }}>
          {/* Breadcrumb */}
          {category && (
            <div style={{ fontFamily: T.fontM, fontSize: 11, color: "#969696", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
              Road bikes {"\u00b7"} {category}
            </div>
          )}

          {/* Bike name */}
          <h1 style={{ fontFamily: T.fontH, fontSize: 40, fontWeight: 700, lineHeight: 1.05, color: T.black, letterSpacing: "-0.02em", margin: "0 0 16px" }}>{family}</h1>

          {/* Price */}
          {onSale ? (
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: T.fontM, fontSize: 15, fontWeight: 400, textDecoration: "line-through", color: T.midGrey, textTransform: "uppercase", marginBottom: 4 }}>{fmt(variant.price)} czk</div>
              <div style={{ fontFamily: T.fontM, fontSize: 24, fontWeight: 700, color: T.sale, textTransform: "uppercase" }}>{fmt(variant.salePrice)} czk</div>
            </div>
          ) : (
            <div style={{ fontFamily: T.fontM, fontSize: 24, fontWeight: 700, color: T.black, textTransform: "uppercase", marginBottom: 28 }}>{fmt(variant.price)} czk</div>
          )}

          {/* Description */}
          <p style={{ fontFamily: T.fontB, fontSize: 14, lineHeight: 1.6, color: T.darkGrey, margin: "0 0 20px" }}>{variant.subtitle}</p>

          {/* Variant awareness banner */}
          {otherVariants.length > 0 && (() => {
            const bannerPriceText = otherVariants.length === 1
              ? " \u00b7 " + fmt(otherVariants[0].salePrice !== null ? otherVariants[0].salePrice : otherVariants[0].price) + " czk"
              : "";
            const bannerOutside = otherVariants.length === 1 && variantPassesFilter && !variantPassesFilter(otherVariants[0]);
            return (
              <div style={{ background: T.bgGrey, borderRadius: 8, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: T.fontB, fontSize: 13, fontWeight: 570, color: T.darkGrey }}>
                  <span style={{ fontSize: 14, lineHeight: 1 }}>{"\u2139"}</span>
                  Also available in {otherVariants.length} other {otherVariants.length === 1 ? "variant" : "variants"}{bannerPriceText}
                  {bannerOutside && <span style={{ color: T.midGrey, fontWeight: 400 }}> (outside filter)</span>}
                </div>
                <span onClick={onCompareVariants}
                  style={{ fontFamily: T.fontB, fontSize: 13, fontWeight: 570, color: T.black, cursor: "pointer", whiteSpace: "nowrap" }}
                  onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                  onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}>
                  Compare variants {"\u2192"}
                </span>
              </div>
            );
          })()}

          {/* Key specs */}
          {keySpecs.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              {keySpecs.map((spec, i) => (
                <div key={i} style={{ display: "flex", gap: 10, fontFamily: T.fontB, fontSize: 13, color: T.darkGrey, lineHeight: 1.8 }}>
                  <span style={{ color: T.midGrey, flexShrink: 0 }}>{"\u2014"}</span>
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          )}

          {/* Color selector */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: T.fontB, fontSize: 11, fontWeight: 570, color: T.midGrey, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Color</div>
            <div style={{ display: "flex", gap: 6 }}>
              {variant.colors.map((c, i) => (
                <span key={i} onClick={() => { setSelColor(c); setSz(null); setReserveDealer(null); }}
                  style={{ display: "inline-block", padding: 3, borderRadius: "50%", border: selColor === c ? "2px solid "+T.black : "2px solid transparent", cursor: "pointer", transition: "border-color 0.15s" }}>
                  <span style={{ display: "block", width: 22, height: 22, borderRadius: "50%", background: c, border: (c==="#d4d4d4"||c==="#ffffff") ? "1px solid "+T.lightGrey : "none" }} />
                </span>
              ))}
            </div>
          </div>

          {/* Size selector with stock indicators */}
          <div style={{ marginBottom: sz ? 16 : 28 }}>
            <div style={{ fontFamily: T.fontB, fontSize: 12, fontWeight: 500, color: T.darkGrey, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10 }}>Select size</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {BIKE_SIZES.map(s => {
                const avail = getSizeAvailability(colorId, s);
                const notMfg = avail === "not-manufactured";
                const inStock = avail === "in-stock";
                const isSel = sz === s;
                return (
                  <div key={s} style={{ position: "relative" }}>
                    <span
                      onClick={notMfg ? undefined : () => setSz(isSel ? null : s)}
                      style={{
                        display: "inline-block", padding: "8px 16px", borderRadius: 4,
                        fontFamily: T.fontB, fontSize: 14, fontWeight: 500,
                        border: notMfg ? "1px solid "+T.bgGrey : isSel ? "2px solid "+T.black : "1px solid "+T.lightGrey,
                        background: notMfg ? T.bgGrey : isSel ? T.black : T.white,
                        color: notMfg ? T.lightGrey : isSel ? T.white : T.black,
                        cursor: notMfg ? "not-allowed" : "pointer",
                        transition: "border-color 0.15s, background 0.15s",
                        userSelect: "none",
                      }}
                      onMouseEnter={e => { if (!notMfg && !isSel) e.currentTarget.style.borderColor = T.black; }}
                      onMouseLeave={e => { if (!notMfg && !isSel) e.currentTarget.style.borderColor = T.lightGrey; }}>
                      {s}
                    </span>
                    {inStock && (
                      <span style={{ position: "absolute", top: -4, right: -4, width: 10, height: 10, borderRadius: "50%", background: T.green, border: "2px solid "+T.white, pointerEvents: "none" }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Choose size prompt — shown when no size selected */}
          {!sz && (
            <div style={{ fontFamily: T.fontB, fontSize: 14, fontWeight: 400, color: T.midGrey, marginBottom: 28, animation: "fadeIn 0.2s ease" }}>
              Choose your size to check availability
            </div>
          )}

          {/* Dealer list — expands when size is selected */}
          {sz && (
            <div ref={dealerSectionRef} style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: T.fontB, fontSize: 12, fontWeight: 500, color: T.darkGrey, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Available at dealers</div>
              <DealerList colorId={colorId} colorName={colorName} sizeId={sz} onReserve={setReserveDealer} />
            </div>
          )}

          {/* Sticky bar toast */}
          {stickyToast && (
            <div style={{ position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)", background: T.black, color: T.white, padding: "12px 24px", borderRadius: 8, fontFamily: T.fontB, fontSize: 14, zIndex: 2000, pointerEvents: "none" }}>
              Dealer finder coming soon
            </div>
          )}

          {/* CTAs */}
          <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
            <button style={{ flex: 1, padding: "14px 0", background: T.white, color: T.black, border: "1px solid "+T.lightGrey, borderRadius: 100, fontSize: 14, fontWeight: 570, cursor: "pointer", fontFamily: T.fontB, transition: "border-color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = T.black} onMouseLeave={e => e.currentTarget.style.borderColor = T.lightGrey}>Compare</button>
          </div>

          {/* Warranty */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 20, borderTop: "1px solid "+T.lightGrey }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 20, height: 20, borderRadius: "50%", background: T.bgGrey, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: T.darkGrey, flexShrink: 0 }}>{"\u2713"}</span>
              <span style={{ fontFamily: T.fontB, fontSize: 13, color: T.darkGrey }}>Crash replacement program</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 20, height: 20, borderRadius: "50%", background: T.bgGrey, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: T.darkGrey, flexShrink: 0 }}>{"\u2713"}</span>
              <span style={{ fontFamily: T.fontB, fontSize: 13, color: T.darkGrey }}>5-year warranty included</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specs table */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 48px 80px" }}>
        <h2 style={{ fontFamily: T.fontH, fontSize: 22, fontWeight: 700, color: T.black, marginBottom: 24 }}>Specifications</h2>
        <div style={{ border: "1px solid "+T.lightGrey, borderRadius: 10, overflow: "hidden" }}>
          {SPEC_KEYS.map(({ key, label }, idx) => {
            const val = variant[key]; if (!val) return null;
            const d = Array.isArray(val) ? val.join(", ") : val;
            return <div key={key} style={{ display: "grid", gridTemplateColumns: "200px 1fr", padding: "14px 24px", fontFamily: T.fontB, fontSize: 13, lineHeight: 1.5, borderTop: idx === 0 ? "none" : "1px solid "+T.bgGrey }}>
              <div style={{ fontWeight: 570, color: T.darkGrey }}>{label}</div>
              <div style={{ color: T.black }}>{d}</div>
            </div>;
          })}
        </div>
      </div>

      {/* Reservation drawer */}
      {reserveDealer && (
        <ReservationDrawer
          dealer={reserveDealer}
          variant={variant}
          family={family}
          colorName={colorName}
          sizeId={sz}
          onClose={() => setReserveDealer(null)}
        />
      )}
    </div>
  );
}

// ─── Location Modal ──────────────────────────────────────────────────────────

const COUNTRIES = ["Czech Republic","Slovakia","Germany","Austria","Poland","Hungary","France","Spain","Italy","United Kingdom","Netherlands","Belgium","Sweden","Norway","Denmark","Finland","Switzerland","Romania","Bulgaria","Croatia","Slovenia","Greece","Portugal"];
const LANGUAGES = ["English","Čeština","Deutsch","Français","Español","Italiano"];

function LocationModal({ onClose }) {
  const [closeBtnHov, setCloseBtnHov] = useState(false);
  const [confirmHov, setConfirmHov] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const selectStyle = {
    width: "100%", border: "none", borderBottom: "2px solid "+T.black,
    padding: "12px 0", fontFamily: T.fontB, fontSize: 16, fontWeight: 570,
    color: T.black, background: "transparent", cursor: "pointer",
    appearance: "none", WebkitAppearance: "none", outline: "none",
  };

  return (
    <div ref={overlayRef} onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "fadeIn 0.2s ease" }}>
      <div style={{ background: T.white, borderRadius: 16, maxWidth: 480, width: "90%", padding: 32, boxShadow: "0 24px 80px rgba(0,0,0,0.2)", position: "relative", animation: "slideUp 0.25s ease" }}>
        {/* Close button */}
        <button onClick={onClose}
          onMouseEnter={() => setCloseBtnHov(true)} onMouseLeave={() => setCloseBtnHov(false)}
          style={{ position: "absolute", top: 20, right: 20, width: 36, height: 36, borderRadius: "50%", border: "1px solid "+(closeBtnHov ? T.black : T.lightGrey), background: T.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: T.darkGrey, transition: "border-color 0.15s" }}>
          {"\u2715"}
        </button>

        {/* Title */}
        <h2 style={{ fontFamily: T.fontB, fontSize: 22, fontWeight: 570, color: T.black, margin: "0 0 8px", paddingRight: 48 }}>Select your location and language</h2>
        <p style={{ fontFamily: T.fontB, fontSize: 14, fontWeight: 400, color: T.darkGrey, lineHeight: 1.5, margin: "0 0 28px" }}>Pricing and retailer availability vary by region.</p>

        {/* Country */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: T.fontB, fontSize: 12, fontWeight: 570, color: T.midGrey, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>Country</div>
          <div style={{ position: "relative" }}>
            <select defaultValue="Czech Republic" style={selectStyle}>
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <span style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", color: T.darkGrey, pointerEvents: "none", fontSize: 12 }}>{"\u2228"}</span>
          </div>
        </div>

        {/* Language */}
        <div>
          <div style={{ fontFamily: T.fontB, fontSize: 12, fontWeight: 570, color: T.midGrey, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>Language</div>
          <div style={{ position: "relative" }}>
            <select defaultValue="English" style={selectStyle}>
              {LANGUAGES.map(l => <option key={l}>{l}</option>)}
            </select>
            <span style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", color: T.darkGrey, pointerEvents: "none", fontSize: 12 }}>{"\u2228"}</span>
          </div>
        </div>

        {/* Confirm */}
        <button onClick={onClose}
          onMouseEnter={() => setConfirmHov(true)} onMouseLeave={() => setConfirmHov(false)}
          style={{ width: "100%", marginTop: 32, padding: 16, background: T.black, color: T.white, border: "none", borderRadius: 100, fontFamily: T.fontB, fontSize: 14, fontWeight: 570, cursor: "pointer", opacity: confirmHov ? 0.85 : 1, transition: "opacity 0.15s" }}>
          Confirm
        </button>
      </div>
    </div>
  );
}

// ─── Header + Filters ───────────────────────────────────────────────────────

function Header({ cc, onOpenLocation }) {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 64px", height: 56, borderBottom: "1px solid "+T.lightGrey, background: T.white, position: "sticky", top: 0, zIndex: 100 }}>
      <nav style={{ display: "flex", gap: 48, alignItems: "center", fontFamily: T.fontB, fontSize: 14, color: T.black, lineHeight: 1 }}>
        <span style={{ cursor: "pointer" }}>Bikes</span>
        <span style={{ cursor: "pointer" }}>E-bikes</span>
        <span style={{ cursor: "pointer" }}>Retailers</span>
      </nav>
      <span style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", fontFamily: T.fontH, fontWeight: 700, fontSize: 20, letterSpacing: "-0.03em", color: T.black, whiteSpace: "nowrap" }}>superior.</span>
      <div style={{ display: "flex", alignItems: "center", gap: 48, fontFamily: T.fontB, fontSize: 14, color: T.black, lineHeight: 1 }}>
        <span style={{ cursor: "pointer" }}>About</span>
        <span style={{ cursor: "pointer", position: "relative" }}>Comparison
          {cc > 0 && <span style={{ position: "absolute", top: -9, right: -18, background: T.black, color: T.white, borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.fontM, fontSize: 11 }}>{cc}</span>}
        </span>
        <span style={{ cursor: "pointer" }}>Search</span>
        <span onClick={onOpenLocation} style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", cursor: "pointer", gap: 2 }}>
          <span style={{ fontFamily: T.fontB, fontSize: 12, fontWeight: 400, color: T.midGrey, lineHeight: 1 }}>Location</span>
          <span style={{ fontFamily: T.fontB, fontSize: 14, fontWeight: 570, color: T.black, lineHeight: 1 }}>CZ / EN</span>
        </span>
      </div>
    </header>
  );
}

function Toolbar({ onOpenDrawer, hasActiveFilters, onClearFilters, activeCategory, onCategoryChange, totalShowing }) {
  const cats = ["All", "Road", "Gran Fondo", "Gravel"];
  return (
    <div style={{ position: "sticky", top: 56, zIndex: 98, background: T.white, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 32px", height: 52, borderBottom: "1px solid "+T.lightGrey }}>
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <span onClick={onOpenDrawer} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: T.fontB, fontSize: 14, fontWeight: 570, color: T.black, cursor: "pointer" }}>
          Filter & Sort {"\u2261"}
          {hasActiveFilters && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e53935", display: "inline-block" }} />}
        </span>
        {hasActiveFilters && (
          <span onClick={onClearFilters} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: T.fontB, fontSize: 14, fontWeight: 570, color: T.black, cursor: "pointer" }}>
            Clear Filters {"\u2715"}
          </span>
        )}
      </div>
      {/* Center tabs */}
      <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8 }}>
        {cats.map(c => {
          const sel = activeCategory === c;
          return <span key={c} onClick={() => onCategoryChange(c)} style={{ padding: "7px 18px", borderRadius: 100, fontFamily: T.fontB, fontSize: 13, fontWeight: 570, cursor: "pointer", background: sel ? T.black : T.white, color: sel ? T.white : T.black, border: "1px solid "+T.black, transition: "all 0.15s" }}>{c}</span>;
        })}
      </div>
      {/* Right */}
      <span style={{ fontFamily: T.fontB, fontSize: 14, color: T.midGrey }}>Showing {totalShowing} bikes</span>
    </div>
  );
}

// ─── App ────────────────────────────────────────────────────────────────────

export default function App() {
  const [pg, setPg] = useState("grid");
  const [bike, setBike] = useState(null);
  const [vari, setVari] = useState(null);
  const [comp, setComp] = useState([]);
  const [modalBike, setModalBike] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS);
  const [pendingFilters, setPendingFilters] = useState(EMPTY_FILTERS);
  const [activeCategory, setActiveCategory] = useState("All");

  const openDrawer = () => { setPendingFilters({ ...appliedFilters }); setDrawerOpen(true); };
  const closeDrawer = () => { setPendingFilters({ ...appliedFilters }); setDrawerOpen(false); };
  const applyFilters = () => { setAppliedFilters({ ...pendingFilters }); setDrawerOpen(false); };
  const clearAllFilters = () => { setAppliedFilters(EMPTY_FILTERS); setPendingFilters(EMPTY_FILTERS); setDrawerOpen(false); };

  const variantPassesFilter = (v) => {
    const ep = effectivePrice(v);
    if (appliedFilters.price.min !== null && ep < appliedFilters.price.min) return false;
    if (appliedFilters.price.max !== null && ep > appliedFilters.price.max) return false;
    if (appliedFilters.sizes.length > 0 && !appliedFilters.sizes.some(s => v.sizes?.includes(s))) return false;
    if (appliedFilters.materials.length > 0 && !appliedFilters.materials.includes(getMaterial(v.frame || ""))) return false;
    if (appliedFilters.colors.length > 0 && !v.colors?.some(c => appliedFilters.colors.includes(COLOR_MAP[c] || "Other"))) return false;
    return true;
  };

  const bikePassesFilter = (b) => {
    if (activeCategory !== "All" && b.category !== activeCategory) return false;
    if (appliedFilters.frameShape && b.category !== appliedFilters.frameShape) return false;
    return b.variants.some(variantPassesFilter);
  };

  const getPassingVariants = (b) => b.variants.filter(variantPassesFilter);
  const filteredBikes = BIKES.filter(bikePassesFilter);
  const sortedBikes = [...filteredBikes].sort((a, b) => {
    if (appliedFilters.sort === "price-desc") return effectivePrice(b.variants[0]) - effectivePrice(a.variants[0]);
    if (appliedFilters.sort === "price-asc") return effectivePrice(a.variants[0]) - effectivePrice(b.variants[0]);
    return 0;
  });

  // Live count driven by pendingFilters
  const pendingCount = BIKES.filter(b => {
    if (activeCategory !== "All" && b.category !== activeCategory) return false;
    if (pendingFilters.frameShape && b.category !== pendingFilters.frameShape) return false;
    return b.variants.some(v => {
      const ep = effectivePrice(v);
      if (pendingFilters.price.min !== null && ep < pendingFilters.price.min) return false;
      if (pendingFilters.price.max !== null && ep > pendingFilters.price.max) return false;
      if (pendingFilters.sizes.length > 0 && !pendingFilters.sizes.some(s => v.sizes?.includes(s))) return false;
      if (pendingFilters.materials.length > 0 && !pendingFilters.materials.includes(getMaterial(v.frame || ""))) return false;
      if (pendingFilters.colors.length > 0 && !v.colors?.some(c => pendingFilters.colors.includes(COLOR_MAP[c] || "Other"))) return false;
      return true;
    });
  }).length;

  const hasActiveFilters =
    appliedFilters.price.min !== null || appliedFilters.price.max !== null ||
    appliedFilters.sizes.length > 0 || appliedFilters.materials.length > 0 ||
    appliedFilters.colors.length > 0 || appliedFilters.frameShape !== null ||
    appliedFilters.sort !== "recommended";

  const go = (p) => { setPg(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const selBike = (b) => {
    const passing = getPassingVariants(b);
    if (passing.length === 0) return;
    if (passing.length === 1) { setVari(passing[0]); setBike(b); go("detail"); }
    else { setModalBike(b); }
  };

  const toggleComp = (id) => setComp(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const selVar = (v) => {
    const parentBike = modalBike || bike;
    setVari(v); setBike(parentBike); setModalBike(null);
    if (pg !== "detail") go("detail");
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => { setBike(null); setVari(null); go("grid"); };

  return (
    <div style={{ fontFamily: T.fontB, background: T.white, minHeight: "100vh" }}>
      <Header cc={comp.length} onOpenLocation={() => setLocationModal(true)} />
      {locationModal && <LocationModal onClose={() => setLocationModal(false)} />}
      {pg === "grid" && (
        <>
          <Toolbar
            onOpenDrawer={openDrawer}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearAllFilters}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            totalShowing={filteredBikes.length}
          />
          <FilterDrawer
            open={drawerOpen}
            onClose={closeDrawer}
            pendingFilters={pendingFilters}
            onChange={setPendingFilters}
            liveCount={pendingCount}
            onApply={applyFilters}
            onClearPending={() => setPendingFilters(EMPTY_FILTERS)}
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32, padding: "32px 32px 80px" }}>
            {sortedBikes.map(b => {
              const passing = getPassingVariants(b);
              return <ProductCard key={b.id} bike={b} displayVariants={passing} onSelect={selBike} onCompare={toggleComp} isCompared={comp.includes(passing[0].id)} />;
            })}
          </div>
        </>
      )}
      {pg === "detail" && vari && <DetailPage variant={vari} family={bike?.family || vari.name} onBack={back} bike={bike} onCompareVariants={() => setModalBike(bike)} variantPassesFilter={variantPassesFilter} />}
      {modalBike && <VariantModal bike={modalBike} onClose={() => setModalBike(null)} onSelectVariant={selVar} compared={comp} onCompare={toggleComp} variantPassesFilter={variantPassesFilter} />}
    </div>
  );
}
