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
            <Link to="/teams" className="link">
              <Button label="Teams" />
            </Link>
            <Link to="/operatives" className="link">
              <Button label="Operatives" />
            </Link>
            <Link to="/actions" className="link">
              <Button label="Actions" />
            </Link>
            <Link to="/weapons" className="link">
              <Button label="Weapons" />
            </Link>
            <Link to="/abilities" className="link">
              <Button label="Abilities" />
            </Link>
            <Link to="/rules" className="link">
              <Button label="Rules" />
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
