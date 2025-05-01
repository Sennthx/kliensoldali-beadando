// SelectedMovie.jsx
const SelectedMovie = () => {
  return (
    <div className="w-full rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">Your Selection</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-medium">Movie:</span>
          <span>Avengers: Endgame</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Time:</span>
          <span>7:30 PM</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Seats:</span>
          <span>D4, D5</span>
        </div>
        <button className="btn btn-primary w-full mt-6">
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default SelectedMovie;