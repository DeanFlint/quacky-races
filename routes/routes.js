const express = require("express");

const router = express.Router();

// const myControllers = require('../controllers/controllers.js')

// login
const bcrypt = require("bcrypt");
const session = require("express-session");



module.exports = app => {
  app.use(
    session({
      secret: "QU4CK",
      resave: false,
      saveUninitialized: true
    })
  );

  app.get("/", (req, res) => {
    res.render("index", {
      user: req.session.user
    });
  });

  app.get("/play", (req, res) => {
    res.render("play", {
      user: req.session.user
    });
  });

  app.get("/predictions", (req, res) => {
    res.render("predictions", {
      user: req.session.user
    });
  });

  app.get("/results", (req, res) => {
    res.render("results", {
      user: req.session.user
    });
  });

  app.get("/leaderboard", (req, res) => {
    res.render("leaderboard", {
      user: req.session.user
    });
  });

  app.get("/account", (req, res) => {
    res.render("account", {
      user: req.session.user
    });
  });

  router.get("/profiles", (req, res) => {
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
          user: req.session.user
        });
      });
  });

  // router.get("/api/login", (req, res) => {
  //   app
  //     .set("quackyRacesDB")
  //     .collection("users")
  //     .find({ userID: "3" })
  //     .toArray(function(err, docs) {
  //       if (err) {
  //         console.error(err);
  //       }
  //       console.dir(docs);
  //       res.json(docs);
  //     });
  // });

  router.get("/account", (req, res) => {
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
          user: req.session.user
        });
      });
  });

  app.get("/login", (req, res) => {
    res.render("login.ejs", {
      message: "",
      user: req.session.user
    });
  });

  app.get("/register", (req, res) => {
    res.render("register.ejs", {
      message: "",
      user: req.session.user
    });
  });

  app.post("/register", async (req, res) => {
    try {
      let saltRounds = 8;
      let hash = await bcrypt.hash(req.body.password, saltRounds);

      const db = app.set("quackyRacesDB");
      const users = db.collection("users");
      const dob = req.body.day + req.body.month + req.body.year

      if (req.body.password != req.body.confirmPassword) throw "Error";
      // add year verification

      await users.createIndex({ email: 1 }, { unique: true });

      await users.insertOne({
        email: req.body.email,
        hash: hash,
        forename: req.body.forename,
        surname: req.body.surname,
        dob: dob
      });

      user = req.body.email;
      res.redirect("/account");

    } catch (err) {
      console.log("Registration error: ", err);

      res.render("register", {
        message: "Unable to register",
        user: req.session.user
      });
    }
  });

  app.get("/account", (req, res) => {
    res.render("account", { 
      user: req.session.user 
    });
  });

  app.post("/login", async (req, res) => {
    try {
      const db = app.set("quackyRacesDB");
      const users = db.collection("users");

      const user = await users.findOne({ email: req.body.email });

      let success = await bcrypt.compare(req.body.password, user.hash);

      if (!success) {
        throw "Incorrect username or password";
      }
      
      req.session.user = req.body.email;
      res.redirect(302, "/");
    } catch (err) {
      res.render("login", {
        message: "Incorrect Username or Password"
      });
    }
  });

  app.get("/logout", (req, res) => {
    req.session.user = null;
    res.redirect(302, "/");
  });

  return router;
};
