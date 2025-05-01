import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import moviesData from '../assets/movies.json';

export const loadMovies = createAsyncThunk('movies/load', async () => {
  return moviesData;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadMovies.pending, state => {
        state.status = 'loading';
      })
      .addCase(loadMovies.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'loaded';
      })
      .addCase(loadMovies.rejected, state => {
        state.status = 'error';
      });
  },
});

export default moviesSlice.reducer;
