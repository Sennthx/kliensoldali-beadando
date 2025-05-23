import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTicketCount } from "../store/uiSlice";

const TicketSelector = () => {
    const dispatch = useDispatch();
    const ticketCounts = useSelector((state) => state.ui.ticketCounts);
    const selectedMovieId = useSelector((state) => state.ui.selectedMovieId);
    const selectedScreeningId = useSelector(
        (state) => state.ui.selectedScreeningId
    );
    const movies = useSelector((state) => state.movies.list);

    const selectedMovie = movies.find((movie) => movie.id === selectedMovieId);
    const screeningData = selectedMovie?.screenings.find(
        (s) => s.id === selectedScreeningId
    );

    const totalSeats =
        screeningData?.room?.rows * screeningData?.room?.seatsPerRow || 0;
    const bookedSeats = screeningData?.bookings?.length || 0;
    const availableSeats = totalSeats - bookedSeats;

    const totalSelected = Object.values(ticketCounts).reduce(
        (sum, val) => sum + val,
        0
    );

    const [localCounts, setLocalCounts] = useState(ticketCounts);

    useEffect(() => {
        setLocalCounts(ticketCounts);
    }, [ticketCounts]);

    const handleChange = (type, value) => {
        if (/^\d*$/.test(value)) {
            const parsed = parseInt(value || "0", 10);
            const newTotal = totalSelected - ticketCounts[type] + parsed;

            if (newTotal <= availableSeats) {
                setLocalCounts((prev) => ({ ...prev, [type]: value }));
                dispatch(setTicketCount({ type, count: parsed }));
            }
        }
    };

    if (!screeningData) {
        return (
            <p className="text-center text-gray-500">
                Please select a screening.
            </p>
        );
    }

    return (
        <>
            <hr className="mt-4" />
            <div className="space-y-4 my-2">
                <h3 className="text-2xl font-bold text-center">
                    Ticket Selector
                </h3>
                <div className="text-center text-lg text-gray-500">
                    Available seats: {availableSeats - totalSelected}
                </div>
                <div className="flex justify-center">
                    <div className="space-y-2 w-96">
                        {[
                            {
                                label: "Adult Tickets",
                                price: 2500,
                                key: "adult",
                            },
                            {
                                label: "Student Tickets",
                                price: 2000,
                                key: "student",
                            },
                            {
                                label: "Senior Tickets",
                                price: 1800,
                                key: "senior",
                            },
                        ].map(({ label, price, key }) => (
                            <div className="flex justify-between" key={key}>
                                <span>
                                    {label} ({price} Ft)
                                </span>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={localCounts[key]}
                                    onChange={(e) =>
                                        handleChange(key, e.target.value)
                                    }
                                    className="input input-bordered w-16"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <hr className="mb-4" />
        </>
    );
};

export default TicketSelector;
