import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isAuthenticated } = useSelector((state) => state.auth);

    // If no user logged in, redirect to login
    if (!isAuthenticated || !user) {
        navigate("/login");
        return null;
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F3E0] px-6 py-8">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

                <h1 className="text-3xl font-bold text-center mb-6">Your Profile</h1>

                <div className="space-y-4">
                    <ProfileItem label="First Name" value={user.first_name} />
                    <ProfileItem label="Last Name" value={user.last_name} />
                    <ProfileItem label="Email" value={user.email} />
                    <ProfileItem label="Phone Number" value={user.phone} />
                    <ProfileItem label="Role" value={user.role} />
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>

            <div className="w-full mt-10 justify-center items-center flex flex-row">
                <button onClick={() => navigate("/payment-success")} className="bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition">
                    Check success
                </button>
            </div>
        </div>
    );
};

const ProfileItem = ({ label, value }) => (
    <div className="border-b pb-3">
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-lg font-semibold text-black">{value || "---"}</p>
    </div>
);

export default Profile;
