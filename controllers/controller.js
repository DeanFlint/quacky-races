const bcrypt = require("bcrypt");

module.exports = {
  // VIEW ALL DUCKS
  viewAllDucks: function(app, req, res) {
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
          ducks: docs,
          user: req.session.user
        });
      });
  },

  // ACCOUNT MANAGEMENT
  viewUserAccount: function(app, req, res) {
    app
      .set("quackyRacesDB")
      .collection("users")
      .find({ email: req.session.user })
      .toArray(function(err, docs) {
        if (err) {
          console.error(err);
        }
        console.log(docs);
        return res.render("account", {
          user: docs[0]
        });
      });
  },
  logoutUser: function(app, req, res) {
    req.session.user = null;
    res.redirect(302, "/");
  },
  registerUser: async function(app, req, res) {
    try {
      let saltRounds = 8;
      let hash = await bcrypt.hash(req.body.password, saltRounds);
      const db = app.get("quackyRacesDB");
      const users = db.collection("users");
      const dob = req.body.day + req.body.month + req.body.year;
      if (req.body.password != req.body.confirmPassword) throw "Error";
      // add year verification
      await users.createIndex({ email: 1 }, { unique: true });
      await users.insertOne({
        email: req.body.email,
        hash: hash,
        forename: req.body.forename,
        surname: req.body.surname,
        dob: dob,
        isAdmin: false
      });
      user = req.body.email;
      req.session.user = req.body.email;
      res.redirect("/account");
    } catch (err) {
      console.log("Registration error: ", err);
      res.render("register", {
        message: "Unable to register",
        user: ""
      });
    }
  },

  loginUser: async function(app, req, res) {
    try {
      const db = app.set("quackyRacesDB");
      const users = db.collection("users");

      const user = await users.findOne({ email: req.body.email });

      let success = await bcrypt.compare(req.body.password, user.hash);

      if (!success) {
        throw "Incorrect username or password";
      }

      req.session.user = req.body.email;
      res.redirect(302, "/");
    } catch (err) {
      res.render("login", {
        message: "Incorrect Username or Password",
        user: ""
      });
    }
  },

  // GAME MECHANICS
  playGame: async function(app, req, res) {
    try {
      const race1Sel1 = req.body.race1sel1;
      const race1Sel2 = req.body.race1sel2;
      const race1Sel3 = req.body.race1sel3;

      const race2Sel1 = req.body.race2sel1;
      const race2Sel2 = req.body.race2sel2;
      const race2Sel3 = req.body.race2sel3;

      const race3Sel1 = req.body.race3sel1;
      const race3Sel2 = req.body.race3sel2;
      const race3Sel3 = req.body.race3sel3;

      const race4Sel1 = req.body.race4sel1;
      const race4Sel2 = req.body.race4sel2;
      const race4Sel3 = req.body.race4sel3;

      const race5Sel1 = req.body.race5sel1;
      const race5Sel2 = req.body.race5sel2;
      const race5Sel3 = req.body.race5sel3;

      const race6Sel1 = req.body.race6sel1;
      const race6Sel2 = req.body.race6sel2;
      const race6Sel3 = req.body.race6sel3;

      if (
        race1Sel1 == undefined ||
        race1Sel2 == undefined ||
        race1Sel3 == undefined ||
        race2Sel1 == undefined ||
        race2Sel2 == undefined ||
        race2Sel3 == undefined ||
        race3Sel1 == undefined ||
        race3Sel2 == undefined ||
        race3Sel3 == undefined ||
        race4Sel1 == undefined ||
        race4Sel2 == undefined ||
        race4Sel3 == undefined ||
        race5Sel1 == undefined ||
        race5Sel2 == undefined ||
        race5Sel3 == undefined ||
        race6Sel1 == undefined ||
        race6Sel2 == undefined ||
        race6Sel3 == undefined
      ) {
        console.log("Big fat error");
        throw "All selections need to be made";
      }

      if (
        race1Sel1 == race1Sel2 ||
        race1Sel2 == race1Sel3 ||
        race1Sel1 == race1Sel3
      ) {
        throw "Duplicated selections";
      } else if (
        race2Sel1 == race2Sel2 ||
        race2Sel2 == race2Sel3 ||
        race2Sel1 == race2Sel3
      ) {
        throw "Duplicated selections";
      } else if (
        race3Sel1 == race3Sel2 ||
        race3Sel2 == race3Sel3 ||
        race3Sel1 == race3Sel3
      ) {
        throw "Duplicated selections";
      } else if (
        race4Sel1 == race4Sel2 ||
        race4Sel2 == race4Sel3 ||
        race4Sel1 == race4Sel3
      ) {
        throw "Duplicated selections";
      } else if (
        race5Sel1 == race5Sel2 ||
        race5Sel2 == race5Sel3 ||
        race5Sel1 == race5Sel3
      ) {
        throw "Duplicated selections";
      } else if (
        race6Sel1 == race6Sel2 ||
        race6Sel2 == race6Sel3 ||
        race6Sel1 == race6Sel3
      ) {
        throw "Duplicated selections";
      }

      const db = app.get("quackyRacesDB");
      const predictions = db.collection("predictions");
      const prediction1 = [race1Sel1, race1Sel2, race1Sel3];
      const prediction2 = [race2Sel1, race2Sel2, race2Sel3];
      const prediction3 = [race3Sel1, race3Sel2, race3Sel3];
      const prediction4 = [race4Sel1, race4Sel2, race4Sel3];
      const prediction5 = [race5Sel1, race5Sel2, race5Sel3];
      const prediction6 = [race6Sel1, race6Sel2, race6Sel3];

      await predictions.insertOne({
        prediction1: prediction1,
        prediction2: prediction2,
        prediction3: prediction3,
        prediction4: prediction4,
        prediction5: prediction5,
        prediction6: prediction6,
        // round ID
        email: req.session.user
      });

      res.redirect("/account");
    } catch (err) {
      console.log("Play error: ", err);
      res.redirect("/play?err=" + err)
      // res.render("play", {
      //   message: err,
      //   user: req.session.user
      // });
    }
  },
  ducksInPlay: async function(app, req, res){
    try {
      const db = app.get("quackyRacesDB");
      const ducks = await db.collection("ducks").find({}).toArray();

      const duckMap = {}
      ducks.forEach(duck => duckMap[duck.duckID] = duck)
      
      const events = db.collection("events")
      
      const eventResults1 = await events.findOne({raceNum: "race1"});
      const eventResults2 = await events.findOne({raceNum: "race2"});
      const eventResults3 = await events.findOne({raceNum: "race3"});
      const eventResults4 = await events.findOne({raceNum: "race4"});
      const eventResults5 = await events.findOne({raceNum: "race5"});
      const eventResults6 = await events.findOne({raceNum: "race6"});

      const eventName1 = eventResults1.location;
      const eventName2 = eventResults2.location;
      const eventName3 = eventResults3.location;
      const eventName4 = eventResults4.location;
      const eventName5 = eventResults5.location;
      const eventName6 = eventResults6.location;
      
      const racingDucks1 = eventResults1.duckID = eventResults1.duckID.map(id => duckMap[id].duckName)
      const racingDucks2 = eventResults2.duckID = eventResults2.duckID.map(id => duckMap[id].duckName)
      const racingDucks3 = eventResults3.duckID = eventResults3.duckID.map(id => duckMap[id].duckName)
      const racingDucks4 = eventResults4.duckID = eventResults4.duckID.map(id => duckMap[id].duckName)
      const racingDucks5 = eventResults5.duckID = eventResults5.duckID.map(id => duckMap[id].duckName)
      const racingDucks6 = eventResults6.duckID = eventResults6.duckID.map(id => duckMap[id].duckName)

      return res.render("play", {
        eventName1: eventName1,
        eventName2: eventName2,
        eventName3: eventName3,
        eventName4: eventName4,
        eventName5: eventName5,
        eventName6: eventName6, 
        duckNum1: 0,
        duckNum2: 0,
        duckNum3: 0,
        duckNum4: 0,
        duckNum5: 0,
        duckNum6: 0,
        raceNum1: racingDucks1,
        raceNum2: racingDucks2,
        raceNum3: racingDucks3,
        raceNum4: racingDucks4,
        raceNum5: racingDucks5,
        raceNum6: racingDucks6,
        user: req.session.user,
        message: req.query.err
      });

    } catch (err) {
      console.log(err);

    }

  }
};