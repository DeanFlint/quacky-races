const express = require("express");
const path = require("path");
const port = 3000;
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
// app.use((req, res, next) => {
//   res.status(404).send("Sorry can't find that!");
//   next();
// });

// trying to display databases
var MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  "mongodb://localhost:27017",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err, client) {
    app.set("quackyRacesDB", client.db("quackyRacesDB"));
  }
);

// finished displaying databases

app.listen(port);

console.log("Express on 3000");

module.exports = app;
