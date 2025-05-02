import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import BookingPage from './pages/BookingPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Header />
      <main className="">
        <Routes>
          <Route path="/" element={<BookingPage />} />
        </Routes>
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
