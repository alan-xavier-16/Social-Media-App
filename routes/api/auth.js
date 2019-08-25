/*Gets JSON webtoken for Authentication*/
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");

/* 
  @route    GET api/auth 
  @desc     Auth route to access User data
  @access   Private
  Finds user by ID without password
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

module.exports = router;
