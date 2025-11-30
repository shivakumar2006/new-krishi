import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: storedToken ? storedToken : null,
        user: storedUser ? JSON.parse(storedUser) : null,
        isAuthenticated: storedToken ? true : false,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { token, user } = action.payload;

            state.token = token;
            state.user = user;
            state.isAuthenticated = true;

            // Save to localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
        },

        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;

            // Remove from localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
