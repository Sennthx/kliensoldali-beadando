import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import AddMoviePage from "./pages/AddMoviePage";
import AddScreeningPage from "./pages/AddScreeningPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
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
                    <Route path="/add-screening" element={<AddScreeningPage />} />
                </Routes>
            </main>
            <ToastContainer position="top-right" autoClose={3000} />
        </Router>
    );
}

export default App;
