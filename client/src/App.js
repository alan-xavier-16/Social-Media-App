import React, { Fragment, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import "./App.css";

/*REDUX IMPORTS*/
import { Provider } from "react-redux"; //Connects React and Redux Store
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

/* SET GLOBAL HEADER FOR ALL ROUTES */
if (localStorage.token) {
  setAuthToken(localStorage.token); // Sets the global header with token for authentication
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); // Empty braces simulates componentDidMount and componentDidUnmount so it runs only ONCE

  return (
    <Provider store={store}>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Provider>
  );
};

export default App;
