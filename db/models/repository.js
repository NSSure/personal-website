module.exports = (sequelize, DataTypes) => {
  return Repository = sequelize.define('repository', {
    gitHubNodeId: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    fullName: { type: DataTypes.STRING, allowNull: false },
    htmlUrl: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    topics: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
  });
}