/*Login Page */
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  /*Set initial state of form with fields blank */
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  /*Handle Form Logic */
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /*Handle Form Submit */
  const handleSubmit = async e => {
    e.preventDefault();
    console.log("SUCCESS");
  };

  const { email, password } = formData;
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

export default Login;
