const express = require("express");
const router = express.Router();

// connects to all the controllers to use the functions defined in them
const controllers = require("../controllers/controller.js");
const accountControllers = require("../controllers/accountController.js");
const playControllers = require("../controllers/playController.js");
const resultsControllers = require("../controllers/resultsController.js");
const adminControllers = require("../controllers/adminController.js");


// session is used to maintain if a user is logged in or not 
const session = require("express-session");

module.exports = app => {
  app.use(

    // the secret is used to keep a session secure, if a user's session is inppropriately used the secret
    // can be changed and all sessions will have to be revalidated
    session({
      secret: "QU4CK",
      resave: false,
      saveUninitialized: true
    })
  );

  // load the login page, if there is not a session in place for a user then it throws an error which results in the login page being loaded
  // if a user is logged in and a session is active, then it loads the account page and uses the viewUserAccount function from the account
  // controller which passes through their user information to be displayed
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

  // we use app.get to load a page - READ
  app.get("/register", (req, res) => {
    res.render("register.ejs", {
      message: "",
      user: req.session.user
    });
  });

  // we use app.post to put information into the database - CREATE
  app.post("/register", (req, res) => {
    accountControllers.registerUser(app, req, res);
  });

  app.post("/login", (req, res) => {
    accountControllers.loginUser(app, req, res);
  });

  router.get("/logout", (req, res) => {
    accountControllers.logoutUser(app, req, res);
  });

  // delete user uses a delete function to remove a user from the database - DELETE
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
    // accountControllers.alreadyPlayed(app, req, res);
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


  // Used to load the admin page, first checks whether the user logged in has a true 'isAdmin' value, and if this is the case, then the admin page will load
  // If a user isn't an admin and tries to load the admin page by altering the URL, they will be redirected to the home page
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

  // Calculate scores updates the users scores in the database depending on how their predictions match up to the results - UPDATE
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

  router.get("/", (req,res)=>{
    controllers.randomImageGenerator(app, req, res);
  })

  return router;
};
