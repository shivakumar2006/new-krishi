import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const partners = [
    { id: 1, name: "Ravi Tractor Services", rating: 4.8, distance: "1.5 km", trips: 120 },
    { id: 2, name: "AgroMachine Partners", rating: 4.7, distance: "2.1 km", trips: 98 },
    { id: 3, name: "Kisan Rental Hub", rating: 4.5, distance: "3.4 km", trips: 87 },
];

const SelectPartner = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state)
        return (
            <p className="text-red-500 text-center text-xl mt-20">
                Missing previous booking data 🚫
            </p>
        );

    const handleSelect = (partner) => {
        navigate("/confirm-ride", {
            state: {
                ...state,
                partner,
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#F9F3E0] py-10 px-4 flex justify-center">
            <div className="w-full max-w-3xl">

                <h2 className="text-4xl font-extrabold text-green-800 mb-6 text-center">
                    Select a Partner
                </h2>

                <p className="text-gray-700 text-center mb-8 text-lg">
                    Choose a trusted rental partner for your vehicle ride 🚜
                </p>

                <div className="space-y-5">
                    {partners.map((p) => (
                        <div
                            key={p.id}
                            onClick={() => handleSelect(p)}
                            className="bg-white p-5 rounded-2xl shadow-md border 
                                       hover:shadow-xl hover:border-green-600 
                                       transition-all duration-300 cursor-pointer"
                        >
                            <div className="flex justify-between items-center">

                                {/* Name & Rating */}
                                <div>
                                    <h3 className="text-xl font-bold text-green-900">
                                        {p.name}
                                    </h3>

                                    <div className="mt-1 flex items-center gap-2">
                                        <span className="text-yellow-500 text-lg">⭐</span>
                                        <span className="font-semibold text-gray-700">
                                            {p.rating}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            ({p.trips} rides)
                                        </span>
                                    </div>

                                    <p className="text-sm mt-1 text-gray-600 flex items-center gap-1">
                                        <span>📍</span> {p.distance} away
                                    </p>
                                </div>

                                {/* Arrow Button */}
                                <button
                                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 
                                               rounded-full shadow-md transition"
                                >
                                    Select →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default SelectPartner;
