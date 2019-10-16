const bcrypt = require("bcrypt");

module.exports = {
    resultsducksInPlay: async function (app, req, res) {
        try {

            const db = app.get('quackyRacesDB')

            const events = await db
                .collection('events')
                .find({ roundID: "round1" })
                .sort({ eventID: 1 })
                .toArray()

            const resultsList = await db
                .collection('results')
                .find({ roundID: "1" })
                .toArray()

            const ducks = await db
                .collection('ducks')
                .find()
                .toArray()

            const duckNames = {}
            ducks.forEach(duck => duckNames[duck.duckID] = duck.duckName)

            let results = {}
            resultsList.forEach(result => results[result.eventID] = result)

            const eventsWithResults = events.map(event => {

                event.results = results[event.eventID].place.map(duck => {
                    return {
                        ID: duck,
                        startingPlace: event.duckID.indexOf(duck) + 1
                    }
                }).slice(0, 3)

                return event
            })

            res.render("results", {
                duckNames: duckNames,
                events: eventsWithResults,
                user: req.session.user,
                message: req.query.err
            })

            return

        } catch (err) {
            console.log(err);
        }
    },
};