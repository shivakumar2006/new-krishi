import React, { useState } from "react";
import {
    useGetFruitsQuery,
    useGetFruitsByCategoryQuery,
} from "../store/api/FruitsApi";
import { useAddToCartMutation } from "../store/api/CartApi";

const categories = [
    "All",
    "Orchard Fruit",
    "Exotic Fruit",
    "Tropical Fruit",
    "Berry",
    "Citrus Fruit",
    "Melon",
];


const FruitPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    // GET ALL FRUITS
    const allData = useGetFruitsQuery(undefined, {
        skip: selectedCategory !== "All",
    });

    // GET FRUITS BY CATEGORY
    const categoryData = useGetFruitsByCategoryQuery(selectedCategory, {
        skip: selectedCategory === "All",
    });

    const [addToCart] = useAddToCartMutation();

    const data = selectedCategory === "All" ? allData.data : categoryData.data;
    const loading =
        selectedCategory === "All" ? allData.isLoading : categoryData.isLoading;
    const error =
        selectedCategory === "All" ? allData.error : categoryData.error;

    if (loading) return <p className="text-gray-300">Loading fruits...</p>;
    if (error) return <p className="text-red-400">Failed to load fruits</p>;

    const handleAddToCart = (fruit) => {
        const item = {
            itemId: fruit._id.toString(),
            service: "fruit",
            name: fruit.name,
            price: fruit.price,
            image: fruit.image,
            category: fruit.category,
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
                <h1 className="text-2xl font-bold">Fruits</h1>

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
            <div key={selectedCategory} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data?.map((fruit) => (
                    <div
                        key={fruit._id}
                        className="h-80 bg-white rounded-lg shadow-md p-3 text-black"
                    >
                        <div className="h-44 bg-gray-200 rounded-md mb-2">
                            <img
                                src={`http://localhost:8002/images/${fruit.image}`}
                                alt={fruit.name}
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>

                        <h2 className="font-semibold">{fruit.name}</h2>
                        <p className="text-sm text-gray-600">{fruit.category}</p>
                        <p className="text-sm font-bold mt-1">₹{fruit.price}/kg</p>

                        <button
                            onClick={() => handleAddToCart(fruit)}
                            className="w-full h-9 mt-2 rounded-2xl bg-green-500 hover:bg-green-600 transition-colors duration-300 cursor-pointer text-white">
                            Add to cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FruitPage;
