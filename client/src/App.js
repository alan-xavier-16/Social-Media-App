import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import "./App.css";

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </section>
      </Switch>
    </Fragment>
  );
};

export default App;
