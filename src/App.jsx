import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <Router>
      <Header />
      <main className="">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking/:movieId/:screeningId" element={<BookingPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
