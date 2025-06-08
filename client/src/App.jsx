import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import AddMoviePage from "./pages/AddMoviePage";
import AddScreeningPage from "./pages/AddScreeningPage";
import EditMoviePage from "./pages/EditMoviePage";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loginSuccess } from "./store/authSlice";

function App() {
    const dispatch = useDispatch();

    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (token && user) {
            dispatch(loginSuccess({ token, user }));
        }
        setAuthChecked(true);
    }, [dispatch]);

    if (!authChecked) {
        return null;
    }

    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<BookingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/my-bookings" element={<MyBookingsPage />} />
                    <Route path="/add-movie" element={<AddMoviePage />} />
                    <Route
                        path="/add-screening"
                        element={<AddScreeningPage />}
                    />
                    <Route
                        path="/edit-movie/:movieId"
                        element={<EditMoviePage />}
                    />
                </Routes>
            </main>
            <ToastContainer position="top-right" autoClose={2000} />
        </Router>
    );
}

export default App;
