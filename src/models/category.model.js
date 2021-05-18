const Sequelize = require("sequelize");

module.exports = sequelize.define("Category", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      field: "updated_at",
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true,
      field: "created_at",
    },
  });
  