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
  }
};