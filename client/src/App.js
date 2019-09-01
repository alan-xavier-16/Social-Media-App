import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import "./App.css";

/*REDUX IMPORTS*/
import { Provider } from "react-redux"; //Connects React and Redux
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
