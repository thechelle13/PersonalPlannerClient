import { Link, useNavigate } from "react-router-dom";
import nssLogo from "../../assets/nss-logo.jpg";

const NavBar = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-navy-blue shadow-lg bg-opacity-75 backdrop-filter backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
          <a href="https://nashvillesoftwareschool.com/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
              <img src={nssLogo} alt="NSS Logo" className="h-8 w-8" />
              <span className="text-blue-300 font-semibold text-lg">NSS Alumni</span>
            </a>
          </div>
          <div className="hidden md:flex space-x-4 text-lg"> 
            <Link to="/" className="nav-link text-Seafoam">Home</Link>
            <Link to="/calendar" className="nav-link text-Seafoam">Calendar</Link>
            <Link to="/weather" className="nav-link text-Seafoam">Weather Forecasts</Link>
            {currentUser ? (
              <>
                <Link to="/profile" className="nav-link text-Seafoam">Profile</Link>
                <button
                  onClick={() => {
                    setCurrentUser("");
                    navigate("/login");
                  }}
                  className="nav-link cursor-pointer text-Seafoam"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="nav-link text-Seafoam">Register</Link>
                <Link to="/login" className="nav-link text-Seafoam">Login</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
