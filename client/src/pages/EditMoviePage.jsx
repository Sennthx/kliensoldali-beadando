import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadMovie, clearCurrentMovie } from "../store/moviesSlice";
import EditMovieForm from "../components/EditMovieForm";
import EditMovieScreenings from "../components/EditMovieScreenings";
import { toast } from "react-toastify";

const EditMoviePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { movieId } = useParams();
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const currentMovie = useSelector((state) => state.movies.currentMovie);
    const movieStatus = useSelector((state) => state.movies.currentMovieStatus);

    useEffect(() => {
        dispatch(loadMovie(parseInt(movieId)));
        return () => dispatch(clearCurrentMovie());
    }, [dispatch, movieId]);

    useEffect(() => {
        if (movieStatus === "not_found") {
            toast.error("Movie not found (404)");
            navigate("/");
        }
    }, [movieStatus, navigate]);

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

    if (movieStatus === "loading") return <div>Loading...</div>;
    if (!currentMovie) return null;

    return (
        <div className="flex justify-center mt-8 p-4 bg-base-100">
            <div className="relative w-full max-w-2xl bg-base-200 p-8 rounded-lg shadow border border-secondary space-y-12">
                <EditMovieForm movie={currentMovie} token={token} />

                <EditMovieScreenings
                    screenings={currentMovie.screenings}
                    token={token}
                />
            </div>
        </div>
    );
};

export default EditMoviePage;
