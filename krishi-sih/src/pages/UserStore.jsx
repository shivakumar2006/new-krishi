import React, { useState } from "react";
import CategorySelector from "../components/CategorySelector";

import CropPage from "./CropPage";
import VegetablesPage from "./VegetablePages";
import FruitPage from "./FruitPage";

const Store = () => {
    const [active, setActive] = useState("Crops");

    const renderPage = () => {
        switch (active) {
            case "Crops":
                return <CropPage />;

            case "Vegetables":
                return <VegetablesPage />;

            // 👇 Fruits & Pulses disable because not created yet
            case "Fruits":
                return <FruitPage />

            case "Pulses":
                return <div className="p-5 text-xl font-semibold">Pulses Coming Soon...</div>;

            default:
                return <CropPage />;
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-100">
            <CategorySelector active={active} setActive={setActive} />
            <div className="p-4">{renderPage()}</div>
        </div>
    );
};

export default Store;
