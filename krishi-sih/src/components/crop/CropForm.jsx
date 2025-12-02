import React, { useState, useMemo } from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import GlassCard from "../ui/GlassCard";

export default function CropForm({ onSubmit, initial = {} }) {
    const [form, setForm] = useState({
        n: initial.n ?? "",
        p: initial.p ?? "",
        k: initial.k ?? "",
        temp: initial.temp ?? "",
        ph: initial.ph ?? "",
        rainfall: initial.rainfall ?? "",
    });

    const update = (key) => (e) => setForm((s) => ({ ...s, [key]: e.target.value }));

    // Count filled fields
    const filledCount = useMemo(() => {
        return Object.values(form).filter((v) => v !== "").length;
    }, [form]);

    const submit = (e) => {
        e?.preventDefault();
        if (filledCount < 3) return; // safety

        onSubmit({
            n: Number(form.n || 0),
            p: Number(form.p || 0),
            k: Number(form.k || 0),
            temp: Number(form.temp || 0),
            ph: Number(form.ph || 0),
            rainfall: Number(form.rainfall || 0),
        });
    };

    const reset = () => setForm({ n: "", p: "", k: "", temp: "", ph: "", rainfall: "" });

    return (
        <form onSubmit={submit}>
            <GlassCard className="space-y-4">
                <div>
                    <h3 className="text-2xl font-semibold">Crop Recommendation</h3>
                    <p className="text-sm text-white/70 mt-1">
                        Provide at least <span className="text-emerald-300 font-medium">3 values</span> to get suggestions.
                    </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    <InputField id="n" label="Nitrogen (N)" value={form.n} onChange={update("n")} placeholder="e.g. 40" />
                    <InputField id="p" label="Phosphorus (P)" value={form.p} onChange={update("p")} placeholder="e.g. 30" />
                    <InputField id="k" label="Potassium (K)" value={form.k} onChange={update("k")} placeholder="e.g. 20" />
                    <InputField id="temp" label="Temperature (°C)" value={form.temp} onChange={update("temp")} placeholder="e.g. 28" />
                    <InputField id="ph" label="pH level" value={form.ph} onChange={update("ph")} placeholder="e.g. 6.5" />
                    <InputField id="rainfall" label="Rainfall (mm)" value={form.rainfall} onChange={update("rainfall")} placeholder="e.g. 120" />
                </div>

                {/* Hint if not enough fields */}
                {filledCount < 3 && (
                    <p className="text-xs text-red-300">At least 3 fields are required.</p>
                )}

                <div className="flex items-center gap-3 mt-1">
                    <Button
                        type="submit"
                        disabled={filledCount < 3}
                        className={`${filledCount < 3 ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        Get Recommendations
                    </Button>

                    <button
                        type="button"
                        onClick={reset}
                        className="px-3 py-2 rounded-lg bg-white/4 border border-white/8 text-sm"
                    >
                        Reset
                    </button>
                </div>
            </GlassCard>
        </form>
    );
}
