const bcrypt = require("bcrypt");

module.exports = {
  // ACCOUNT MANAGEMENT
  viewUserAccount: function (app, req, res) {
    app
      .set("quackyRacesDB")
      .collection("users")
      .find({
        email: req.session.user
      })
      .toArray(function (err, docs) {
        if (err) {
          console.error(err);
        }
        return res.render("account", {
          user: docs[0]
        });
      });
  },
  logoutUser: function (app, req, res) {
    req.session.user = null;
    res.redirect(302, "/");
  },
  registerUser: async function (app, req, res) {
    try {
      let saltRounds = 8;
      let hash = await bcrypt.hash(req.body.password, saltRounds);
      const db = app.get("quackyRacesDB");
      const users = db.collection("users");
      const dob = req.body.day + req.body.month + req.body.year;
      if (req.body.password != req.body.confirmPassword) throw "Error";

      var currentYear = new Date();
      var year = currentYear.getFullYear();
      if (year - req.body.year < 18) throw "Error";

      // add year verification
      await users.createIndex(
        {
          email: 1
        },
        {
          unique: true
        }
      );
      await users.insertOne({
        email: req.body.email,
        hash: hash,
        forename: req.body.forename,
        surname: req.body.surname,
        dob: dob,
        isAdmin: false
      });
      user = req.body.email;

      req.session.user = req.body.email;
      res.redirect("/account");
    } catch (err) {
      console.log("Registration error: ", err);
      res.render("register", {
        message: "Unable to register",
        user: ""
      });
    }
  },

  loginUser: async function (app, req, res) {
    try {
      const db = app.get("quackyRacesDB");
      const users = db.collection("users");

      const user = await users.findOne({
        email: req.body.email
      });
      let success = await bcrypt.compare(req.body.password, user.hash);

      if (!success) {
        throw "Incorrect username or password";
      }

      req.session.user = req.body.email;
      res.redirect(302, "play");
    } catch (err) {
      res.render("login", {
        message: "Incorrect Username or Password",
        user: ""
      });
    }
  },

  deleteUser: async function (app, req, res) {
    try {
      const db = app.get("quackyRacesDB");
      const users = db.collection("users");

      await users.deleteOne({ "email": req.session.user }, function (err, dbResp) {
        if (err) {
          console.log(err);
        }
        if (dbResp.deletedCount === 1) {
          console.log("User deleted");
        } else {
          console.log("Could not delete")
          res.render("account", {
            message: "Could not delete account"
          });
        }
      });
      req.session.user = null;
      res.redirect(302, "/");
    } catch (err) {
      res.render("account", {
        message: "Failed to delete account",
        user: req.session.user
      });
    }
  }


};
