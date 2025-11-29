import React from "react";
import { useGetGovDataQuery } from "../store/api/PricingSystem";
import { useTranslation } from "react-i18next";

const PricingSystem = () => {
    const { data, isLoading, isError } = useGetGovDataQuery({ limit: 100 });
    const { t } = useTranslation();

    if (isLoading)
        return (
            <div className="text-center text-white mt-10 animate-pulse">
                {t("loadingMarketPrices")}
            </div>
        );

    if (isError)
        return (
            <div className="text-center text-red-400 mt-10">
                {t("pricingFetchFailed")}
            </div>
        );

    const records = data?.records || [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] py-10 px-4 text-white">

            {/* PAGE HEADING */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 tracking-wide">
                {t("dailyMandiPriceDashboard")}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10">
                {t("livePricesDesc")}{" "}
                <strong>{t("agmarknet")}</strong>. {t("updatedDaily")}
            </p>

            {/* TABLE CONTAINER */}
            <div className="w-full max-w-6xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden">

                {/* HEADER BAR */}
                <div className="flex justify-between items-center p-4 bg-white/10 border-b border-white/10">
                    <h3 className="text-xl font-semibold">{t("marketPricesLatest")}</h3>
                    <span className="text-sm text-gray-300">
                        {records.length} {t("results")}
                    </span>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-white/20 text-white uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3 text-left">{t("commodity")}</th>
                                <th className="px-4 py-3 text-left">{t("state")}</th>
                                <th className="px-4 py-3 text-left">{t("district")}</th>
                                <th className="px-4 py-3 text-left">{t("market")}</th>
                                <th className="px-4 py-3 text-center">{t("minPrice")}</th>
                                <th className="px-4 py-3 text-center">{t("maxPrice")}</th>
                                <th className="px-4 py-3 text-center">{t("modalPrice")}</th>
                            </tr>
                        </thead>

                        <tbody>
                            {records.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-white/10 hover:bg-white/10 transition"
                                >
                                    <td className="px-4 py-3 font-semibold capitalize text-white">
                                        {item.commodity}
                                    </td>

                                    <td className="px-4 py-3 capitalize text-gray-300">
                                        {item.state}
                                    </td>

                                    <td className="px-4 py-3 capitalize text-gray-300">
                                        {item.district}
                                    </td>

                                    <td className="px-4 py-3 capitalize text-gray-300">
                                        {item.market}
                                    </td>

                                    <td className="px-4 py-3 text-center text-green-300 font-bold">
                                        ₹{item.min_price}
                                    </td>

                                    <td className="px-4 py-3 text-center text-red-300 font-bold">
                                        ₹{item.max_price}
                                    </td>

                                    <td className="px-4 py-3 text-center text-yellow-300 font-semibold">
                                        ₹{item.modal_price}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

            {/* FOOTNOTE */}
            <p className="text-center text-gray-400 mt-8 text-xs">
                {t("source")} AGMARKNET (data.gov.in)
            </p>
        </div>
    );
};

export default PricingSystem;
