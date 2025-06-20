import { useDispatch, useSelector } from "react-redux";
import { openCartModal } from "../store/uiSlice";
import { toast } from "react-toastify";

const AddToSummaryButton = () => {
    const dispatch = useDispatch();

    const ticketCounts = useSelector((state) => state.ui.ticketCounts);
    const selectedSeats = useSelector((state) => state.ui.selectedSeats);
    const totalTickets =
        ticketCounts.normal + ticketCounts.student + ticketCounts.senior;

    const token = useSelector((state) => state.auth.token);
    const isLoggedIn = !!token;

    const handleAddToSummary = () => {
        if (!isLoggedIn) {
            toast.info("Please log in to Show Summary");
            return;
        }

        if (totalTickets === 0) {
            toast.error("Please select the number of tickets");
            return;
        }

        if (selectedSeats.length !== totalTickets) {
            toast.error(
                `Please select ${totalTickets - selectedSeats.length} more seats to match your ticket count.`
            );
            return;
        }

        dispatch(openCartModal());
        toast.success("Added to reserve summary!");
    };

    return (
        <div className="flex justify-start mt-4">
            <button
                className="btn btn-primary w-full text-xl py-6"
                onClick={handleAddToSummary}
            >
                {isLoggedIn ? "Show Summary" : "Log in to show summary"}
            </button>
        </div>
    );
};

export default AddToSummaryButton;
