import { useSelector } from 'react-redux';
import MovieCard from './MovieCard';

const MovieList = () => {
  // Get the movies list from Redux
  const movies = useSelector((state) => state.movies.list);
  const status = useSelector((state) => state.movies.status);

  const selectedDay = useSelector((state) => state.ui.selectedDay);

  let filteredMovies = movies.filter((movie) =>
    movie.screenings?.some((screening) => screening.weekday === selectedDay)
  );

  if (status === 'loading') {
    return <div className="text-center">Loading movies...</div>;
  }

  if (status === 'error') {
    return <div className="text-center text-error">Failed to load movies.</div>;
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