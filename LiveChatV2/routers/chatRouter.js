const express = require("express");
const router = express.Router();
const session = require("express-session");

router.get("/chat", (req, res) => {
  if (req.session.name) {
    res.render("chat", { name: req.session.name });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
