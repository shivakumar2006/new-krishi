import { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import heroImage from "../assets/hero.jpg"
import image from "../assets/image.jpg"
import image1 from "../assets/image1.jpg"
import image5 from "../assets/image5.jpg"
import image3 from "../assets/image3.jpg"
import image4 from "../assets/image4.jpg"
import InfiniteScroll from "../components/InfiniteScroll"
import { useTranslation } from "react-i18next"

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="text-center mt-8">
      <div className="top-0">
        <img
          src={heroImage}
          alt="Smart Farming"
          className="w-full h-full object-cover top-0"
        />
      </div>

      {/* Slogan */}
      <div className="absolute top-52 left-0 w-full h-[500px] flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">
          {t("homeSlogan1")} <br />
          {t("homeGreeting")}
        </h1>

        <h2 className="text-lg md:text-2xl mb-1 drop-shadow-md">
          {t("homeSlogan2")}
        </h2>

        <p className="text-base md:text-lg italic drop-shadow">
          {t("homeSlogan3")}
        </p>
      </div>

      <h1 className="mt-4 text-lg text-gray-600">
        <strong>{t("trustedBy")}</strong>
      </h1>

      <br /><br />

      <InfiniteScroll />

      <section className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-12 bg-white">
        <div className="relative">
          <img
            src={image1}
            alt="Farmer"
            className="rounded-xl w-64 h-auto object-cover shadow-lg"
          />
          <img
            src={image}
            alt="Another Farmer"
            className="rounded-xl w-40 h-auto object-cover shadow-lg absolute -bottom-6 -left-6 border-4 border-white"
          />
        </div>

        <div className="max-w-md text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
            {t("whyChooseUs")}
          </h2>

          <p className="text-gray-700">
            <strong>{t("whyChooseDesc")}</strong>
          </p>
        </div>
      </section>

      <section className="bg-white py-12 px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

          <div className="flex flex-col items-center">
            <img
              src={image5}
              alt="Farmer 1"
              className="w-64 h-80 object-cover rounded-xl shadow-lg mb-4"
            />
            <p className="text-gray-700">
              <strong>{t("loremCard")}</strong>
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={image3}
              alt="Farmer 2"
              className="w-64 h-80 object-cover rounded-xl shadow-lg mb-4"
            />
            <p className="text-gray-700">
              <strong>{t("loremCard")}</strong>
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={image4}
              alt="Farmer 3"
              className="w-64 h-80 object-cover rounded-xl shadow-lg mb-4"
            />
            <p className="text-gray-700">
              <strong>{t("loremCard")}</strong>
            </p>
          </div>

        </div>
      </section>

      {/* Leaflet Map */}
      <div className="my-12 px-6">
        <h2 className="text-2xl font-bold text-green-700 mb-4">{t("ourLocation")}</h2>

        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[20.5937, 78.9629]}>
            <Popup>
              {t("mapPopup")} <br /> {t("mapPopupDesc")}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}
