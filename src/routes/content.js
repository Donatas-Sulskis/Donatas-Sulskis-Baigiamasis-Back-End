const express = require("express");
const router = express.Router();
const middleware = require("../middleware");

router.get("/", middleware.loggedIn, (req, res) => {
  res.send({ msg: `Hi - I am logged in as ${req.userData.email}` });
});

module.exports = router;
