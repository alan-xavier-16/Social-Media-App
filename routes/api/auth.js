/*Gets JSON webtoken for Authentication*/
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

/* 
  @route    GET api/auth 
  @desc     Auth route to access User data
  @access   Private
*/
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/* 
@route    POST api/auth 
@desc     Authenticate user and get token for Login
@access   Public
*/
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    /*  Validates user information using express-validator and returns an array of objects for each error */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    /* 
    Check if user does NOT exists via email and returns error is true, else
      1. Compares plaintext password with the hashed password from the database for that user
    */
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      /*Creates payload needed for jwt module and sets the id to the mongoDB generated id, signs the token to the user and returns the token to the client*/
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

module.exports = router;
