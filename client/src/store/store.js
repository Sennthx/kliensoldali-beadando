import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import uiReducer from "./uiSlice";
import authReducer from "./authSlice";

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        ui: uiReducer,
        auth: authReducer,
    },
});