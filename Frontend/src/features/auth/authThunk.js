import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkAuthUser, loginAPI, logoutAPI, signUpUser } from "./authApi";

export const signUpThunk = createAsyncThunk(
    "auth/signup",
    async (userData, { rejectWithValue }) => {
        try {
            const user = await signUpUser(userData);
            return user; 
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Signup failed. Try again.";
            return rejectWithValue(errorMsg);
        }
    }
);

export const loginThunk = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
    try {
        const user = await loginAPI(userData);
        return user;
    } catch (error) {
        const errorMsg = error.response?.data?.message || "Login failed. Try again.";
        return rejectWithValue(errorMsg);
    }
})

export const logoutThunk = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        const res = await logoutAPI();
        return res.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || "Logout failed. Try again";
        return rejectWithValue(errorMsg);
    }
});

export const checkAuthThunk = createAsyncThunk("auth/checkAuth", async (_, { rejectWithValue }) => {
    try {
        const user = await checkAuthUser(); // make sure this uses `withCredentials: true` inside
        return user;
    } catch (error) {
        // Check if it's just an unauthorized (unauthenticated) user
        if (error.response?.status === 401) {
            // Optional: you can return null or a special flag to indicate no logged-in user
            return rejectWithValue("Unauthorized");
        }

        const msg = error.response?.data?.message || "Auth check failed";
        return rejectWithValue(msg);
    }
});
