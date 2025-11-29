import food from '../assets/fsd1.jpeg'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next";

export default function FoodSupplyChain() {

  const Navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <section className="bg-amber-50 min-h-screen">

        {/* Main Title Section */}
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold text-gray-900">
            {t("foodSupplyChain")}
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            {t("foodSupplySubheading")}
          </p>
        </div>

        {/* Image Section */}
        <div className="flex justify-center px-4 mb-10">
          <img
            src={food}
            alt="Food Supply Chain Flowchart"
            className="rounded-md shadow border"
          />
        </div>

        {/* Feature Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-0">

          <button
            onClick={() =>
              window.open(
                "https://fasalmandi.com/#:~:text=At%20FasalMandi%2C%20we%20are%20committed,middleman%20and%20keeping%20prices%20fair",
                "_blank"
              )
            }
          >
            <div className="bg-white p-4 rounded shadow-sm">
              <h3 className="font-semibold">{t("directFarmMarket")}</h3>
              <p className="text-sm text-gray-600">{t("directFarmMarketDesc")}</p>
            </div>
          </button>

          <div
            className="bg-white p-4 rounded shadow-sm cursor-pointer"
            onClick={() => Navigate("/pricing-system")}
          >
            <h3 className="font-semibold">{t("transparentPricing")}</h3>
            <p className="text-sm text-gray-600">{t("transparentPricingDesc")}</p>
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="font-semibold">{t("digitalInventory")}</h3>
            <p className="text-sm text-gray-600">{t("digitalInventoryDesc")}</p>
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="font-semibold">{t("logisticsDelivery")}</h3>
            <p className="text-sm text-gray-600">{t("logisticsDeliveryDesc")}</p>
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="font-semibold">{t("coldStorageSupport")}</h3>
            <p className="text-sm text-gray-600">{t("coldStorageSupportDesc")}</p>
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="font-semibold">{t("reducedWaste")}</h3>
            <p className="text-sm text-gray-600">{t("reducedWasteDesc")}</p>
          </div>
        </div>

        {/* Call To Action */}
        <div className="bg-green-700 text-white text-center py-8 mt-12">
          <h2 className="text-lg font-bold">{t("getStartedWithKrishi")}</h2>
          <p className="mb-4">{t("ctaSubheading")}</p>

          <div className="flex justify-center gap-4">
            <button className="bg-white text-green-700 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition">
              {t("listYourProduce")}
            </button>

            <button className="bg-white text-green-700 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition">
              {t("viewInventory")}
            </button>
          </div>
        </div>

      </section>
    </>
  );
}
