import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.scss";

const Header = ({ handleLogout, isLoggedIn }) => {
  const { token, first_name } = JSON.parse(localStorage.getItem("user_info")) || "";

  return (
    <nav>
      <ul>
        <li>
          <Link className="nav-link logo" to="/">
            Chemical App
          </Link>
        </li>

        {isLoggedIn === "true" || token ? (
          <>
            <li>
              <Link className="nav-link" to="/add-chemical">
              Welcome {first_name.toUpperCase()}!
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/add-chemical">
                Add chemical
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li onClick={() => handleLogout()}>
              <Link className="nav-link" to="/dashboard">
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
