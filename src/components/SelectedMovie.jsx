import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearTickets,
    clearSelectedMovie,
    setSelectedScreeningId,
    resetSelectedSeats,
} from "../store/uiSlice";

import MovieDetails from "./MovieDetails";
import TicketSelector from "./TicketSelector";
import SeatSelector from "./SeatSelector";
import AddToCartButton from "./AddToSummaryButton";

const SelectedMovie = () => {
    const dispatch = useDispatch();

    const selectedMovieId = useSelector((state) => state.ui.selectedMovieId);
    const selectedDay = useSelector((state) => state.ui.selectedDay);
    const selectedScreeningId = useSelector(
        (state) => state.ui.selectedScreeningId
    );
    const movies = useSelector((state) => state.movies.list);

    const selectedMovie = movies.find((m) => m.id === selectedMovieId);
    const selectedScreening = selectedMovie?.screenings.find(
        (s) => s.id === selectedScreeningId
    );

    useEffect(() => {
        dispatch(setSelectedScreeningId(null));
        dispatch(clearTickets());
        dispatch(resetSelectedSeats());
    }, [selectedMovieId, selectedDay, dispatch]);

    useEffect(() => {
        if (
            selectedMovie &&
            !selectedMovie.screenings.some((s) => s.weekday === selectedDay)
        ) {
            dispatch(clearSelectedMovie());
        }
    }, [selectedMovie, selectedDay, dispatch]);

    if (!selectedMovieId) {
        return (
            <div className="w-full rounded-lg p-6 shadow-md bg-base-100 text-center text-gray-500">
                <p>Select a movie to begin booking.</p>
            </div>
        );
    }

    return (
        <div className="w-full rounded-lg p-6 shadow-md bg-base-100 space-y-6">
            <MovieDetails />
            {selectedScreening && (
                <>
                    <div className="grid grid-cols-1 gap-6 mt-6">
                        <TicketSelector />
                        <SeatSelector />
                    </div>
                    <AddToCartButton />
                </>
            )}
        </div>
    );
};

export default SelectedMovie;
