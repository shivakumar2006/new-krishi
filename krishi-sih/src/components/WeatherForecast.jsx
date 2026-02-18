// components/WeatherForecast.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetForecastQuery } from '../store/api/WeatherApi';
import { useTranslation } from "react-i18next";

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_KEY;

// ── Sub-components ─────────────────────────────────────────────────────────────

const StatCard = ({ label, value, icon, delay = 0 }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: "20px",
      padding: "22px 20px",
      textAlign: "center",
      backdropFilter: "blur(16px)",
      animation: `cardIn 0.6s ${delay}ms both ease`,
      transition: "transform 0.25s, border-color 0.25s, background 0.25s",
      cursor: "default",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
      e.currentTarget.style.borderColor = "rgba(100,210,255,0.35)";
      e.currentTarget.style.background = "rgba(100,210,255,0.10)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "translateY(0) scale(1)";
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
      e.currentTarget.style.background = "rgba(255,255,255,0.06)";
    }}
  >
    <div style={{ fontSize: "26px", marginBottom: "10px" }}>{icon}</div>
    <div style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "8px", fontWeight: 600 }}>{label}</div>
    <div style={{ fontSize: "24px", fontWeight: "800", color: "#fff", letterSpacing: "-0.5px" }}>{value}</div>
  </div>
);

const ForecastCard = ({ day, index }) => (
  <div
    style={{
      minWidth: "140px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.09)",
      borderRadius: "20px",
      padding: "18px 14px",
      textAlign: "center",
      backdropFilter: "blur(12px)",
      animation: `slideUp 0.5s ${100 + index * 60}ms both ease`,
      transition: "transform 0.2s, background 0.2s, border-color 0.2s",
      cursor: "default",
      flexShrink: 0,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-6px)";
      e.currentTarget.style.background = "rgba(255,255,255,0.11)";
      e.currentTarget.style.borderColor = "rgba(100,255,200,0.3)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
    }}
  >
    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "10px", fontWeight: 600, letterSpacing: "0.5px" }}>{day.date}</p>
    <img src={`https:${day.day.condition.icon}`} alt="icon" style={{ width: "48px", margin: "0 auto 10px" }} />
    <p style={{ fontSize: "22px", fontWeight: "800", color: "#fff", letterSpacing: "-0.5px" }}>{Math.round(day.day.avgtemp_c)}°</p>
    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", marginTop: "5px", lineHeight: 1.4 }}>{day.day.condition.text}</p>
    <div style={{ marginTop: "10px", display: "inline-flex", alignItems: "center", gap: "4px", background: "rgba(100,200,255,0.12)", borderRadius: "99px", padding: "3px 9px" }}>
      <span style={{ fontSize: "10px" }}>💧</span>
      <span style={{ fontSize: "11px", color: "#7dd9ff", fontWeight: "700" }}>{day.day.avghumidity}%</span>
    </div>
  </div>
);

// ── Stars (memoized so they don't re-render on clock tick) ─────────────────────
const Stars = React.memo(() => (
  <>
    {[...Array(60)].map((_, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          borderRadius: "50%",
          background: "#fff",
          opacity: Math.random() * 0.5 + 0.1,
          width: `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `twinkle ${2 + Math.random() * 3}s ${Math.random() * 3}s infinite alternate`,
        }}
      />
    ))}
  </>
));

// ── Main Component ──────────────────────────────────────────────────────────────

function WeatherForecast() {
  const { t } = useTranslation();

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('new delhi');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputFocused, setInputFocused] = useState(false);
  const [time, setTime] = useState(new Date());

  const { data: forecastData } = useGetForecastQuery({ city, days: 7 });
  const forecast = forecastData?.forecast?.forecastday || [];
  const displayData = forecast;

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError(t("unableToFetch"));
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleCityChange = (e) => setCity(e.target.value);
  const handleFetchClick = () => fetchWeather();
  const handleKeyDown = (e) => { if (e.key === 'Enter') fetchWeather(); };

  const getFarmingAdvice = (temp, humidity, windSpeed, rain) => {
    const advice = [];
    if (rain > 70) advice.push(t("adv_rain_high"));
    else advice.push(t("adv_irrigation_good"));
    if (windSpeed > 6) advice.push(t("adv_wind_high"));
    else advice.push(t("adv_pesticide_good"));
    if (temp >= 18 && temp <= 30) advice.push(t("adv_temp_good"));
    else advice.push(t("adv_temp_bad"));
    if (humidity > 80) advice.push(t("adv_humidity_high"));
    if (temp <= 5) advice.push(t("adv_frost_risk"));
    if (temp >= 35) advice.push(t("adv_heat_stress"));
    return advice;
  };

  const advice = weather
    ? getFarmingAdvice(weather.main.temp, weather.main.humidity, weather.wind.speed, weather.clouds.all)
    : [];

  const tempColor = weather
    ? weather.main.temp > 35 ? "#ff7066"
      : weather.main.temp > 25 ? "#ffc36b"
        : "#7dd9ff"
    : "#fff";

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      background: "linear-gradient(160deg, #03080f 0%, #071428 45%, #050e24 100%)",
      fontFamily: "'Outfit', 'Segoe UI', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* ── Atmospheric background ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <Stars />
        <div style={{ position: "absolute", top: "-15%", left: "-10%", width: "55vw", height: "55vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(30,100,200,0.15) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", bottom: "-5%", right: "-5%", width: "45vw", height: "45vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,130,0.10) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", top: "40%", left: "60%", width: "30vw", height: "30vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(60,60,180,0.08) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "200px", background: "linear-gradient(to top, rgba(0,120,255,0.07), transparent)" }} />
      </div>

      {/* ── Main content ── */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto", padding: "48px 20px 64px" }}>

        {/* Title bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "44px", flexWrap: "wrap", gap: "14px", animation: "fadeDown 0.7s both ease" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(100,180,255,0.12)", border: "1px solid rgba(100,180,255,0.25)", borderRadius: "99px", padding: "5px 14px", marginBottom: "12px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#64cfff", display: "inline-block", boxShadow: "0 0 8px #64cfff", animation: "pulseDot 2s infinite" }} />
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#64cfff", letterSpacing: "2px", textTransform: "uppercase" }}>Live Data</span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(24px,4vw,36px)", fontWeight: "800", color: "#fff", letterSpacing: "-0.5px", lineHeight: 1.1 }}>
              🌤️ {t("liveWeatherForecast")}
            </h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "28px", fontWeight: "800", color: "#fff", fontVariantNumeric: "tabular-nums", letterSpacing: "2px" }}>
              {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginTop: "3px", letterSpacing: "0.5px" }}>
              {time.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "40px", animation: "fadeDown 0.7s 80ms both ease" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <span style={{ position: "absolute", left: "18px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", pointerEvents: "none" }}>🔍</span>
            <input
              type="text"
              value={city}
              onChange={handleCityChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder={t("enterCity")}
              style={{
                width: "100%",
                padding: "16px 20px 16px 48px",
                borderRadius: "16px",
                border: `1.5px solid ${inputFocused ? "rgba(100,200,255,0.5)" : "rgba(255,255,255,0.10)"}`,
                background: "rgba(255,255,255,0.06)",
                color: "#fff",
                fontSize: "15px",
                fontFamily: "inherit",
                outline: "none",
                backdropFilter: "blur(10px)",
                transition: "border-color 0.2s, background 0.2s",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            onClick={handleFetchClick}
            style={{
              padding: "16px 30px",
              borderRadius: "16px",
              border: "none",
              background: "linear-gradient(135deg, #1a88ff, #0055cc)",
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
              fontFamily: "inherit",
              cursor: "pointer",
              boxShadow: "0 6px 24px rgba(26,136,255,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(26,136,255,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(26,136,255,0.35)"; }}
          >
            {t("search")}
          </button>
        </div>

        {/* Loading state */}
        {loading && (
          <div style={{ textAlign: "center", color: "#7dd9ff", fontSize: "15px", padding: "40px 0" }}>
            <span style={{ display: "inline-block", animation: "spin 1s linear infinite", marginRight: "8px", fontSize: "20px" }}>⟳</span>
            {t("loadingWeather")}
          </div>
        )}

        {/* Error state */}
        {error && (
          <p style={{ textAlign: "center", color: "#ff7066", fontSize: "14px", marginBottom: "16px", background: "rgba(255,112,102,0.1)", border: "1px solid rgba(255,112,102,0.2)", borderRadius: "12px", padding: "12px 20px" }}>
            ⚠️ {error}
          </p>
        )}

        {/* Current weather hero */}
        {weather && (
          <div
            style={{
              background: "linear-gradient(135deg, rgba(20,60,120,0.60) 0%, rgba(10,30,80,0.60) 100%)",
              border: "1px solid rgba(100,180,255,0.18)",
              borderRadius: "28px",
              padding: "36px 32px",
              marginBottom: "24px",
              backdropFilter: "blur(20px)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
              animation: "fadeDown 0.7s 160ms both ease",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Temperature-reactive inner glow */}
            <div style={{ position: "absolute", top: "-40%", right: "-10%", width: "320px", height: "320px", borderRadius: "50%", background: `radial-gradient(circle, ${tempColor}18 0%, transparent 65%)`, pointerEvents: "none" }} />

            <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "center", position: "relative" }}>

              {/* Left — temp display */}
              <div style={{ flex: "0 0 auto", textAlign: "center" }}>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  alt="Weather Icon"
                  style={{ width: "110px", filter: "drop-shadow(0 0 20px rgba(255,255,255,0.2))" }}
                />
                <div style={{ fontSize: "clamp(54px,10vw,80px)", fontWeight: "900", color: "#fff", lineHeight: 1, letterSpacing: "-3px" }}>
                  {Math.round(weather.main.temp)}
                  <span style={{ fontSize: "28px", fontWeight: "400", color: tempColor, verticalAlign: "super" }}>°C</span>
                </div>
                <div style={{ fontSize: "16px", fontWeight: "600", color: "#fff", marginTop: "6px" }}>
                  {weather.name}, <span style={{ color: "rgba(255,255,255,0.5)" }}>{weather.sys.country}</span>
                </div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.40)", marginTop: "4px", textTransform: "capitalize", letterSpacing: "0.5px" }}>
                  {weather.weather[0].description}
                </div>
              </div>

              {/* Right — stat cards */}
              <div style={{ flex: 1, minWidth: "260px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <StatCard label={t("feelsLike")} value={`${Math.round(weather.main.feels_like)}°C`} icon="🌡️" delay={200} />
                <StatCard label={t("humidity")} value={`${weather.main.humidity}%`} icon="💧" delay={260} />
                <StatCard label={t("windSpeed")} value={`${weather.wind.speed} m/s`} icon="💨" delay={320} />
                <StatCard label={t("pressure")} value={`${weather.main.pressure} hPa`} icon="🧭" delay={380} />
              </div>
            </div>
          </div>
        )}

        {/* 7-day forecast */}
        {displayData.length > 0 && (
          <div style={{ marginBottom: "24px", animation: "fadeDown 0.7s 260ms both ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
              <span style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.07)" }} />
              <h3 style={{ margin: 0, fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontWeight: "700" }}>
                {t("sevenDayForecast")}
              </h3>
              <span style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.07)" }} />
            </div>
            <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "8px" }}>
              {displayData.map((day, index) => (
                <ForecastCard key={index} day={day} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Farming advice */}
        {weather && advice.length > 0 && (
          <div
            style={{
              background: "linear-gradient(135deg, rgba(0,60,30,0.55) 0%, rgba(0,40,20,0.55) 100%)",
              border: "1px solid rgba(50,200,100,0.18)",
              borderRadius: "24px",
              padding: "28px",
              backdropFilter: "blur(16px)",
              animation: "fadeDown 0.7s 340ms both ease",
              boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <span style={{ fontSize: "20px" }}>🌾</span>
              <h2 style={{ margin: 0, fontSize: "14px", fontWeight: "800", letterSpacing: "2px", textTransform: "uppercase", color: "#4dffa0" }}>
                {t("farmingAdvice")}
              </h2>
              <span style={{ marginLeft: "auto", fontSize: "11px", color: "rgba(77,255,160,0.5)", border: "1px solid rgba(77,255,160,0.2)", borderRadius: "99px", padding: "3px 10px", fontWeight: "600", letterSpacing: "1px" }}>
                AI Insights
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {advice.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    padding: "14px 16px",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.6,
                    animation: `slideUp 0.4s ${index * 80}ms both ease`,
                    transition: "background 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(77,255,160,0.06)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "36px", color: "rgba(255,255,255,0.15)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}>
          AgriWeather Intelligence · Powered by Real-time Data
        </div>
      </div>

      {/* ── Global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #64cfff; }
          50%       { opacity: 0.4; box-shadow: 0 0 14px #64cfff; }
        }
        @keyframes twinkle {
          from { opacity: 0.1; }
          to   { opacity: 0.7; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        ::-webkit-scrollbar { height: 4px; width: 4px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
        ::-webkit-scrollbar-thumb { background: rgba(100,200,255,0.25); border-radius: 99px; }
        input::placeholder { color: rgba(255,255,255,0.3); }
      `}</style>
    </div>
  );
}

export default WeatherForecast;