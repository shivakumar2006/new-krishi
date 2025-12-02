import React from "react";
import { useSearchParams } from "react-router-dom";
import { useVerifySessionQuery } from "../store/api/PaymentApi";

const RideSuccess = () => {
    const [params] = useSearchParams();
    const sessionId = params.get("session_id");

    const { data, isLoading } = useVerifySessionQuery(sessionId);

    if (isLoading)
        return (
            <div className="h-screen flex items-center justify-center bg-white">
                <p className="text-lg font-semibold text-gray-700">Fetching booking details...</p>
            </div>
        );

    localStorage.setItem("last_session_id", sessionId);


    const meta = data?.metadata;

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 py-10">
            <div className="bg-white max-w-xl w-full rounded-3xl shadow-xl p-8 animate-fadeIn">

                {/* Success Icon */}
                <div className="flex justify-center">
                    <div className="bg-green-100 p-4 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-green-600"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M9 11l3 3L22 4M2 12l7 7 4-4" />
                        </svg>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-extrabold text-center mt-4 text-green-700">
                    Booking Successful!
                </h1>
                <p className="text-center text-gray-600 mt-1">
                    Your farming vehicle is confirmed and ready 🚜✨
                </p>

                {/* Info Section */}
                <div className="mt-8 space-y-4">

                    {/* Vehicle */}
                    <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-xl">
                        <p className="text-gray-600 text-sm">Vehicle</p>
                        <p className="font-bold text-lg text-green-900">{meta.vehicleName}</p>
                    </div>

                    {/* Pickup → Destination */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <p className="text-sm text-gray-600">Route</p>
                        <p className="font-semibold text-gray-800">
                            {meta.pickup} <span className="text-green-600">→</span> {meta.destination}
                        </p>
                    </div>

                    {/* Days */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <p className="text-sm text-gray-600">Booking Duration</p>
                        <p className="font-semibold text-gray-800">{meta.days} days</p>
                    </div>

                    {/* Partner */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-600">Partner</p>
                            <p className="font-semibold text-gray-900">{meta.partnerName}</p>
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                            VERIFIED
                        </span>
                    </div>

                    {/* Price */}
                    <div className="bg-green-600 text-white p-5 rounded-2xl shadow-md mt-4">
                        <p className="text-lg font-semibold">Total Paid</p>
                        <p className="text-3xl font-extrabold mt-1">₹ {meta.totalFare}</p>
                    </div>
                </div>

                {/* Button */}
                <button
                    onClick={() => window.location.href = "/booking"}
                    className="mt-6 w-full py-3 bg-green-700 hover:bg-green-800 transition text-white text-lg font-bold rounded-xl shadow-md"
                >
                    Back to bookings
                </button>
            </div>
        </div>
    );
};

export default RideSuccess;
