import React, { Fragment } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Alert from "../../Components/Alert/Alert";
import "./Dashboard.css";

const Dashboard = ({ isAuthenticated }) => {
  return (
    <Fragment>
    {!isAuthenticated && <Navigate replace to="/" />}
    <section className="page">
      <div className="home-layout">
        <span className="title">KillTeam Manager</span>
        <Alert />
        <div className="button-container"></div>
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
