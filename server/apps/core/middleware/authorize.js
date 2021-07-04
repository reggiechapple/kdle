function arrayMatch(arr1, arr2) {
  var arr = [];
  arr1 = arr1.toString().split(',').map(String);
  arr2 = arr2.toString().split(',').map(String);
  console.log(arr1);
  // for array1
  for (var i in arr1) {
    if (arr2.indexOf(arr1[i]) !== -1)
      arr.push(arr1[i]);
  }
  console.log(arr);

  return arr.sort((x, y) => x - y);
}

module.exports = function (roles, useEither = false) {
  return function (req, res, next) {

    let roleArray = arrayMatch(req.user.roles, roles);

    if (useEither === true) {
      if (roles.some(v => roleArray.includes(v))) {
        next();
      }
      else {
        res.redirect("/");
      }
    }
    else if (JSON.stringify(roles) === JSON.stringify(roleArray)) {
      next();
    }
    else {
      res.redirect("/");
    }
  }
}
