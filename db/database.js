const Sequelize = require("sequelize");

class Database {
  constructor() {
    this.context = new Sequelize({
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      dialect: process.env.DB_DIALECT
    });
  }

  init() {
    this.context.import('./models/issue.js');
    this.context.import('./models/repository.js');

    this.context.sync({ force: false });
  }
}

module.exports = Database;
