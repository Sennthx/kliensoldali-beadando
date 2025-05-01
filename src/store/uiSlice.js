import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedDay: 'Monday',
  selectedMovieId: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedDay: (state, action) => {
        state.selectedDay = action.payload;
    },
    setSelectedMovie: (state, action) => {
        state.selectedMovieId = action.payload;
    },
  },
});

export const { setSelectedDay, setSelectedMovie } = uiSlice.actions;
export default uiSlice.reducer;
