import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadMovie } from "../store/moviesSlice";
import { toast } from "react-toastify";
import { X, Check } from "lucide-react";

const EditMoviePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { movieId } = useParams();
  const user = useSelector((state) => state.auth.user);

  const currentMovie = useSelector((state) => state.movies.currentMovie);
  const movieStatus = useSelector((state) => state.movies.currentMovieStatus);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    duration: "",
    genre: "",
    release_year: "",
  });

  // screeningsData holds editable fields by screening id
  const [screeningsData, setScreeningsData] = useState({});

  useEffect(() => {
    if (currentMovie && currentMovie.screenings) {
      const initData = {};
      currentMovie.screenings.forEach((s) => {
        // Initialize with actual screening data keys
        initData[s.id] = {
          start_time: s.start_time || "",
          weekday: s.weekday || "",
          // Add other editable fields if needed
        };
      });
      setScreeningsData(initData);
    }
  }, [currentMovie]);

  // Handle screenings input change (start_time or weekday if needed)
  const handleScreeningChange = (id, field, value) => {
    setScreeningsData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleScreeningSave = (id) => {
    // TODO: Implement actual update logic with screeningsData[id]
    toast.success(`Screening ${id} updated`);
  };

  const handleScreeningDelete = (id) => {
    if (!window.confirm("Delete this screening?")) return;
    // TODO: Implement actual delete logic here
    toast.success(`Screening ${id} deleted`);
  };

  useEffect(() => {
    if (!movieId) return;
    dispatch(loadMovie(parseInt(movieId)));
  }, [dispatch, movieId]);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }
    if (!currentMovie && movieStatus === "loaded") {
      navigate("/");
      return;
    }
  }, [user, currentMovie, movieStatus, navigate]);

  useEffect(() => {
    if (currentMovie) {
      setFormData({
        title: currentMovie.title ?? "",
        description: currentMovie.description ?? "",
        image: currentMovie.image ?? "",
        duration: currentMovie.duration ?? "",
        genre: currentMovie.genre ?? "",
        release_year: currentMovie.release_year ?? "",
      });
    }
  }, [currentMovie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    // TODO: Implement delete action
    console.log("Delete movie:", currentMovie.id);
    navigate("/");
  };

  const handleSubmitMovie = (e) => {
    e.preventDefault();
    // TODO: Submit movie update logic
    console.log("Submit movie update:", formData);
    toast.success("Movie updated");
    navigate("/");
  };

  const handleSubmitScreenings = (e) => {
    e.preventDefault();
    // TODO: Submit screeningsData update logic
    console.log("Submit screenings update:", screeningsData);
    toast.success("Screenings updated");
  };

  if (movieStatus === "loading") {
    return <div>Loading...</div>;
  }
  if (!currentMovie) {
    return null;
  }

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Group screenings by weekday, order by days array
  const screeningsByDay = currentMovie.screenings.reduce((acc, screening) => {
    const day = screening.weekday || "Unknown";
    if (!acc[day]) acc[day] = [];
    acc[day].push(screening);
    return acc;
  }, {});

  return (
    <div className="flex justify-center mt-8 p-4 bg-base-100">
      <div className="relative w-full max-w-2xl bg-base-200 p-8 rounded-lg shadow border border-secondary space-y-12">
        <button
          type="button"
          onClick={handleDelete}
          className="absolute top-8 right-8 btn btn-error btn-sm"
        >
          Delete movie
        </button>

				<button
					type="button"
					onClick={() => navigate("/add-screening")}
					className="absolute top-8 left-8 btn btn-primary btn-sm"
				>
					Add Screening
				</button>
				
        {/* Edit Movie Form */}
				<div>
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
        </div>

        {/* Edit Screenings Form */}
        {currentMovie.screenings && currentMovie.screenings.length > 0 && (
					<div>
						<hr />
            <h2 className="text-2xl font-bold text-center my-6">
              Edit Screenings
						</h2>
            <form onSubmit={handleSubmitScreenings} className="space-y-6 mt-6">
              {days.map((day) =>
								screeningsByDay[day] ? (
									<div key={day}>
                    <h3 className="text-lg font-semibold mb-2">{day}</h3>
                    <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-2">
                      {screeningsByDay[day].map((screening) => {
                        const screeningInfo = screeningsData[screening.id] || {};
                        return (
                          <div
                            key={screening.id}
                            className="flex items-center space-x-2 mb-2"
                          >
                            <input
                              type="time"
                              value={screeningInfo.start_time || ""}
                              onChange={(e) =>
                                handleScreeningChange(
                                  screening.id,
                                  "start_time",
                                  e.target.value
                                )
                              }
                              className="input input-bordered input-sm w-24"
                              aria-label={`Screening time for ${screening.id}`}
                              placeholder="HH:mm"
                            />
                            <button
                              type="button"
                              onClick={() => handleScreeningSave(screening.id)}
                              className="btn btn-sm btn-success px-2"
                              aria-label="Save screening"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleScreeningDelete(screening.id)}
                              className="btn btn-sm btn-error px-2"
                              aria-label="Delete screening"
                            >
                              <X size={16} />
														</button>
													</div>										
                        );
											})}
										</div>
										<hr />
                  </div>
                ) : null
              )}

              <button type="submit" className="btn btn-primary w-full mt-4">
                Save Screenings Changes
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditMoviePage;
