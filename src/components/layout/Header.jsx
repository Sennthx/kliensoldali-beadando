import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="navbar bg-base-100 shadow mb-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary">
          Tikera 🎬
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="btn btn-ghost btn-sm text-base">
            Home
          </Link>
          <Link to="/booking/1/1" className="btn btn-ghost btn-sm text-base">
            Booking (Example)
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
