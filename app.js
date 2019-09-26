const express = require("express");
const path = require("path");

// login stuff
// var passport = require("passport");
// var Strategy = require("passport-local").Strategy;
// var data = require("./data");

const app = express();

// add for RESTful
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const routes = require("./routes/routes");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("./public"));
// app.use(express.static("./public/css"));

app.use((req, res, next) => {
  console.dir(req.url);
  next();
});

app.use("/", routes(app));

// remove for sample files
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
  next();
});

// trying to display databases
var MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  "mongodb://localhost:27017",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err, client) {
    app.set("testQuackyRaces", client.db("testQuackyRaces"));
  }
);

// finished displaying databases

// login stuff
// passport.use(
//   new Strategy(function(email, password, cb) {
//     data.users.findByEmail(email, function(err, user) {
//       if (err) {
//         return cb(err);
//       }
//       if (!user) {
//         return cb(null, false);
//       }
//       if (user.password != password) {
//         return cb(null, false);
//       }
//       return cb(null, user);
//     });
//   })
// );

// passport.serializeUser(function(user, cb) {
//   cb(null, user.id);
// });

// passport.deserializeUser(function(id, cb) {
//   data.users.findById(id, function(err, user) {
//     if (err) {
//       return cb(err);
//     }
//     cb(null, user);
//   });
// });

// app.use(passport.initialize());
// app.use(passport.session());

app.listen(3000);

console.log("Express on 3000");

module.exports = app;
