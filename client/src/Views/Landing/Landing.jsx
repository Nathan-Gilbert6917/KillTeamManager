import React, { Fragment } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Landing.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const Landing = ({ isAuthenticated }) => {
  return (
    <Fragment>
      {isAuthenticated && <Navigate replace to="/dashboard" />}
      <section className="page">
        <div className="landing-inner">
          <span className="title">KillTeam Manager</span>
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
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Landing);
