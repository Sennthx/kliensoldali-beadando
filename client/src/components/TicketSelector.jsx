import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTicketCount } from "../store/uiSlice";
import { toast } from "react-toastify";

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

    const token = useSelector((state) => state.auth.token);
    const isLoggedIn = !!token;

    const [localCounts, setLocalCounts] = useState(ticketCounts);

    const totalSelected =
        Object.values(localCounts).reduce(
            (sum, val) => sum + parseInt(val || 0, 10),
            0
        ) - 1;

    useEffect(() => {
        setLocalCounts(ticketCounts);
    }, [ticketCounts]);

    const handleChange = (type, value) => {
        if (!isLoggedIn) {
            toast.info("Please log in to select tickets.");
            return;
        }

        if (/^\d*$/.test(value)) {
            const parsed = parseInt(value || "0", 10);

            const simulatedCounts = {
                ...localCounts, // Fix here
                [type]: parsed,
            };

            const simulatedTotal =
                Object.values(simulatedCounts).reduce(
                    (sum, val) => sum + parseInt(val || 0, 10),
                    0
                ) - 1;

            if (simulatedTotal <= availableSeats) {
                setLocalCounts(simulatedCounts);
                dispatch(setTicketCount({ type, count: parsed }));
            } else {
                toast.warning("Not enough available seats.");
            }
        }
    };

    const handleFocus = () => {
        if (!isLoggedIn) toast.info("Please log in to select tickets.");
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
                                label: "Normal Tickets",
                                price: 2500,
                                key: "normal",
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
                                    onFocus={handleFocus}
                                    onChange={(e) =>
                                        handleChange(key, e.target.value)
                                    }
                                    readOnly={!isLoggedIn}
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
