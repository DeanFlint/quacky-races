const express = require("express");
const router = express.Router();
const controllers = require('../controllers/controller.js')

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
    controllers.registerUser(app, req,res)
  });

  app.post("/login", (req, res) => {
    controllers.loginUser(app, req, res);
  });

  router.get("/logout", (req, res) => {
    controllers.logoutUser(app, req, res);
  });

  router.get("/account", (req, res) => {
    controllers.viewUserAccount(app, req, res);
  });

  app.post("/play", async (req, res) => {
    controllers.playGame(app, req, res)    
  });

  app.get("/play", (req, res) => {
    controllers.ducksInPlay(app, req, res)
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

  router.get("/profiles", (req, res) => {
    controllers.viewAllDucks(app, req, res)
  });

  return router;
};
