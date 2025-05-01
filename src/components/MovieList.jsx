import MovieCard from './MovieCard';

// Temporary placeholder movies — replace with props or state later
const mockMovies = [
  {
    id: 1,
    title: 'Dune: Part Two',
    image: 'dune.jpg',
    duration: 166,
    genre: 'Sci-Fi',
  },
  {
    id: 2,
    title: 'The Matrix',
    image: 'civil-war.jpg',
    duration: 136,
    genre: 'Action',
  },
  {
    id: 3,
    title: 'The Matrix',
    image: 'civil-war.jpg',
    duration: 136,
    genre: 'Action',
  },
  {
    id: 4,
    title: 'The Matrix',
    image: 'civil-war.jpg',
    duration: 136,
    genre: 'Action',
  },
  {
    id: 5,
    title: 'The Matrix',
    image: 'civil-war.jpg',
    duration: 136,
    genre: 'Action',
  },
  {
    id: 5,
    title: 'The Matrix',
    image: 'civil-war.jpg',
    duration: 136,
    genre: 'Action',
  },
  {
    id: 5,
    title: 'The Matrix',
    image: 'civil-war.jpg',
    duration: 136,
    genre: 'Action',
  },
  {
    id: 5,
    title: 'The Matrix',
    image: 'civil-war.jpg',
    duration: 136,
    genre: 'Action',
  },
  {
    id: 5,
    title: 'The Matrix',
    image: 'civil-war.jpg',
    duration: 136,
    genre: 'Action',
  },
];

const MovieList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockMovies.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  );
};

export default MovieList;
