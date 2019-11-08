const bcrypt = require("bcrypt");

module.exports = {
  // VIEW ALL DUCKS PROFILES
  viewAllDucks: function (app, req, res) {
    app
      // database to find ducks
      .set("quackyRacesDB")
      .collection("ducks")
      .find({})
      .sort({
        // sorts the duck IDs from smallest to largest
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
      // this is the database that the scores are being read from
      .set("quackyRacesDB")
      // the scores are stored in the users collection
      .collection("users")
      .find({})

      .sort({
        // sorts the scores from largest number to smallest number
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

  // this function generates a random number from 0 - the length of the randomImageArray.
  
  randomImageGenerator: function (app, req, res) {

    // array with all the duck images from the db
    let randomImageArray = ["duck1.jpg", "duck2.jpg", "duck3.jpg", "duck4.jpg", 
    "duck5.jpg", "duck6.jpg", "duck7.jpg", "duck8.jpg", "duck9.jpg", "duck10.jpg", 
    "duck11.jpg", "duck12.jpg", "duck13.jpg", "duck14.jpg", "duck15.jpg", "duck16.jpg", 
    "duck17.jpg", "duck18.jpg", "duck19.jpg", "duck20.jpg", "duck21.jpg", "duck22.jpg", 
    "duck23.jpg", "duck24.jpg", "duck25.jpg", "duck26.jpg", "duck27.jpg", "duck28.jpg", 
    "duck29.jpg", "duck30.jpg", "duck31.jpg", "duck32.jpg", "duck33.jpg", "duck34.jpg", 
    "duck35.jpg", "duck36.jpg"];

    
    let randomImageArrayIndex = Math.floor(Math.random() * randomImageArray.length);
    let frontPageImage = randomImageArray[randomImageArrayIndex];

    // every time the front page is refreshed, a new random duck image is rendered 
    return res.render("index", {
      frontPageImage: frontPageImage,
      user: req.session.user
    })

  }


};