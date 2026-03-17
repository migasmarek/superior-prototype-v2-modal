import { useState, useEffect, useRef } from "react";

const IMG_XR97_OLD = "/images/xr97-old.png";
const IMG_XR97_NEW = "/images/xr97-new.png";
const IMG_BIKE_A = "/images/bike-a.png";
const IMG_BIKE_B = "/images/bike-b.png";

const T = {
  black: "#000000", darkGrey: "#5a5a5a", midGrey: "#979797", lightGrey: "#d8d8d8",
  bgGrey: "#f9f9f9", white: "#ffffff", sale: "#e10000", lightYellow: "#fff6d1",
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

// ─── Filter Panel ───────────────────────────────────────────────────────────

function FilterPanel({ onClose, priceFilter, onApply, onReset, filteredCount }) {
  const [localMin, setLocalMin] = useState(priceFilter.min ?? PRICE_MIN);
  const [localMax, setLocalMax] = useState(priceFilter.max ?? PRICE_MAX);

  const pctMin = ((localMin - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const pctMax = ((localMax - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const hasActive = priceFilter.min !== null || priceFilter.max !== null;

  return (
    <div style={{ width: 300, flexShrink: 0, borderRight: "1px solid "+T.lightGrey, background: T.white, minHeight: "calc(100vh - 118px)", alignSelf: "stretch" }}>
      <style>{`.pr-range{-webkit-appearance:none;position:absolute;width:100%;background:transparent;pointer-events:none;margin:0;height:20px;top:0;outline:none}.pr-range::-webkit-slider-thumb{-webkit-appearance:none;pointer-events:all;width:16px;height:16px;background:#000;border-radius:50%;cursor:pointer;margin-top:-7px}.pr-range::-webkit-slider-runnable-track{height:2px;background:transparent}.pr-range::-moz-range-thumb{pointer-events:all;width:16px;height:16px;background:#000;border-radius:50%;cursor:pointer;border:none}.pr-range::-moz-range-track{height:2px;background:transparent}`}</style>
      {/* Header */}
      <div style={{ padding: "24px 24px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid "+T.bgGrey }}>
        <div>
          <div style={{ fontFamily: T.fontH, fontSize: 18, fontWeight: 700, color: T.black, marginBottom: 4 }}>Filter products</div>
          <div style={{ fontFamily: T.fontB, fontSize: 13, fontWeight: 570, color: T.midGrey }}>Showing {filteredCount} bike{filteredCount !== 1 ? "s" : ""}</div>
        </div>
        <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid "+T.lightGrey, background: T.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: T.darkGrey, flexShrink: 0, transition: "border-color 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = T.black} onMouseLeave={e => e.currentTarget.style.borderColor = T.lightGrey}>{"\u2715"}</button>
      </div>

      {/* Price section */}
      <div style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ fontFamily: T.fontM, fontSize: 12, fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.08em", color: T.black }}>Price</span>
          {hasActive && (
            <button onClick={() => { setLocalMin(PRICE_MIN); setLocalMax(PRICE_MAX); onReset(); }}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: T.midGrey, lineHeight: 1, padding: 0 }}>{"\u2715"}</button>
          )}
        </div>

        {/* Dual-handle range slider */}
        <div style={{ position: "relative", height: 20, marginBottom: 20 }}>
          <div style={{ position: "absolute", top: 9, left: 0, right: 0, height: 2, background: T.lightGrey, borderRadius: 1 }} />
          <div style={{ position: "absolute", top: 9, left: pctMin+"%", right: (100 - pctMax)+"%", height: 2, background: T.black, borderRadius: 1 }} />
          <input className="pr-range" type="range" min={PRICE_MIN} max={PRICE_MAX} step={1000}
            value={localMin}
            onChange={e => { const v = Math.min(Number(e.target.value), localMax - 5000); setLocalMin(Math.max(PRICE_MIN, v)); }}
            style={{ zIndex: localMin > PRICE_MIN + (PRICE_MAX - PRICE_MIN) * 0.5 ? 5 : 3 }} />
          <input className="pr-range" type="range" min={PRICE_MIN} max={PRICE_MAX} step={1000}
            value={localMax}
            onChange={e => { const v = Math.max(Number(e.target.value), localMin + 5000); setLocalMax(Math.min(PRICE_MAX, v)); }}
            style={{ zIndex: localMin > PRICE_MIN + (PRICE_MAX - PRICE_MIN) * 0.5 ? 3 : 5 }} />
        </div>

        {/* Input fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: T.fontB, fontSize: 12, color: T.darkGrey, width: 28, flexShrink: 0 }}>From</span>
            <input type="number" value={localMin}
              onChange={e => { const v = Number(e.target.value); if (!isNaN(v)) setLocalMin(Math.max(PRICE_MIN, Math.min(v, localMax - 5000))); }}
              style={{ flex: 1, border: "none", borderBottom: "1px solid "+T.lightGrey, outline: "none", fontFamily: T.fontM, fontSize: 13, padding: "4px 0", background: "transparent", color: T.black, minWidth: 0 }} />
            <span style={{ fontFamily: T.fontB, fontSize: 12, color: T.darkGrey, flexShrink: 0 }}>CZK</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: T.fontB, fontSize: 12, color: T.darkGrey, width: 28, flexShrink: 0 }}>To</span>
            <input type="number" value={localMax}
              onChange={e => { const v = Number(e.target.value); if (!isNaN(v)) setLocalMax(Math.min(PRICE_MAX, Math.max(v, localMin + 5000))); }}
              style={{ flex: 1, border: "none", borderBottom: "1px solid "+T.lightGrey, outline: "none", fontFamily: T.fontM, fontSize: 13, padding: "4px 0", background: "transparent", color: T.black, minWidth: 0 }} />
            <span style={{ fontFamily: T.fontB, fontSize: 12, color: T.darkGrey, flexShrink: 0 }}>CZK</span>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => onApply({ min: localMin, max: localMax })}
            style={{ flex: 1, padding: "10px 0", background: T.black, color: T.white, border: "none", borderRadius: 8, fontFamily: T.fontB, fontSize: 13, fontWeight: 570, cursor: "pointer" }}>Apply</button>
          <button onClick={() => { setLocalMin(PRICE_MIN); setLocalMax(PRICE_MAX); onReset(); }}
            style={{ flex: 1, padding: "10px 0", background: T.bgGrey, color: T.darkGrey, border: "none", borderRadius: 8, fontFamily: T.fontB, fontSize: 13, fontWeight: 570, cursor: "pointer" }}>Reset</button>
        </div>
      </div>
    </div>
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
    <div style={{ borderRight: vi < total - 1 ? "1px solid "+T.lightGrey : "none", padding: vi === 0 ? "0 20px 0 0" : vi === total - 1 ? "0 0 0 20px" : "0 20px", opacity: passes === false ? 0.5 : 1 }}>
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
        </div>
      ) : (
        <div style={{ fontFamily: T.fontM, fontSize: 18, fontWeight: 700, lineHeight: 1, color: T.black, textTransform: "uppercase", marginBottom: 16 }}>{fmt(v.price)} czk</div>
      )}
      {passes === false && (
        <div style={{ fontFamily: T.fontB, fontSize: 11, color: T.midGrey, marginBottom: 16, fontStyle: "italic" }}>Outside your price range</div>
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

// ─── Detail Page ────────────────────────────────────────────────────────────

function DetailPage({ variant, family, onBack, bike, onCompareVariants, variantPassesFilter }) {
  const [sz, setSz] = useState(null);
  const [selColor, setSelColor] = useState(variant.colors[0]);
  const onSale = variant.salePrice !== null;
  const pct = onSale ? salePct(variant.price, variant.salePrice) : 0;
  const category = bike?.category || "";
  const keySpecs = [variant.weight, variant.groupset, variant.wheels].filter(Boolean);
  const otherVariants = bike ? bike.variants.filter(v => v.id !== variant.id) : [];

  return (
    <div>
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
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ padding: "8px 20px", background: T.black, color: T.white, border: "none", borderRadius: 100, fontFamily: T.fontB, fontSize: 13, fontWeight: 570, cursor: "pointer" }}>Find in stock</button>
          <button style={{ padding: "8px 20px", background: T.white, color: T.black, border: "1px solid "+T.lightGrey, borderRadius: 100, fontFamily: T.fontB, fontSize: 13, fontWeight: 570, cursor: "pointer" }}>Compare</button>
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
                <span key={i} onClick={() => setSelColor(c)}
                  style={{ display: "inline-block", padding: 3, borderRadius: "50%", border: selColor === c ? "2px solid "+T.black : "2px solid transparent", cursor: "pointer", transition: "border-color 0.15s" }}>
                  <span style={{ display: "block", width: 22, height: 22, borderRadius: "50%", background: c, border: (c==="#d4d4d4"||c==="#ffffff") ? "1px solid "+T.lightGrey : "none" }} />
                </span>
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: T.fontB, fontSize: 11, fontWeight: 570, color: T.midGrey, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Size</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {(variant.sizes || ["S","M","L","XL"]).map(s => (
                <span key={s} onClick={() => setSz(s)}
                  style={{ padding: "8px 16px", border: sz === s ? "2px solid "+T.black : "1px solid "+T.lightGrey, borderRadius: 100, fontFamily: T.fontB, fontSize: 13, fontWeight: sz === s ? 570 : 400, cursor: "pointer", color: T.black, transition: "border-color 0.15s" }}>{s}</span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
            <button style={{ flex: 1, padding: "14px 0", background: T.black, color: T.white, border: "none", borderRadius: 100, fontSize: 14, fontWeight: 570, cursor: "pointer", fontFamily: T.fontB, transition: "opacity 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>Find in stock</button>
            <button style={{ width: 112, padding: "14px 0", background: T.white, color: T.black, border: "1px solid "+T.lightGrey, borderRadius: 100, fontSize: 14, fontWeight: 570, cursor: "pointer", fontFamily: T.fontB, transition: "border-color 0.15s" }}
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
    </div>
  );
}

// ─── Header + Filters ───────────────────────────────────────────────────────

function Header({ cc }) {
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
        <span style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <span>CZ</span>
          <span style={{ width: 1, height: 14, background: T.lightGrey, display: "inline-block" }} />
          <span>EN</span>
        </span>
      </div>
    </header>
  );
}

function Filters({ filterOpen, onToggle, filteredCount }) {
  const cats = ["All", "Road", "Gran Fondo", "Gravel"];
  const total = BIKES.length;
  const showingText = filteredCount < total ? `Showing ${filteredCount} of ${total} bikes` : `Showing ${total} bikes`;
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", borderBottom: "1px solid "+T.bgGrey }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <span onClick={onToggle} style={{ fontFamily: T.fontB, fontSize: 13, fontWeight: 570, color: filterOpen ? T.black : T.darkGrey, cursor: "pointer" }}>
          {filterOpen ? "Hide Filters" : "Show Filters"} {"\u2261"}
        </span>
        <span style={{ fontFamily: T.fontB, fontSize: 13, color: T.midGrey }}>{showingText}</span>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {cats.map((c, i) => <span key={c} style={{ padding: "7px 18px", borderRadius: 100, fontFamily: T.fontB, fontSize: 13, fontWeight: 570, cursor: "pointer", background: i === 0 ? T.black : T.white, color: i === 0 ? T.white : T.darkGrey, border: i === 0 ? "1px solid "+T.black : "1px solid "+T.lightGrey }}>{c}</span>)}
      </div>
      <span style={{ fontFamily: T.fontB, fontSize: 13, fontWeight: 570, color: T.darkGrey, cursor: "pointer" }}>Sort by Default {"\u2261"}</span>
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
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState({ min: null, max: null });

  const variantPassesFilter = (v) => {
    const ep = v.salePrice !== null ? v.salePrice : v.price;
    if (priceFilter.min !== null && ep < priceFilter.min) return false;
    if (priceFilter.max !== null && ep > priceFilter.max) return false;
    return true;
  };
  const getPassingVariants = (b) => b.variants.filter(variantPassesFilter);
  const filteredBikes = BIKES.filter(b => getPassingVariants(b).length > 0);

  const go = (p) => { setPg(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const selBike = (b) => {
    const passing = getPassingVariants(b);
    if (passing.length === 1) { setVari(passing[0]); setBike(b); go("detail"); }
    else if (passing.length === 0) return;
    else { setModalBike(b); if (filterOpen) setFilterOpen(false); }
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
      <Header cc={comp.length} />
      {pg === "grid" && (
        <>
          <Filters filterOpen={filterOpen} onToggle={() => setFilterOpen(f => !f)} filteredCount={filteredBikes.length} />
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            {filterOpen && (
              <FilterPanel
                onClose={() => setFilterOpen(false)}
                priceFilter={priceFilter}
                onApply={(f) => setPriceFilter(f)}
                onReset={() => setPriceFilter({ min: null, max: null })}
                filteredCount={filteredBikes.length}
              />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "grid", gridTemplateColumns: filterOpen ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: 32, padding: "32px 32px 80px" }}>
                {filteredBikes.map(b => {
                  const passing = getPassingVariants(b);
                  return <ProductCard key={b.id} bike={b} displayVariants={passing} onSelect={selBike} onCompare={toggleComp} isCompared={comp.includes(passing[0].id)} />;
                })}
              </div>
            </div>
          </div>
        </>
      )}
      {pg === "detail" && vari && <DetailPage variant={vari} family={bike?.family || vari.name} onBack={back} bike={bike} onCompareVariants={() => setModalBike(bike)} variantPassesFilter={variantPassesFilter} />}
      {modalBike && <VariantModal bike={modalBike} onClose={() => setModalBike(null)} onSelectVariant={selVar} compared={comp} onCompare={toggleComp} variantPassesFilter={variantPassesFilter} />}
    </div>
  );
}
