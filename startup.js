module.exports = {
    run() {
        require('dotenv').config();
        // this.databaseSetup();

        const githubService = require('./services/github-service');
        githubService.schedule();
    },

    databaseSetup() {
        const Database = require('./db/database');
        new Database().init();
    }
}