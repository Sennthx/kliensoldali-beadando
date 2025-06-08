import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DaySelector from "../components/DaySelector";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_URL;

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const AddScreeningPage = () => {
    const navigate = useNavigate();

    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);

    const selectedDay = useSelector((state) => state.ui.selectedDay);

    const [formData, setFormData] = useState({
        movie_id: "",
        room_id: "",
        start_time: "",
    });

    useEffect(() => {
        if (!token || !user || user.role !== "admin") {
            navigate("/");
        }
    }, [token, user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.movie_id ||
            !formData.room_id ||
            !formData.start_time ||
            !selectedDay
        ) {
            toast.error("Please fill in all fields and select a day.");
            return;
        }

        const targetIndex = days.indexOf(selectedDay); // 0-based
        if (targetIndex === -1) {
            toast.error("Invalid day selected.");
            return;
        }

        const today = new Date();
        const todayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1; // 0 = Monday
        const diff = targetIndex - todayIndex;
        const screeningDate = new Date();
        screeningDate.setDate(today.getDate() + diff);

        const yyyy = screeningDate.getFullYear();
        const mm = String(screeningDate.getMonth() + 1).padStart(2, "0");
        const dd = String(screeningDate.getDate()).padStart(2, "0");
        const formattedDate = `${yyyy}-${mm}-${dd}`;

        const screeningData = {
            ...formData,
            date: formattedDate,
        };

        const response = await fetch(`${API_BASE}/screenings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(screeningData),
        });

        const data = await response.json();

        if (!response.ok) {
            if (data.errors) {
                const firstErrorMsg = Object.values(data.errors).flat()[0];
                toast.error(firstErrorMsg || "Failed to add screening.");
            } else {
                toast.error(data.message || "Failed to add screening.");
            }
            return;
        }

        toast.success("Screening added successfully.");
        navigate("/");
    };

    return (
        <div className="flex items-center flex-col justify-center bg-base-100 p-4">
            <DaySelector />
            <div className="w-full max-w-md p-8 space-y-6 bg-base-200 rounded-lg shadow-lg border border-secondary">
                <h2 className="text-2xl font-bold text-center">
                    Add Screening
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="label mb-2" htmlFor="movie_id">
                        Movie ID
                    </label>
                    <input
                        name="movie_id"
                        type="text"
                        placeholder="e.g. 12"
                        className="input input-bordered w-full"
                        value={formData.movie_id}
                        onChange={handleChange}
                    />

                    <label className="label mb-2" htmlFor="room_id">
                        Room ID
                    </label>
                    <input
                        name="room_id"
                        type="text"
                        placeholder="e.g. 3"
                        className="input input-bordered w-full"
                        value={formData.room_id}
                        onChange={handleChange}
                    />

                    <label className="label mb-2" htmlFor="start_time">
                        Start Time
                    </label>
                    <input
                        name="start_time"
                        type="time"
                        className="input input-bordered w-full"
                        value={formData.start_time}
                        onChange={handleChange}
                    />

                    <button type="submit" className="btn btn-primary w-full">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddScreeningPage;
