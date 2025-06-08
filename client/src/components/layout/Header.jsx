import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { closeCartModal, openCartModal } from "../../store/uiSlice";
import { logout } from "../../store/authSlice";
import SummaryModal from "../SummaryModal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Header = () => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.ui.isCartModalOpen);

    const token = useSelector((state) => state.auth.token);
    const isLoggedIn = !!token;

    const user = useSelector((state) => state.auth.user);
    const role = user?.role;

    const [showCartButton, setShowCartButton] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowCartButton(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(logout());
        toast.info("Logged out successfully");
    };

    // Close mobile menu on navigation or logout can be added if needed

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

                    {/* Hamburger icon - visible only on small screens */}
                    <button
                        className="lg:hidden btn btn-ghost"
                        onClick={() => setMobileMenuOpen((open) => !open)}
                        aria-label="Toggle Menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex items-center gap-4">
                        <Link
                            to="/"
                            className="btn btn-sm btn-ghost btn-primary text-lg"
                        >
                            Movies
                        </Link>

                        {!isLoggedIn && (
                            <>
                                <Link
                                    to="/login"
                                    className="btn btn-sm btn-ghost btn-primary text-lg"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="btn btn-sm btn-ghost btn-primary text-lg"
                                >
                                    Register
                                </Link>
                            </>
                        )}

                        {isLoggedIn && (
                            <>
                                {role === "user" && (
                                    <Link
                                        to="/my-bookings"
                                        className="btn btn-sm btn-ghost btn-primary text-lg"
                                    >
                                        My Bookings
                                    </Link>
                                )}
                                {role === "admin" && (
                                    <>
                                        <Link
                                            to="/add-movie"
                                            className="btn btn-sm btn-ghost btn-primary text-lg"
                                        >
                                            Add Movie
                                        </Link>
                                        <Link
                                            to="/add-screening"
                                            className="btn btn-sm btn-ghost btn-primary text-lg"
                                        >
                                            Add Screening
                                        </Link>
                                    </>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-sm btn-error text-white text-lg hover:bg-error/80"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            {/* Mobile menu overlay */}
            {mobileMenuOpen && (
                <div className="lg:hidden fixed top-0 left-0 right-0 bg-base-200 border-t border-secondary shadow-lg z-50 p-6 pt-4">
                    <div className="flex justify-end">
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-error hover:text-error-content text-left"
                            aria-label="Close Menu"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-3 mt-4">
                        <Link
                            to="/"
                            className="btn btn-block btn-ghost underline hover:bg-base-300"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Movies
                        </Link>

                        {!isLoggedIn && (
                            <>
                                <Link
                                    to="/login"
                                    className="btn btn-block btn-outline btn-primary underline hover:bg-primary/70"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="btn btn-block btn-outline btn-primary underline hover:bg-primary/70"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Register
                                </Link>
                            </>
                        )}

                        {isLoggedIn && (
                            <>
                                <Link
                                    to="/my-bookings"
                                    className="btn btn-block btn-ghost underline hover:bg-base-300"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    My Bookings
                                </Link>
                                {role === "admin" && (
                                    <>
                                        <Link
                                            to="/add-movie"
                                            className="btn btn-block btn-ghost underline hover:bg-base-300"
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                        >
                                            Add Movie
                                        </Link>
                                        <Link
                                            to="/add-screening"
                                            className="btn btn-block btn-ghost underline hover:bg-base-300"
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                        >
                                            Add Screening
                                        </Link>
                                    </>
                                )}
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="btn btn-block btn-error text-white hover:bg-error/60"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </nav>
                </div>
            )}

            {showCartButton && (
                <button
                    onClick={() => dispatch(openCartModal())}
                    className="fixed top-6 left-6 lg:left-auto lg:right-6 lg:top-auto lg:bottom-10 z-50 bg-primary text-white hover:bg-primary/70 rounded-full p-4 shadow-lg transition-colors duration-300"
                    aria-label="Open Cart"
                >
                    <ShoppingCart className="w-8 h-8" />
                </button>
            )}

            <SummaryModal
                isOpen={isModalOpen}
                onClose={() => dispatch(closeCartModal())}
                onConfirm={() => dispatch(closeCartModal())}
            />
        </>
    );
};

export default Header;
