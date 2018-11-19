module.exports = (sequelize, DataTypes) => {
    return Issue = sequelize.define('issue', {
      gitHubNodeId: { type: DataTypes.STRING, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      htmlUrl: { type: DataTypes.STRING, allowNull: false },
      body: { type: DataTypes.STRING, allowNull: false },
      number: { type: DataTypes.STRING, allowNull: false },
      labels: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
      githubCreatedAt: { type: DataTypes.DATE, allowNull: sequelize.NOW },
      githubUpdatedAt: { type: DataTypes.DATE, allowNull: sequelize.NOW },
    });
  }