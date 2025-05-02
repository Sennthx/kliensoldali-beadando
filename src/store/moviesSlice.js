import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moviesData from "../data/movies.json";

export const loadMovies = createAsyncThunk("movies/load", async () => {
    return moviesData;
});

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        list: [],
        status: "idle",
    },
    reducers: {
        addBookingsToScreening: (state, action) => {
            const { movieId, screeningId, newBookings } = action.payload;
            console.log("asdasdsad");
            const movie = state.list.find((movie) => movie.id === movieId);
            if (movie) {
                const screening = movie.screenings.find(
                    (screening) => screening.id === screeningId
                );
                if (screening) {
                    // Add the new bookings to the screening's bookings array
                    screening.bookings.push(...newBookings);
                    console.log("Updated bookings:", screening.bookings);
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadMovies.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loadMovies.fulfilled, (state, action) => {
                state.list = action.payload;
                state.status = "loaded";
            })
            .addCase(loadMovies.rejected, (state) => {
                state.status = "error";
            });
    },
});

export const { addBookingsToScreening } = moviesSlice.actions;
export default moviesSlice.reducer;
