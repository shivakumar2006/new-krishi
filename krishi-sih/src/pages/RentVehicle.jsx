import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetRentalByIdQuery } from "../store/api/RentalsApi";

const RentVehicle = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: vehicle, isLoading } = useGetRentalByIdQuery(Number(id));


    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [days, setDays] = useState(1);

    if (isLoading)
        return <p className="text-gray-500 text-center mt-10 text-lg">Loading vehicle...</p>;
    if (!vehicle)
        return <p className="text-red-500 text-center mt-10 text-lg">Vehicle not found</p>;

    const totalFare = days * vehicle.rentalPricePerDay;

    const handleNext = () => {
        navigate("/select-partner", {
            state: { vehicle, pickup, destination, days, totalFare },
        });
    };

    return (
        <div className="min-h-screen bg-[#F9F3E0] py-10 px-4 flex justify-center">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-7">

                {/* Heading */}
                <h1 className="text-3xl font-extrabold text-green-800 mb-4">
                    Rent: {vehicle.name}
                </h1>

                {/* Vehicle Image */}
                <div className="w-full h-64 rounded-xl overflow-hidden shadow-md mb-6">
                    <img
                        src={`http://localhost:8095/images/${vehicle.image}`}
                        alt={vehicle.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Price info */}
                <p className="text-xl font-semibold text-green-900 mb-4">
                    ₹ {vehicle.rentalPricePerDay} / day
                </p>

                {/* Form */}
                <div className="space-y-5">

                    {/* Pickup */}
                    <div>
                        <label className="text-gray-700 font-medium mb-1 block">Pickup Location</label>
                        <input
                            type="text"
                            placeholder="Enter pickup location"
                            value={pickup}
                            onChange={(e) => setPickup(e.target.value)}
                            className="w-full p-3 rounded-lg border outline-none shadow-sm focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Destination */}
                    <div>
                        <label className="text-gray-700 font-medium mb-1 block">Destination Location</label>
                        <input
                            type="text"
                            placeholder="Enter destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full p-3 rounded-lg border outline-none shadow-sm focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Days */}
                    <div>
                        <label className="text-gray-700 font-medium mb-1 block">Number of Days</label>
                        <input
                            type="number"
                            min="1"
                            value={days}
                            onChange={(e) => setDays(Number(e.target.value))}
                            className="w-full p-3 rounded-lg border outline-none shadow-sm focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Fare */}
                    <div className="bg-green-100 p-4 rounded-xl text-lg font-semibold flex justify-between items-center shadow-sm">
                        <span>Estimated Fare:</span>
                        <span className="text-green-800 text-2xl font-bold">₹ {totalFare}</span>
                    </div>
                </div>

                {/* Continue Button */}
                <button
                    onClick={handleNext}
                    disabled={!pickup || !destination}
                    className="mt-6 w-full bg-green-700 text-white p-4 rounded-xl text-lg font-semibold hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                >
                    Continue to Select Partner →
                </button>
            </div>
        </div>
    );
};

export default RentVehicle;
