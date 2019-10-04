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

  app.post('formAction', (req, res) => {
    
    
  })

  app.get("/play", (req, res) => {
    res.render("play.ejs");
  });

  app.get("/predictions", (req, res) => {
    res.render("predictions.ejs");
  });

  app.get("/results", (req, res) => {
    res.render("results.ejs");
  });

  app.get("/leaderboard", (req, res) => {
    res.render("leaderboard.ejs");
  });

  app.get("/account", (req, res) => {
    res.render("account");
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
          ducks: docs
        });
      });
  });

  router.get('/api/login', (req, res) => {
    app
      .set("quackyRacesDB")
      .collection("users")
      .find({userID: "3"})
      .toArray(function(err, docs) {
        if (err) {
          console.error(err);
        }
        console.dir(docs);
        res.json(docs)
      })
    });

  router.get('/account/:userID', (req, res) => {
    let userID = req.params.userID;
    app
      .set("quackyRacesDB")
      .collection("users")
      .find({ "userID": userID })
      .toArray(function(err, docs) {
        if (err) {
          console.error(err);
        }
        
        return res.render("account", {
          // firstName: docs[0].forename,
          users: docs
        });
      });
  })

  app.get("/login", (req, res) => {
    res.render("login.ejs");
  });

  app.get("/register", (req, res) => {
    res.render("register.ejs");
  });

  app.get("/account", (req, res) => {
    res.render("account.ejs");
  });

  return router;
};
