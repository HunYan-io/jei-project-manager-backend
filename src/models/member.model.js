const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Member = sequelize.define(
    "member",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    { timestamps: false }
);

module.exports = Member;
