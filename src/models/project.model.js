const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const Member = require("./member.model");

const Project = sequelize.define("project", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: Sequelize.ENUM(
        "Développement Web",
        "Développement Mobile",
        "Référencement Web"
    ),
    description: Sequelize.STRING(2000),
    deadline: Sequelize.DATE,
});

Project.hasMany(Member);
Member.belongsTo(Project);

module.exports = Project;
