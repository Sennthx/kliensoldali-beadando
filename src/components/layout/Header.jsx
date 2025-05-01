import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="navbar bg-base-200 shadow-lg py-6 border-b-2 border-red-900">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link 
          to="/" 
          className="text-2xl font-bold text-secondary-content hover:text-secondary-focus flex items-center gap-2"
        >
          <span className="badge bg-success 
                          text-secondary text-2xl
                          hover:bg-success/80
                          p-6 font-bold"
          >
            Tikera</span>
        </Link>
        
        <nav className="flex gap-2">
          <Link 
            to="/" 
            className="btn bg-success btn-sm md:btn-md 
                      text-secondary
                      text-lg
                      hover:bg-success/80
                      rounded-lg"
          >
            Home
          </Link>
          <Link 
            to="/booking/1/1" 
            className="btn bg-success btn-sm md:btn-md
                      text-secondary                      
                      text-lg
                      hover:bg-success/80
                      rounded-lg"
          >
            Booking
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;