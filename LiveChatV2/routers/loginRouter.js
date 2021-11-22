const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require("../models/users.js");
const session = require("express-session");

router.get("/", (req, res) => {
  if (!req.session.name) {
    res.render("index", { title: "Sign Up" });
  } else {
    res.redirect("/chat");
  }
});
// when login post
router.post("/", async (req, res) => {
  try {
    let login = async (error, data) => {
      if (data.length != 0) {
        let postedpassword = req.body.password;
        let userpassword = data[0].password;
        bcrypt.compare(postedpassword, userpassword, (err, con) => {
          if (con) {
            req.session.name = data[0].username;
            console.log(req.session);
            res.redirect("/chat");
          } else {
            res.send("birşeyler ters gitti!");
          }
        });
      } else {
        res.send("Böyle bir kullanıcı bulunmamaktadır");
      }
    };
    users.find({ email: req.body.email }, login);
  } catch {}
});

module.exports = router;
