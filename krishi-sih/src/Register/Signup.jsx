import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignupUserMutation } from "../store/api/JwtAuth";

export default function Signup() {
    const [signupUser, { isLoading }] = useSignupUserMutation();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        phone: "",
        role: "",
        agreeToTerms: false,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
        if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
        if (!formData.phone.trim()) newErrors.phone = "Phone is required";
        if (!formData.role.trim()) newErrors.role = "Role is required";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6)
            newErrors.password = "Password must be at least 6 characters";

        if (formData.password !== formData.confirm_password)
            newErrors.confirm_password = "Passwords do not match";

        if (!formData.agreeToTerms)
            newErrors.agreeToTerms = "You must accept terms";

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length !== 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await signupUser(formData).unwrap();
            alert("Signup successful!");

            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                confirm_password: "",
                phone: "",
                role: "",
                agreeToTerms: false,
            });

        } catch (err) {
            alert("Signup failed: " + (err?.data?.error || "Unknown error"));
        }
    };

    return (
        <div className="bg-[#F9F3E0] min-h-screen flex justify-center items-center px-6 py-8">
            <div className="w-full max-w-md">

                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-black">Create Account</h1>
                    <p className="text-gray-600">Join Krishi community today</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-8">

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <InputField
                                label="First Name"
                                name="first_name"
                                placeholder="Enter first name"
                                value={formData.first_name}
                                onChange={handleChange}
                                error={errors.first_name}
                            />

                            <InputField
                                label="Last Name"
                                name="last_name"
                                placeholder="Enter last name"
                                value={formData.last_name}
                                onChange={handleChange}
                                error={errors.last_name}
                            />
                        </div>

                        <InputField
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                        />

                        <InputField
                            label="Phone Number"
                            name="phone"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            error={errors.phone}
                        />

                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Select Role
                            </label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-green-600"
                            >
                                <option value="">Choose your role</option>
                                <option value="farmer">Farmer</option>
                                <option value="customer">Customer</option>
                                <option value="driver">Driver</option>
                                <option value="admin">Admin</option>
                            </select>
                            {errors.role && (
                                <p className="text-red-500 text-xs">{errors.role}</p>
                            )}
                        </div>

                        <InputField
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                        />

                        <InputField
                            label="Confirm Password"
                            name="confirm_password"
                            type="password"
                            placeholder="Re-enter your password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            error={errors.confirm_password}
                        />

                        {/* Terms */}
                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                className="mt-1 h-4 w-4"
                            />
                            <label className="text-sm text-gray-700">
                                I agree to the{" "}
                                <span className="text-green-700 font-semibold">
                                    Terms & Conditions
                                </span>
                            </label>
                        </div>
                        {errors.agreeToTerms && (
                            <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#205D21] text-white py-3 rounded-lg font-semibold text-lg hover:opacity-95 transition"
                        >
                            {isLoading ? "Creating..." : "Create Account"}
                        </button>

                    </form>

                    <div className="flex items-center my-6">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="px-2 text-gray-500">OR</span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>

                    <p className="text-center text-gray-700">
                        Already have an account?{" "}
                        <Link to="/login" className="text-green-700 font-semibold">
                            Sign In
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}

function InputField({ label, name, value, onChange, error, placeholder, type = "text" }) {
    return (
        <div>
            <label className="block text-sm font-medium text-black mb-2">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
