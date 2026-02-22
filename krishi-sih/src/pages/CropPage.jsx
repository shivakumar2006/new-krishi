import React, { useState } from "react";
import {
    useGetCropsQuery,
    useGetCropsByCategoryQuery,
} from "../store/api/CropsApi";
import { useAddToCartMutation } from "../store/api/CartApi";
import { toast, Bounce } from "react-toastify";

const CATEGORIES = [
    { key: "All", icon: "🌿", color: "#34d399" },
    { key: "Careal Crops", icon: "🌾", color: "#fcd34d" },
    { key: "Cash Crops", icon: "💰", color: "#86efac" },
    { key: "Oil Seeds", icon: "🫙", color: "#fdba74" },
    { key: "Plantation Crops", icon: "🌴", color: "#6ee7b7" },
];

// ── Toast notification ────────────────────────────────────────────────────────
const Toast = ({ message, type }) => (
    <div style={{
        position: "fixed", bottom: "28px", right: "28px", zIndex: 9999,
        display: "flex", alignItems: "center", gap: "10px",
        background: type === "success" ? "rgba(5,150,105,0.95)" : "rgba(220,38,38,0.95)",
        border: `1px solid ${type === "success" ? "rgba(52,211,153,0.4)" : "rgba(239,68,68,0.4)"}`,
        borderRadius: "16px", padding: "14px 20px",
        backdropFilter: "blur(16px)",
        boxShadow: "0 12px 36px rgba(0,0,0,0.4)",
        animation: "toastIn 0.35s both ease",
        color: "#fff", fontSize: "14px", fontWeight: "700",
    }}>
        <span style={{ fontSize: "18px" }}>{type === "success" ? "✅" : "❌"}</span>
        {message}
    </div>
);

// ── Crop card ─────────────────────────────────────────────────────────────────
const CropCard = ({ crop, onAddToCart, adding, index }) => {
    const [hovered, setHovered] = useState(false);
    const cat = CATEGORIES.find(c => c.key === crop.category) || CATEGORIES[0];

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${hovered ? "rgba(52,211,153,0.25)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: "20px",
                overflow: "hidden",
                display: "flex", flexDirection: "column",
                backdropFilter: "blur(16px)",
                boxShadow: hovered ? "0 20px 52px rgba(0,0,0,0.5)" : "0 6px 24px rgba(0,0,0,0.3)",
                transform: hovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
                transition: "all 0.3s cubic-bezier(0.34,1.2,0.64,1)",
                animation: `cardIn 0.5s ${Math.min(index * 60, 500)}ms both ease`,
                position: "relative",
            }}
        >
            {/* Top accent line */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: hovered ? "linear-gradient(90deg,transparent,rgba(52,211,153,0.5),transparent)" : "linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)", transition: "background 0.3s", zIndex: 1 }} />

            {/* Image */}
            <div style={{ position: "relative", height: "180px", overflow: "hidden", background: "rgba(0,0,0,0.3)", flexShrink: 0 }}>
                <img
                    src={`http://localhost:8000/images/${crop.image}`}
                    alt={crop.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", transform: hovered ? "scale(1.07)" : "scale(1)" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,12,6,0.6) 0%, transparent 55%)" }} />

                {/* Category badge on image */}
                <div style={{ position: "absolute", top: "10px", left: "10px", display: "flex", alignItems: "center", gap: "5px", background: "rgba(2,12,6,0.75)", border: `1px solid ${cat.color}40`, borderRadius: "99px", padding: "3px 10px", backdropFilter: "blur(8px)" }}>
                    <span style={{ fontSize: "11px" }}>{cat.icon}</span>
                    <span style={{ fontSize: "10px", fontWeight: "700", color: cat.color, letterSpacing: "0.5px" }}>{crop.category}</span>
                </div>
            </div>

            {/* Body */}
            <div style={{ padding: "16px 18px 18px", flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ fontSize: "16px", fontWeight: "800", color: "#fff", letterSpacing: "-0.2px", lineHeight: 1.2 }}>
                    {crop.name}
                </div>

                <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginTop: "4px" }}>
                    <span style={{ fontSize: "22px", fontWeight: "900", color: "#34d399", letterSpacing: "-0.5px" }}>₹{crop.price}</span>
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", fontWeight: "500" }}>/kg</span>
                </div>

                {/* Add to cart button */}
                <button
                    onClick={() => onAddToCart(crop)}
                    disabled={adding}
                    style={{
                        marginTop: "12px",
                        padding: "11px 16px",
                        borderRadius: "12px",
                        border: "none",
                        background: adding ? "rgba(52,211,153,0.12)" : hovered ? "linear-gradient(135deg,#059669,#047857)" : "rgba(52,211,153,0.10)",
                        border: `1px solid ${adding ? "rgba(52,211,153,0.2)" : hovered ? "transparent" : "rgba(52,211,153,0.22)"}`,
                        color: adding ? "rgba(52,211,153,0.5)" : "#fff",
                        fontSize: "13px", fontWeight: "800", fontFamily: "inherit",
                        cursor: adding ? "not-allowed" : "pointer",
                        letterSpacing: "0.3px",
                        boxShadow: hovered && !adding ? "0 4px 18px rgba(5,150,105,0.4)" : "none",
                        transition: "all 0.25s",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
                    }}
                >
                    {adding ? (
                        <>
                            <span style={{ display: "inline-block", width: "14px", height: "14px", border: "2px solid rgba(52,211,153,0.3)", borderTopColor: "#34d399", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                            Adding…
                        </>
                    ) : (
                        <>🛒 Add to Cart</>
                    )}
                </button>
            </div>
        </div>
    );
};

// ── Main component ─────────────────────────────────────────────────────────────
const CropPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [toast, setToast] = useState(null);
    const [addingId, setAddingId] = useState(null);

    const allData = useGetCropsQuery(undefined, { skip: selectedCategory !== "All" });
    const categoryData = useGetCropsByCategoryQuery(selectedCategory, { skip: selectedCategory === "All" });
    const [addToCart] = useAddToCartMutation();

    const data = selectedCategory === "All" ? allData.data : categoryData.data;
    const loading = selectedCategory === "All" ? allData.isLoading : categoryData.isLoading;
    const error = selectedCategory === "All" ? allData.error : categoryData.error;

    // const showToast = (message, type = "success") => {
    //     setToast({ message, type });
    //     setTimeout(() => setToast(null), 3000);
    // };

    const handleAddToCart = async (crop) => {
        setAddingId(crop._id);
        const item = {
            itemId: crop._id.toString(),
            service: "crop",
            name: crop.name,
            price: crop.price,
            image: crop.image,
            category: crop.category,
            quantity: 1,
        };
        try {
            await addToCart(item).unwrap();
            toast.success(`${crop.name} added to cart!`, "success", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } catch (err) {
            console.error(err);
            toast.error("Failed to add to cart", "error", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } finally {
            setAddingId(null);
        }
    };

    const activeCat = CATEGORIES.find(c => c.key === selectedCategory) || CATEGORIES[0];

    return (
        <>
            <style>{`
        @keyframes cardIn { from { opacity:0; transform:translateY(20px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes spin    { to { transform:rotate(360deg); } }
        @keyframes toastIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
        select option { background: #0a1a0d; color: #fff; }
      `}</style>

            {/* Toast */}
            {toast && <Toast message={toast.message} type={toast.type} />}

            {/* ── Toolbar ── */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "14px" }}>

                {/* Category pill strip */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {CATEGORIES.map((cat) => {
                        const isActive = selectedCategory === cat.key;
                        return (
                            <button
                                key={cat.key}
                                onClick={() => setSelectedCategory(cat.key)}
                                style={{
                                    display: "flex", alignItems: "center", gap: "7px",
                                    padding: "9px 16px", borderRadius: "12px",
                                    border: `1px solid ${isActive ? `${cat.color}45` : "rgba(255,255,255,0.08)"}`,
                                    background: isActive ? `${cat.color}18` : "rgba(255,255,255,0.04)",
                                    color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                                    fontSize: "13px", fontWeight: "700", fontFamily: "inherit",
                                    cursor: "pointer",
                                    boxShadow: isActive ? `0 4px 16px ${cat.color}28` : "none",
                                    transition: "all 0.2s",
                                }}
                                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#fff"; } }}
                                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; } }}
                            >
                                <span>{cat.icon}</span>
                                <span>{cat.key}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Result count */}
                {data && (
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.32)", fontWeight: "600", animation: "fadeIn 0.3s both ease" }}>
                        {data.length} {data.length === 1 ? "crop" : "crops"} found
                    </div>
                )}
            </div>

            {/* ── States ── */}
            {loading && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "16px" }}>
                    {[...Array(8)].map((_, i) => (
                        <div key={i} style={{ height: "280px", borderRadius: "20px", background: "rgba(255,255,255,0.04)", animation: `skeletonPulse 1.4s ${i * 100}ms ease-in-out infinite` }} />
                    ))}
                    <style>{`@keyframes skeletonPulse { 0%,100% { opacity:0.35; } 50% { opacity:0.7; } }`}</style>
                </div>
            )}

            {error && (
                <div style={{ textAlign: "center", padding: "60px 24px", background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.18)", borderRadius: "20px" }}>
                    <div style={{ fontSize: "40px", marginBottom: "14px" }}>⚠️</div>
                    <div style={{ fontSize: "15px", fontWeight: "700", color: "#f87171" }}>Failed to load crops</div>
                    <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", marginTop: "6px" }}>Please check your connection and try again.</div>
                </div>
            )}

            {!loading && !error && data?.length === 0 && (
                <div style={{ textAlign: "center", padding: "60px 24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px" }}>
                    <div style={{ fontSize: "48px", marginBottom: "14px" }}>{activeCat.icon}</div>
                    <div style={{ fontSize: "16px", fontWeight: "700", color: "rgba(255,255,255,0.4)" }}>No crops in this category</div>
                </div>
            )}

            {/* ── Crop grid ── */}
            {!loading && !error && data?.length > 0 && (
                <div
                    key={selectedCategory}
                    style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "16px" }}
                >
                    {data.map((crop, i) => (
                        <CropCard
                            key={crop._id}
                            crop={crop}
                            index={i}
                            onAddToCart={handleAddToCart}
                            adding={addingId === crop._id}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default CropPage;