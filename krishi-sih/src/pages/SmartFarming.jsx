import React, { useState } from "react";
import WeatherForcast from "../components/WeatherForecast";

import CropRecommendation from "./CropRecommend";
import SoilHealth from "./SoilDetection";
import IrrigationScheduler from "./IrrigationSchedule";

import { useTranslation } from "react-i18next";

const SmartFarming = () => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("crop");

  return (
    <section className="bg-white py-12 px-4 md:px-16">

      {/* Dashboard Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-700">
          {t("smartFarmingDashboard")}
        </h1>
        <p className="text-gray-600 mt-2">{t("smartFarmingSubtitle")}</p>
      </div>

      {/* WEATHER ALWAYS ON TOP */}
      <div className="w-full flex flex-col items-center mb-10">
        <p className="font-extralight text-3xl pb-5">
          {t("weatherMonitoring")}
        </p>

        <div className="w-full">
          <WeatherForcast />
        </div>
      </div>

      {/* 🔥 TABS BELOW WEATHER */}
      <div className="flex justify-center mb-6">
        <div className="flex gap-3 bg-green-50 px-4 py-2 rounded-xl shadow border">

          <button
            onClick={() => setActiveTab("crop")}
            className={`px-4 py-2 rounded-lg font-medium transition 
            ${activeTab === "crop"
                ? "bg-green-600 text-white"
                : "bg-white text-green-800 border"
              }`}
          >
            🌾 {t("cropRecommendation")}
          </button>

          <button
            onClick={() => setActiveTab("soil")}
            className={`px-4 py-2 rounded-lg font-medium transition 
            ${activeTab === "soil"
                ? "bg-green-600 text-white"
                : "bg-white text-green-800 border"
              }`}
          >
            🧪 {t("soilHealth")}
          </button>

          <button
            onClick={() => setActiveTab("irrigation")}
            className={`px-4 py-2 rounded-lg font-medium transition 
            ${activeTab === "irrigation"
                ? "bg-green-600 text-white"
                : "bg-white text-green-800 border"
              }`}
          >
            💧 {t("irrigationScheduler")}
          </button>

        </div>
      </div>

      {/* 🔥 SHOW SELECTED FEATURE BELOW TABS */}
      <div className="w-full flex justify-center mt-6">
        <div className="w-full max-w-4xl">

          {activeTab === "crop" && <CropRecommendation />}
          {activeTab === "soil" && <SoilHealth />}
          {activeTab === "irrigation" && <IrrigationScheduler />}

        </div>
      </div>

    </section>
  );
};

export default SmartFarming;
