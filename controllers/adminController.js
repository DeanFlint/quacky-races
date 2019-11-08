module.exports = {
    // admin page
    adminSubmitResults: async function (app, req, res) {
        try {
            const roundID = req.body.roundID;  

            // An array to collect the form selections
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

            // The above is an array that contains arrays so we're using a foreach
            // to target each array then using map for each result to see if 
            // any are undefined. 
            adminAllSelections.forEach(function (adminAllSelection) {
                adminAllSelection.map(raceSelection => {
                    if (raceSelection === undefined) {
                        throw "Please input all results.";
                    }
                });

                // Using a spread operator, we're creating a new array from the 'adminAllSelection'
                // value that's used in the above foreach function. This array will remove any duplicates
                // so we expect the number of values in the array to be 6 otherwise a duplicate selection has
                // been entered.
                // Solution found here: https://appdividend.com/2019/04/11/how-to-get-distinct-values-from-array-in-javascript/
                let uniqueSelections = [...new Set(adminAllSelection)]
                if (uniqueSelections.length !== 6 ) {
                    throw "Duplicate ducks selected";
                }
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
            // for each duck found in 'ducks', push to the duckNames object
            // in the format of { duckID: duckName}.
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

        try {
            const db = app.get('quackyRacesDB')

            // put results from round 1 into an object
            const resultsList = await db
                .collection('results')
                .find({ roundID: "1" })
                .sort({ eventID: 1})
                .toArray()

            let results = {}
            // for each result found in 'results', push to the results object
            // in the format of { eventID: [result1, result2, result2]}.
            resultsList.forEach(result => results[result.eventID] = result.place.slice(0, 3))

            const usersUpdatedScore = await db
                .collection('users')
            // We've called this so we can update each user's new score once
            // it's been calculated.

            const userScores = await db
                .collection('users')
                .find()
                .toArray()

            let usersPreviousScores = {}
            // for each user found in 'users', push to the usersPreviousScores object
            // in the format of { userEmail: score}.
            // This is so we can add the score they get for this current round to 
            // their previous score.
            userScores.forEach(user => usersPreviousScores[user.email] = user.score )

            const predictionsList = await db
                .collection('predictions')
                .find({ roundID: "round1" })
                .toArray()

            predictionsList.forEach(prediction => {

                let score = 0;
                let predictionsArrayPerUser = []
                let resultIndexArray = [0, 0, 0, 0, 0, 0];
                // we're using this as an index count 
                // so we can target each of the three predictions
                // per event

                predictionsArrayPerUser.push(
                    prediction.email, 
                    prediction.prediction1,
                    prediction.prediction2,
                    prediction.prediction3,
                    prediction.prediction4,
                    prediction.prediction5,
                    prediction.prediction6
                )
                // we're creating a new array that will have the user's email (so we
                // can identify who the updated score belongs to) with all of thier
                // predictions for this current round.

                // The first item in the array will be the prediction for the first event
                // If the first prediction in event1 matches the first result in event 1,
                // we add 2 points to the score. The first item in resultsIndexArray then increments
                // by 1, so next time the loop hits this if statement, we'll be comparing the
                // userPrediction to the next item in the results array for event 1.
                predictionsArrayPerUser[1].forEach(userPrediction => {
                    if( userPrediction === results.event1[resultIndexArray[0]] ){
                        score += 2;
                    }
                    resultIndexArray[0]++
                })

                predictionsArrayPerUser[2].forEach(userPrediction => {
                    if( userPrediction === results.event2[resultIndexArray[1]] ){
                        score += 2;
                    }
                    resultIndexArray[1]++
                })

                predictionsArrayPerUser[3].forEach(userPrediction => {
                    if( userPrediction === results.event3[resultIndexArray[2]] ){
                        score += 2;
                    }
                    resultIndexArray[2]++
                })

                predictionsArrayPerUser[4].forEach(userPrediction => {
                    if( userPrediction === results.event4[resultIndexArray[3]] ){
                        score += 2;
                    }
                    resultIndexArray[3]++
                })

                predictionsArrayPerUser[5].forEach(userPrediction => {
                    if( userPrediction === results.event5[resultIndexArray[4]] ){
                        score += 2;
                    }
                    resultIndexArray[4]++
                })

                predictionsArrayPerUser[6].forEach(userPrediction => {
                    if( userPrediction === results.event6[resultIndexArray[5]] ){
                        score += 2;
                    }
                    resultIndexArray[5]++
                })

                // Now that the score for this round has been calculated for the user,
                // we're adding it to the previous score that we stored in the usersPreviousScores
                // array. 
                let newScore = usersPreviousScores[prediction.email] + score;
                usersPreviousScores[prediction.email] = newScore;

                // We can now update this score using the usersUpdatedScore variable we initiated above
                // using the user's email address as an identifier.
                usersUpdatedScore.updateOne(
                    { email: prediction.email}, // Filter
                    {$set: {score: newScore}} // Update
                )
            });   

            res.redirect("/leaderboard");

        } catch (err) {
            console.log(err);
        }
    }
};
