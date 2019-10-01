const MongoClient = require('mongodb').MongoClient;

const express = require("express"); // middleware
const path = require("path"); // to define folder structure
const app = express(); // assign express to 'app'
const port = 3000; // to help us change port number easily

const url = "mongodb://localhost:27017"; // assigning DB to a port on localhost
const quackyDB = "quackyRacesDB"; // our DB name

const session = require('express-session');


const router = express.Router();



const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.static("./public")); // serve files from this folder



app.set("views", path.join(__dirname, "views")); // ejs files to be served 
app.set("view engine", "ejs");

app.use((req, res, next) => {
  console.dir(req.url);
  next();
});

app.use(session({
  secret: 'QU4CK',
  resave: false,
  saveUninitialized: true
}))

app.use(express.urlencoded()) // to post urlencoded data (which means converting reserved, unsafe and ASCII characters)

// app.use("/", routes(app));

// remove for sample files
// app.use((req, res, next) => {
//   res.status(404).send("Sorry can't find that!");
//   next();
// });

app.get("/", (req, res) => {
  res.render('index', {
    user: req.session.user // included in page to assign cookie to a user to access data
  });
});

app.get("/play", (req, res) => {
  res.render('play', {
    user: req.session.user // included in page to assign cookie to a user to access data
  });
});

app.get("/predictions", (req, res) => {
  res.render('predictions', {
    user: req.session.user // included in page to assign cookie to a user to access data
  });
});

app.get("/results", (req, res) => {
  res.render('results', {
    user: req.session.user // included in page to assign cookie to a user to access data
  });
});

app.get("/leaderboard", (req, res) => {
  res.render('leaderboard', {
    user: req.session.user // included in page to assign cookie to a user to access data
  });
});

app.get("/register", (req, res) => {
  res.render('register', {
    user: req.session.user // included in page to assign cookie to a user to access data
  });
});

app.get("/account", (req, res) => {
  res.render('account', {
    user: req.session.user // included in page to assign cookie to a user to access data
  });
});

app.get("/login", (req, res) => {
  res.render('login', {
    user: req.session.user // included in page to assign cookie to a user to access data
  });
});

app.get("/profiles", (req, res) => {
  app
    .set("quackyRacesDB")
    .collection("ducks")
    .find({})
    .sort({ duckID: 1 })
    .sort({ duckName: 1 })
    .toArray( function(docs) {
      return res.render('profiles', {
        ducks: docs,
        user: req.session.user
      })
    })
});

client.connect(() => {
  app.listen(port, () => console.log(`App listening on port ${port}!`))
})

console.log("Express on 3000");

module.exports = app;
