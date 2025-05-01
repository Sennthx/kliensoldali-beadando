import { useDispatch, useSelector } from 'react-redux';
import { setSelectedScreening } from '../store/uiSlice';

const ScreeningTimes = ({ screenings, selectedDay }) => {
  const dispatch = useDispatch();
  const selectedScreening = useSelector((state) => state.ui.selectedScreening);

  const handleScreeningClick = (screeningId) => {
    dispatch(setSelectedScreening(screeningId));
    console.log("Screening clicked:", screeningId);
  };

  return (
    <div className="w-full mt-6">
      {screenings.length > 0 ? (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Available Times on {selectedDay}:</h3>
          <div className="flex flex-wrap gap-2">
            {screenings.map((s) => (
              <button
                key={s.id}
                className={`btn btn-sm btn-outline btn-accent ${selectedScreening === s.id ? 'bg-green-500 text-white' : ''}`}
                onClick={() => handleScreeningClick(s.id)}
              >
                {s.start_time}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-warning mt-4">No screenings available for this day.</p>
      )}
    </div>
  );
};

export default ScreeningTimes;
