const projects = require('./public/data/projects.json');
const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

app.use("/public", express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

app.use(expressLayouts);

// Index page
app.get('/', function(req, res) {
    res.locals = { projects: projects };
    res.render('default')
});

app.get('/periodic', function(req, res) {
    res.render('periodic');
});

app.get('/snippets', function(req, res) {
    res.render('snippets');
});

app.get('/toast', function(req, res) {
    res.render('toast');
});

app.get('/contact', function(req, res) {
    res.render('contact');
});

app.get('/about', function(req, res) {
    res.render('about');
});

app.listen(8080, () => {
    console.log('Example app listening on port 8080')
});