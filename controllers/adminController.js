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

        try {

            const db = app.get('quackyRacesDB')

            // get results into an object
            const resultsList = await db
                .collection('results')
                .find({ roundID: "1" })
                .sort({ eventID: 1})
                .toArray()

            console.log(resultsList)

            let results = {}
            resultsList.forEach(result => results[result.eventID] = result.place.slice(0, 3))

            const userTest = await db
                .collection('users')

            const userList = await db
                .collection('users')
                .find()
                .toArray()

            let users = {}
            userList.forEach(user => users[user.email] = user.score )

            console.log("users before")
            console.log(users)

            const predictionsList = await db
                .collection('predictions')
                .find({ roundID: "round1" })
                // .sort({ eventID: 1})
                .toArray()

            predictionsList.forEach(prediction => {

                let score = 0;
                let predictionsArrayPerUser = []
                let resultIndexArray = [0, 0, 0, 0, 0, 0];

                predictionsArrayPerUser.push(
                    prediction.email, 
                    prediction.prediction1,
                    prediction.prediction2,
                    prediction.prediction3,
                    prediction.prediction4,
                    prediction.prediction5,
                    prediction.prediction6
                )

                console.log("USER is " + prediction.email)
                console.log(" ")
                console.log("Race 1")
                predictionsArrayPerUser[1].forEach(userPrediction => {
                    console.log("userPrediction = " + userPrediction + " AND " + "Actual Result" + " = " + results.event1[resultIndexArray[0]])
                    // console.log(resultIndexArray + " resultIndexArray")
                    if( userPrediction === results.event1[resultIndexArray[0]] ){
                        score += 2;
                        console.log("2 added to score")
                    }
                    resultIndexArray[0]++
                })

                console.log(" ")
                console.log("Race 2")
                predictionsArrayPerUser[2].forEach(userPrediction => {
                    console.log("userPrediction = " + userPrediction + " AND " + "Actual Result" + " = " + results.event2[resultIndexArray[1]])
                    // console.log(resultIndexArray + " resultIndexArray")
                    if( userPrediction === results.event2[resultIndexArray[1]] ){
                        score += 2;
                        console.log("2 added to score")
                    }
                    resultIndexArray[1]++
                })

                console.log(" ")
                console.log("Race 3")
                predictionsArrayPerUser[3].forEach(userPrediction => {
                    console.log("userPrediction = " + userPrediction + " AND " + "Actual Result" + " = " + results.event3[resultIndexArray[2]])
                    // console.log(resultIndexArray + " resultIndexArray")
                    if( userPrediction === results.event3[resultIndexArray[2]] ){
                        score += 2;
                        console.log("2 added to score")
                    }
                    resultIndexArray[2]++
                })

                console.log(" ")
                console.log("Race 4")
                predictionsArrayPerUser[4].forEach(userPrediction => {
                    console.log("userPrediction = " + userPrediction + " AND " + "Actual Result" + " = " + results.event4[resultIndexArray[3]])
                    // console.log(resultIndexArray + " resultIndexArray")
                    if( userPrediction === results.event4[resultIndexArray[3]] ){
                        score += 2;
                        console.log("2 added to score")
                    }
                    resultIndexArray[3]++
                })

                console.log(" ")
                console.log("Race 5")
                predictionsArrayPerUser[5].forEach(userPrediction => {
                    console.log("userPrediction = " + userPrediction + " AND " + "Actual Result" + " = " + results.event5[resultIndexArray[4]])
                    // console.log(resultIndexArray + " resultIndexArray")
                    if( userPrediction === results.event5[resultIndexArray[4]] ){
                        score += 2;
                        console.log("2 added to score")
                    }
                    resultIndexArray[4]++
                })

                console.log(" ")
                console.log("Race 6")
                predictionsArrayPerUser[6].forEach(userPrediction => {
                    console.log("userPrediction = " + userPrediction + " AND " + "Actual Result" + " = " + results.event6[resultIndexArray[5]])
                    // console.log(resultIndexArray + " resultIndexArray")
                    if( userPrediction === results.event6[resultIndexArray[5]] ){
                        score += 2;
                        console.log("2 added to score")
                    }
                    resultIndexArray[5]++
                })

                console.log(" ")
                console.log("Final Score for " + prediction.email + " is " + score);
                console.log(" ")
                console.log(" ")
                
                console.log(users[prediction.email])

                // let currentUser = users.updateOne(
                //     filter({email: prediction.email}),
                //     update({score: "12"})
                // )

                // let currentUser = users.find({ "email": prediction.email });

                // let currentUser = users.find( ({ email }) => email === prediction.email );
                // console.log(currentUser)
                
                // console.log(score)
                let newScore = users[prediction.email] + score;
                users[prediction.email] = newScore;

                console.log("users after")
                console.log(users)

                userTest.updateOne(
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
