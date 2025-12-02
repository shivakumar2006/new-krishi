import React, { useState, useEffect } from "react";
import GlassCard from "../components/ui/GlassCard";
import CropSelector from "../components/irrigation/CropSelector";
import DayCard from "../components/irrigation/DayCard";
import { fetchIrrigationSchedule } from "../api/mockApi";

/**
 * Scheduler page: auto-fetch schedule when both crop and soil selected.
 */
export default function IrrigationScheduler() {
    const [crop, setCrop] = useState("");
    const [soil, setSoil] = useState("");
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(false);

    const load = async (c, s) => {
        if (!c || !s) return;
        setLoading(true);
        setSchedule(null);
        try {
            const res = await fetchIrrigationSchedule({ crop: c, soil: s });
            setSchedule(res);
        } catch (err) {
            setSchedule(null);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load(crop, soil);
    }, [crop, soil]);

    return (
        <div className="min-h-screen p-6 bg-gradient-to-b from-[#071026] to-[#081224] text-white">
            <div className="max-w-6xl mx-auto">
                <GlassCard>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-semibold">Irrigation Scheduler</h2>
                            <p className="text-sm text-white/70 mt-1">Generate a weekly schedule based on crop & soil type.</p>
                        </div>

                        <div className="flex gap-3">
                            <CropSelector value={crop} onChange={setCrop} label="Crop" options={["Wheat", "Rice", "Maize", "Cotton"]} />
                            <CropSelector value={soil} onChange={setSoil} label="Soil Type" options={["Loamy", "Sandy", "Clayey", "Silty"]} />
                        </div>
                    </div>
                </GlassCard>

                <div className="mt-6">
                    {loading && (
                        <GlassCard>
                            <div className="text-sm text-white/70">Generating schedule...</div>
                        </GlassCard>
                    )}

                    {!loading && !schedule && (
                        <GlassCard>
                            <div className="text-sm text-white/70">Select crop and soil to generate schedule for 7 days.</div>
                        </GlassCard>
                    )}

                    {!loading && schedule && (
                        <div className="grid gap-4 md:grid-cols-3">
                            {schedule.map((d, idx) => (
                                <DayCard key={d.day} day={d} index={idx} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
