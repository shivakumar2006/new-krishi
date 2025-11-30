import React from "react";
import { useNavigate } from "react-router-dom";

const Store = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center py-20 px-6">

      {/* Heading */}
      <h1 className="text-6xl font-extrabold text-green-700 drop-shadow-sm text-center">
        Krishi Store
      </h1>

      {/* Subtitle */}
      <p className="max-w-4xl mt-6 text-gray-700 text-xl text-center leading-relaxed">
        Explore our dual marketplace —
        <span className="font-semibold text-green-700"> fresh produce directly from farmers </span>
        and
        <span className="font-semibold text-indigo-600"> essential tools for smarter farming</span>.
        <br />
        <span className="font-semibold">Buy smart, farm smart.</span>
      </p>

      {/* Buttons Section */}
      <div className="mt-12 flex flex-col md:flex-row gap-8">

        {/* Farmer to User Card */}
        <div
          onClick={() => navigate("/farmer-user")}
          className="w-80 h-60 bg-white rounded-3xl shadow-xl border border-green-100 
                     cursor-pointer hover:scale-105 transition-transform duration-300
                     flex flex-col justify-center items-center hover:shadow-2xl"
        >
          <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center mb-4">
            <svg
              width="45"
              height="45"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#166534"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12l9 10 9-10" />
              <path d="M12 2v20" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-green-700">Farmer to Users</h2>
          <p className="text-gray-600 mt-2 text-sm text-center px-6">
            Buy fresh produce directly from trusted farmers.
          </p>
        </div>

        {/* Farmer Essentials Card */}
        <div
          onClick={() => navigate("/product")}
          className="w-80 h-60 bg-white rounded-3xl shadow-xl border border-indigo-100 
                     cursor-pointer hover:scale-105 transition-transform duration-300
                     flex flex-col justify-center items-center hover:shadow-2xl"
        >
          <div className="w-20 h-20 bg-indigo-200 rounded-full flex items-center justify-center mb-4">
            <svg
              width="45"
              height="45"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3730a3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1.82-.33l-.12.05a1.65 1.65 0 0 0-1.06 1.51V21a2 2 0 0 1-4 0v-.12a1.65 1.65 0 0 0-1.06-1.51l-.12-.05A1.65 1.65 0 0 0 4.6 19.4a1.65 1.65 0 0 0-1.82-.33l-.06.05a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 2.6 15a1.65 1.65 0 0 0-.33-1.82l-.05-.12a2 2 0 0 1 0-4l.05-.12A1.65 1.65 0 0 0 2.6 7a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 7 2.6a1.65 1.65 0 0 0 1.82-.33l.12-.05a2 2 0 0 1 4 0l.12.05A1.65 1.65 0 0 0 15 2.6a1.65 1.65 0 0 0 1.82.33l.12-.05a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 7a1.65 1.65 0 0 0 .33 1.82l.05.12a2 2 0 0 1 0 4l-.05.12A1.65 1.65 0 0 0 19.4 15z" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-indigo-600">Farmer Essentials</h2>
          <p className="text-gray-600 mt-2 text-sm text-center px-6">
            Tools, fertilizers, seeds & machinery for farming.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Store;
