const express = require("express");
const router = express.Router();

// controllers
const controllers = require("../controllers/controller.js");
const accountControllers = require("../controllers/accountController.js");
const playControllers = require("../controllers/playController.js");
const resultsControllers = require("../controllers/resultsController.js");
const adminControllers = require("../controllers/adminController.js");

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
    try {
      if (!req.session.user) {
        throw "not logged in";
      }
      accountControllers.viewUserAccount(app, req, res);
    } catch (err) {
      console.log(err);
      res.render("login.ejs", {
        message: "",
        user: req.session.user
      });
    }

  });

  app.get("/register", (req, res) => {
    res.render("register.ejs", {
      message: "",
      user: req.session.user
    });
  });

  app.post("/register", (req, res) => {
    accountControllers.registerUser(app, req, res);
  });

  app.post("/login", (req, res) => {
    accountControllers.loginUser(app, req, res);
  });

  router.get("/logout", (req, res) => {
    accountControllers.logoutUser(app, req, res);
  });

  router.get("/deleteUser", (req, res) => {
    accountControllers.deleteUser(app, req, res);
  });

  router.get("/account", async (req, res) => {
    try {
      if (!req.session.user) {
        throw "not logged in";
      }

      accountControllers.viewUserAccount(app, req, res);
    } catch (err) {
      console.log(err);
      res.redirect("/login");
    }
  });

  app.post("/play", (req, res) => {
    playControllers.playGame(app, req, res);
  });

  app.get("/play", async (req, res) => {
    try {
      if (!req.session.user) {
        throw "not logged in";
      }
      playControllers.ducksInPlay(app, req, res);
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
        adminControllers.adminducksInPlay(app, req, res);
      } else throw "not admin";
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  });

  app.post("/admin", async (req, res) => {
    adminControllers.adminSubmitResults(app, req, res);
  });

  app.get("/calculate-scores", async (req, res) => {
    adminControllers.calculateScores(app, req, res);
  });

  app.get("/predictions", (req, res) => {
    res.render("predictions", {
      user: req.session.user
    });
  });

  app.get("/results", (req, res) => {
    resultsControllers.resultsducksInPlay(app, req, res);
  });

  router.get("/profiles", (req, res) => {
    controllers.viewAllDucks(app, req, res);
  });

  router.get("/leaderboard", (req, res) => {
    controllers.viewLeaderboard(app, req, res);
  });

  return router;
};
