import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-forms/CreateProfile";
import EditProfile from "./components/create-forms/EditProfile";
import AddExperience from "./components/create-forms/AddExperience";
import AddEducation from "./components/create-forms/AddEducation";
import Profiles from "./components/profiles/Profiles"
import Profile from "./components/profile/Profile"
import PrivateRouting from "./components/routing/PrivateRouting";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import { setCurrentUser, logout } from "./actions/auth";
import setAuthToken from "./ultils/setAuthToken";
import jwt_decode from "jwt-decode";

import "./App.css";

// Check for token
if (localStorage.token) {
  // Set auth token header auth
  setAuthToken(localStorage.token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logout());
    // Clear current Profile
    // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/";
  }
}

const App = () => {
  // debugger
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRouting exact path="/dashboard" component={Dashboard} />
              <PrivateRouting
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRouting
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRouting
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRouting
                exact
                path="/add-education"
                component={AddEducation}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
