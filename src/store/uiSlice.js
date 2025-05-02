import { createSlice } from '@reduxjs/toolkit';

const getCurrentDay = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    return days[today.getDay()];
};

const initialState = {
    selectedDay: getCurrentDay(),
    selectedMovieId: null,
    selectedScreeningId: null,
    ticketCounts: {
        adult: 0,
        student: 0,
        senior: 0,
    },
    selectedSeats: [],
    isCartModalOpen: false,
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
        state.selectedScreeningId = null;
        state.ticketCounts = {
                    adult: 0,
                    student: 0,
                    senior: 0,
                };
    },
    setSelectedScreeningId: (state, action) => {
        state.selectedScreeningId = action.payload;
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
        state.selectedScreeningId = null;
        state.ticketCounts = { adult: 0, student: 0, senior: 0 };
    },
    setSelectedSeats: (state, action) => {
        state.selectedSeats = action.payload;
    },
    addSelectedSeat: (state, action) => {
        const seat = action.payload;
        const exists = state.selectedSeats.some(s => s.row === seat.row && s.seat === seat.seat);
        if (!exists) state.selectedSeats.push(seat);
    },
    removeSelectedSeat: (state, action) => {
        const seat = action.payload;
        state.selectedSeats = state.selectedSeats.filter(s => !(s.row === seat.row && s.seat === seat.seat));
    },
    openCartModal: (state) => {
        state.isCartModalOpen = true;
    },
    closeCartModal: (state) => {
        state.isCartModalOpen = false;
    },
    resetSelectedSeats: (state) => {
        state.selectedSeats = [];
    }
},
});

export const { 
    setSelectedDay, 
    setSelectedMovie, 
    clearSelectedMovie, 
    setSelectedScreeningId, 
    setTicketCount, 
    clearTickets,   
    setSelectedSeats,
    addSelectedSeat,
    removeSelectedSeat,
    openCartModal,
    closeCartModal,
    resetSelectedSeats, } = uiSlice.actions;
    
export default uiSlice.reducer;
