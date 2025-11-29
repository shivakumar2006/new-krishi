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

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useTranslation } from "react-i18next";

const BookingPage = () => {
  const { t } = useTranslation();

  const itemRef = useRef(null);

  const scrollToItem = () => {
    itemRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const toolsForRent = [...farmingVehicle, ...farmingEquipment];

  const categories = ["All", ...new Set(toolsForRent.map((tool) => tool.category))];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = toolsForRent.filter((tool) => {
    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const suggestions = [
    {
      title: t("equipmentRental"),
      desc: t("equipmentRentalDesc"),
      image: Equipment,
    },
    {
      title: t("cropAdvisory"),
      desc: t("cropAdvisoryDesc"),
      image: crop,
    },
    {
      title: t("weatherForecast"),
      desc: t("weatherForecastDesc"),
      image: weather,
    },
    {
      title: t("soilHealthCheck"),
      desc: t("soilHealthCheckDesc"),
      image: soil,
    },
    {
      title: t("governmentSchemes"),
      desc: t("governmentSchemesDesc"),
      image: govern,
    },
    {
      title: t("farmerSupport"),
      desc: t("farmerSupportDesc"),
      image: farmer,
    },
  ];

  const equipments = [
    {
      name: t("tractor"),
      price: t("tractorPrice"),
      image: tractorImg,
      desc: t("tractorDesc"),
    },
    {
      name: t("harvester"),
      price: t("harvesterPrice"),
      image: harvesterImg,
      desc: t("harvesterDesc"),
    },
    {
      name: t("waterPump"),
      price: t("waterPumpPrice"),
      image: pumpImg,
      desc: t("waterPumpDesc"),
    },
    {
      name: t("seedDrill"),
      price: t("seedDrillPrice"),
      image: seedDrillImg,
      desc: t("seedDrillDesc"),
    },
  ];

  return (
    <>
      <div className="min-h-screen w-full bg-[#F9F3E0] flex flex-col justify-center items-center px-4">

        <div className="w-full mt-20 flex flex-col lg:flex-row justify-center items-center pb-10 gap-10">

          <div className="w-full lg:w-1/2 h-auto flex flex-col justify-center items-center gap-5">

            <p className="text-3xl md:text-4xl lg:text-6xl font-extrabold px-4 sm:px-10 lg:pl-40 text-center lg:text-left">
              {t("bookingHeading")}
            </p>

            <p className="text-[13px] sm:text-[14px] px-6 sm:px-16 lg:px-40 text-center lg:text-left">
              {t("bookingSubHeading")}
            </p>

            <button
              onClick={scrollToItem}
              className="w-40 h-12 flex justify-center items-center bg-black text-white rounded-lg text-lg cursor-pointer hover:bg-black/80 transition-colors duration-300 lg:mr-50"
            >
              {t("seePrices")}
            </button>

          </div>

          <div className="w-full lg:w-1/2 h-auto flex justify-center items-center lg:pr-30">
            <img
              src={krishi}
              alt="image"
              className="w-64 sm:w-80 lg:w-130 h-auto shadow-2xl transition-transform duration-300 hover:scale-105 rounded-2xl"
            />
          </div>
        </div>

        <div className="w-full flex flex-col">

          <p className="text-2xl lg:text-3xl font-bold py-3 pl-4 sm:pl-10 lg:pl-26 text-center lg:text-left">
            {t("suggestions")}
          </p>

          <div className="w-full flex flex-wrap justify-center items-center gap-6 pb-10">

            {suggestions?.map((item, index) => (
              <div
                key={index}
                className="w-[95%] sm:w-[48%] xl:w-100 h-auto bg-white flex flex-row rounded-xl shadow-lg p-4"
              >

                <div className="w-2/3 flex flex-col justify-center pl-2 md:pl-4 gap-3 text-left">

                  <p className="text-base lg:text-lg font-bold">
                    {item.title}
                  </p>

                  <p className="text-[12px] lg:text-[13px]">
                    {item.desc}
                  </p>

                </div>

                <div className="w-1/3 flex justify-center items-center">
                  <img src={item.image} alt="image" className="w-28 md:w-40 object-contain" />
                </div>
              </div>
            ))}

          </div>
        </div>

        <div className="w-200 my-15 rounded">
          <div className="w-full overflow-hidden px-6">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView="auto"
              navigation
              pagination={{ clickable: true }}
              grabCursor={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
            >
              {equipments.map((item, index) => (
                <SwiperSlide key={index} className="w-full">

                  <div className="bg-white p-5 rounded-xl shadow-lg text-center">

                    <div className="w-full h-90 mb-4 overflow-hidden rounded-md flex justify-center items-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>

                  </div>

                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

      </div>

      <div ref={itemRef} className="min-h-screen bg-[#F9F3E0] font-sans">

        <div className="px-6 py-4 flex flex-col sm:flex-row gap-4 justify-center items-center">

          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder={t("searchHere")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-white rounded-full shadow-md focus:outline-none"
            />

            <div className="absolute right-4 top-2.5">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M17.9667 19.25L12.1917 13.475C11.7333 13.8417 11.2063 14.1319 10.6104 14.3458C10.0146 14.5597 9.38056 14.6667 8.70833 14.6667C7.04306 14.6667 5.63368 14.0899 4.48021 12.9365C3.32674 11.783 2.75 10.3736 2.75 8.70833C2.75 7.04306 3.32674 5.63368 4.48021 4.48021C5.63368 3.32674 7.04306 2.75 8.70833 2.75C10.3736 2.75 11.783 3.32674 12.9365 4.48021C14.0899 5.63368 14.6667 7.04306 14.6667 8.70833C14.6667 9.38056 14.5597 10.0146 14.3458 10.6104C14.1319 11.2063 13.8417 11.7333 13.475 12.1917L19.25 17.9667L17.9667 19.25ZM8.70833 12.8333C9.85417 12.8333 10.8281 12.4323 11.6302 11.6302C12.4323 10.8281 12.8333 9.85417 12.8333 8.70833C12.8333 7.5625 12.4323 6.58854 11.6302 5.78646C10.8281 4.98438 9.85417 4.58333 8.70833 4.58333C7.5625 4.58333 6.58854 4.98438 5.78646 5.78646C4.98438 6.58854 4.58333 7.5625 4.58333 8.70833C4.58333 9.85417 4.98438 10.8281 5.78646 11.6302C6.58854 12.4323 7.5625 12.8333 8.70833 12.8333Z"
                  fill="#1D1B20"
                />
              </svg>
            </div>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-full shadow-md bg-white border border-gray-300 text-gray-700 focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredTools.map((tool) => (
            <div
              key={tool._id}
              className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition"
            >

              <div className="relative">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="absolute top-3 right-3 bg-white p-1 rounded-full shadow">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M15.6301 3.4575C15.247 3.07425 14.7922 2.77023 14.2916 2.56281C13.791 2.35539 13.2545 2.24863 12.7126 2.24863C12.1707 2.24863 11.6342 2.35539 11.1336 2.56281C10.633 2.77023 10.1782 3.07425 9.79509 3.4575L9.00009 4.2525L8.20509 3.4575C7.43132 2.68373 6.38186 2.24903 5.28759 2.24903C4.19331 2.24903 3.14386 2.68373 2.37009 3.4575C1.59632 4.23127 1.16162 5.28072 1.16162 6.375C1.16162 7.46927 1.59632 8.51873 2.37009 9.2925L9.00009 15.9225L15.6301 9.2925C16.0133 8.90943 16.3174 8.45461 16.5248 7.95401C16.7322 7.45342 16.839 6.91686 16.839 6.375C16.839 5.83313 16.7322 5.29657 16.5248 4.79598C16.3174 4.29539 16.0133 3.84056 15.6301 3.4575Z"
                      stroke="#1E1E1E"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-black font-semibold text-lg mt-4">{tool.name}</h3>
              <p className="text-gray-500 text-sm">{tool.category}</p>

              <div className="flex items-center justify-between mt-3">
                <span className="text-green-700 font-bold text-sm">
                  ₹ {tool.rentalPricePerDay} / {t("perDay")}
                </span>

                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${tool.availability
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                    }`}
                >
                  {tool.availability ? t("available") : t("notAvailable")}
                </span>
              </div>

              <button
                disabled={!tool.availability}
                className={`mt-4 w-full py-2 text-sm font-semibold rounded-full transition ${tool.availability
                  ? "bg-green-800 text-white hover:bg-green-700"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
              >
                {t("rentNow")}
              </button>

            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookingPage;
