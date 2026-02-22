import React, { useState, useRef } from "react";
import { farmingVehicle, farmingEquipment } from "../assets/tools.js";
import krishi from "../assets/booking-image.png";
import Equipment from "../assets/equipment.png";
import crop from "../assets/crop.png";
import weather from "../assets/weather.png";
import soil from "../assets/soil.png";
import govern from "../assets/govern.png";
import farmer from "../assets/farmer.png";
import tractorImg from "../assets/tractorImg.png";
import harvesterImg from "../assets/harvesterImg.png";
import pumpImg from "../assets/pumpImg.png";
import seedDrillImg from "../assets/seedDrillImg.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetAllRentalsQuery, useGetRentalsByCategoryQuery } from "../store/api/RentalsApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";

// ── Animated background ───────────────────────────────────────────────────────
const Particles = React.memo(() => (
  <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
    {[
      { w: "600px", h: "600px", top: "-18%", left: "-12%", bg: "radial-gradient(circle, rgba(34,197,94,0.09) 0%, transparent 65%)", anim: "orbFloat1 22s ease-in-out infinite" },
      { w: "450px", h: "450px", top: "55%", right: "-8%", bg: "radial-gradient(circle, rgba(180,83,9,0.07) 0%, transparent 65%)", anim: "orbFloat2 28s ease-in-out infinite" },
      { w: "320px", h: "320px", top: "30%", left: "40%", bg: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 65%)", anim: "orbFloat3 32s ease-in-out infinite" },
      { w: "240px", h: "240px", bottom: "6%", left: "8%", bg: "radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 65%)", anim: "orbFloat1 19s ease-in-out infinite reverse" },
    ].map((o, i) => (
      <div key={i} style={{ position: "absolute", width: o.w, height: o.h, top: o.top, left: o.left, right: o.right, bottom: o.bottom, borderRadius: "50%", background: o.bg, animation: o.anim }} />
    ))}
    {[...Array(30)].map((_, i) => (
      <div key={i} style={{
        position: "absolute", borderRadius: "50%",
        background: `rgba(52,211,153,${Math.random() * 0.12 + 0.03})`,
        width: `${Math.random() * 3 + 1}px`, height: `${Math.random() * 3 + 1}px`,
        top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
        animation: `particleDrift ${6 + Math.random() * 8}s ${Math.random() * 5}s ease-in-out infinite alternate`,
      }} />
    ))}
    <div style={{ position: "absolute", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.10), transparent)", animation: "scanLine 12s linear infinite" }} />
    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(52,211,153,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.03) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
  </div>
));

// ── Section divider ───────────────────────────────────────────────────────────
const SectionDivider = ({ label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
    <div style={{ height: "1px", flex: 1, background: "rgba(52,211,153,0.13)" }} />
    <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(52,211,153,0.55)" }}>{label}</span>
    <div style={{ height: "1px", flex: 1, background: "rgba(52,211,153,0.13)" }} />
  </div>
);

// ── Glass panel ───────────────────────────────────────────────────────────────
const Panel = ({ children, style: extra = {} }) => (
  <div style={{
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "24px", padding: "28px",
    backdropFilter: "blur(20px)",
    boxShadow: "0 24px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
    position: "relative", overflow: "hidden", ...extra,
  }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.35), transparent)" }} />
    {children}
  </div>
);

// ── Suggestion card ───────────────────────────────────────────────────────────
const SuggestionCard = ({ title, desc, image, index }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: "0",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px", overflow: "hidden",
    backdropFilter: "blur(16px)",
    animation: `cardIn 0.5s ${index * 80}ms both ease`,
    transition: "transform 0.25s, border-color 0.25s, box-shadow 0.25s",
    cursor: "default",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = "rgba(52,211,153,0.25)"; e.currentTarget.style.boxShadow = "0 18px 48px rgba(0,0,0,0.45)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)"; }}
  >
    <div style={{ flex: 1, padding: "22px 22px 22px 24px" }}>
      <div style={{ fontSize: "14px", fontWeight: "800", color: "#fff", marginBottom: "8px", letterSpacing: "-0.2px" }}>{title}</div>
      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.42)", lineHeight: 1.65 }}>{desc}</div>
    </div>
    <div style={{ width: "110px", height: "110px", flexShrink: 0, overflow: "hidden", background: "rgba(52,211,153,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <img src={image} alt={title} style={{ width: "90px", height: "90px", objectFit: "contain", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }} />
    </div>
  </div>
);

// ── Rental tool card ──────────────────────────────────────────────────────────
const ToolCard = ({ tool, t, index }) => (
  <div style={{
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px", overflow: "hidden",
    backdropFilter: "blur(16px)",
    animation: `cardIn 0.5s ${Math.min(index * 60, 400)}ms both ease`,
    transition: "transform 0.25s, border-color 0.25s, box-shadow 0.25s",
    display: "flex", flexDirection: "column",
    boxShadow: "0 8px 28px rgba(0,0,0,0.3)",
  }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = "rgba(52,211,153,0.25)"; e.currentTarget.style.boxShadow = "0 20px 52px rgba(0,0,0,0.5)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.3)"; }}
  >
    {/* Image */}
    <div style={{ position: "relative", height: "200px", overflow: "hidden", background: "rgba(0,0,0,0.3)" }}>
      <img
        src={`http://localhost:8095/images/${tool.image}`}
        alt={tool.name}
        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      />
      {/* Availability badge */}
      <div style={{ position: "absolute", top: "12px", right: "12px", padding: "4px 12px", borderRadius: "99px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.5px", background: tool.availability ? "rgba(52,211,153,0.20)" : "rgba(239,68,68,0.20)", border: `1px solid ${tool.availability ? "rgba(52,211,153,0.4)" : "rgba(239,68,68,0.4)"}`, color: tool.availability ? "#34d399" : "#f87171", backdropFilter: "blur(8px)" }}>
        {tool.availability ? t("available") : t("notAvailable")}
      </div>
      {/* Top glow */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.4), transparent)" }} />
    </div>

    {/* Body */}
    <div style={{ padding: "18px 20px 20px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ fontSize: "16px", fontWeight: "800", color: "#fff", letterSpacing: "-0.2px" }}>{tool.name}</div>
      <div style={{ fontSize: "11px", color: "rgba(52,211,153,0.55)", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: "700" }}>{tool.category}</div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
        <div>
          <span style={{ fontSize: "22px", fontWeight: "900", color: "#34d399", letterSpacing: "-0.5px" }}>₹{tool.rentalPricePerDay}</span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginLeft: "4px" }}>/ {t("perDay")}</span>
        </div>
      </div>

      <Link
        to={`/rent/${tool._id}`}
        style={{
          marginTop: "12px", display: "block", textAlign: "center",
          padding: "12px", borderRadius: "14px",
          background: tool.availability ? "linear-gradient(135deg,#059669,#047857)" : "rgba(255,255,255,0.06)",
          color: tool.availability ? "#fff" : "rgba(255,255,255,0.3)",
          fontSize: "13px", fontWeight: "800", textDecoration: "none",
          letterSpacing: "0.5px",
          boxShadow: tool.availability ? "0 4px 20px rgba(5,150,105,0.35)" : "none",
          pointerEvents: tool.availability ? "auto" : "none",
          transition: "transform 0.2s, box-shadow 0.2s",
          fontFamily: "inherit",
        }}
        onMouseEnter={e => { if (tool.availability) { e.currentTarget.style.boxShadow = "0 8px 28px rgba(5,150,105,0.5)"; e.currentTarget.style.transform = "translateY(-1px)"; } }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = tool.availability ? "0 4px 20px rgba(5,150,105,0.35)" : "none"; e.currentTarget.style.transform = "translateY(0)"; }}
      >
        {tool.availability ? `${t("rentNow")} →` : t("notAvailable")}
      </Link>
    </div>
  </div>
);

// ── Main page ─────────────────────────────────────────────────────────────────
const BookingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const itemRef = useRef(null);
  const scrollToItem = () => itemRef.current?.scrollIntoView({ behavior: "smooth" });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [inputFocused, setInputFocused] = useState(false);

  const { data: allData, isLoading: loadingAll } = useGetAllRentalsQuery();
  const { data: categoryData } = useGetRentalsByCategoryQuery(selectedCategory, { skip: selectedCategory === "All" });
  const rentals = selectedCategory === "All" ? allData : categoryData;
  const categories = ["All", ...new Set((allData || []).map((item) => item.category))];
  const filteredTools = (rentals || []).filter((tool) =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const suggestions = [
    { title: t("equipmentRental"), desc: t("equipmentRentalDesc"), image: Equipment },
    { title: t("soilHealthCheck"), desc: t("soilHealthCheckDesc"), image: soil },
    { title: t("farmerSupport"), desc: t("farmerSupportDesc"), image: farmer },
  ];

  const equipments = [
    { name: t("tractor"), price: t("tractorPrice"), image: tractorImg, desc: t("tractorDesc") },
    { name: t("harvester"), price: t("harvesterPrice"), image: harvesterImg, desc: t("harvesterDesc") },
    { name: t("waterPump"), price: t("waterPumpPrice"), image: pumpImg, desc: t("waterPumpDesc") },
    { name: t("seedDrill"), price: t("seedDrillPrice"), image: seedDrillImg, desc: t("seedDrillDesc") },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    width: 100%;
  }
        * { box-sizing: border-box; }
        @keyframes heroIn   { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes cardIn   { from { opacity:0; transform:translateY(22px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes pulseDot { 0%,100% { box-shadow:0 0 7px #34d399; } 50% { box-shadow:0 0 18px #34d399; } }
        @keyframes shimmerBg { 0%,100% { background-position:0% 50%; } 50% { background-position:100% 50%; } }
        @keyframes scanLine  { from { top:-2px; } to { top:100%; } }
        @keyframes orbFloat1 { 0%,100% { transform:translate(0,0) scale(1); } 33% { transform:translate(30px,-20px) scale(1.05); } 66% { transform:translate(-14px,24px) scale(0.97); } }
        @keyframes orbFloat2 { 0%,100% { transform:translate(0,0) scale(1); } 33% { transform:translate(-22px,18px) scale(1.04); } 66% { transform:translate(20px,-28px) scale(0.96); } }
        @keyframes orbFloat3 { 0%,100% { transform:translate(0,0) scale(1); } 50% { transform:translate(14px,-14px) scale(1.06); } }
        @keyframes particleDrift { from { transform:translateY(0); opacity:0.06; } to { transform:translateY(-20px); opacity:0.35; } }
        /* Swiper overrides */
        .booking-swiper .swiper-button-next,
        .booking-swiper .swiper-button-prev { color: #34d399 !important; background: rgba(52,211,153,0.10); border: 1px solid rgba(52,211,153,0.25); border-radius: 50%; width: 40px !important; height: 40px !important; }
        .booking-swiper .swiper-button-next::after,
        .booking-swiper .swiper-button-prev::after { font-size: 14px !important; }
        .booking-swiper .swiper-pagination-bullet { background: rgba(255,255,255,0.3) !important; }
        .booking-swiper .swiper-pagination-bullet-active { background: #34d399 !important; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        ::-webkit-scrollbar-thumb { background: rgba(52,211,153,0.28); border-radius: 99px; }
        input::placeholder { color: rgba(255,255,255,0.28); }
        select option { background: #0a1a0d; color: #fff; }
      `}</style>

      <div style={{ fontFamily: "'Syne', 'Segoe UI', sans-serif", background: "linear-gradient(160deg,#020c06 0%,#041510 40%,#030d08 100%)", color: "#fff", minHeight: "100vh", position: "relative", overflowX: "hidden", width: "100%" }}>
        <Particles />

        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "80px 28px 60px", display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "center", justifyContent: "center" }}>

          {/* Left */}
          <div style={{ flex: "1 1 340px", maxWidth: "520px", animation: "heroIn 0.8s both ease" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(52,211,153,0.10)", border: "1px solid rgba(52,211,153,0.28)", borderRadius: "99px", padding: "5px 16px", marginBottom: "22px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#34d399", boxShadow: "0 0 8px #34d399", animation: "pulseDot 2s infinite", display: "inline-block" }} />
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#34d399", letterSpacing: "2px", textTransform: "uppercase" }}>Equipment Rentals · Live</span>
            </div>

            <h1 style={{ margin: "0 0 16px", fontSize: "clamp(32px,5vw,58px)", fontWeight: "900", lineHeight: 1.0, letterSpacing: "-1.5px" }}>
              {t("bookingHeading")}
              <span style={{ display: "block", background: "linear-gradient(90deg,#34d399,#6ee7b7,#a7f3d0)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmerBg 4s ease infinite" }}>
                at Your Doorstep
              </span>
            </h1>

            <p style={{ margin: "0 0 36px", fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif" }}>
              {t("bookingSubHeading")}
            </p>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <button
                onClick={scrollToItem}
                style={{ padding: "14px 30px", borderRadius: "99px", border: "none", background: "linear-gradient(135deg,#059669,#047857)", color: "#fff", fontSize: "14px", fontWeight: "800", fontFamily: "inherit", cursor: "pointer", boxShadow: "0 6px 26px rgba(5,150,105,0.40)", transition: "transform 0.2s, box-shadow 0.2s", letterSpacing: "0.3px" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(5,150,105,0.55)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 26px rgba(5,150,105,0.40)"; }}
              >
                {t("seePrices")} ↓
              </button>
              <a href="/smart-farming" style={{ padding: "14px 28px", borderRadius: "99px", border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", fontSize: "14px", fontWeight: "700", fontFamily: "inherit", textDecoration: "none", transition: "all 0.2s", letterSpacing: "0.3px" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(52,211,153,0.08)"; e.currentTarget.style.borderColor = "rgba(52,211,153,0.35)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
              >
                Smart Farming →
              </a>
            </div>

            {/* Trust chips */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "28px" }}>
              {[{ icon: "✅", text: "Verified Equipment" }, { icon: "📅", text: "Flexible Booking" }, { icon: "💰", text: "Best Prices" }].map((c) => (
                <div key={c.text} style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "99px", padding: "6px 14px", fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: "600" }}>
                  {c.icon} {c.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right — hero image */}
          <div style={{ flex: "1 1 300px", maxWidth: "460px", animation: "heroIn 0.8s 120ms both ease", position: "relative" }}>
            <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.6)", border: "1px solid rgba(52,211,153,0.18)", position: "relative" }}>
              <img src={krishi} alt="Farming Equipment" style={{ width: "100%", height: "auto", display: "block", transition: "transform 0.5s ease" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,12,6,0.4), transparent 50%)" }} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.5), transparent)" }} />
            </div>
            {/* Floating stat */}
            <div style={{ position: "absolute", bottom: "-16px", left: "-16px", background: "linear-gradient(135deg,rgba(5,150,105,0.95),rgba(4,120,87,0.95))", borderRadius: "16px", padding: "14px 20px", boxShadow: "0 10px 28px rgba(5,150,105,0.45)", backdropFilter: "blur(10px)", border: "1px solid rgba(52,211,153,0.3)" }}>
              <div style={{ fontSize: "24px", fontWeight: "900", color: "#fff", lineHeight: 1 }}>50K+</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.7)", letterSpacing: "1px", textTransform: "uppercase", marginTop: "3px" }}>Happy Farmers</div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SUGGESTIONS
        ══════════════════════════════════════ */}
        <section style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "60px 28px" }}>
          <SectionDivider label={t("suggestions")} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
            {suggestions.map((item, i) => (
              <SuggestionCard key={i} {...item} index={i} />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            SWIPER CAROUSEL
        ══════════════════════════════════════ */}
        <section style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "0 28px 80px" }}>
          <SectionDivider label="Featured Equipment" />

          <Panel style={{ padding: "28px 24px 36px" }}>
            <Swiper
              className="booking-swiper"
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView="auto"
              navigation
              pagination={{ clickable: true }}
              grabCursor
              autoplay={{ delay: 3200, disableOnInteraction: false }}
              style={{ paddingBottom: "40px" }}
            >
              {equipments.map((item, index) => (
                <SwiperSlide key={index} style={{ width: "280px" }}>
                  <div style={{
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(52,211,153,0.12)",
                    borderRadius: "20px", overflow: "hidden",
                    transition: "transform 0.25s, border-color 0.25s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(52,211,153,0.3)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(52,211,153,0.12)"; }}
                  >
                    <div style={{ height: "220px", overflow: "hidden", background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                      />
                    </div>
                    <div style={{ padding: "16px 18px 20px" }}>
                      <div style={{ fontSize: "16px", fontWeight: "800", color: "#fff", marginBottom: "6px" }}>{item.name}</div>
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.55 }}>{item.desc}</div>
                      <div style={{ marginTop: "12px", fontSize: "18px", fontWeight: "900", color: "#34d399" }}>{item.price}</div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Panel>
        </section>

        {/* ══════════════════════════════════════
            RENTAL LISTINGS
        ══════════════════════════════════════ */}
        <section ref={itemRef} style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "0 28px 80px" }}>
          <SectionDivider label="All Equipment" />

          {/* Search + Filter bar */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "32px", alignItems: "center" }}>
            {/* Search input */}
            <div style={{ position: "relative", flex: "1 1 280px", minWidth: "220px" }}>
              <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontSize: "15px", pointerEvents: "none" }}>🔍</span>
              <input
                type="text"
                placeholder={t("searchHere")}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                style={{
                  width: "100%", padding: "13px 18px 13px 44px",
                  borderRadius: "14px",
                  border: `1.5px solid ${inputFocused ? "rgba(52,211,153,0.5)" : "rgba(255,255,255,0.10)"}`,
                  background: "rgba(255,255,255,0.05)", color: "#fff",
                  fontSize: "14px", fontFamily: "inherit", outline: "none",
                  backdropFilter: "blur(10px)", transition: "border-color 0.2s",
                }}
              />
            </div>

            {/* Category pills */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "10px 18px", borderRadius: "99px", border: "none", fontFamily: "inherit",
                    background: selectedCategory === cat ? "linear-gradient(135deg,#059669,#047857)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${selectedCategory === cat ? "rgba(52,211,153,0.4)" : "rgba(255,255,255,0.10)"}`,
                    color: selectedCategory === cat ? "#fff" : "rgba(255,255,255,0.5)",
                    fontSize: "13px", fontWeight: "700", cursor: "pointer",
                    boxShadow: selectedCategory === cat ? "0 4px 16px rgba(5,150,105,0.35)" : "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { if (selectedCategory !== cat) { e.currentTarget.style.background = "rgba(52,211,153,0.08)"; e.currentTarget.style.color = "#fff"; } }}
                  onMouseLeave={e => { if (selectedCategory !== cat) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; } }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Result count */}
            {filteredTools.length > 0 && (
              <div style={{ marginLeft: "auto", fontSize: "12px", color: "rgba(255,255,255,0.35)", fontWeight: "600" }}>
                {filteredTools.length} items found
              </div>
            )}
          </div>

          {/* Loading */}
          {loadingAll && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "20px" }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{ height: "340px", borderRadius: "20px", background: "rgba(255,255,255,0.04)", animation: `skeletonPulse 1.4s ${i * 100}ms ease-in-out infinite` }} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loadingAll && filteredTools.length === 0 && (
            <Panel style={{ textAlign: "center", padding: "60px 24px" }}>
              <div style={{ fontSize: "52px", marginBottom: "16px", opacity: 0.5 }}>🚜</div>
              <div style={{ fontSize: "17px", fontWeight: "700", color: "rgba(255,255,255,0.45)", marginBottom: "8px" }}>No equipment found</div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.28)" }}>Try adjusting your search or category filter.</div>
            </Panel>
          )}

          {/* Cards grid */}
          {!loadingAll && filteredTools.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "20px" }}>
              {filteredTools.map((tool, i) => (
                <ToolCard key={tool._id} tool={tool} t={t} index={i} />
              ))}
            </div>
          )}
        </section>

        {/* Inline keyframes */}
        <style>{`
          @keyframes skeletonPulse { 0%,100% { opacity:0.35; } 50% { opacity:0.7; } }
        `}</style>
      </div>
    </>
  );
};

export default BookingPage;