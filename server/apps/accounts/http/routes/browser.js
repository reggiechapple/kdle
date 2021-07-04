const express = require("express");
const User = require("../../domain/schemas/User");
const UserService = require("../../data/services/UserService");
const passport = require("passport");
const multer = require("multer");
const bcrypt = require("bcrypt");
const uploader = require("../../../core/middleware/upload");

const router = express.Router();
const userService = new UserService();

router.get("/accounts/register", (req, res) => {
  res.render("accounts/register");
});

// New user POST route - handle register logic and sign the user in
router.post("/accounts/register", uploader.store.single("image"), async (req, res) => {
  if (
    req.body.email &&
    req.body.name &&
    req.body.password
  ) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let newUser = new User({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword
    });
    if (req.file) {
      let imgPath = req.file.path
      newUser.avatar = imgPath.split("public")[1];
      newUser
        .save()
        .then((user) => {
          console.log(user);
          res.redirect("/accounts/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/accounts/register");
        });

    } else {
      newUser.avatar = "/images/no_profile.jpg";
      newUser
        .save()
        .then((user) => {
          console.log(user);
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/accounts/register");
        });
    }
  }
});

// Log in GET route - show login form
router.get("/accounts/login", (req, res) => {
  res.render("accounts/login");
});

// Log in POST route - handle login logic
router.post("/accounts/login", (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  // Validating User Data
  if (!email || !password) {
    // Flash Message if any input field is input
    console.log("All fields are required");
    return res.redirect("/accounts/login");
  }

  // Login Authentication
  passport.authenticate("local", (err, user, info) => {
    // Error in Login
    if (err) {
      console.log(info.message);
      return next(err);
    }
    // No User Matched
    if (!user) {
      console.log(info.message);
      res.redirect("/accounts/login");
    }

    req.logIn(user, (err) => {
      if (err) {
        console.log(info.message);
        return next(err);
      }
      // Succsessfull Login
      return res.redirect("/accounts/dashboard");
    });
  })(req, res, next);

});

// Logout
router.get("/accounts/logout", (req, res) => {
  req.logout();
  return res.redirect("/accounts/login");
});

router.get("/accounts/dashboard", (req, res) => {
  res.render("accounts/dashboard", {layout: 'dashboard'});
});

module.exports = router;