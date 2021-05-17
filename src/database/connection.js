const Sequelize = require("sequelize");

const sequelize = new Sequelize("vala_kagency", "vala_kagency", "O3pkueNUNHiw", {
  host: "165.22.111.215",
  dialect: "mysql",
  operatorsAliases: '1',
});

sequelize

module.exports = sequelize;
global.sequelize = sequelize;
