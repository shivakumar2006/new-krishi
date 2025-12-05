import React from "react";
import { useLocation } from "react-router-dom";
import { useCreateCheckoutSessionMutation } from "../store/api/PaymentApi";

const ConfirmRide = () => {
    const { state } = useLocation();
    const [createCheckoutSession] = useCreateCheckoutSessionMutation();

    if (!state)
        return (
            <p className="text-red-500 text-center text-xl mt-20">
                Missing booking information 🚫
            </p>
        );

    const { vehicle, partner, pickup, destination, days, totalFare } = state;

    // -------------------------------
    // 🔥 Stripe Payment Logic
    // -------------------------------
    const handleConfirm = async () => {
        try {
            const response = await createCheckoutSession({
                mode: "booking",
                items: [
                    { title: vehicle.name, price: totalFare, quantity: 1 }
                ],
                rideData: {
                    vehicleName: vehicle.name,
                    vehicleCategory: vehicle.category,
                    pickup,
                    destination,
                    days,
                    partnerName: partner.name,
                    totalFare
                }
            }).unwrap();

            window.location.href = response.url;

        } catch (err) {
            console.error("Payment Error:", err);
            alert("Payment failed!");
        }
    };


    return (
        <div className="min-h-screen bg-[#F9F3E0]">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-700 to-green-500 text-white py-6 px-6 shadow-lg">
                <h1 className="text-3xl font-extrabold text-center">Confirm Your Booking</h1>
                <p className="text-center text-sm opacity-80 mt-1">
                    Review your details before finalizing 🚜
                </p>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

                {/* Vehicle Card */}
                <div className="bg-white rounded-2xl shadow-lg p-5">
                    <h2 className="text-xl font-bold text-green-800 mb-3">Vehicle Details</h2>

                    <div className="flex items-center gap-4">
                        <img
                            src={`http://localhost:8095/images/${vehicle.image}`}
                            alt={vehicle.name}
                            className="w-28 h-20 rounded-lg object-cover border"
                        />

                        <div>
                            <p className="text-lg font-semibold text-black">{vehicle.name}</p>
                            <p className="text-gray-500 text-sm">{vehicle.category}</p>
                            <p className="text-green-700 font-bold mt-1">
                                ₹ {vehicle.rentalPricePerDay} / day
                            </p>
                        </div>
                    </div>
                </div>

                {/* Partner Card */}
                <div className="bg-white rounded-2xl shadow-md p-5">
                    <h2 className="text-xl font-bold text-green-800 mb-3">Partner Information</h2>

                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-black text-lg">{partner.name}</p>
                            <p className="text-gray-600 text-sm">⭐ {partner.rating} Rating</p>
                            <p className="text-gray-500 text-sm">{partner.distance} away</p>
                        </div>

                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold text-sm">
                            Verified Partner
                        </div>
                    </div>
                </div>

                {/* Ride Details */}
                <div className="bg-white rounded-2xl shadow-md p-5">
                    <h2 className="text-xl font-bold text-green-800 mb-4">Ride Details</h2>

                    <div className="space-y-2 text-gray-700">
                        <p><span className="font-semibold">📍 Pickup:</span> {pickup}</p>
                        <p><span className="font-semibold">🎯 Destination:</span> {destination}</p>
                        <p><span className="font-semibold">📅 Days:</span> {days}</p>
                    </div>
                </div>

                {/* Fare Summary */}
                <div className="bg-white rounded-2xl shadow-lg p-5">
                    <h2 className="text-xl font-bold text-green-800 mb-4">Fare Summary</h2>

                    <div className="space-y-2">
                        <p className="flex justify-between text-gray-700">
                            <span>Base Fare x {days} days</span>
                            <span>₹ {vehicle.rentalPricePerDay * days}</span>
                        </p>

                        <p className="flex justify-between text-gray-700">
                            <span>Partner Service Fee</span>
                            <span>₹ 0</span>
                        </p>

                        <p className="border-t pt-3 flex justify-between font-bold text-black text-lg">
                            <span>Total Fare</span>
                            <span className="text-green-700">₹ {totalFare}</span>
                        </p>
                    </div>
                </div>

                {/* Confirm Button */}
                <button
                    onClick={handleConfirm}
                    className="w-full py-4 bg-green-700 text-white text-lg font-bold rounded-2xl shadow-lg hover:bg-green-600 transition"
                >
                    Confirm Booking ✔
                </button>
            </div>
        </div>
    );
};

export default ConfirmRide;
