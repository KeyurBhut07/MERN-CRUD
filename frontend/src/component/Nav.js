import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("users");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          AK Dashboard
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">
                Add Product
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>

            <li className="nav-item">
              {auth ? (
                <Link className="nav-link" onClick={logout} to="/login">
                  Logout ({JSON.parse(auth).name})
                </Link>
              ) : (
                <>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
