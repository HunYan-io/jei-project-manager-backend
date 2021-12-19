const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Example = sequelize.define("example", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
});

module.exports = Example;
