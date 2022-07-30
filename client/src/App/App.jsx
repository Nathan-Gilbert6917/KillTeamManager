import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "../Components/Views/Landing/Landing.jsx";
import Register from "../Components/Views/Register/Register.jsx";
import Login from "../Components/Views/Login/Login.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Fragment>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Fragment>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
