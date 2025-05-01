    import { createSlice } from '@reduxjs/toolkit';

    const getCurrentDay = () => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const today = new Date();
        return days[today.getDay()];
    };

    const initialState = {
    selectedDay: getCurrentDay(),
    selectedMovieId: null,
    selectedScreening: null,
    ticketCounts: {
        adult: 0,
        student: 0,
        senior: 0,
    },
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
        clearSelectedMovie: (state) => {
            state.selectedMovieId = null;
            state.selectedScreening = null;
            state.ticketCounts = {
                        adult: 0,
                        student: 0,
                        senior: 0,
                    };
        },
        setSelectedScreening: (state, action) => {
            state.selectedScreening = action.payload;
        },
        setTicketCount: (state, action) => {
            const { type, count } = action.payload;
            state.ticketCounts[type] = count;
        },
        clearTickets: (state) => {
            state.ticketCounts = { adult: 0, student: 0, senior: 0 };
        },

        resetBookingState: (state, action) => {
            state.selectedMovieId = action.payload;
            state.selectedScreening = null;
            state.ticketCounts = { adult: 0, student: 0, senior: 0 };
        }
    },
    });

    export const { setSelectedDay, setSelectedMovie, clearSelectedMovie, setSelectedScreening, setTicketCount, clearTickets } = uiSlice.actions;
    export default uiSlice.reducer;
