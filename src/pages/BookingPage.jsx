import { useParams } from 'react-router-dom';

const BookingPage = () => {
  const { movieId, screeningId } = useParams();

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">Booking Page</h1>
        <p className="text-gray-600">You're viewing the booking details for:</p>
      </div>

      <div className="bg-base-200 p-6 rounded-box shadow">
        <p className="text-lg">
          <strong>Movie ID:</strong> {movieId}
        </p>
        <p className="text-lg">
          <strong>Screening ID:</strong> {screeningId}
        </p>
        <div className="mt-4 alert alert-info">
          <span>This is a placeholder. The booking UI will go here.</span>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
