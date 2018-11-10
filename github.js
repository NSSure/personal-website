const axios = require('axios');

module.exports = {
    access_token_query: `?access_token=${process.env.GIT_ACCESS_TOKEN}`,

    async getRepository(repo) {
        let response = await axios.get(`https://api.github.com/repos/NSSure/${repo}?${this.access_token_query}`);
        return response.data;
    },

    async getRepositoryIssues(repo) {
        let response = await axios.get(`https://api.github.com/repos/NSSure/${repo}/issues?${this.access_token_query}`);
        return response.data;
    }
}