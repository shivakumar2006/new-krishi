import React, { useState } from "react";
import { useGetAllGodownsQuery } from "../store/api/GodownApi";
import { Loader2 } from "lucide-react";

export default function Godown() {
    const { data, isLoading, isError } = useGetAllGodownsQuery();

    // ---- FIX: Ensure safe array ----
    const safeData = Array.isArray(data) ? data : [];

    const [search, setSearch] = useState("");
    const [stateFilter, setStateFilter] = useState("");

    // Unique states
    const states = [...new Set(safeData.map(item => item.state))];

    // Filter logic
    const filteredData = safeData.filter(item =>
        item.location?.toLowerCase().includes(search.toLowerCase()) &&
        (stateFilter ? item.state === stateFilter : true)
    );

    console.log(data);

    return (
        <div className="min-h-screen py-10 px-6">

            <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
                Warehouses / Godowns Across India
            </h1>

            {/* Filters */}
            <div className="max-w-5xl mx-auto mb-10 flex flex-col md:flex-row gap-4 justify-between">

                <input
                    type="text"
                    placeholder="Search Location..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/2 px-4 py-3 rounded-lg border bg-white border-gray-300 outline-none 
                    focus:ring-2 focus:ring-green-600"
                />

                <select
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-3 bg-white rounded-lg border border-gray-300 outline-none 
                    focus:ring-2 focus:ring-green-600"
                >
                    <option value="">Filter by State</option>
                    {states.map((st, i) => (
                        <option key={i} value={st}>{st}</option>
                    ))}
                </select>
            </div>

            {isLoading && (
                <div className="flex justify-center mt-20">
                    <Loader2 className="animate-spin text-green-700" size={40} />
                </div>
            )}

            {isError && (
                <p className="text-center text-red-500 text-xl font-semibold">
                    Failed to load godown data.
                </p>
            )}

            {/* Cards */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((item, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-green-200 hover:shadow-lg transition">

                        <h2 className="text-xl font-bold text-green-800 mb-2">{item.location}</h2>

                        <p className="text-gray-700 mb-1">
                            <span className="font-semibold">State:</span> {item.state}
                        </p>

                        <p className="text-gray-700 mb-1">
                            <span className="font-semibold">District:</span> {item.district}
                        </p>

                        <p className="text-gray-700 mb-1">
                            <span className="font-semibold">Address:</span> {item.address}
                        </p>

                        <p className="text-gray-700 mb-1">
                            <span className="font-semibold">Capacity:</span> {item.capacity_mt} MT
                        </p>

                        <p className="text-gray-700">
                            <span className="font-semibold">Crops:</span> {item.crops_handled?.join(", ")}
                        </p>
                    </div>
                ))}
            </div>

            {!isLoading && filteredData.length === 0 && (
                <p className="text-center text-gray-500 text-lg mt-10">
                    No godown found matching your search.
                </p>
            )}
        </div>
    );
}
