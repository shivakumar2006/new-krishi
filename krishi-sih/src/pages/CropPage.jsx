import React, { useState } from "react";
import {
    useGetCropsQuery,
    useGetCropsByCategoryQuery,
} from "../store/api/CropsApi";
import { useAddToCartMutation } from "../store/api/CartApi";

const categories = [
    "All",
    "Careal Crops",
    "Cash Crops",
    "Oil Seeds",
    "Plantation Crops",
];


const CropPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    // API Calls
    const allData = useGetCropsQuery(undefined, { skip: selectedCategory !== "All" });

    console.log(allData);

    const categoryData = useGetCropsByCategoryQuery(selectedCategory, {
        skip: selectedCategory === "All",
    });

    const [addToCart] = useAddToCartMutation();


    const data = selectedCategory === "All" ? allData.data : categoryData.data;
    const loading =
        selectedCategory === "All" ? allData.isLoading : categoryData.isLoading;
    const error =
        selectedCategory === "All" ? allData.error : categoryData.error;

    if (loading) return <p className="text-gray-300">Loading crops...</p>;
    if (error) return <p className="text-red-400">Failed to load crops</p>;

    const handleAddToCart = (crop) => {
        const item = {
            itemId: crop._id.toString(),
            service: "crop",
            name: crop.name,
            price: crop.price,
            image: crop.image,
            category: crop.category,
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

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Crops</h1>

                {/* Dropdown */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border text-black rounded-lg shadow-sm bg-white cursor-pointer"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* Grid */}
            <div key={selectedCategory} className="grid grid-cols-2 md:grid-cols-4 gap-4">

                {data?.map((crop) => (
                    <div
                        key={crop._id}
                        className="h-80 bg-white rounded-lg shadow-md p-3 text-black"
                    >
                        <div className="h-44 bg-gray-200 rounded-md mb-2">
                            <img
                                src={`http://localhost:8000/images/${crop.image}`}
                                alt={crop.name}
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>

                        <h2 className="font-semibold">{crop.name}</h2>
                        <p className="text-sm text-gray-600">{crop.category}</p>
                        <p className="text-sm font-bold mt-1">₹{crop.price}/kg</p>

                        <button
                            onClick={() => handleAddToCart(crop)}
                            className="w-full h-9 mt-2 rounded-2xl bg-green-500 hover:bg-green-600 transition-colors duration-300 cursor-pointer text-white">
                            Add to cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CropPage;
