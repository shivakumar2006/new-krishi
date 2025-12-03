import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../store/api/JwtAuth";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice"; // your slice (must exist)

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginUser, { isLoading }] = useLoginUserMutation();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.role) {
            alert("Please select a role!");
            return;
        }

        try {
            const res = await loginUser(formData).unwrap();

            dispatch(setCredentials({
                token: res.token,
                user: res.user
            }));

            alert("Login successful!");
            localStorage.removeItem("last_session_id");
            navigate("/booking");

        } catch (err) {
            alert(err?.data?.error || "Login failed");
        }
    };


    return (
        <div style={{ backgroundColor: "#F9F3E0", minHeight: "100vh" }}>
            <div className="flex items-center justify-center min-h-screen px-6">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-black mb-2">Welcome Back</h1>
                        <p className="text-gray-600">Please sign in to your account</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <InputField
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            <InputField
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                            />

                            {/* Role */}
                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Role
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded-lg"
                                >
                                    <option value="">Select Role</option>
                                    <option value="farmer">Farmer</option>
                                    <option value="customer">Customer</option>
                                    <option value="driver">Driver</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            {/* Forgot Password */}
                            <div className="text-right">
                                <Link
                                    to="/forgot-password"
                                    className="text-sm hover:underline"
                                    style={{ color: "#009F1D" }}
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90"
                                style={{
                                    backgroundColor: "#205D21",
                                    borderRadius: "8px",
                                }}
                            >
                                {isLoading ? "Signing in..." : "Sign In"}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="mt-6 mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">OR</span>
                                </div>
                            </div>
                        </div>

                        {/* Register Link */}
                        <div className="text-center">
                            <p className="text-gray-600">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="font-semibold hover:underline"
                                    style={{ color: "#009F1D" }}
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InputField({ label, name, value, onChange, placeholder, type = "text" }) {
    return (
        <div>
            <label className="block text-sm font-medium text-black mb-2">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                style={{ borderRadius: "8px", fontSize: "16px" }}
            />
        </div>
    );
}
