import { useSelector } from "react-redux";
import ScreeningTimes from "./ScreeningTimes";

const MovieDetails = () => {
    const selectedMovieId = useSelector((state) => state.ui.selectedMovieId);
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

    const movie = useSelector((state) =>
        state.movies.list.find((m) => m.id === selectedMovieId)
    );

    if (!movie) return null;

    const screenings = movie.screenings.filter(
        (screening) => days[screening.week_day - 1] === selectedDay
    );

    return (
        <div className="flex flex-col gap-6 items-start">
            <div className="flex flex-col lg:flex-row gap-6 w-full lg:ml-3">
                <div className="relative w-full lg:w-1/2 aspect-[10/14] transform lg:-rotate-6 flex justify-center items-center">
                    <img
                        src={movie.image_path}
                        alt={movie.title}
                        className="object-cover rounded-md shadow-lg 
                            sm:w-[200px] sm:h-[280px] md:w-5/6 md:h-5/6 lg:w-full lg:h-full"
                    />
                </div>

                <div className="flex-1 space-y-4">
                    <h2 className="text-2xl font-bold">{movie.title}</h2>
                    <p className="text-gray-500 text-sm">
                        Release Year: {movie.release_year}
                    </p>
                    <p className="text-base">{movie.description}</p>
                </div>
            </div>

            <ScreeningTimes screenings={screenings} selectedDay={selectedDay} />
        </div>
    );
};

export default MovieDetails;
