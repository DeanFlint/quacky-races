const express = require("express");

const router = express.Router();

// const myControllers = require('../controllers/controllers.js')

// login
const bcrypt = require("bcrypt");
const session = require("express-session");

var loggedIn = false;

module.exports = app => {
  app.get("/", (req, res, loggedIn) => {
    res.render("index", {
      loggedIn: loggedIn
    });
  });

  app.get("/play", (req, res, loggedIn) => {
    res.render("play", {
      loggedIn: loggedIn
    });
  });

  app.get("/predictions", (req, res, loggedIn) => {
    res.render("predictions", {
      loggedIn: loggedIn
    });
  });

  app.get("/results", (req, res, loggedIn) => {
    res.render("results", {
      loggedIn: loggedIn
    });
  });

  app.get("/leaderboard", (req, res, loggedIn) => {
    res.render("leaderboard", {
      loggedIn: loggedIn
    });
  });

  app.get("/account", (req, res, loggedIn) => {
    res.render("account", {
      loggedIn: loggedIn
    });
  });

  router.get("/profiles", (req, res, loggedIn) => {
    app
      .set("quackyRacesDB")
      .collection("ducks")
      .find({})
      .sort({ duckID: 1 })
      .sort({ duckName: 1 })
      .toArray(function(err, docs) {
        if (err) {
          console.error(err);
        }

        return res.render("profiles", {
          title: "Duck Profiles",
          ducks: docs,
          loggedIn: loggedIn
        });
      });
  });

  router.get("/api/login", (req, res) => {
    app
      .set("quackyRacesDB")
      .collection("users")
      .find({ userID: "3" })
      .toArray(function(err, docs) {
        if (err) {
          console.error(err);
        }
        console.dir(docs);
        res.json(docs);
      });
  });

  router.get("/account", (req, res, loggedIn) => {
    let userID = req.params.userID;
    app
      .set("quackyRacesDB")
      .collection("users")
      .find({ userID: userID })
      .toArray(function(err, docs) {
        if (err) {
          console.error(err);
        }

        return res.render("account", {
          // firstName: docs[0].forename,
          users: docs,
          loggedIn: loggedIn
        });
      });
  });

  app.get("/login", (req, res, loggedIn) => {
    res.render("login.ejs", {
      message: "",
      loggedIn: loggedIn
    });
  });

  app.get("/register", (req, res, loggedIn) => {
    res.render("register.ejs", {
      message: "",
      loggedIn: loggedIn
    });
  });

  app.post("/register", async (req, res, loggedIn) => {
    try {
      let saltRounds = 8;
      let hash = await bcrypt.hash(req.body.password, saltRounds);

      const db = app.set("quackyRacesDB");
      const users = db.collection("users");

      if (req.body.password != req.body.confirmPassword) throw "Error";
      // add year verification

      await users.createIndex({ email: 1 }, { unique: true });
      await users.insertOne({
        email: req.body.email,
        hash: hash,
        forename: req.body.forename.strip("").toLowerCase(),
        surname: req.body.surname.strip("").toLowerCase(),
        dob: req.body.dob
      });
      loggedIn = true;
      req.session.user = req.body.email;
      res.redirect("/account");
    } catch (err) {
      console.log("Registration error: ", err);
      res.render("register", {
        message: "Unable to register"
      });
    }
  });

  app.get("/account", (req, res, loggedIn) => {
    res.render("account", { loggedIn: loggedIn });
  });

  app.use(
    session({
      secret: "QU4CK",
      resave: false,
      saveUninitialized: true
    })
  );

  app.post("/login", async (req, res, loggedIn) => {
    try {
      const db = app.set("quackyRacesDB");
      const users = db.collection("users");

      const user = await users.findOne({ email: req.body.email });

      let success = await bcrypt.compare(req.body.password, user.hash);

      if (!success) {
        throw "Incorrect username or password";
      }
      loggedIn = true;
      req.session.user = req.body.email;
      res.redirect(302, "/");
    } catch (err) {
      res.render("login", {
        message: "Incorrect Username or Password"
      });
    }
  });

  app.get("/logout", (req, res, loggedIn) => {
    loggedIn = false;
    req.session.user = null;
    res.redirect(302, "/");
  });

  return router;
};
