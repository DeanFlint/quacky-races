module.exports = {

    // GAME MECHANICS
    playGame: async function (app, req, res) {
        try {
            const db = app.get('quackyRacesDB')

            // An array to collect the form selections
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

            // The above is an array that contains arrays so we're using a foreach
            // to target each array then using map for each result to the see if 
            // any are undefined. 
            allSelections.forEach(function (adminAllSelection) {
                adminAllSelection.map(raceSelection => {
                    if (raceSelection === undefined) {
                        throw "Please input all results.";
                    }
                });

                // We also want to make sure that the user hasn't selected the 
                // the same duck for more than one of their selections
                if (adminAllSelection[0] === adminAllSelection[1] ||
                    adminAllSelection[0] === adminAllSelection[2] ||
                    adminAllSelection[1] === adminAllSelection[2]) {
                        throw "Duplicated selections entered for one or more races."
                }
            });

            const predictions = db.collection("predictions");

            // If the form validations pass, insert the selections into the
            // db. 
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

                // if the form fails validation, reload the page
                // and show the throw error we've used in the code above.
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
            // for each duck found in 'ducks', push to the duckNames object
            // in the format of { duckID: duckName}.
            ducks.forEach(duck => duckNames[duck.duckID] = duck.duckName)

            const events = await db
                .collection('events')
                .find({ roundID: "round1" })
                .sort({ eventID: 1 })
                .toArray();

            const eventDetails = {}
            // for each event found in 'events', push to the eventDetails object
            // in the format of { eventID: event.location}.
            events.forEach(event => eventDetails[event.eventID] = event.location)

            // Here, we're looking at the current session to get the user details
            // We want to check if this user has predictions for the current round.
            let predictionsForUser = await db
                .collection('predictions')
                .find({ roundID: "round1", email: req.session.user})
                .toArray()

            let userPrediction = {};
            
            // This if statement will check to see if the current user has entered
            // their predictions in the current round.
            if (predictionsForUser[0]) {
                // The code below will be pushing to the empty object above 

                // Predictions for user will return an object with 6 arrays (which will
                // include the user's three predictions per event). Below, we're looping 
                // through each prediction and adding the number to a string of the image url
                // that will show the number of the duck. 
                userPrediction.images1 = predictionsForUser[0].prediction1.map(duck => {
                    duck = events[0].duckID.indexOf(duck) + 1
                    duckImage = "images/number" + duck.toString() + ".png"
                    return duckImage
                })

                userPrediction.images2 = predictionsForUser[0].prediction2.map(duck => {
                    duck = events[1].duckID.indexOf(duck) + 1
                    duckImage = "images/number" + duck.toString() + ".png"
                    return duckImage
                })

                userPrediction.images3 = predictionsForUser[0].prediction3.map(duck => {
                    duck = events[2].duckID.indexOf(duck) + 1
                    duckImage = "images/number" + duck.toString() + ".png"
                    return duckImage
                })

                userPrediction.images4 = predictionsForUser[0].prediction4.map(duck => {
                    duck = events[3].duckID.indexOf(duck) + 1
                    duckImage = "images/number" + duck.toString() + ".png"
                    return duckImage
                })

                userPrediction.images5 = predictionsForUser[0].prediction5.map(duck => {
                    duck = events[4].duckID.indexOf(duck) + 1
                    duckImage = "images/number" + duck.toString() + ".png"
                    return duckImage
                })

                userPrediction.images6 = predictionsForUser[0].prediction6.map(duck => {
                    duck = events[5].duckID.indexOf(duck) + 1
                    duckImage = "images/number" + duck.toString() + ".png"
                    return duckImage
                })

                // finally, we're added a new property to show if the user has
                // played in the current round. We can then use this on the play page
                // by showing their predictions userPrediction.hasAlreadyPlayed == true
                // or showing the prediction form if userPrediction.hasAlreadyPlayed == false.
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