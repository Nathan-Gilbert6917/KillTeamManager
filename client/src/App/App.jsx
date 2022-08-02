import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// Redux
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../Actions/auth";
import setAuthToken from "../Utils/setAuthToken";

// Views
import Landing from "../Views/Landing/Landing.jsx";
import Register from "../Views/Register/Register.jsx";
import Login from "../Views/Login/Login.jsx";
import Dashboard from "../Views/Dashboard/Dashboard.jsx";
import Collection from "../Views/Collection/Collection.jsx";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/collection" element={<Collection />} />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
