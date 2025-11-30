import React, { useState } from "react";
import { useGetColdStoragesQuery } from "../store/api/ColdStorageApi";
import { Loader2 } from "lucide-react";

export default function ColdStorage() {
    const { data = [], isLoading, isError } = useGetColdStoragesQuery();

    const [search, setSearch] = useState("");
    const [stateFilter, setStateFilter] = useState("");

    // Unique states for filter
    const states = [...new Set(data.map(item => item.state))];

    // Filtered Data
    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        (stateFilter ? item.state === stateFilter : true)
    );

    return (
        <div className="min-h-screen bg-[#F9F3E0] py-10 px-6">
            <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
                Cold Storage Centers Across India
            </h1>

            {/* Filters */}
            <div className="max-w-5xl mx-auto mb-10 flex flex-col md:flex-row gap-4 justify-between">

                <input
                    type="text"
                    placeholder="Search Cold Storage..."
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

            {/* Data States */}
            {isLoading && (
                <div className="flex justify-center mt-20">
                    <Loader2 className="animate-spin text-green-700" size={40} />
                </div>
            )}

            {isError && (
                <p className="text-center text-red-500 text-xl font-semibold">Failed to load data.</p>
            )}

            {/* Cards Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl p-6 shadow-md border border-green-200 hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-bold text-green-800 mb-2">{item.name}</h2>

                        <p className="text-gray-700 mb-1">
                            <span className="font-semibold">State:</span> {item.state}
                        </p>

                        <p className="text-gray-700 mb-1">
                            <span className="font-semibold">City:</span> {item.city}
                        </p>

                        <p className="text-gray-700 mb-1">
                            <span className="font-semibold">Address:</span> {item.address}
                        </p>

                        <p className="text-gray-700 mb-1">
                            <span className="font-semibold">Phone:</span> {item.phone}
                        </p>

                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">Email:</span> {item.email}
                        </p>

                        <div className="flex items-center justify-between mt-4">
                            <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-semibold">
                                {item.type}
                            </span>

                            <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                                {item.capacity_mt} MT
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* No Results */}
            {!isLoading && filteredData.length === 0 && (
                <p className="text-center text-gray-500 text-lg mt-10">
                    No cold storage found matching your search.
                </p>
            )}
        </div>
    );
}
