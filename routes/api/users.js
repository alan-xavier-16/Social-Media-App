/*Routes for register a Users*/
const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

/* 
@route    POST api/users 
@desc     Register user
@access   Public
*/
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    /*  Validates user information using express-validator and returns an array of objects for each error */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    /* 
    Check if user exists via email and returns error is true, else
      1. Gets user's gravatar url from the email,
      2. Creates a new User,
      3. Encrypts password using bcrypt module, and 
      4. Returns a jsonwebtoken (needed for React front-end)
    */
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
      user = new User({
        name,
        email,
        password,
        avatar
      });
      /* Hashing and Salting Password */
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      /* Save User to Database */
      await user.save();
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
