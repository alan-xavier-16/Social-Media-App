/*Register a New User */
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  /*Set initial state of form with fields blank */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  /*Handle Form Logic */
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /*Handle Form Submit */
  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Passwords do not Match");
    } else {
      console.log("SUCCESS");
    }
  };

  const { name, email, password, password2 } = formData;
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>

      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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

        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={handleChange}
            minLength="6"
            required
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Register" />
      </form>

      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
