const Sequelize = require("sequelize");

class Database {
  constructor() {
    this.context = new Sequelize("database", "root", "test", {
      host: "localhost",
      dialect: "mysql",
      operatorsAliases: false
    });
  }

  init() {
    this.context.import('./models/issue.js');
    this.context.import('./models/repository.js');

    this.context.sync({ force: true });
  }
}

module.exports = Database;
