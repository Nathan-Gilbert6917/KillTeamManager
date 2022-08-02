import React, { Fragment, useState } from "react";
import "./Login.css";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Navigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import TextInput from "../../Components/TextInput/TextInput";
import Alert from "../../Components/Alert/Alert";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { login } from "../../Actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <Fragment>
      {isAuthenticated && <Navigate replace to="/dashboard" />}
      <div className="background">
        <h2 className="title">Login</h2>
        <Alert />
        <div className="login-container">
          <form className="login-inputs" onSubmit={(e) => handleSubmit(e)}>
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
            <span className="signin-button-container">
              <Button label="Login"></Button>
            </span>
          </form>

          <span className="signup-container">
            <p>Don't have an account?</p>
            <Link to="/register" className="link">
              Sign Up
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
