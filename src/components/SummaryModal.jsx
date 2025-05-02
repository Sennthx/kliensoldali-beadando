import { useSelector, useDispatch } from 'react-redux';
import { addBookingsToScreening } from '../store/moviesSlice';
import { clearTickets, resetSelectedSeats, closeCartModal } from '../store/uiSlice';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';

const TICKET_PRICES = {
  adult: 3000,
  student: 2000,
  senior: 2500,
};

const rowIndexToLetter = (index) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet[index - 1] || String.fromCharCode(64 + index);
};

const SummaryModal = ({ isOpen, onClose, onConfirm }) => {
  const dispatch = useDispatch();

  const movies = useSelector(state => state.movies.list);
  const selectedMovieId = useSelector(state => state.ui.selectedMovieId);
  const selectedDay = useSelector(state => state.ui.selectedDay);
  const selectedScreeningId = useSelector(state => state.ui.selectedScreeningId);
  const ticketCounts = useSelector(state => state.ui.ticketCounts);
  const selectedSeats = useSelector(state => state.ui.selectedSeats);

  const selectedMovie = movies.find(m => m.id === selectedMovieId);
  const screening = selectedMovie?.screenings.find(s => s.id === selectedScreeningId);

  const totalTickets = Object.values(ticketCounts).reduce((sum, val) => sum + val, 0);
  const hasValidBooking = selectedMovie && screening && totalTickets > 0 && selectedSeats.length === totalTickets;

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (hasValidBooking) {
      dispatch(addBookingsToScreening({
        movieId: selectedMovieId,
        screeningId: selectedScreeningId,
        newBookings: selectedSeats,
      }));
      dispatch(clearTickets());
      dispatch(resetSelectedSeats());
      dispatch(closeCartModal());
      toast.success('Order completed successfully!');
      if (onConfirm) onConfirm();
    }
  };

  const handleClearBooking = () => {
    dispatch(clearTickets());
    dispatch(resetSelectedSeats());
    dispatch(closeCartModal());
    toast.info("Booking cleared.");
  };

  const sortedSeats = [...selectedSeats].sort((a, b) => {
    if (a.row === b.row) return a.seat - b.seat;
    return a.row - b.row;
  });

  const seatDisplay = sortedSeats
    .map(s => `${rowIndexToLetter(s.row)}${s.seat}`)
    .join(', ');

  const totalPrice = Object.entries(ticketCounts).reduce(
    (sum, [type, count]) => sum + (TICKET_PRICES[type] * count),
    0
  );

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <button
          onClick={handleClearBooking}
          className="absolute right-6 top-6 flex items-center gap-2 btn btn-sm btn-ghost"
          aria-label="Clear Booking"
        >
          <span className='text-sm'>Clear</span>
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-2xl font-bold mb-4">Reserve Summary</h2>

        <div className="space-y-2 text-md">
            {selectedMovie && <p><strong>Movie:</strong> <span className='text-secondary-content'>{selectedMovie.title}</span></p>}
            {selectedDay && <p><strong>Week day:</strong> <span className='text-secondary-content'>{selectedDay}</span></p>}
            {screening && <p><strong>Screening starts at:</strong> <span className='text-secondary-content'>{screening.start_time}</span></p>}

            {totalTickets > 0 && (
                <div>
                <strong>Tickets:</strong>
                <ul className="list-disc list-inside">
                    {Object.entries(ticketCounts).map(([type, count]) =>
                    count > 0 ? (
                        <li key={type}>
                            <span className='text-secondary-content'>{type.charAt(0).toUpperCase() + type.slice(1)} x{count}</span> — {TICKET_PRICES[type] * count} Ft
                        </li>
                    ) : null
                    )}
                </ul>
                </div>
            )}

            {selectedSeats.length > 0 && (
                <p><strong>Seats:</strong> <span className='text-secondary-content'>{seatDisplay}</span></p>
            )}

            {totalPrice > 0 && (
                <p><strong>Total sum:</strong> <span className='text-secondary-content'>{totalPrice}</span> Ft</p>
            )}

            {(!selectedMovie || !screening || totalTickets === 0 || selectedSeats.length !== totalTickets) && (
                <p className="text-error mt-4 text-xl">Please complete all booking steps.</p>
            )}
        </div>

        <div className="flex justify-between items-center mt-4">
            <button className="btn btn-outline" onClick={onClose}>Close</button>
            {hasValidBooking && (
                <button className="btn btn-primary" onClick={handleConfirm}>Complete Reserve</button>
            )}
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;
