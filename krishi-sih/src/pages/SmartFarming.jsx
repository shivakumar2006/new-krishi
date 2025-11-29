import React from 'react';
import Weather from './Weather';
import CropRecommendation from './CropRecomendation';
import SoilHealth from './SoilHealthPage';
import IrrigationScheduler from './IrrigationSchedular';
import WeatherForcast from "../components/WeatherForecast";

import { useTranslation } from "react-i18next";

const SmartFarming = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-12 px-4 md:px-16">

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-700">
          {t("smartFarmingDashboard")}
        </h1>
        <p className="text-gray-600 mt-2">
          {t("smartFarmingSubtitle")}
        </p>
      </div>

      <div className='w-full flex flex-col items-center'>

        <p className='font-extralight text-3xl pb-5'>
          {t("weatherMonitoring")}
        </p>

        <div className='w-full h-50'>
          <WeatherForcast />
        </div>

        {/* Soil Health */}
        <div className="bg-green-50 p-6 mt-400 sm:mt-250 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            {t("soilHealth")}
          </h2>

          <ul className="list-disc list-inside text-gray-700">
            <li>🧪 {t("nitrogen")}: 45 mg/kg</li>
            <li>🧪 {t("phosphorus")}: 30 mg/kg</li>
            <li>🧪 {t("potassium")}: 50 mg/kg</li>
            <li>🌡️ {t("soilTemperature")}: 22°C</li>
          </ul>

          <button><SoilHealth /></button>
        </div>

        {/* Crop Recommendation */}
        <div className="bg-green-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            {t("cropRecommendation")}
          </h2>

          <ul className="list-disc list-inside text-gray-700">
            <li>🌾 {t("suitableCrops")}: Wheat, Barley, Mustard</li>
            <li>🧪 {t("soilPH")}: 6.5</li>
            <li>🌱 {t("soilType")}: Loamy</li>
            <li>💧 {t("moistureLevel")}: {t("optimal")}</li>
          </ul>

          <button><CropRecommendation /></button>
        </div>

        {/* Irrigation Scheduler */}
        <div className="bg-green-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            {t("irrigationScheduler")}
          </h2>

          <ul className="list-disc list-inside text-gray-700">
            <li>💧 {t("nextIrrigation")}: {t("in2days")}</li>
            <li>🕒 {t("duration")}: 3 hours</li>
            <li>📍 {t("fieldZone")}: {t("northEastSector")}</li>
            <li>📅 {t("lastIrrigation")}: {t("3daysAgo")}</li>
          </ul>

          <button><IrrigationScheduler /></button>
        </div>

      </div>
    </section>
  );
};

export default SmartFarming;
