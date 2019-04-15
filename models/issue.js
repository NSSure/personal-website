'use strict';
module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define('Issue', {
    gitHubNodeId: DataTypes.STRING,
    repositoryGitHubNodeId: DataTypes.STRING,
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    htmlUrl: DataTypes.STRING,
    number: DataTypes.STRING,
    labels: DataTypes.TEXT,
    gitHubCreatedAt: DataTypes.DATE,
    gitHubUpdatedAt: DataTypes.DATE
  }, {});
  Issue.associate = function(models) {
    // associations can be defined here
  };
  return Issue;
};