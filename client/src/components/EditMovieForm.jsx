import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearSelectedMovie } from "../store/uiSlice";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_URL;

const EditMovieForm = ({ movie, token }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: movie.title ?? "",
        description: movie.description ?? "",
        image: movie.image_path ?? "",
        duration: movie.duration ?? "",
        genre: movie.genre ?? "",
        release_year: movie.release_year ?? "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this movie?"))
            return;

        try {
            const res = await fetch(`${API_BASE}/movies/${movie.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (!res.ok) throw new Error("Failed to delete movie");

            dispatch(clearSelectedMovie());
            toast.success("Movie deleted successfully.");
            navigate("/");
        } catch (err) {
            console.error(err);
            toast.error("Error deleting movie.");
        }
    };

    const handleSubmitMovie = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_BASE}/movies/${movie.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    image_path: formData.image,
                    duration: Number(formData.duration),
                    genre: formData.genre,
                    release_year: Number(formData.release_year),
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to update movie");
            }

            dispatch(clearSelectedMovie());
            toast.success("Movie updated");
            navigate("/");
        } catch (err) {
            console.error(err);
            toast.error(`Error updating movie: ${err.message}`);
        }
    };

    return (
        <div className="relative">
            <h2 className="text-2xl font-bold text-center mb-6">Edit Movie</h2>
            <form onSubmit={handleSubmitMovie} className="space-y-4">
                <label className="label mb-2" htmlFor="title">
                    Title
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="input input-bordered w-full"
                />

                <label className="label mb-2" htmlFor="description">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="textarea textarea-bordered w-full"
                />

                <label className="label mb-2" htmlFor="image_path">
                    Image URL
                </label>
                <input
                    id="image_path"
                    name="image"
                    type="url"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="input input-bordered w-full"
                />

                <label className="label mb-2" htmlFor="duration">
                    Duration (minutes)
                </label>
                <input
                    id="duration"
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Duration"
                    className="input input-bordered w-full"
                />

                <label className="label mb-2" htmlFor="genre">
                    Genre
                </label>
                <input
                    id="genre"
                    name="genre"
                    type="text"
                    value={formData.genre}
                    onChange={handleChange}
                    placeholder="Genre"
                    className="input input-bordered w-full"
                />

                <label className="label mb-2" htmlFor="release_year">
                    Release Year
                </label>
                <input
                    id="release_year"
                    name="release_year"
                    type="number"
                    value={formData.release_year}
                    onChange={handleChange}
                    placeholder="Release Year"
                    className="input input-bordered w-full"
                />

                <button type="submit" className="btn btn-primary w-full mt-4">
                    Save Movie Changes
                </button>
            </form>

            <button
                type="button"
                onClick={handleDelete}
                className="btn btn-error btn-sm absolute top-0 right-0 w-auto"
            >
                Delete movie
            </button>
        </div>
    );
};

export default EditMovieForm;
