const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require("../models/users.js");
const session = require("express-session");

router.get("/register", (req, res) => {
  if (!req.session.name) {
    res.render("register", { title: "register" });
  } else {
    res.redirect("/chat");
  }
});

router.post("/register", async (req, res) => {
  let register = async (error, data) => {
    try {
      if (data.length == 0) {
        let pass = req.body.password;
        let cryptpass = await bcrypt.hash(pass, 10);
        const user = new users({
          username: req.body.username,
          email: req.body.email,
          password: cryptpass,
        });
        user.save().then((result) => {
          res.redirect("/");
        });
      } else {
        res.send("böyle bir kullanıcı var");
      }
    } catch {
      console.log(error);
    }
  };
  users.find({ username: req.body.username }, register);
});

module.exports = router;
