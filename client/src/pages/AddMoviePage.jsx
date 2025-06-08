import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_URL;

const AddMoviePage = () => {
    const navigate = useNavigate();

    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image_path: "",
        duration: "",
        genre: "",
        release_year: "",
    });

    useEffect(() => {
        if (!token || user.role !== "admin") {
            navigate("/");
        }
    }, [token, user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE}/movies`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message || "Failed to add movie");
                return;
            }

            toast.success("Movie added successfully");
            navigate("/");
        } catch (error) {
            toast.error("Server error. Try again later: ", error);
        }
    };

    return (
        <div className="flex items-start justify-center mt-8 bg-base-100 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-base-200 rounded-lg shadow-lg border border-secondary">
                <h2 className="text-2xl font-bold text-center">Add Movie</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <label className="label mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        name="title"
                        type="text"
                        placeholder="Movie Title"
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        value={formData.title}
                        required
                    />

                    <label className="label mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        name="description"
                        placeholder="Movie Description"
                        className="textarea textarea-bordered w-full"
                        onChange={handleChange}
                        value={formData.description}
                        required
                    />

                    <label className="label mb-2" htmlFor="image_path">
                        Image URL
                    </label>
                    <input
                        name="image_path"
                        type="url"
                        placeholder="https://..."
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        value={formData.image_path}
                        required
                    />

                    <label className="label mb-2" htmlFor="duration">
                        Duration (minutes)
                    </label>
                    <input
                        name="duration"
                        type="number"
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        value={formData.duration}
                        required
                    />

                    <label className="label mb-2" htmlFor="genre">
                        Genre
                    </label>
                    <input
                        name="genre"
                        type="text"
                        placeholder="Action, Comedy..."
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        value={formData.genre}
                        required
                    />

                    <label className="label mb-2" htmlFor="release_year">
                        Release Year
                    </label>
                    <input
                        name="release_year"
                        type="number"
                        placeholder="2023"
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        value={formData.release_year}
                        required
                    />

                    <button type="submit" className="btn btn-primary w-full">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMoviePage;
