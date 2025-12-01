import React from "react";

const RideSuccess = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-green-100">
            <div className="bg-white p-8 rounded-lg shadow text-center">
                <h1 className="text-4xl font-bold text-green-700 mb-4">
                    Booking Confirmed!
                </h1>
                <p className="text-black text-lg">
                    Your farming vehicle is on the way 🚜✨
                </p>
            </div>
        </div>
    );
};

export default RideSuccess;
