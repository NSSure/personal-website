const Database = require('../database');

class IssueUtility extends Database {
    constructor() {
        super();
        this.model = this.context.import('../models/issue.js');
    }
}

module.exports = IssueUtility;