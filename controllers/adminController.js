const bcrypt = require("bcrypt");

module.exports = {
    // admin page
    adminSubmitResults: async function (app, req, res) {
        try {
            const roundID = req.body.roundID;  

            const adminAllSelections = [
                [
                    req.body.adminrace1sel1,
                    req.body.adminrace1sel2,
                    req.body.adminrace1sel3,
                    req.body.adminrace1sel4,
                    req.body.adminrace1sel5,
                    req.body.adminrace1sel6
                ],
                [
                    req.body.adminrace2sel1,
                    req.body.adminrace2sel2,
                    req.body.adminrace2sel3,
                    req.body.adminrace2sel4,
                    req.body.adminrace2sel5,
                    req.body.adminrace2sel6
                ],
                [
                    req.body.adminrace3sel1,
                    req.body.adminrace3sel2,
                    req.body.adminrace3sel3,
                    req.body.adminrace3sel4,
                    req.body.adminrace3sel5,
                    req.body.adminrace3sel6
                ],
                [
                    req.body.adminrace4sel1,
                    req.body.adminrace4sel2,
                    req.body.adminrace4sel3,
                    req.body.adminrace4sel4,
                    req.body.adminrace4sel5,
                    req.body.adminrace4sel6
                ],
                [
                    req.body.adminrace5sel1,
                    req.body.adminrace5sel2,
                    req.body.adminrace5sel3,
                    req.body.adminrace5sel4,
                    req.body.adminrace5sel5,
                    req.body.adminrace5sel6
                ],
                [
                    req.body.adminrace6sel1,
                    req.body.adminrace6sel2,
                    req.body.adminrace6sel3,
                    req.body.adminrace6sel4,
                    req.body.adminrace6sel5,
                    req.body.adminrace6sel6
                ]
            ];

            adminAllSelections.forEach(function (adminAllSelection) {
                adminAllSelection.map(raceSelection => {
                    if (raceSelection === undefined) {
                        throw "Please input all results.";
                    }
                    // TODO: duplicate validation
                });
            });

            const db = app.get("quackyRacesDB");
            const results = db.collection("results");

            await results.insertOne({
                    eventID: "event1",
                    roundID: roundID,
                    place: adminAllSelections[0]
                }),
                await results.insertOne({
                    eventID: "event2",
                    roundID: roundID,
                    place: adminAllSelections[1]
                }),
                await results.insertOne({
                    eventID: "event3",
                    roundID: roundID,
                    place: adminAllSelections[2]
                }),
                await results.insertOne({
                    eventID: "event4",
                    roundID: roundID,
                    place: adminAllSelections[3]
                }),
                await results.insertOne({
                    eventID: "event5",
                    roundID: roundID,
                    place: adminAllSelections[4]
                }),
                await results.insertOne({
                    eventID: "event6",
                    roundID: roundID,
                    place: adminAllSelections[5]
                }),
                // round ID

                message = "Results submitted!"

                res.redirect("/admin");
        } catch (err) {
            console.log("Admin error: ", err);
            res.redirect("/admin?err=" + err);
        }
    },

    adminducksInPlay: async function (app, req, res) {
        try {
            const db = app.get('quackyRacesDB')

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
                .toArray()

            return res.render("admin", {
                duckNames: duckNames,
                events: events,
                user: req.session.user,
                message: req.query.err
            });
        } catch (err) {
            console.log(err);
        }

    },

    calculateScores: async function (app, req, res) {
        // for each prediction object, add the results for each race in the object
        // compare the results and predictions for each race to calculate score
        // get existing from user, add this week's score onto it and add back into the user db
        try {

            const db = app.get('quackyRacesDB')

            // get results into an object
            const resultsList = await db
                .collection('results')
                .find({ roundID: "1" })
                .sort({ eventID: 1})
                .toArray()

            let results = {}
            resultsList.forEach(result => results[result.eventID] = result.place.slice(0, 3))

            const predictionsList = await db
                .collection('predictions')
                .find()
                // .sort({ eventID: 1})
                .toArray()

            // get predictions using roundID into an object
            let userScores = {}

            // predictionsList.forEach(prediction => allPredictions[prediction.email] = prediction)
            // console.log(allPredictions)

            predictionsList.forEach(prediction => {
                let score = 0;
                
                console.log(prediction.prediction1[0])
                console.log(resultsList.event1[0])

                // if(prediction.prediction1[0] === results[0][0]) {
                //     score += 2;
                // }

                // if(prediction.prediction1[1] === results[0][1]) {
                //     score += 2;
                // }
                // if(prediction.prediction1[2] === results[0][2]) {
                //     score += 2;
                // }

                console.log(score)
                return score
            });            
            
            console.log(results)
            // console.log(predictions)
            res.redirect("/leaderboard");
        } catch (err) {
            console.log(err);
        }
    }
};
