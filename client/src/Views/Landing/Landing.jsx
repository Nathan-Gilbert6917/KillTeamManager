import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <section className="landing">
      <div className="landing-inner">
        <span className="landing-title">KillTeam Manager</span>
        <p>
          Sign up now and easily create, manage and view your KillTeams before
          and during a match.
        </p>
        <div className="button-container">
          <Link to="/register" className="button signup-button">
            Sign Up
          </Link>
          <Link to="/login" className="button login-button">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing;
