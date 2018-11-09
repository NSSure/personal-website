const projects = require('./public/data/projects.json');
const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const axios = require('axios');
const moment = require('moment');
const app = express();

app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/static'));

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

app.get('/project/:repo', async function(req, res) {
    let repositoryResponse = await axios.get(`https://api.github.com/repos/NSSure/${req.params.repo}`);
    let issuesResponse = await axios.get(`https://api.github.com/repos/NSSure/${req.params.repo}/issues`);

    console.log(repositoryResponse.data);

    res.render('project', {
        repository: repositoryResponse.data,
        issues: issuesResponse.data, 
        moment: moment }
    );
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