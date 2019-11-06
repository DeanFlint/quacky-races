module.exports = {

    // GAME MECHANICS
    playGame: async function (app, req, res) {
        try {
            const db = app.get('quackyRacesDB')

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

            const predictions = db.collection("predictions");

            await predictions.insertOne({
                email: req.session.user,
                roundID: "round1",
                prediction1: allSelections[0],
                prediction2: allSelections[1],
                prediction3: allSelections[2],
                prediction4: allSelections[3],
                prediction5: allSelections[4],
                prediction6: allSelections[5],
                hasAlreadyPlayed: predictions.roundID
            });

            res.redirect("/play");

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

            let predictionsForUser = await db
                .collection('predictions')
                .find({ roundID: "round1", email: req.session.user})
                .toArray()

            let userPrediction = {};

            console.log(predictionsForUser)
            
            if (predictionsForUser[0]) {
                userPrediction.images1 = predictionsForUser[0].prediction1.map(duck => {
                    duck = events[0].duckID.indexOf(duck) + 1
                    duckImage = "images/number" + duck.toString() + ".png"
                    return duckImage
                })
                
                userPrediction.prediction1 = predictionsForUser[0].prediction1.map(duck => {
                    duck = events[0].duckID.indexOf(duck) + 1
                    return duck
                })

                userPrediction.images2 = predictionsForUser[0].prediction2.map(duck => {
                    duck = events[1].duckID.indexOf(duck) + 1
                    duckImage = "images/number" + duck.toString() + ".png"
                    return duckImage
                })

                userPrediction.prediction2 = predictionsForUser[0].prediction2.map(duck => {
                    duck = events[1].duckID.indexOf(duck) + 1
                    return duck
                })

                userPrediction.images3 = predictionsForUser[0].prediction3.map(duck => {
                    duck = events[2].duckID.indexOf(duck) + 1
                    duckImage = "images/number" + duck.toString() + ".png"
                    return duckImage
                })

                userPrediction.prediction3 = predictionsForUser[0].prediction3.map(duck => {
                    duck = events[2].duckID.indexOf(duck) + 1
                    return duck
                })

                userPrediction.images4 = predictionsForUser[0].prediction4.map(duck => {
                    duck = events[3].duckID.indexOf(duck) + 1
                    duckImage = "images/number" + duck.toString() + ".png"
                    return duckImage
                })

                userPrediction.prediction4 = predictionsForUser[0].prediction4.map(duck => {
                    duck = events[3].duckID.indexOf(duck) + 1
                    return duck
                })

                userPrediction.images5 = predictionsForUser[0].prediction5.map(duck => {
                    duck = events[4].duckID.indexOf(duck) + 1
                    duckImage = "images/number" + duck.toString() + ".png"
                    return duckImage
                })

                userPrediction.prediction5 = predictionsForUser[0].prediction5.map(duck => {
                    duck = events[4].duckID.indexOf(duck) + 1
                    return duck
                })

                userPrediction.images6 = predictionsForUser[0].prediction6.map(duck => {
                    duck = events[5].duckID.indexOf(duck) + 1
                    duckImage = "images/number" + duck.toString() + ".png"
                    return duckImage
                })

                userPrediction.prediction6 = predictionsForUser[0].prediction6.map(duck => {
                    duck = events[5].duckID.indexOf(duck) + 1
                    return duck
                })

                userPrediction.hasAlreadyPlayed = true

            } else {
                userPrediction.hasAlreadyPlayed = false
            }       

            return res.render("play", {
                duckNames: duckNames,
                events: events,
                user: req.session.user,
                message: req.query.err,
                predictions: userPrediction
            });
        } catch (err) {
            console.log(err);
        }
    },

};