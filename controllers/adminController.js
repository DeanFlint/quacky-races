const bcrypt = require("bcrypt");

module.exports = {
    // admin page
    adminSubmitResults: async function (app, req, res) {
        try {
            const roundID = req.body.roundID;

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

            adminAllSelections.forEach(function (adminAllSelection) {
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

                res.redirect("/admin");
        } catch (err) {
            console.log("Admin error: ", err);
            res.redirect("/admin?err=" + err);
        }
    },

    adminducksInPlay: async function (app, req, res) {
        try {
            const db = app.get("quackyRacesDB");
            const ducks = await db
                .collection("ducks")
                .find({})
                .toArray();

            const duckMap = {};
            ducks.forEach(duck => (duckMap[duck.duckID] = duck));

            const events = db.collection("events");

            const eventResults1 = await events.findOne({
                raceNum: "race1"
            });
            const eventResults2 = await events.findOne({
                raceNum: "race2"
            });
            const eventResults3 = await events.findOne({
                raceNum: "race3"
            });
            const eventResults4 = await events.findOne({
                raceNum: "race4"
            });
            const eventResults5 = await events.findOne({
                raceNum: "race5"
            });
            const eventResults6 = await events.findOne({
                raceNum: "race6"
            });

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

            const roundIDfinder = await db
                .collection("results")
                .find({})
                .sort({
                    roundID: -1
                })
                .limit(1)
                .toArray();
            console.log("roundID HERE");

            const theRoundID = roundIDfinder[0].roundID;
            console.log(theRoundID);

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
                theRoundID: theRoundID,
                user: req.session.user,
                message: req.query.err
            });
        } catch (err) {
            console.log(err);
        }
    },
};