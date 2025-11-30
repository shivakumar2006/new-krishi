import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Footer = () => {
  const { t } = useTranslation();

  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <section className="bg-yellow-50 p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Left Column - Links */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">{t("ourLinks")}</h2>
            <ul className="space-y-4 text-lg text-black">
              <li><a href="#" className="hover:underline">{t("aboutUs")}</a></li>
              <li><a href="#" className="hover:underline">{t("contactUs")}</a></li>
              <li><a href="#" className="hover:underline">{t("services")}</a></li>
              <li><a href="#" className="hover:underline">{t("faq")}</a></li>
            </ul>
          </div>

          <div className="w-100 h-15 border border-green-500 my-15 bg-white rounded-3xl flex justify-center items-center">
            <p className="text-3xl font-bold">Hello {user?.first_name || "Guest"} {user?.last_name || "User"}!</p>
          </div>

          {/* Right Column - Newsletter */}
          <div className="ml-20">
            <h2 className="text-2xl font-bold mb-4 text-black">{t("newsletter")}</h2>
            <p className="mb-4 text-lg text-black">{t("newsletterDesc")}</p>
            <form className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                placeholder={t("yourEmail")}
                className="w-full sm:w-auto px-4 py-2 rounded bg-gray-200 text-black border border-gray-300 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                {t("send")}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-black text-sm flex justify-center items-center gap-2">
          <span>©</span> <span>{t("allRightsReserved")}</span>
        </div>
      </section>
    </div>
  );
};

export default Footer;
