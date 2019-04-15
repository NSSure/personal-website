'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Issues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gitHubNodeId: {
        type: Sequelize.STRING
      },
      repositoryGitHubNodeId: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.TEXT
      },
      htmlUrl: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.STRING
      },
      labels: {
        type: Sequelize.TEXT
      },
      gitHubCreatedAt: {
        type: Sequelize.DATE
      },
      gitHubUpdatedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Issues');
  }
};