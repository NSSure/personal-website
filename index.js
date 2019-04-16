const startup = require("./startup");
startup.run();

// Third party scripts
const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const moment = require("moment");

// Custom scripts
const markdown = require("./common/markdown");
const github = require("./common/github");
const blog = require("./common/blog");

const app = express();

app.use("/", express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

app.use(expressLayouts);

const RepositoryUtility = require("./db/utilities/repository-utility");

// Index page
app.get("/", async (req, res) => {
    let repositoryUtil = new RepositoryUtility();
    let repositories = await repositoryUtil.model.findAll();
    let ignoredRepositories = ["board-manager", "personal-website", "currency-tracker", "project-ideas", "XamarinFormsSamples"];

    if (repositories.length === 0) {
        const githubService = require('./services/github-service');
        githubService.fetchGithubRepos();
        repositories = await repositoryUtil.model.findAll();
    }

    for (let i = 0; i < repositories.length; i++) {
        let ignoredIndex = ignoredRepositories.findIndex(x => x === repositories[i].dataValues.name);

        if (ignoredIndex > -1) {
            repositories.splice(i, 1);
        }
    }

    res.locals = { projects: repositories };
    res.render("default");
});

app.get("/projects", async (req, res) => {
    let repositoryUtil = new RepositoryUtility();
    let repositories = await repositoryUtil.model.findAll();
    let ignoredRepositories = ["board-manager", "personal-website", "currency-tracker", "project-ideas", "XamarinFormsSamples"];

    if (repositories.length === 0) {
        const githubService = require('./services/github-service');
        githubService.fetchGithubRepos();
        repositories = await repositoryUtil.model.findAll();
    }

    for (let i = 0; i < repositories.length; i++) {
        let ignoredIndex = ignoredRepositories.findIndex(x => x === repositories[i].dataValues.name);

        if (ignoredIndex > -1) {
            repositories.splice(i, 1);
        }
    }

    res.locals = { projects: repositories };
    res.render("projects");
});

app.get("/blog", async (req, res) => {
    let posts = blog.posts();

    res.render("blog", {
        posts: posts
    });
});

app.get("/blog/:normalizedUrl", (req, res) => {
    res.render("post", {
        html: markdown.loadPostMarkdown(req.params.normalizedUrl)
    });
});

app.get("/project/:repo", async (req, res) => {
    let repo = req.params.repo;

    let repository = await github.getRepository(repo);
    let issues = await github.getRepositoryIssues(repo);

    let repoMarkdown = await markdown.loadRepoMarkdown(repo);

    res.render("project", {
        repository: repository,
        issues: issues,
        html: repoMarkdown,
        moment: moment
    });
});

app.get("/contact", function(req, res) {
    res.render("contact");
});

app.get("/about", function(req, res) {
    res.render("about");
});

app.listen(8080, () => {
    console.log("Example app listening on port 8080");
});
