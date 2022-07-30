import React, { Fragment } from "react";
import "./Register.css";

import { Link } from "react-router-dom";
import Button from "../../Button/Button";
import TextInput from "../../TextInput/TextInput";

const Register = () => {
  return (
    <Fragment>
      <div className="background">
        <div className="title">
          <h1 className="text-centered">Register</h1>
        </div>
        <div className="register-container">
          <div className="register-inputs">
            <TextInput label="Username" />
            <TextInput label="Email" type="email" />
            <TextInput label="Password" type="password" />
          </div>

          <span className="signup-button-container">
            <Button label="Sign Up"></Button>
          </span>

          <span className="signin-container">
            <p>Already have an account?</p>
            <Link to="/login" className="link">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
