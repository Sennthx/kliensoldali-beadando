const MovieCard = ({ title, image, duration, genre }) => {
    return (
      <div className="card bg-base-100 shadow-md rounded-md overflow-hidden">
        <figure className="p-4">
          <div className="relative w-full aspect-[10/14]">
            <img 
              src={`/src/assets/images/${image}`} 
              alt={title} 
              className="object-cover w-full h-full rounded-md" 
            />
          </div>
        </figure>
        <div className="card-body pt-2 space-y-2">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
            <span className="badge badge-outline">{genre}</span>
            <span className="text-end">{duration} min</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default MovieCard;
  