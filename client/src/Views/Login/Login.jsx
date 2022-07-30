import React, { Fragment } from "react";
import "./Login.css";

import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import TextInput from "../../Components/TextInput/TextInput";

const Login = () => {
  return (
    <Fragment>
      <div className="background">
        <div className="title">
          <h1 className="text-centered">Login</h1>
        </div>
        <div className="register-container">
          <div className="register-inputs">
            <TextInput label="Email" type="email" />
            <TextInput label="Password" type="password" />
          </div>

          <span className="signup-button-container">
            <Button label="Login"></Button>
          </span>

          <span className="signin-container">
            <p>Don't have an account?</p>
            <Link to="/register" className="link">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
