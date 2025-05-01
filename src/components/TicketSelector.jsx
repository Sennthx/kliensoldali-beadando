import { useDispatch, useSelector } from 'react-redux';
import { setTicketCount } from '../store/uiSlice';

const TicketSelector = () => {
  const dispatch = useDispatch();
  const ticketCounts = useSelector((state) => state.ui.ticketCounts);

  const handleChange = (type, value) => {
    dispatch(setTicketCount({ type, count: parseInt(value, 10) || 0 }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Ticket Selector</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Adult Tickets (2500 Ft)</span>
          <input
            type="number"
            min="0"
            value={ticketCounts.adult}
            onChange={(e) => handleChange('adult', e.target.value)}
            className="input input-bordered w-16"
          />
        </div>
        <div className="flex justify-between">
          <span>Student Tickets (2000 Ft)</span>
          <input
            type="number"
            min="0"
            value={ticketCounts.student}
            onChange={(e) => handleChange('student', e.target.value)}
            className="input input-bordered w-16"
          />
        </div>
        <div className="flex justify-between">
          <span>Senior Tickets (1800 Ft)</span>
          <input
            type="number"
            min="0"
            value={ticketCounts.senior}
            onChange={(e) => handleChange('senior', e.target.value)}
            className="input input-bordered w-16"
          />
        </div>
      </div>
    </div>
  );
};

export default TicketSelector;
