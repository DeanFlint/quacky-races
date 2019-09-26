var users = "data/user.json";

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (users[idx]) {
      cb(null, users[idx]);
    } else {
      cb(new Error("User " + id + " does not exist"));
    }
  });
};

exports.findByEmail = function(email, cb) {
  process.nextTick(function() {
    for (var i = 0, len = users.length; i < len; i++) {
      var user = users[i];
      if (user.email === email) {
        return cb(null, user);
      }
    }
    return cb(null, null);
  });
};

function check(form) {
  if (form.email.value == user.email && form.password.value == user.password) {
    console.log("success");
  } else {
    console.log("fail");
  }
}
