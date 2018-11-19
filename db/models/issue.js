module.exports = (sequelize, DataTypes) => {
    return Issue = sequelize.define('issue', {
      gitHubNodeId: { type: DataTypes.STRING, allowNull: false },
      repositoryGitHubNodeId: { type: DataTypes.STRING, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      body: { type: DataTypes.TEXT, allowNull: false },
      htmlUrl: { type: DataTypes.STRING, allowNull: false },
      number: { type: DataTypes.STRING, allowNull: false },
      labels: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
      gitHubCreatedAt: { type: DataTypes.DATE, allowNull: sequelize.NOW },
      gitHubUpdatedAt: { type: DataTypes.DATE, allowNull: sequelize.NOW },
    });
  }