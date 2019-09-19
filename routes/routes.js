const express = require('express');

const router = express.Router();

// const myControllers = require('../controllers/controllers.js');

// console.dir(myControllers);

module.exports = (app) => {

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

  
    return router;

}
