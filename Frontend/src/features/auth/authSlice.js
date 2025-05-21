import { createSlice } from "@reduxjs/toolkit";
import { checkAuthThunk, loginThunk, logoutThunk, signUpThunk } from "./authThunk";

const initialState = {
    user: null,
    loading: false,
    error: false,
    isAuthenticated: false,
    isLoggedOut: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = null
        }
    },
    extraReducers: (builder) => {

        //signup
        builder.addCase(signUpThunk.pending, (state) => {
            state.loading = true,
                state.error = false
        }),
            builder.addCase(signUpThunk.fulfilled, (state, action) => {
                state.loading = false,
                    state.user = action.payload
            }),
            builder.addCase(signUpThunk.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message
            }),
            //login 
            builder.addCase(loginThunk.pending, (state) => {
                state.loading = true,
                    state.error = false
            }),
            builder.addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false,
                    state.user = action.payload
            }),
            builder.addCase(loginThunk.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message
            })
            //check authentication
        builder.addCase(checkAuthThunk.pending, (state) => {
            state.loading = true;
        })
            .addCase(checkAuthThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(checkAuthThunk.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            }),
            //logout
            builder.addCase(logoutThunk.pending, (state) => {
                state.loading = true,
                    state.error = false,
                    state.isLoggedOut = false
            })
                .addCase(logoutThunk.fulfilled, (state) => {
                    state.isLoggedOut = true;
                    state.user = null;
                    state.isAuthenticated = false;  // <<< important!
                    state.loading = false;
                })

                .addCase(logoutThunk.rejected, (state, action) => {
                    state.loading = false,
                        state.error = action.error.message,
                        state.isLoggedOut = false
                })
    }
});
export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;