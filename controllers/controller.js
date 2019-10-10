const bcrypt = require("bcrypt");

module.exports = {
  // VIEW ALL DUCKS PROFILES
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

      var currentYear = new Date();
      var year = currentYear.getFullYear();
      if (year - req.body.year < 18) throw "Error";

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

      const allSelections = [
        race1Sel1,
        race1Sel2,
        race1Sel3,
        race2Sel1,
        race2Sel2,
        race2Sel3,
        race3Sel1,
        race3Sel2,
        race3Sel3,
        race4Sel1,
        race4Sel2,
        race4Sel3,
        race5Sel1,
        race5Sel2,
        race5Sel3,
        race6Sel1,
        race6Sel2,
        race6Sel3
      ];

      allSelections.map(raceSelection => {
        if (raceSelection === undefined) {
          throw "All selections need to be made";
        }
      });

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
      res.redirect("/play?err=" + err);
    }
  },

  ducksInPlay: async function(app, req, res) {
    try {
      const db = app.get("quackyRacesDB");

      const ducks = await db
        .collection("ducks")
        .find({})
        .toArray();

      const duckMap = {};
      ducks.forEach(duck => (duckMap[duck.duckID] = duck));

      const events = db.collection("events");

      const eventResults1 = await events.findOne({ raceNum: "race1" });
      const eventResults2 = await events.findOne({ raceNum: "race2" });
      const eventResults3 = await events.findOne({ raceNum: "race3" });
      const eventResults4 = await events.findOne({ raceNum: "race4" });
      const eventResults5 = await events.findOne({ raceNum: "race5" });
      const eventResults6 = await events.findOne({ raceNum: "race6" });

      const eventName1 = eventResults1.location;
      const eventName2 = eventResults2.location;
      const eventName3 = eventResults3.location;
      const eventName4 = eventResults4.location;
      const eventName5 = eventResults5.location;
      const eventName6 = eventResults6.location;

      const racingDucks1 = (eventResults1.duckID = eventResults1.duckID.map(
        id => duckMap[id].duckName
      ));
      const racingDucks2 = (eventResults2.dxuckID = eventResults2.duckID.map(
        id => duckMap[id].duckName
      ));
      const racingDucks3 = (eventResults3.duckID = eventResults3.duckID.map(
        id => duckMap[id].duckName
      ));
      const racingDucks4 = (eventResults4.duckID = eventResults4.duckID.map(
        id => duckMap[id].duckName
      ));
      const racingDucks5 = (eventResults5.duckID = eventResults5.duckID.map(
        id => duckMap[id].duckName
      ));
      const racingDucks6 = (eventResults6.duckID = eventResults6.duckID.map(
        id => duckMap[id].duckName
      ));

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
  },

  // admin page
  adminSubmitResults: async function(app, req, res) {
    try {
      const adminrace1Sel1 = req.body.adminrace1sel1;
      const adminrace1Sel2 = req.body.adminrace1sel2;
      const adminrace1Sel3 = req.body.adminrace1sel3;
      const adminrace1Sel4 = req.body.adminrace1sel4;
      const adminrace1Sel5 = req.body.adminrace1sel5;
      const adminrace1Sel6 = req.body.adminrace1sel6;

      const adminrace2Sel1 = req.body.adminrace2sel1;
      const adminrace2Sel2 = req.body.adminrace2sel2;
      const adminrace2Sel3 = req.body.adminrace2sel3;
      const adminrace2Sel4 = req.body.adminrace2sel4;
      const adminrace2Sel5 = req.body.adminrace2sel5;
      const adminrace2Sel6 = req.body.adminrace2sel6;

      const adminrace3Sel1 = req.body.adminrace3sel1;
      const adminrace3Sel2 = req.body.adminrace3sel2;
      const adminrace3Sel3 = req.body.adminrace3sel3;
      const adminrace3Sel4 = req.body.adminrace3sel4;
      const adminrace3Sel5 = req.body.adminrace3sel5;
      const adminrace3Sel6 = req.body.adminrace3sel6;

      const adminrace4Sel1 = req.body.adminrace4sel1;
      const adminrace4Sel2 = req.body.adminrace4sel2;
      const adminrace4Sel3 = req.body.adminrace4sel3;
      const adminrace4Sel4 = req.body.adminrace4sel4;
      const adminrace4Sel5 = req.body.adminrace4sel5;
      const adminrace4Sel6 = req.body.adminrace4sel6;

      const adminrace5Sel1 = req.body.adminrace5sel1;
      const adminrace5Sel2 = req.body.adminrace5sel2;
      const adminrace5Sel3 = req.body.adminrace5sel3;
      const adminrace5Sel4 = req.body.adminrace5sel4;
      const adminrace5Sel5 = req.body.adminrace5sel5;
      const adminrace5Sel6 = req.body.adminrace5sel6;

      const adminrace6Sel1 = req.body.adminrace6sel1;
      const adminrace6Sel2 = req.body.adminrace6sel2;
      const adminrace6Sel3 = req.body.adminrace6sel3;
      const adminrace6Sel4 = req.body.adminrace6sel4;
      const adminrace6Sel5 = req.body.adminrace6sel5;
      const adminrace6Sel6 = req.body.adminrace6sel6;

      const adminAllSelections = [
        [
          adminrace1Sel1,
          adminrace1Sel2,
          adminrace1Sel3,
          adminrace1Sel4,
          adminrace1Sel5,
          adminrace1Sel6
        ],
        [
          adminrace2Sel1,
          adminrace2Sel2,
          adminrace2Sel3,
          adminrace2Sel4,
          adminrace2Sel5,
          adminrace2Sel6
        ],
        [
          adminrace3Sel1,
          adminrace3Sel2,
          adminrace3Sel3,
          adminrace3Sel4,
          adminrace3Sel5,
          adminrace3Sel6
        ],
        [
          adminrace4Sel1,
          adminrace4Sel2,
          adminrace4Sel3,
          adminrace4Sel4,
          adminrace4Sel5,
          adminrace4Sel6
        ],
        [
          adminrace5Sel1,
          adminrace5Sel2,
          adminrace5Sel3,
          adminrace5Sel4,
          adminrace5Sel5,
          adminrace5Sel6
        ],
        [
          adminrace6Sel1,
          adminrace6Sel2,
          adminrace6Sel3,
          adminrace6Sel4,
          adminrace6Sel5,
          adminrace6Sel6
        ]
      ];

      adminAllSelections.forEach(function(adminAllSelection) {
        adminAllSelection.map(raceSelection => {
          if (raceSelection === undefined) {
            throw "Please input all results.";
          }
          // duplicate validation
        });
      });

      const db = app.get("quackyRacesDB");
      const results = db.collection("results");

      await results.insertOne({
        resultID: "result1",
        eventID: "event1",
        place: adminAllSelections[0]
      }),
        await results.insertOne({
          resultID: "result2",
          eventID: "event2",
          place: adminAllSelections[1]
        }),
        await results.insertOne({
          resultID: "result3",
          eventID: "event3",
          place: adminAllSelections[2]
        }),
        await results.insertOne({
          resultID: "result4",
          eventID: "event4",
          place: adminAllSelections[3]
        }),
        await results.insertOne({
          resultID: "result5",
          eventID: "event5",
          place: adminAllSelections[4]
        }),
        await results.insertOne({
          resultID: "result6",
          eventID: "event6",
          place: adminAllSelections[5]
        }),
        // round ID

        res.redirect("/admin");
    } catch (err) {
      console.log("Admin error: ", err);
      res.redirect("/admin?err=" + err);
    }
  },

  adminducksInPlay: async function(app, req, res) {
    try {
      const db = app.get("quackyRacesDB");
      const ducks = await db
        .collection("ducks")
        .find({})
        .toArray();

      const duckMap = {};
      ducks.forEach(duck => (duckMap[duck.duckID] = duck));

      const events = db.collection("events");

      const eventResults1 = await events.findOne({ raceNum: "race1" });
      const eventResults2 = await events.findOne({ raceNum: "race2" });
      const eventResults3 = await events.findOne({ raceNum: "race3" });
      const eventResults4 = await events.findOne({ raceNum: "race4" });
      const eventResults5 = await events.findOne({ raceNum: "race5" });
      const eventResults6 = await events.findOne({ raceNum: "race6" });

      const eventName1 = eventResults1.location;
      const eventName2 = eventResults2.location;
      const eventName3 = eventResults3.location;
      const eventName4 = eventResults4.location;
      const eventName5 = eventResults5.location;
      const eventName6 = eventResults6.location;

      const racingDucks1 = (eventResults1.duckID = eventResults1.duckID.map(
        id => duckMap[id].duckName
      ));
      const racingDucks2 = (eventResults2.duckID = eventResults2.duckID.map(
        id => duckMap[id].duckName
      ));
      const racingDucks3 = (eventResults3.duckID = eventResults3.duckID.map(
        id => duckMap[id].duckName
      ));
      const racingDucks4 = (eventResults4.duckID = eventResults4.duckID.map(
        id => duckMap[id].duckName
      ));
      const racingDucks5 = (eventResults5.duckID = eventResults5.duckID.map(
        id => duckMap[id].duckName
      ));
      const racingDucks6 = (eventResults6.duckID = eventResults6.duckID.map(
        id => duckMap[id].duckName
      ));

      return res.render("admin", {
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
  },
  resultsducksInPlay: async function(app, req, res) {
    try {
      const db = app.get("quackyRacesDB");
      const ducks = await db
        .collection("ducks")
        .find({})
        .toArray();

      const duckMap = {};
      ducks.forEach(duck => (duckMap[duck.duckID] = duck));

      const events = db.collection("events");

      const eventResults1 = await events.findOne({ raceNum: "race1" });
      const eventResults2 = await events.findOne({ raceNum: "race2" });
      const eventResults3 = await events.findOne({ raceNum: "race3" });
      const eventResults4 = await events.findOne({ raceNum: "race4" });
      const eventResults5 = await events.findOne({ raceNum: "race5" });
      const eventResults6 = await events.findOne({ raceNum: "race6" });

      const eventName1 = eventResults1.location;
      const eventName2 = eventResults2.location;
      const eventName3 = eventResults3.location;
      const eventName4 = eventResults4.location;
      const eventName5 = eventResults5.location;
      const eventName6 = eventResults6.location;

      const racingDucks1 = (eventResults1.duckID = eventResults1.duckID.map(
        id => duckMap[id].duckName
      ));
      const racingDucks2 = (eventResults2.duckID = eventResults2.duckID.map(
        id => duckMap[id].duckName
      ));
      const racingDucks3 = (eventResults3.duckID = eventResults3.duckID.map(
        id => duckMap[id].duckName
      ));
      const racingDucks4 = (eventResults4.duckID = eventResults4.duckID.map(
        id => duckMap[id].duckName
      ));
      const racingDucks5 = (eventResults5.duckID = eventResults5.duckID.map(
        id => duckMap[id].duckName
      ));
      const racingDucks6 = (eventResults6.duckID = eventResults6.duckID.map(
        id => duckMap[id].duckName
      ));

      return res.render("results", {
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
