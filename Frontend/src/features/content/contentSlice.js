import { createSlice } from "@reduxjs/toolkit";
import { fetchTrendingContentThunk } from "./contentThunk";

const contentSlice = createSlice({
    name: "content",
    initialState: {
        contentType: "movie",
        data: [],
        loading: false,
        error: null
    },
    reducers: {
        setContentType: (state, action) => {
            state.contentType = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrendingContentThunk.pending,(state)=>{
                state.loading = true,
                state.error = null
            })
            .addCase(fetchTrendingContentThunk.fulfilled,(state,action)=>{
                state.loading = false,
                state.data = action.payload
            })
            .addCase(fetchTrendingContentThunk.rejected,(state,action)=>{
                state.loading = false,
                state.error = action.payload
            })
    }

});

export const {setContentType} = contentSlice.actions;
export default contentSlice.reducer;
