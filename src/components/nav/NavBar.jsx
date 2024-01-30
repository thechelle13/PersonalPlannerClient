import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const navbar = useRef();
  const hamburger = useRef();

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle("is-active");
    navbar.current.classList.toggle("is-active");
  };

  return (
    <nav
      className="navbar is-success mb-3"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={showMobileNavbar}
          ref={hamburger}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {currentUser ? (
            <>
              <Link to="/" className="navbar-item">
                Home
              </Link>
              <Link to="/profile" className="navbar-item">
                Profile
              </Link>
            </>
          ) : (
            ""
          )}
          <div className="navbar-end">
            <div className="navbar-logout">
              <div className="buttons">
                {currentUser ? (
                  <button
                    className="button is-outlined"
                    onClick={() => {
                      setCurrentUser("");
                      navigate("/login");
                    }}
                  >
                    {"LOGOUT"}
                  </button>
                ) : (
                  <>
                    <Link to="/register" className="button is-link">
                      Register
                    </Link>
                    <Link to="/login" className="button is-outlined">
                      Login
                    </Link>
                    <Link to="/" className="button is-outlined"> 
                      Home
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};
