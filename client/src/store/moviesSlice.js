import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import moviesData from "../data/movies.json";

const API_BASE = import.meta.env.VITE_API_URL;

export const loadMovies = createAsyncThunk("movies/load", async () => {
    const response = await fetch(`${API_BASE}/movies`);
    if (!response.ok) throw new Error("Failed to fetch movies");
    return await response.json();
});

export const loadMovie = createAsyncThunk("movies/loadOne", async (movieId) => {
    const response = await fetch(`${API_BASE}/movies/${movieId}`);
    if (!response.ok) throw new Error("Movie not found");
    return await response.json();
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
            const movie = state.list.find((movie) => movie.id === movieId);
            if (movie) {
                const screening = movie.screenings.find(
                    (screening) => screening.id === screeningId
                );
                if (screening) {
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
            })

            // loadMovie
            .addCase(loadMovie.pending, (state) => {
                state.currentMovieStatus = "loading";
                state.currentMovie = null;
                state.currentMovieError = null;
            })
            .addCase(loadMovie.fulfilled, (state, action) => {
                state.currentMovieStatus = "loaded";
                state.currentMovie = action.payload;
                state.currentMovieError = null;
            })
            .addCase(loadMovie.rejected, (state, action) => {
                state.currentMovieStatus = "error";
                state.currentMovie = null;
                state.currentMovieError = action.error.message;
            });
    },
});

export const { addBookingsToScreening } = moviesSlice.actions;
export default moviesSlice.reducer;
