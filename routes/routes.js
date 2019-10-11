const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controller.js");

// login
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

  app.post("/register", (req, res) => {
    controllers.registerUser(app, req, res);
  });

  app.post("/login", (req, res) => {
    controllers.loginUser(app, req, res);
  });

  router.get("/logout", (req, res) => {
    controllers.logoutUser(app, req, res);
  });

  router.get("/account", async (req, res) => {
    try {
      if (!req.session.user) {
        throw "not logged in";
      }

      controllers.viewUserAccount(app, req, res);
    } catch (err) {
      console.log(err);
      res.redirect("/login");
    }
  });

  app.post("/play", (req, res) => {
    controllers.playGame(app, req, res);
  });

  app.get("/play", async (req, res) => {
    try {
      if (!req.session.user) {
        throw "not logged in";
      }
      controllers.ducksInPlay(app, req, res);
    } catch (err) {
      console.log(err);
      res.redirect("/login");
    }
  });

  app.get("/admin", async (req, res) => {
    try {
      const db = app.set("quackyRacesDB");
      const users = db.collection("users");

      const user = await users.findOne({ email: req.session.user });

      if (user.isAdmin === true) {
        controllers.adminducksInPlay(app, req, res);
      } else throw "not admin";
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  });

  app.post("/admin", async (req, res) => {
    controllers.adminSubmitResults(app, req, res);
  });

  app.get("/predictions", (req, res) => {
    res.render("predictions", {
      user: req.session.user
    });
  });

  app.get("/results", (req, res) => {
    controllers.resultsducksInPlay(app, req, res);
  });

  app.get("/leaderboard", (req, res) => {
    res.render("leaderboard", {
      user: req.session.user
    });
  });

  router.get("/profiles", (req, res) => {
    controllers.viewAllDucks(app, req, res);
  });

  return router;
};
