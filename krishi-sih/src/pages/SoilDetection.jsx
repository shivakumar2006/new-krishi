import React, { useState } from "react";
import SoilUploader from "../components/soil/SoilUploader";
import SoilResultCard from "../components/soil/SoilResultCard";
import { detectSoilFromImage } from "../api/mockApi";

/**
 * Soil detection page wires uploader -> mockApi -> result card.
 */
export default function SoilDetection() {
    const [result, setResult] = useState(null);

    return (
        <div className="min-h-screen p-6 bg-gradient-to-b from-[#071026] to-[#081224] text-white">
            <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2 items-start">
                <SoilUploader
                    detectFn={detectSoilFromImage}
                    onDetect={(res) => setResult(res)}
                />
                <SoilResultCard result={result} />
            </div>
        </div>
    );
}
