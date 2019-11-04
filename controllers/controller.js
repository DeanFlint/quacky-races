const bcrypt = require("bcrypt");

module.exports = {
  // VIEW ALL DUCKS PROFILES
  viewAllDucks: function (app, req, res) {
    app
      .set("quackyRacesDB")
      .collection("ducks")
      .find({})
      .sort({
        duckID: 1
      })
      .sort({
        duckName: 1
      })
      .toArray(function (err, docs) {
        if (err) {
          console.error(err);
        }

        return res.render("profiles", {
          title: "Duck Profiles",
          ducks: docs,
          user: req.session.user
        });
      });
  },

  //DISPLAY LEADERBOARD

  viewLeaderboard: function (app, req, res) {
    app
      .set("quackyRacesDB")
      .collection("users")
      .find({})
      .sort({
        score: -1
      })
      .toArray(function (err, docs) {
        if (err) {
          console.error(err);
        }
        return res.render("leaderboard", {
          title: "Leaderboard",
          users: docs,
          user: req.session.user
        });

      });
  },

  randomImageGenerator: function (app, req, res) {

    let randomImageArray = ["duck1.jpg", "duck2.jpg", "duck3.jpg", "duck4.jpg", 
    "duck5.jpg", "duck6.jpg", "duck7.jpg", "duck8.jpg", "duck9.jpg", "duck10.jpg", 
    "duck11.jpg", "duck12.jpg", "duck13.jpg", "duck14.jpg", "duck15.jpg", "duck16.jpg", 
    "duck17.jpg", "duck18.jpg", "duck19.jpg", "duck20.jpg", "duck21.jpg", "duck22.jpg", 
    "duck23.jpg", "duck24.jpg", "duck25.jpg", "duck26.jpg", "duck27.jpg", "duck28.jpg", 
    "duck29.jpg", "duck30.jpg", "duck31.jpg", "duck32.jpg", "duck33.jpg", "duck34.jpg", 
    "duck35.jpg", "duck36.jpg"];

    let randomImageArrayIndex = Math.floor(Math.random() * randomImageArray.length);
    let frontPageImage = randomImageArray[randomImageArrayIndex];

    return res.render("index", {
      frontPageImage: frontPageImage,
      user: req.session.user
    })

  }


};