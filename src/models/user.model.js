const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING(60, true),
        allowNull: false,
    },
});

module.exports = User;
