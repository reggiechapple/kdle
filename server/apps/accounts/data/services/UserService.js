const User = require("../../domain/schemas/User");
const passport = require("passport");

class UserService {

  constructor() { }

  registerUser(newUser, password, req, res) {
    User.register(newUser, password, (err, user) => {
      if (err) {
        //req.flash("error", err.message);
        res.redirect("/");
      } else {
        passport.authenticate("local")(req, res, function () {
          console.log(req.user);
          // req.flash(
          //   "success",
          //   "Success! You are registered and logged in!"
          // );
          res.redirect("/");
        });
      }
    });
  }
}

module.exports = UserService;