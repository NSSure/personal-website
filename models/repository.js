'use strict';
module.exports = (sequelize, DataTypes) => {
  const Repository = sequelize.define('Repository', {
    gitHubNodeId: DataTypes.STRING,
    name: DataTypes.STRING,
    fullName: DataTypes.STRING,
    htmlUrl: DataTypes.STRING,
    description: DataTypes.TEXT,
    topics: DataTypes.TEXT,
    gifUrl: DataTypes.STRING
  }, {});
  Repository.associate = function(models) {
    // associations can be defined here
  };
  return Repository;
};