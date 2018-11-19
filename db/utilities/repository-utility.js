const Database = require('../database');

class RepositoryUtility extends Database {
    constructor() {
        super();
        this.model = this.context.import('../models/repository.js');
    }
}

module.exports = RepositoryUtility;