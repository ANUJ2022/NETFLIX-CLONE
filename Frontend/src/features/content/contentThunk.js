import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTrendingContent } from "./contentApi";

export const fetchTrendingContentThunk = createAsyncThunk("content/fetchTrending", async (type, {rejectWithValue}) => {
    try {
        const fetchTrending = await getTrendingContent(type);
        return fetchTrending;
    } catch (error) {
        const errorMsg = error.response?.data?.message || "Movie fetch failed. Try again.";
        return rejectWithValue(errorMsg);
    }
})