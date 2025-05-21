
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import contentReducer from "../features/content/contentSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        content:contentReducer
    }
})