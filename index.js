// Third party scripts
const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const moment = require('moment');

// Custom scripts
const markdown = require('./markdown');
const github = require('./github');
const blog = require('./blog');

// Custom data
const projects = require('./public/data/projects.json');

const app = express();

app.use("/", express.static(path.join(__dirname, 'public')));

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

app.get('/blog', (req, res) => {
    let posts = blog.posts();
    console.log(posts);
    
    res.render('blog', {
        posts: posts
    });
});

app.get('/blog/:normalizedUrl', (req, res) => {
    res.render('post', {
        html: markdown.loadPostMarkdown(req.params.normalizedUrl)
    });
});

app.get('/project/:repo', async (req, res) => {
    let repo = req.params.repo;

    let repository = await github.getRepository(repo);
    let issues = await github.getRepositoryIssues(repo);

    res.render('project', {
        repository: repository,
        issues: issues,
        html: markdown.loadRepoMarkdown(repo),
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