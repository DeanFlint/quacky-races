const express = require("express");

const router = express.Router();

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

  // testing displaying data from a database

  // router.get("/api/profiles", (req, res) => {
  //   app
  //     .set("testQuackyRaces")
  //     .collection("duck")
  //     .find({})
  //     .toArray(function(err, docs) {
  //       if (err) {
  //         console.error(err);
  //       }
  //       console.dir(docs);
  //       res.json(docs);
  //     });
  // });

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
