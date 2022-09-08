import React, { Fragment } from "react";
import { Navigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Alert from "../../Components/Alert/Alert";
import Button from "../../Components/Button/Button";
import "./Dashboard.css";

const Dashboard = ({ isAuthenticated }) => {
  return (
    <Fragment>
    {!isAuthenticated && <Navigate replace to="/" />}
    <section className="page">
      <div className="home-layout">
        <span className="title">KillTeam Manager</span>
        <Alert />
        <div className="dashboard-container">
          <Link to="/create" className="link">
            <Button label="Create Game" />
          </Link>
          <Link to="/join" className="link">
            <Button label="Join Game" />
          </Link>
          <Link to="/collections" className="link">
            <Button label="Collections" />
          </Link>
          <Link to="/settings" className="link">
            <Button label="Settings" />
          </Link>
        </div>
      </div>
    </section>
    </Fragment>
    
  );
};

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Dashboard);
