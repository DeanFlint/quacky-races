const bcrypt = require("bcrypt");

module.exports = {

    // GAME MECHANICS
    playGame: async function (app, req, res) {
        try {
            const allSelections = [
                [
                    req.body.race1sel1,
                    req.body.race1sel2,
                    req.body.race1sel3
                ],
                [
                    req.body.race2sel1,
                    req.body.race2sel2,
                    req.body.race2sel3
                ],
                [
                    req.body.race3sel1,
                    req.body.race3sel2,
                    req.body.race3sel3
                ],
                [
                    req.body.race4sel1,
                    req.body.race4sel2,
                    req.body.race4sel3
                ],
                [
                    req.body.race5sel1,
                    req.body.race5sel2,
                    req.body.race5sel3
                ],
                [
                    req.body.race6sel1,
                    req.body.race6sel2,
                    req.body.race6sel3
                ]
            ]
            
            allSelections.forEach(function (adminAllSelection) {
                adminAllSelection.map(raceSelection => {
                    if (raceSelection === undefined) {
                        throw "Please input all results.";
                    }
                });

                if (adminAllSelection[0] === adminAllSelection[1] ||
                    adminAllSelection[0] === adminAllSelection[2] ||
                    adminAllSelection[1] === adminAllSelection[2]) {
                        throw "Duplicated selections entered for one or more races."
                }
            });

            const db = app.get("quackyRacesDB");
            const predictions = db.collection("predictions");

            await predictions.insertOne({
                prediction1: allSelections[0],
                prediction2: allSelections[1],
                prediction3: allSelections[2],
                prediction4: allSelections[3],
                prediction5: allSelections[4],
                prediction6: allSelections[5],
                // round ID
                email: req.session.user
            });

            res.redirect("/account");
        } catch (err) {
            console.log("Play error: ", err);
            res.redirect("/play?err=" + err);
        }
    },

    ducksInPlay: async function (app, req, res) {
        try {
            const db = app.get("quackyRacesDB");

            const ducks = await db
                .collection("ducks")
                .find({})
                .toArray();

            const duckNames = {}
            ducks.forEach(duck => duckNames[duck.duckID] = duck.duckName)

            const events = await db
                .collection('events')
                .find({ roundID: "round1" })
                .sort({ eventID: 1 })
                .toArray();

            const eventDetails = {}
            events.forEach(event => eventDetails[event.eventID] = event.location)

            return res.render("play", {
                duckNames: duckNames,
                events: events,
                user: req.session.user,
                message: req.query.err
            });
        } catch (err) {
            console.log(err);
        }
    },

};