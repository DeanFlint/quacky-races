// const express = require("express");
// const router = express.Router();
// const quackyDB = "quackyRacesDB"; // our DB name




// module.exports = app => {
//   app.get("/", (req, res) => {
//     res.render('index', {
//       user: req.session.user // included in page to assign cookie to a user to access data
//     });
//   });

//   app.get("/play", (req, res) => {
//     res.render('play', {
//       user: req.session.user // included in page to assign cookie to a user to access data
//     });
//   });

//   app.get("/predictions", (req, res) => {
//     res.render('predictions', {
//       user: req.session.user // included in page to assign cookie to a user to access data
//     });
//   });

//   app.get("/results", (req, res) => {
//     res.render('results', {
//       user: req.session.user // included in page to assign cookie to a user to access data
//     });
//   });

//   app.get("/leaderboard", (req, res) => {
//     res.render('leaderboard', {
//       user: req.session.user // included in page to assign cookie to a user to access data
//     });
//   });

//   app.get("/register", (req, res) => {
//     res.render('register', {
//       user: req.session.user // included in page to assign cookie to a user to access data
//     });
//   });

//   app.get("/account", (req, res) => {
//     res.render('account', {
//       user: req.session.user // included in page to assign cookie to a user to access data
//     });
//   });

//   app.get("/login", (req, res) => {
//     res.render('login', {
//       user: req.session.user // included in page to assign cookie to a user to access data
//     });
//   });


//   app.get('/api/profiles', async (req, res) => {
//     try {
//       const db = client.db(quackyDB);
//       const ducks = await db.collection("ducks")
//         .find({})
//         .sort({ duckID: 1 })
//         .sort({ duckName: 1 })
//         .toArray()

//         res.json(ducks.map(ducks => ducks))
        
//         // .toArray( function(docs) {
//         //   return res.render("profiles", {
//         //     ducks: docs
//         //   })
//         // })
//     } catch(err) {
//       res.render('/profiles', {
//         message: "Failed to list ducks"
//       })
//     }
//   })

//   app.get("/profiles", (req, res) => {
//     res.render('profiles', {
//       user: req.session.user // included in page to assign cookie to a user to access data
//     });
//   });



//   return router;
// };
