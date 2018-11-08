const express = require('express');
const app = express();

// At the top of your server.js
process.env.PWD = process.cwd()

// Then
app.use(express.static(process.env.PWD + '/public'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Routes
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/blog', function(req, res) {
    res.render('blog');
});

app.listen(8008, () => {
    console.log('Example app listening on port 8080')
});