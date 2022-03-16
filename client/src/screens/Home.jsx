import React from "react";
import "../styles/Home.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home_container">
      <div className="texts">
        <h1>Chemistry App</h1>
        <div className="btns">
          <p>
            {" "}
            Click here to <Link to="/register">Register</Link>
          </p>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
