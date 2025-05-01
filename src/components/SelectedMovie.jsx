import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTickets, clearSelectedMovie, setSelectedScreening } from '../store/uiSlice';
import MovieDetails from './MovieDetails';
import TicketSelector from './TicketSelector';
import SeatSelector from './SeatSelector';

const SelectedMovie = () => {
  const dispatch = useDispatch();

  const selectedMovieId = useSelector((state) => state.ui.selectedMovieId);
  const selectedDay = useSelector((state) => state.ui.selectedDay);
  const selectedScreening = useSelector((state) => state.ui.selectedScreening);
  const movies = useSelector((state) => state.movies.list);
  const ticketCounts = useSelector((state) => state.ui.ticketCounts);
  const totalTickets = ticketCounts.adult + ticketCounts.student + ticketCounts.senior;

  const selectedMovie = movies.find((m) => m.id === selectedMovieId);

  const [seatMatrix, setSeatMatrix] = useState([]);

  const generateSeatMatrix = (rows, seatsPerRow, bookings) => {
    const matrix = [];
  
    for (let r = 1; r <= rows; r++) {
      const row = [];
      for (let s = 1; s <= seatsPerRow; s++) {
        const isBooked = bookings.some(b => b.row === r && b.seat === s);
        row.push({
          row: r,
          seat: s,
          available: !isBooked,
        });
      }
      matrix.push(row);
    }
  
    return matrix;
  };

  useEffect(() => {
    if (selectedMovie && selectedScreening) {
      const screeningData = selectedMovie.screenings.find(s => s.id === selectedScreening);
      if (screeningData) {
        const matrix = generateSeatMatrix(
          screeningData.room.rows,
          screeningData.room.seatsPerRow,
          screeningData.bookings
        );
        setSeatMatrix(matrix);
      }
    }
  }, [selectedMovie, selectedScreening]);

  useEffect(() => {
    dispatch(setSelectedScreening(null));
    dispatch(clearTickets());
  }, [selectedMovieId, selectedDay, dispatch]);

  useEffect(() => {
    if (selectedMovie && !selectedMovie.screenings.some(s => s.weekday === selectedDay)) {
      dispatch(clearSelectedMovie());
    }
  }, [selectedMovie, selectedDay, dispatch]);


  if (!selectedMovieId) {
    return (
      <div className="w-full rounded-lg p-6 shadow-md bg-base-100 text-center text-gray-500">
        <p>Select a movie to begin booking.</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg p-6 shadow-md bg-base-100 space-y-6">
      <MovieDetails />

      {selectedScreening && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="col-span-1">
            <TicketSelector />
          </div>

          <div className="col-span-1 lg:col-span-2">
            <SeatSelector seatMatrix={seatMatrix} ticketCount={totalTickets} />          
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedMovie;
