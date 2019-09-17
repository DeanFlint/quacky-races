const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// serve static files from the static dir
app.use('/images', express.static('images'))

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/play', (req, res) => {
    res.render('play.ejs')
})

app.get('/predictions', (req, res) => {
    res.render('predictions.ejs')
})

app.get('/results', (req, res) => {
    res.render('results.ejs')
})

app.get('/profiles', (req, res) => {
    res.render('profiles.ejs')
})

app.get('/leaderboard', (req, res) => {
    res.render('leaderboard.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.get('/account', (req, res) => {
    res.render('account.ejs')
})


app.listen(port, () => console.log(`App running on port ${port}`))