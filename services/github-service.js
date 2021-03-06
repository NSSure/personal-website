const github = require('../common/github');
const RepositoryUtility = require('../db/utilities/repository-utility');
const IssueUtility = require('../db/utilities/issue-utility');

module.exports = {
    schedule() {
        var self = this;
        let CronJob = require('cron').CronJob;
        new CronJob('0 0 0 * * *', function() {
            github.listMyRepositories().then(async (githubRepos) => {
                await self.mapGithubReposToDatabase(githubRepos);
            });
        }, null, true);
    },

    async fetchGithubRepos() {
        let githubRepos = await github.listMyRepositories();
        console.log('[REPOS FETCHED FROM GITHUB]');
        await this.mapGithubReposToDatabase(githubRepos);
    },

    mapGithubReposToDatabase(githubRepositories) {
        console.log('[MAPPING REPOS TO DATABASE]');
        githubRepositories.forEach(async (gitHubRepo) => {
            let existingRepo = await repositoryUtil.model.findOne({
                where: { name: gitHubRepo.name }
            });

            // Repository already exists just return.
            if (existingRepo) {
                return;
            }

            console.log('Seeding Repo: ' + gitHubRepo.name);

            let repositories = [];

            let repository = {
                gitHubNodeId: gitHubRepo.node_id,
                name: gitHubRepo.name,
                fullName: gitHubRepo.full_name,
                description: gitHubRepo.description || '',
                htmlUrl: gitHubRepo.html_url,
                topics: JSON.stringify(gitHubRepo.topics)
            }

            repositories.push(repository);
            
            github.getRepositoryIssues(gitHubRepo.name).then((repoIssues) => {
                let issues = [];

                repoIssues.forEach((repoIssue) => {
                    issues.push({
                        gitHubNodeId: repoIssue.node_id,
                        repositoryGitHubNodeId: repository.gitHubNodeId,
                        title: repoIssue.title,
                        body: repoIssue.body,
                        htmlUrl: repoIssue.html_url,
                        number: repoIssue.number,
                        labels: JSON.stringify(repoIssue.labels),
                        gitHubCreatedAt: repoIssue.created_at,
                        gitHubUpdatedAt: repoIssue.updated_at
                    });
                })

                let issueUtil = new IssueUtility();
                issueUtil.model.bulkCreate(issues);
            });

            let repositoryUtil = new RepositoryUtility();
            repositoryUtil.model.bulkCreate(repositories);
        });
    }
};