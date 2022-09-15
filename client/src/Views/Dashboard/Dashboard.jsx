import React, { Fragment } from "react";
import { Navigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../Actions/auth";

import Alert from "../../Components/Alert/Alert";
import Button from "../../Components/Button/Button";
import "./Dashboard.css";

const Dashboard = ({ auth: { isAuthenticated }, logout }) => {
  return (
    <Fragment>
      {!isAuthenticated && <Navigate replace to="/" />}
      <span className="user">
        <a href="/" onClick={logout}>
          Logout
        </a>
      </span>
      <section className="page">
        <Alert />

        <div className="home-layout">
          <span className="title">KillTeam Manager</span>

          <grid className="dashboard-container">
            <Link to="/collections" className="link">
              <Button label="Collections" />
            </Link>
            <Link to="/settings" className="link">
              <Button label="Settings" />
            </Link>
          </grid>
        </div>
      </section>
    </Fragment>
  );
};

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Dashboard);
