import React, { useState } from "react";
import {
    useGetAllProductsQuery,
    useGetAllProductsByCategoryQuery,
} from "../store/api/ProductApi";

const categories = [
    "pesticides",
    "fertilizers",
    "seeds",
    "organicCropProtection",
    "organicCropNutrition",
    "cattleFeed",
    "toolsAndMachinery",
];

const Product = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const { data: allProducts, isLoading: allLoading } = useGetAllProductsQuery();
    const {
        data: categoryProducts,
        isLoading: categoryLoading,
    } = useGetAllProductsByCategoryQuery(selectedCategory, {
        skip: selectedCategory === "all",
    });

    const products =
        selectedCategory === "all" ? allProducts : categoryProducts;

    const loading =
        selectedCategory === "all" ? allLoading : categoryLoading;

    if (loading)
        return <p className="text-gray-500 text-center">Loading products...</p>;

    return (
        <div className="px-6 py-8">
            <h1 className="text-3xl font-bold mb-6 text-black">Products</h1>

            {/* CATEGORY FILTER */}
            <div className="mb-6 flex flex-wrap gap-3">
                <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-4 py-2 rounded-full border text-sm font-medium ${selectedCategory === "all"
                        ? "bg-green-600 text-white"
                        : "bg-white text-green-700 border-green-600"
                        }`}
                >
                    All
                </button>

                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium capitalize ${selectedCategory === cat
                            ? "bg-green-600 text-white"
                            : "bg-white text-green-700 border-green-600"
                            }`}
                    >
                        {cat.replace(/([A-Z])/g, " $1")}
                    </button>
                ))}
            </div>

            {/* PRODUCT GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {products?.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white shadow-md rounded-lg p-3 hover:shadow-lg transition border border-gray-100"
                    >
                        {/* IMAGE */}
                        <div className="h-40 bg-gray-200 rounded-lg mb-3 overflow-hidden">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* PRODUCT NAME */}
                        <h2 className="font-semibold text-black">{product.name}</h2>

                        {/* BRAND */}
                        <p className="text-sm text-gray-600">Brand: {product.brand}</p>

                        {/* CATEGORY BADGE */}
                        <p className="text-xs font-semibold mt-1 px-2 py-1 inline-block rounded-full bg-green-100 text-green-700">
                            {product.category?.toUpperCase()}
                        </p>

                        {/* PRICE */}
                        <p className="text-lg font-bold text-green-700 mt-2">
                            ₹{product.price}
                        </p>

                        {/* ADD TO CART */}
                        <button className="w-full h-10 mt-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
