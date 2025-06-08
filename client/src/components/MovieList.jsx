import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const MovieList = () => {
    const movies = useSelector((state) => state.movies.list);
    const moviesStatus = useSelector((state) => state.movies.status);
    const screeningsStatus = useSelector(
        (state) => state.movies.screeningsStatus
    );
    const selectedDay = useSelector((state) => state.ui.selectedDay);

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    const filteredMovies = movies.filter((movie) =>
        movie.screenings.some((screening) => {
            const screeningDayText = days[screening.week_day - 1]; 
            return screeningDayText === selectedDay;
        })
    );

    if (moviesStatus === "loading" || screeningsStatus === "loading") {
        return <div className="text-center">Loading movies...</div>;
    }

    if (moviesStatus === "error" || screeningsStatus === "error") {
        return (
            <div className="text-center text-error">Failed to load movies.</div>
        );
    }

    if (filteredMovies.length === 0) {
        return <div className="text-center">No movies for {selectedDay}.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} {...movie} />
            ))}
        </div>
    );
};

export default MovieList;
