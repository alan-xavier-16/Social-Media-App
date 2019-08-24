/*Routes for posts*/
const express = require("express");
const router = express.Router();

/* 
@route    GET api/posts 
@desc     Posts route
@access   Public
*/
router.get("/", (req, res) => {
  res.send("Post route");
});

module.exports = router;
