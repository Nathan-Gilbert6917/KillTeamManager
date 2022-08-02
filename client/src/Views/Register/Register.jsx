import React, { Fragment, useState } from "react";
import "./Register.css";

import { connect } from "react-redux";
import { setAlert } from "../../Actions/alert";
import { register } from "../../Actions/auth";
import { DANGER } from "../../Actions/types";
import PropTypes from "prop-types";

import { Link, Navigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import TextInput from "../../Components/TextInput/TextInput";
import Alert from "../../Components/Alert/Alert";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password, confirmPassword } = formData;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      await register({ username, email, password });
    } else {
      setAlert("Passwords do not match", DANGER);
    }
  };

  return (
    <Fragment>
      {isAuthenticated && <Navigate replace to="/login" />}
      <div className="background">
        <h2 className="title">Register</h2>
        <Alert />
        <div className="register-container">
          <form className="register-inputs" onSubmit={(e) => handleSubmit(e)}>
            <TextInput
              label="Username"
              name="username"
              value={username}
              onChange={(e) => handleInputChange(e)}
            />
            <TextInput
              label="Email"
              name="email"
              value={email}
              onChange={(e) => handleInputChange(e)}
            />
            <TextInput
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => handleInputChange(e)}
            />
            <TextInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => handleInputChange(e)}
            />
            <span className="signup-button-container">
              <Button label="Sign Up"></Button>
            </span>
          </form>

          <span className="signin-container">
            <p>Already have an account?</p>
            <Link to="/login" className="link">
              Sign in
            </Link>
            <Link to="/" className="link-home">
              <FontAwesomeIcon icon={faHome} className="home-icon-button" />
              <span>Home</span>
            </Link>
          </span>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
