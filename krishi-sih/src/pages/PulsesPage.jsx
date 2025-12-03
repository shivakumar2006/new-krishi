import React from "react";
import { useGetPulsesQuery } from "../store/api/PulsesApi";
import { useAddToCartMutation } from "../store/api/CartApi";

const PulsesPage = () => {
    const { data, isLoading, error } = useGetPulsesQuery();
    const [addToCart] = useAddToCartMutation();

    const handleAddToCart = (pulse) => {
        const item = {
            itemId: pulse._id.toString(),
            service: "pulse",
            name: pulse.name,
            price: pulse.price,
            image: pulse.image,
            category: pulse.category,
            quantity: 1
        };

        addToCart(item)
            .unwrap()
            .then(() => alert("Added to cart!"))
            .catch((err) => {
                console.error(err);
                alert("Failed to add to cart");
            });
    };

    if (isLoading) return <p className="text-gray-300">Loading pulses...</p>;
    if (error) return <p className="text-red-400">Failed to load pulses</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-5">Pulses</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data?.map((pulse) => (
                    <div
                        key={pulse._id}
                        className="h-80 bg-white rounded-lg shadow-md p-3 text-black"
                    >
                        <div className="h-44 bg-gray-200 rounded-md mb-2">
                            <img
                                src={pulse.image}
                                alt={pulse.name}
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>

                        <h2 className="font-semibold">{pulse.name}</h2>
                        <p className="text-sm text-gray-600">Season: {pulse.season}</p>
                        <p className="text-sm text-gray-600">Water: {pulse.waterRequirement}</p>
                        <p className="text-sm font-bold mt-1">₹{pulse.price}/kg</p>

                        <button
                            onClick={() => handleAddToCart(pulse)}
                            className="w-full h-9 mt-2 rounded-2xl bg-green-500 hover:bg-green-600 text-white">
                            Add to cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PulsesPage;
