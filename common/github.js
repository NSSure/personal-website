const axios = require('axios');

module.exports = {
    async getRepository(repo) {
        let response = await axios.get(`https://api.github.com/repos/NSSure/${repo}?access_token=${process.env.GIT_ACCESS_TOKEN}`);
        console.log(response);
        return response.data;
    },

    async getRepositoryIssues(repo) {
        let response = await axios.get(`https://api.github.com/repos/NSSure/${repo}/issues?access_token=${process.env.GIT_ACCESS_TOKEN}`);
        console.log(response);
        return response.data;
    },

    async listMyRepositories() {
        let response = await axios.get(`https://api.github.com/users/NSSure/repos?access_token=${process.env.GIT_ACCESS_TOKEN}`);
        console.log(response);
        return response.data;
    }
}