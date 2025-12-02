import React, { useState } from "react";
import CropForm from "../components/crop/CropForm";
import CropResultCard from "../components/crop/CropResultCard";
import GlassCard from "../components/ui/GlassCard";
import { fetchCropRecommendations } from "../api/mockApi";

/**
 * Page wrapper: uses CropForm and shows results area.
 * Entire page uses glassmorphism on dark background (index.css should define page bg).
 */
export default function CropRecommendation() {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (payload) => {
        setLoading(true);
        setResults(null);
        try {
            const res = await fetchCropRecommendations(payload);
            setResults(res);
        } catch (err) {
            setResults([]);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gradient-to-b from-[#071026] to-[#081224] text-white">
            <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
                <CropForm onSubmit={onSubmit} />

                <div className="space-y-4">
                    <GlassCard>
                        <h3 className="text-lg font-medium">Results</h3>
                        <p className="text-sm text-white/70 mt-2">
                            Top crop suggestions based on input values. Replace the mock API with your model endpoint later.
                        </p>

                        <div className="mt-4">
                            {loading && (
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-md bg-white/6 flex items-center justify-center">
                                        <div className="animate-spin border-2 border-white/20 border-t-white rounded-full w-6 h-6"></div>
                                    </div>
                                    <div>
                                        <div className="text-sm">Analyzing...</div>
                                        <div className="text-xs text-white/60">Please wait while the model runs</div>
                                    </div>
                                </div>
                            )}

                            {!loading && !results && (
                                <div className="text-sm text-white/60">Enter values and submit to see recommendations.</div>
                            )}

                            {!loading && results && results.length === 0 && (
                                <div className="text-sm text-white/60">No recommendations found.</div>
                            )}

                            {!loading && results && results.length > 0 && (
                                <div className="mt-3 grid gap-3">
                                    {results.map((r, i) => (
                                        <CropResultCard key={r.name + i} crop={r} index={i + 1} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </GlassCard>

                    <GlassCard>
                        <h4 className="text-sm font-medium text-white/80">Notes</h4>
                        <ul className="mt-2 text-xs text-white/70 list-disc ml-4 space-y-1">
                            <li>Mock results are illustrative — use real model endpoint for production.</li>
                            <li>Show confidence in each recommendation for transparency.</li>
                        </ul>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
