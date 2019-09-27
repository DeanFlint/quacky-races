const express = require("express");

const router = express.Router();

// login
const bcrypt = require("bcrypt");
const session = require("express-session");

// const myControllers = require('../controllers/controllers.js');

// console.dir(myControllers);

module.exports = app => {
  app.get("/", (req, res) => {
    res.render("index.ejs");
  });

  app.get("/play", (req, res) => {
    res.render("play.ejs");
  });

  app.get("/predictions", (req, res) => {
    res.render("predictions.ejs");
  });

  app.get("/results", (req, res) => {
    res.render("results.ejs");
  });

  // app.get("/profiles", (req, res) => {
  //   res.render("profiles.ejs");
  // });

  app.get("/leaderboard", (req, res) => {
    res.render("leaderboard.ejs");
  });

  app.get("/register", (req, res) => {
    res.render("register.ejs");
  });

  app.get("/account", (req, res) => {
    res.render("account.ejs");
  });

  app.get("/login", (req, res) => {
    res.render("login.ejs");
  });

  // login

  // app.use(session({
  //   secret = 'QU4CK',
  //   resave = false,
  //   saveUninitialized = true
  // }))

  // app.post('register', async (req, res) => {
  //   let saltRounds = 8
  //   let hash = await bcrypt.hash(req.body.password, saltRounds)
  //   users[req.body.email] = {
  //     hash: hash
  //   }
  //   res.redirect('/')
  // })

  app.post("/login-action", async (req, res) => {
    if (!users[req.body.email]) {
      res.render("Oops!", {
        message: "Sorry, details not found."
      });
      return;
    }
    let user = users[req.body.email];

    let success = await bcrypt.compare(req.body.password, user.hash);

    if (!success) {
      res.render("error", {
        message: "Bad username or password!"
      });
      return;
    }
    req.session.user = req.body.email;
    res.redirect(302, "/login");
  });

  // app.get('/logout', (req,res) => {
  //   req.session.user = null
  //   res.redirect(302, '/')
  // })

  router.get("/login", (req, res) => {
    app
      .set("testQuackyRaces")
      .collection("users")
      .find({})
      .toArray(function(err, docs) {
        if (err) {
          console.error(err);
        }
      });
    return res.render("login.ejs", {
      users: docs
      // user: req.session.user
    });
  });

  // testing displaying data from a database

  router.get("/profiles", (req, res) => {
    app
      .set("testQuackyRaces")
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
          ducks: docs
        });
      });
  });

  router.post("/ducks", (req, res) => {
    let duckID = parseInt(req.body.duckID);
    return res.json({ postedValue: duckID });
  });
  return router;
};
