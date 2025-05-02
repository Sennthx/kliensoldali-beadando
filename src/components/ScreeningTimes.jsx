import { useDispatch, useSelector } from 'react-redux';
import { setSelectedScreeningId } from '../store/uiSlice';

const ScreeningTimes = ({ screenings, selectedDay }) => {
  const dispatch = useDispatch();
  const selectedScreeningId = useSelector((state) => state.ui.selectedScreeningId);

  const handleScreeningClick = (screeningId) => {
    dispatch(setSelectedScreeningId(screeningId));
  };

  const isScreeningFullyBooked = (screening) => {
    const { rows, seatsPerRow } = screening.room;
    const totalSeats = rows * seatsPerRow;
    const bookedSeats = screening.bookings.length;
    return bookedSeats >= totalSeats;
  };

  return (
    <div className="w-full mt-6">
      {screenings.length > 0 ? (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Available Screening times on {selectedDay}:</h3>
          <div className="flex flex-wrap gap-2">
            {screenings.map((s) => {
              const fullyBooked = isScreeningFullyBooked(s);
              const isSelected = s.id === selectedScreeningId;

              return (
                <button
                  key={s.id}
                  className={`btn btn-sm btn-outline btn-accent text-md ${isSelected ? 'bg-green-500 text-white' : ''}`}
                  onClick={() => handleScreeningClick(s.id)}
                  disabled={fullyBooked}
                >
                  {s.start_time} {fullyBooked ? '(Full)' : ''}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-warning mt-4">No screenings available for this day.</p>
      )}
    </div>
  );
};

export default ScreeningTimes;
