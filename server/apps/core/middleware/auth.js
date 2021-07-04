const arrayMatch = require("./../utils/arrayMatch");

var auth = {};

auth.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
      return next();
  }
  req.flash("error", "You need to be logged in to do that!");
  res.redirect("/accounts/login");
};

auth.requiredRoles = (roles) => {
  return function (req, res, next) {
    if (roles.includes(req.user.role)) {
      return next();
    }
    res.redirect("/accounts/login");
  }
}

module.exports = auth;