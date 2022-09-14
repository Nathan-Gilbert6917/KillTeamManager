import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Alert.css";

const Alert = ({ alerts }) => {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div className="alert-container">
        <div key={alert.id} className={`alert alert-${alert.type}`}>
          <span className={`alert-message alert-${alert.type}-msg`}>
            {alert.msg}
          </span>
          <div className={`alert-timer alert-${alert.type}-timer`}></div>
        </div>
      </div>
    ))
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({ alerts: state.alert });

export default connect(mapStateToProps)(Alert);
