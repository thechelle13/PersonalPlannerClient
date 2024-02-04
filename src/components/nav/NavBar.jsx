import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              {/* <img
                className="h-8 w-8"
                src="path/to/logo.png"
                alt="Your logo"
              /> */}
            </Link>
          </div>
          <div className="hidden md:flex space-x-4 text-lg"> 
            <Link to="/" className="text-blue hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/calendar" className="text-blue hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Calendar
            </Link>
            <Link to="/weather" className="text-blue hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Weather Forecasts
            </Link>
            {currentUser ? (
              <>
                <Link to="/profile" className="text-blue hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setCurrentUser("");
                    navigate("/login");
                  }}
                  className="text-blue hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="text-blue hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Register
                </Link>
                <Link to="/login" className="text-blue hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

