import { useDispatch, useSelector } from 'react-redux';
import { openCartModal } from '../store/uiSlice';
import { toast } from 'react-toastify';

const AddToSummaryButton = () => {
  const dispatch = useDispatch();

  const ticketCounts = useSelector(state => state.ui.ticketCounts);
  const selectedSeats = useSelector(state => state.ui.selectedSeats);

  const totalTickets = ticketCounts.adult + ticketCounts.student + ticketCounts.senior;

  const handleAddToSummary = () => {

    if (totalTickets === 0) {
        toast.error("Please select the number of tickets"); 
        return;
    }

    if (selectedSeats.length !== totalTickets) {
        toast.error(`Please select ${totalTickets - selectedSeats.length} more seats to match your ticket count.`);
        return;
    }

    dispatch(openCartModal());
    toast.success('Added to reserve summary!');

  };

  return (
    <div className="flex justify-start mt-4">
    <button 
        className="btn btn-primary w-full text-xl py-6"
        onClick={handleAddToSummary}
    >
        Show Reserve Summary
    </button>
    </div>

  );
};

export default AddToSummaryButton;
