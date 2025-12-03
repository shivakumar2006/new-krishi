import React, { useState } from "react";
import ColdStorage from "./ColdStorage";
import Godown from "./Godown";

export default function ColdStoragePage() {

    const [tab, setTab] = useState("cold");

    return (
        <div className="min-h-screen bg-[#F9F3E0] py-10 px-6">

            {/* Selector Tabs */}
            <div className="flex justify-center mb-8">
                <div className="flex gap-3 bg-green-50 px-4 py-2 rounded-xl shadow border">

                    <button
                        onClick={() => setTab("cold")}
                        className={`px-4 py-2 rounded-lg font-medium transition 
                            ${tab === "cold" ? "bg-green-600 text-white" : "bg-white text-green-800 border"}`}
                    >
                        ❄ Cold Storages
                    </button>

                    <button
                        onClick={() => setTab("godown")}
                        className={`px-4 py-2 rounded-lg font-medium transition 
                            ${tab === "godown" ? "bg-green-600 text-white" : "bg-white text-green-800 border"}`}
                    >
                        🏭 Godowns
                    </button>

                </div>
            </div>

            {/* Switch Components */}
            {tab === "cold" && <ColdStorage />}
            {tab === "godown" && <Godown />}

        </div>
    );
}
