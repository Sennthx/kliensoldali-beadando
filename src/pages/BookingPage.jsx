import DaySelector from '../components/DaySelector';
import Movies from '../components/Movies';
import SelectedMovie from '../components/SelectedMovie';

const BookingPage = () => {
  return (
    <div className="w-full min-h-screen bg-base-100">
      <section className="w-full text-primary-content py-6">
        <div className="max-w-7xl mx-auto px-4">
          <DaySelector />
        </div>
      </section>

      <div className="max-w-screen-2xl mx-auto p-4 mb-7">
        <section className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8">
          <div className="bg-base-200 rounded-box">
            <Movies />
          </div>
          
          <div className="border-2 border-secondary sticky top-4  self-start overflow-y-auto bg-base-200 rounded-box p-6">
            <SelectedMovie />
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookingPage;