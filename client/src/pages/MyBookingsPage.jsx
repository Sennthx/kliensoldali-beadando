import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyBookingsPage = () => {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [renderedBookings, setRenderedBookings] = useState([]);
    const [renderIndex, setRenderIndex] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BATCH_SIZE = 5;

    useEffect(() => {
        if (!user || !token) {
            navigate("/login");
            return;
        }

        const fetchBookings = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/bookings", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch bookings");
                }

                const data = await res.json();
                const allBookings = data.data || [];

                setBookings(allBookings);
                setRenderedBookings(allBookings.slice(0, BATCH_SIZE));
                setRenderIndex(BATCH_SIZE);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user, token, navigate]);

    const handleLoadMore = () => {
        const nextChunk = bookings.slice(renderIndex, renderIndex + BATCH_SIZE);
        setRenderedBookings((prev) => [...prev, ...nextChunk]);
        setRenderIndex((prev) => prev + BATCH_SIZE);
    };

    return (
        <div className="flex items-start justify-center mt-8 bg-base-100 p-4">
            <div className="w-full max-w-2xl p-8 space-y-6 bg-base-200 rounded-lg shadow-lg border border-secondary">
                <h2 className="text-2xl font-bold text-center">
                    My Bookings {user?.name ? `for ${user.name}` : ""}
                </h2>

                {loading ? (
                    <p className="text-center text-sm text-gray-500">
                        Loading...
                    </p>
                ) : renderedBookings.length === 0 || error ? (
                    <p className="text-center text-sm text-gray-500">
                        You have no bookings.
                    </p>
                ) : (
                    <ul className="space-y-4">
                        {renderedBookings.map((booking) => {
                            const { screening, seats, id } = booking;
                            const movieTitle = screening.movie.title;
                            const room = screening.room.name || "Room";
                            const date = new Date(
                                screening.start_time
                            ).toLocaleDateString();
                            const time = new Date(
                                screening.start_time
                            ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            });
                            const formattedSeats = (seats || [])
                                .map((s) => `R${s.row}S${s.seat}`)
                                .join(", ");

                            return (
                                <li
                                    key={id}
                                    className="p-4 bg-base-100 border border-base-300 rounded-lg"
                                >
                                    <p className="font-semibold text-lg">
                                        {movieTitle}
                                    </p>
                                    <p className="text-sm">Date: {date}</p>
                                    <p className="text-sm">Time: {time}</p>
                                    <p className="text-sm">Room: {room}</p>
                                    <p className="text-sm">
                                        Seats: {formattedSeats}
                                    </p>
                                </li>
                            );
                        })}

                        {renderedBookings.length < bookings.length && (
                            <button
                                onClick={handleLoadMore}
                                className="btn btn-primary w-full mt-4"
                            >
                                Load 5 more
                            </button>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MyBookingsPage;
