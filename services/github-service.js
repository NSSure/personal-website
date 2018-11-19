const github = require('../common/github');
const RepositoryUtility = require('../db/utilities/repository-utility');

module.exports = {
    schedule() {
        let CronJob = require('cron').CronJob;
        new CronJob('*/10 * * * * *', this.processRepositories, null, true);
    },

    async processRepositories() {
        let gitHubRepositories = await github.listMyRepositories();
        let repositories = [];

        console.log(gitHubRepositories);

        gitHubRepositories.forEach((gitHubRepository) => {
            repositories.push({
                gitHubNodeId: gitHubRepository.node_id,
                name: gitHubRepository.name,
                fullName: gitHubRepository.full_name,
                description: gitHubRepository.description || '',
                htmlUrl: gitHubRepository.html_url,
                topics: gitHubRepository.topics
            });
        });

        console.log(repositories);

        let repositoryUtil = new RepositoryUtility();
        repositoryUtil.model.bulkCreate(repositories);
    }
};