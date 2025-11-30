// src/components/Navbar.jsx  (replace file content)
import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import img from "../assets/Krishi Logo.png";
import { Menu, X, ChevronDown, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const cart = useSelector((state) => state.cart.cartItems);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem("krishi_lang")?.toUpperCase() || "EN");

  const authRef = useRef();
  const langRef = useRef();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (authRef.current && !authRef.current.contains(e.target)) {
        setAuthOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // language list: value = i18next code, label = shown text
  const LANGUAGES = [
    { code: "en", label: "EN" },
    { code: "hi", label: "HI" },
    { code: "mr", label: "MR" },
    { code: "pa", label: "PA" }
  ];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("krishi_lang", code);
    setLanguage(code.toUpperCase());
  };

  const navLinks = (
    <>
      <NavLink to="/" className="hover:underline font-bold">{t("home")}</NavLink>

      <div className="relative group">
        <button
          onClick={() => setServicesOpen(!servicesOpen)}
          className="flex items-center gap-1 hover:underline font-bold"
        >
          {t("services")} <ChevronDown size={16} />
        </button>
        <div className={`absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md z-50 p-2 ${servicesOpen ? "block" : "hidden"} group-hover:block`}>
          <NavLink to="/smart-farming" className="block px-4 py-2 hover:bg-gray-100 rounded" onClick={() => setServicesOpen(false)}>{t("smartFarming")}</NavLink>
          <NavLink to="/farming-support" className="block px-4 py-2 hover:bg-gray-100 rounded" onClick={() => setServicesOpen(false)}>{t("farmingSupport")}</NavLink>
          <NavLink to="/food-supply" className="block px-4 py-2 hover:bg-gray-100 rounded" onClick={() => setServicesOpen(false)}>{t("foodSupply")}</NavLink>
        </div>
      </div>

      <NavLink to="/booking" className="hover:underline font-bold">{t("booking")}</NavLink>
      <NavLink to="/store" className="hover:underline font-bold">{t("store")}</NavLink>
      <NavLink to="/blog" className="hover:underline font-bold">{t("blog")}</NavLink>
    </>
  );

  const authLinks = (
    <div ref={authRef} className="relative">
      <button
        onClick={() => {
          if (user) {
            navigate("/profile");
          } else {
            navigate("/login");
          }
        }}
        className="flex items-center cursor-pointer"
      >
        {/* avatar svg unchanged */}
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <rect width="30" height="30" rx="15" fill="#EADDFF" />
          <path fillRule="evenodd" clipRule="evenodd" d="M19.5002 12C19.5002 14.4853 17.4855 16.5 15.0002 16.5C12.5149 16.5 10.5002 14.4853 10.5002 12C10.5002 9.51472 12.5149 7.5 15.0002 7.5C17.4855 7.5 19.5002 9.51472 19.5002 12ZM18.0002 12C18.0002 13.6569 16.657 15 15.0002 15C13.3433 15 12.0002 13.6569 12.0002 12C12.0002 10.3431 13.3433 9 15.0002 9C16.657 9 18.0002 10.3431 18.0002 12Z" fill="#4F378A" />
          <path d="M15.0002 18.75C10.1444 18.75 6.00714 21.6213 4.43115 25.644C4.81507 26.0253 5.21951 26.3859 5.64265 26.724C6.81621 23.0308 10.4977 20.25 15.0002 20.25C19.5027 20.25 23.1842 23.0308 24.3577 26.7241C24.7809 26.3859 25.1853 26.0253 25.5692 25.644C23.9932 21.6213 19.856 18.75 15.0002 18.75Z" fill="#4F378A" />
        </svg>
      </button>

      <AnimatePresence>
        {authOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-lg py-2 flex flex-col z-50"
          >
            <div className="flex">
              <span>
                <NavLink
                  to="/login"
                  className="px-4 py-2 text-sm text-green-600 hover:bg-green-50 font-semibold"
                  onClick={() => setAuthOpen(false)}
                >
                  {t("login")}
                </NavLink>
              </span>
              <span>
                <NavLink
                  to="/signup"
                  className="px-4 py-2 text-sm text-green-600 hover:bg-green-50 font-semibold"
                  onClick={() => setAuthOpen(false)}
                >
                  {t("register")}
                </NavLink>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const languageSelector = (
    <div ref={langRef} className="relative">
      <button
        onClick={() => setLangOpen(!langOpen)}
        className="px-3 py-1 border rounded cursor-pointer text-black hover:text-black hover:bg-gray-100 flex items-center gap-1 bg-white/10"
        aria-haspopup="listbox"
        aria-expanded={langOpen}
      >
        {language} <ChevronDown size={16} />
      </button>

      <AnimatePresence>
        {langOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 w-28 bg-white shadow-lg rounded-md py-1 flex flex-col z-50"
            role="listbox"
          >
            {LANGUAGES.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => {
                  changeLanguage(code);
                  setLangOpen(false);
                }}
                className="px-4 py-2 text-sm text-black bg-white hover:bg-gray-100 text-left flex items-center gap-2"
                role="option"
                aria-selected={i18n.language === code}
              >
                <span className="font-medium text-xs">{label}</span>
                <span className="text-xs text-gray-500 capitalize">{code}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <nav className="bg-white shadow p-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <NavLink to="/" className="flex items-center space-x-2">
          <img src={img} alt="Krishi Logo" className="w-24" />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center text-lg">{navLinks}</div>

        {/* Desktop Auth, Language & Cart */}
        <div className="hidden md:flex space-x-4 items-center text-lg">
          {authLinks}
          {languageSelector}
          <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{cart.length}</span>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="flex flex-col space-y-3 mt-4 md:hidden text-lg font-bold">
          {navLinks}
          {authLinks}
          {languageSelector}
          <div onClick={() => navigate("/cart")} className="relative cursor-pointer flex items-center gap-2">
            <ShoppingCart size={24} />
            <span className="text-lg">Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{cart.length}</span>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
