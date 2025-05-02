import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { closeCartModal, openCartModal } from "../../store/uiSlice";
import SummaryModal from "../SummaryModal";

const Header = () => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.ui.isCartModalOpen);

    return (
        <>
            <header className="navbar bg-base-200 shadow-lg py-6 border-b-2 border-red-900">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-secondary-content hover:text-secondary-focus flex items-center gap-2"
                    >
                        <span className="badge bg-success text-secondary text-2xl hover:bg-success/80 p-6 font-bold">
                            Tikera
                        </span>
                    </Link>

                    <nav className="flex items-center gap-2">
                        <button
                            onClick={() => dispatch(openCartModal())}
                            className="fixed top-6 right-6 lg:top-auto lg:bottom-10 z-50 bg-primary text-white hover:bg-primary/70 rounded-full p-4 shadow-lg transition-colors duration-300"
                            aria-label="Open Cart"
                        >
                            <ShoppingCart className="w-8 h-8" />
                        </button>
                    </nav>
                </div>
            </header>

            <SummaryModal
                isOpen={isModalOpen}
                onClose={() => dispatch(closeCartModal())}
                onConfirm={() => dispatch(closeCartModal())}
            />
        </>
    );
};

export default Header;
