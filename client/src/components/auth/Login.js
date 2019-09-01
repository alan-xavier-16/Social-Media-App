/*Login Page */
import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  /*Set initial state of form with fields blank */
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  /*Handle Form Logic */
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /*Handle Form Submit */
  const handleSubmit = async e => {
    e.preventDefault();
    login({ email, password });
  };

  /* Redirect on Login Success */
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>

      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            minLength="6"
            required
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>

      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

/* GETS AUTH STATE */
const mapStatetoProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStatetoProps,
  { login }
)(Login);
