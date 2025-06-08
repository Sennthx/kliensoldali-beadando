import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = import.meta.env.VITE_API_URL;

export const loadMovies = createAsyncThunk("movies/load", async () => {
    const response = await fetch(`${API_BASE}/movies`);
    if (!response.ok) throw new Error("Failed to fetch movies");
    const data = await response.json();
    return data.data;
});

export const loadMovie = createAsyncThunk(
    "movies/loadOne",
    async (movieId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE}/movies/${movieId}`);
            if (response.status === 404) {
                return rejectWithValue("not_found");
            }
            if (!response.ok) {
                throw new Error("Failed to load movie");
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            return rejectWithValue(error.message || "Unknown error");
        }
    }
);

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        list: [],
        status: "idle",
        currentMovie: null,
        currentMovieStatus: "idle",
        currentMovieError: null,
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
        clearCurrentMovie: (state) => {
            state.currentMovie = null;
            state.currentMovieStatus = "idle";
            state.currentMovieError = null;
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
                if (action.payload === "not_found") {
                    state.currentMovieStatus = "not_found";
                } else {
                    state.currentMovieStatus = "error";
                }
                state.currentMovie = null;
                state.currentMovieError = action.error.message;
            });
    },
});

export const { addBookingsToScreening, clearCurrentMovie } =
    moviesSlice.actions;
export default moviesSlice.reducer;
