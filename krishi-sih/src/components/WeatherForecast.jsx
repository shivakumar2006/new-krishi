// components/WeatherForecast.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetForecastQuery } from '../store/api/WeatherApi';
import { useTranslation } from "react-i18next";

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_KEY;

function WeatherForecast() {
  const { t } = useTranslation();

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('new delhi');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data: forecastData } = useGetForecastQuery({
    city,
    days: 7,
  });

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

  const handleCityChange = (e) => setCity(e.target.value);
  const handleFetchClick = () => fetchWeather();

  // Farming advice translations
  const getFarmingAdvice = (temp, humidity, windSpeed, rain) => {
    let advice = [];

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
    ? getFarmingAdvice(
      weather.main.temp,
      weather.main.humidity,
      weather.wind.speed,
      weather.clouds.all
    )
    : [];


  return (
    <div className="w-full min-h-screen overflow-hidden flex flex-col gap-10 items-center 
                justify-start md:justify-center 
                py-6 md:py-0
                bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] rounded-3xl">

      <div className="w-full max-w-5xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6 md:p-10 text-white">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10 tracking-wide">
          🌤️ {t("liveWeatherForecast")}
        </h2>

        {/* Search bar */}
        <div className="flex items-center justify-center gap-4 mb-10 flex-wrap">
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            className="flex-1 min-w-[230px] max-w-md px-5 py-3 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-white placeholder:text-gray-300 focus:outline-none"
            placeholder={t("enterCity")}
          />

          <button
            onClick={handleFetchClick}
            className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-full font-semibold shadow-xl transition"
          >
            {t("search")}
          </button>
        </div>

        {loading && <p className="text-center text-blue-300">{t("loadingWeather")}</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        {/* Current weather */}
        {weather && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">

            <div className="flex flex-col pl-0 md:pl-20 items-center md:items-start gap-2 flex-1 text-center md:text-left">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt="Weather Icon"
                className="w-28"
              />

              <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
                {Math.round(weather.main.temp)}°
                <span className="text-2xl align-top ml-1">C</span>
              </h1>

              <h2 className="text-xl font-medium">
                {weather.name}, {weather.sys.country}
              </h2>

              <p className="capitalize text-gray-300">
                {weather.weather[0].description}
              </p>

            </div>

            {/* Right box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1 w-full">

              <div className="glass-card bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg border border-white/20">
                <p className="text-gray-300">{t("feelsLike")}</p>
                <p className="text-2xl font-bold mt-1">
                  {Math.round(weather.main.feels_like)}°C
                </p>
              </div>

              <div className="glass-card bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg border border-white/20">
                <p className="text-gray-300">{t("humidity")}</p>
                <p className="text-2xl font-bold mt-1">
                  {weather.main.humidity}%
                </p>
              </div>

              <div className="glass-card bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg border border-white/20">
                <p className="text-gray-300">{t("windSpeed")}</p>
                <p className="text-2xl font-bold mt-1">
                  {weather.wind.speed} m/s
                </p>
              </div>

              <div className="glass-card bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg border border-white/20">
                <p className="text-gray-300">{t("pressure")}</p>
                <p className="text-2xl font-bold mt-1">
                  {weather.main.pressure} hPa
                </p>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Forecast */}
      {displayData.length > 0 && (
        <div className="mt-5">

          <h3 className="text-xl text-white font-semibold mb-6 text-center">
            {t("sevenDayForecast")}
          </h3>

          <div className="flex gap-6 overflow-x-auto pb-4 w-full px-2 md:px-0">

            {displayData.map((day, index) => (
              <div
                key={index}
                className="min-w-[180px] sm:min-w-[160px] max-w-[180px] sm:max-w-[160px]
                bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl p-4
                text-center shadow-lg flex flex-col justify-between"
              >

                <p className="text-sm text-gray-300 mb-2">{day.date}</p>
                <img src={`https:${day.day.condition.icon}`} alt="icon" className="mx-auto w-12" />

                <p className="text-xl text-white font-bold mt-2">
                  {Math.round(day.day.avgtemp_c)}°C
                </p>

                <p className="text-sm text-gray-300 capitalize mt-1">
                  {day.day.condition.text}
                </p>

                <p className="text-xs mt-2 text-gray-400">
                  💧 {day.day.avghumidity}%
                </p>
              </div>
            ))}

          </div>
        </div>
      )}

      {/* Farming Advice */}
      {weather && advice.length > 0 && (
        <div className="mt-6 bg-[#1f2937] p-5 rounded-xl text-white w-full max-w-5xl mx-auto">
          <h2 className="text-lg font-bold mb-3">🌾 {t("farmingAdvice")}</h2>

          <ul className="space-y-2 text-sm">
            {advice.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

export default WeatherForecast;
