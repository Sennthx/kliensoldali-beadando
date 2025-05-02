import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const Movies = () => {

  const selectedDay = useSelector((state) => state.ui.selectedDay);

  return (
    <div className="space-y-4 rounded-lg p-8 w-full">
      <div className="flex items-center justify-between mb-6 mt-4">
        <h2 className="text-4xl font-bold">Movies for <span className="badge badge-info text-base-100 text-2xl py-6">{selectedDay}</span></h2>
      </div>
      <MovieList />
    </div>
  );
};

export default Movies;