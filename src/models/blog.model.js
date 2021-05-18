const Sequelize = require("sequelize");

module.exports = sequelize.define("Blog", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  url: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  title: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  updated_by: {
    type: Sequelize.UUID,
    allowNull: true,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true,
    field: "updated_at",
  },
  created_by: {
    type: Sequelize.UUID,
    allowNull: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: true,
    field: "created_at",
  },
});
