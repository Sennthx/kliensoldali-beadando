import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyBookingsPage = () => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const bookings = [
        {
            id: 1,
            movieTitle: "Inception",
            date: "2025-06-15",
            time: "19:00",
            room: "Room 1",
            seats: ["A1", "A2"],
        },
        {
            id: 2,
            movieTitle: "Interstellar",
            date: "2025-06-18",
            time: "21:30",
            room: "Room 2",
            seats: ["B3", "B4", "B5"],
        },
    ];

    return (
        <div className="flex items-start justify-center mt-8 bg-base-100 p-4">
            <div className="w-full max-w-2xl p-8 space-y-6 bg-base-200 rounded-lg shadow-lg border border-secondary">
                <h2 className="text-2xl font-bold text-center">
                    My Bookings {user?.name ? `for ${user.name}` : ""}
                </h2>

                {bookings.length === 0 ? (
                    <p className="text-center text-sm text-gray-500">You have no bookings.</p>
                ) : (
                    <ul className="space-y-4">
                        {bookings.map((booking) => (
                            <li key={booking.id} className="p-4 bg-base-100 border border-base-300 rounded-lg">
                                <p className="font-semibold text-lg">{booking.movieTitle}</p>
                                <p className="text-sm">Date: {booking.date}</p>
                                <p className="text-sm">Time: {booking.time}</p>
                                <p className="text-sm">Room: {booking.room}</p>
                                <p className="text-sm">Seats: {booking.seats.join(", ")}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MyBookingsPage;
