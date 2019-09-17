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

app.listen(port, () => console.log(`App running on port ${port}`))