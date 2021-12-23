const sequelize = require("../utils/database");
const Sequelize = require("sequelize");
const Project = require("./project.model");

const Task = sequelize.define("task", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    deadline: {
        type: Sequelize.DATE,
    },
    status: {
        type: Sequelize.ENUM("to do", "doing", "done"),
    },
});

Project.hasMany(Task);
Task.belongsTo(Project);

module.exports = Task;
