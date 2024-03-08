import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import nssLogo from "../../assets/nss-logo.jpg";

const NavBar = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close the menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-navy-blue shadow-lg bg-opacity-75 backdrop-filter backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a
              href="https://nashvillesoftwareschool.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <img src={nssLogo} alt="NSS Logo" className="h-8 w-8" />
              <span className="text-blue-300 font-semibold text-lg">NSS Alumni</span>
            </a>
          </div>
          <div className="md:hidden">
            <button
              onClick={handleMenuToggle}
              className="text-white hover:text-blue-300 focus:outline-none"
            >
              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19 14H5V10H19V14ZM21 7H3V9H21V7ZM21 17H3V19H21V17Z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 6H20V8H4V6ZM4 12H20V14H4V12ZM4 18H20V20H4V18Z"
                  />
                )}
              </svg>
            </button>
            <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
              <div className="flex flex-col items-start mt-2 space-y-2">
                <Link to="/" className="nav-link text-Seafoam hover:text-white" onClick={closeMenu}>Home</Link>
                <Link to="/calendar" className="nav-link text-Seafoam hover:text-white" onClick={closeMenu}>Calendar</Link>
                <Link to="/weather" className="nav-link text-Seafoam hover:text-white" onClick={closeMenu}>Weather Forecasts</Link>
                {currentUser ? (
                  <>
                    <Link to="/profile" className="nav-link text-Seafoam hover:text-white" onClick={closeMenu}>Profile</Link>
                    <button
                      onClick={() => {
                        setCurrentUser("");
                        navigate("/login");
                      }}
                      className="nav-link cursor-pointer text-Seafoam hover:text-white"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/register" className="nav-link text-Seafoam hover:text-white" onClick={closeMenu}>Register</Link>
                    <Link to="/login" className="nav-link text-Seafoam hover:text-white" onClick={closeMenu}>Login</Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:flex space-x-4 text-lg"> 
            <Link to="/" className="nav-link text-Seafoam hover:text-white" onClick={closeMenu}>Home</Link>
            <Link to="/calendar" className="nav-link text-Seafoam hover:text-white" onClick={closeMenu}>Calendar</Link>
            <Link to="/weather" className="nav-link text-Seafoam hover:text-white" onClick={closeMenu}>Weather Forecasts</Link>
            {currentUser ? (
              <>
                <Link to="/profile" className="nav-link text-Seafoam hover:text-white" onClick={closeMenu}>Profile</Link>
                <button
                  onClick={() => {
                    setCurrentUser("");
                    navigate("/");
                  }}
                  className="nav-link cursor-pointer text-Seafoam hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="nav-link text-Seafoam hover:text-white" onClick={closeMenu}>Register</Link>
                <Link to="/login" className="nav-link text-Seafoam hover:text-white" onClick={closeMenu}>Login</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
