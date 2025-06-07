import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        name: "Teszt Elek",
        role: "admin", // Change to "user" or null for other roles
    },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        },
        loginAsUser: (state) => {
            state.user = { name: "Teszt Felhasználó", role: "user" };
        },
        loginAsAdmin: (state) => {
            state.user = { name: "Admin", role: "admin" };
        },
    },
});

export const { logout, loginAsUser, loginAsAdmin } = authSlice.actions;
export default authSlice.reducer;