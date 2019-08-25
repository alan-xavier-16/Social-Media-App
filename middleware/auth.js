/* Authenticates User via JSON Web Token */
const jwt = require("jsonwebtoken");
const config = require("config");

/*
  1. Gets token from header
  2. Checks for token
  3. Verifies token
*/
module.exports = function(req, res, next) {
  const token = req.header("x-auth-token"); // Gets the token stored in the header with key 'x-auth-token'
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret")); // Decodes token
    req.user = decoded.user; // Returns the decoded User in the request
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
