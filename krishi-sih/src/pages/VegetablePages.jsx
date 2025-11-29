import React, { useState } from "react";
import {
    useGetVegetablesQuery,
    useGetVegetablesByCategoryQuery,
} from "../store/api/VegetableApi";

const categories = [
    "All",
    "Leafy Vegetable",
    "Root Vegetable",
    "Bulb Vegetable",
    "Fruit Vegetable",
    "Cabbage Family",
    "Pod & Seed Vegetable",
    "Regional/Exotic",
];

const VegetablesPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    // GET ALL VEGETABLES
    const allData = useGetVegetablesQuery(undefined, {
        skip: selectedCategory !== "All",
    });

    // GET BY CATEGORY
    const categoryData = useGetVegetablesByCategoryQuery(selectedCategory, {
        skip: selectedCategory === "All",
    });

    const data = selectedCategory === "All" ? allData.data : categoryData.data;
    const loading =
        selectedCategory === "All" ? allData.isLoading : categoryData.isLoading;
    const error =
        selectedCategory === "All" ? allData.error : categoryData.error;

    if (loading) return <p className="text-gray-300">Loading vegetables...</p>;
    if (error) return <p className="text-red-400">Failed to load vegetables</p>;

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Vegetables</h1>

                {/* Category Dropdown */}
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data?.map((veg) => (
                    <div
                        key={veg._id}
                        className="h-80 bg-white rounded-lg shadow-md p-3 text-black"
                    >
                        <div className="h-44 bg-gray-200 rounded-md mb-2">
                            <img
                                src={veg.image}
                                alt={veg.name}
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>

                        <h2 className="font-semibold">{veg.name}</h2>
                        <p className="text-sm text-gray-600">{veg.category}</p>
                        <p className="text-sm font-bold mt-1">₹{veg.price}/kg</p>

                        <button className="w-full h-9 mt-2 rounded-2xl bg-green-500 hover:bg-green-600 transition-colors duration-300 cursor-pointer text-white">
                            Add to cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VegetablesPage;
