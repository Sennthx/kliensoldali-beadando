import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMovie } from '../store/uiSlice';

const MovieCard = ({ id, title, image, duration, genre }) => {
  const dispatch = useDispatch();
  const selectedMovieId = useSelector((state) => state.ui.selectedMovieId);
  const isSelected = id === selectedMovieId;

  return (
    <div
      onClick={() => dispatch(setSelectedMovie(id))}
      className={`
        card bg-base-100 shadow-md rounded-md overflow-hidden cursor-pointer transition 
        hover:bg-base-100/60
        ${isSelected ? 'border-2 border-green-500' : 'border border-transparent'}
      `}
    >
      <figure className="p-4">
        <div className="relative w-full aspect-[10/14]">
          <img
            src={`/src/assets/images/${image}`}
            alt={title}
            className="object-cover w-full h-full rounded-md"
          />
        </div>
      </figure>
      <div className="card-body pt-2 flex flex-col">
        <h3 className="text-xl font-bold mb-2">{title}</h3>

        <div className="mt-auto grid grid-cols-2 gap-2 text-sm text-gray-500">
          <span className="badge badge-outline">{genre}</span>
          <span className="text-end">{duration} min</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
