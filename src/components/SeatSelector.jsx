import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addSelectedSeat,
    removeSelectedSeat,
    resetSelectedSeats,
} from "../store/uiSlice";
import { toast } from "react-toastify";

const SeatSelector = () => {
    const dispatch = useDispatch();
    const selectedSeats = useSelector((state) => state.ui.selectedSeats);
    const selectedMovieId = useSelector((state) => state.ui.selectedMovieId);
    const selectedScreeningId = useSelector(
        (state) => state.ui.selectedScreeningId
    );
    const movies = useSelector((state) => state.movies.list);
    const selectedMovie = movies.find((m) => m.id === selectedMovieId);

    const selectedScreening = selectedMovie?.screenings.find(
        (s) => s.id === selectedScreeningId
    );
    const ticketCounts = useSelector((state) => state.ui.ticketCounts);
    const totalTickets =
        ticketCounts.adult + ticketCounts.student + ticketCounts.senior;

    if (!selectedScreening) return null;

    const generateSeatMatrix = () => {
        const { rows, seatsPerRow } = selectedScreening.room;
        const booked = new Set(
            selectedScreening.bookings.map((b) => `${b.row}-${b.seat}`)
        );

        return Array.from({ length: rows }, (_, rowIndex) =>
            Array.from({ length: seatsPerRow }, (_, seatIndex) => {
                const row = rowIndex + 1;
                const seat = seatIndex + 1;
                return {
                    row,
                    seat,
                    available: !booked.has(`${row}-${seat}`),
                };
            })
        );
    };

    const seatMatrix = generateSeatMatrix();

    const handleSeatSelect = (seat) => {
        if (totalTickets === 0) {
            toast.error("Please select the number of tickets first.");
            return;
        }

        const isSelected = selectedSeats.some(
            (s) => s.row === seat.row && s.seat === seat.seat
        );

        if (isSelected) {
            dispatch(removeSelectedSeat(seat));
        } else if (selectedSeats.length < totalTickets) {
            dispatch(addSelectedSeat(seat));
        }
    };

    const rowIndexToLetter = (index) => {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return alphabet[index] || String.fromCharCode(65 + index);
    };

    useEffect(() => {
        if (selectedSeats.length > totalTickets) {
            const excessSeats = selectedSeats.slice(totalTickets);
            excessSeats.forEach((seat) => dispatch(removeSelectedSeat(seat)));
            toast.info("Extra seats deselected due to reduced ticket count.");
        }
    }, [ticketCounts, selectedSeats, totalTickets, dispatch]);

    useEffect(() => {
        dispatch(resetSelectedSeats());
    }, [selectedScreening, dispatch]);

    return (
        <>
            <div className="flex justify-center mb-8">
                <div className="space-y-4">
                    <h3 className="text-4xl font-bold mb-8 text-center">
                        Seat Selection
                    </h3>
                    <div className="space-y-1">
                        {seatMatrix.map((row, rowIndex) => (
                            <div
                                key={rowIndex}
                                className="flex gap-1 justify-center"
                            >
                                {row.map((seat, seatIndex) => {
                                    const isSelected = selectedSeats.some(
                                        (s) =>
                                            s.row === seat.row &&
                                            s.seat === seat.seat
                                    );

                                    return (
                                        <button
                                            key={seatIndex}
                                            onClick={() =>
                                                handleSeatSelect(seat)
                                            }
                                            className={`
                        btn btn-xs 
                        ${
                            !seat.available
                                ? "bg-gray-400 cursor-not-allowed"
                                : isSelected
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-200"
                        }
                        rounded-none text-accent text-lg font-semibold
                        border-none
                        w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] lg:w-[42px] lg:h-[42px]
                      `}
                                            disabled={!seat.available}
                                        >
                                            {rowIndexToLetter(seat.row - 1)}
                                            {seat.seat}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <hr className="mb-4" />
        </>
    );
};

export default SeatSelector;
