import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DaySelector from "../components/DaySelector"; // adjust path

const AddScreeningPage = () => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const selectedDay = useSelector((state) => state.ui.selectedDay);

    const [formData, setFormData] = useState({
        movie_id: "",
        room_id: "",
        start_time: "",
    });

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.movie_id ||
            !formData.room_id ||
            !formData.start_time ||
            !selectedDay
        ) {
            alert("Please fill in all fields and select a day.");
            return;
        }

        const screeningData = {
            movie_id: formData.movie_id,
            room_id: formData.room_id,
            start_time: formData.start_time,
            day: selectedDay,
        };

        console.log("Submitting screening:", screeningData);
        // Submit logic here

        navigate("/movies/edit/" + formData.movie_id);
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
