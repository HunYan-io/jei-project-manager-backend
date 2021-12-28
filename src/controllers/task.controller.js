const Task = require("../models/task.model");
const { NotFoundError } = require("../utils/errors");

//create a task
exports.create = (req, res, next) => {
    const task = {
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline,
        status: req.body.status,
        projectId: req.params.projectId,
    };

    Task.create(task)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            next(err);
        });
};

//get all tasks of a project
exports.findAll = (req, res, next) => {
    Task.findAll({
        where: {
            projectId: req.params.projectId,
        },
    })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            next(err);
        });
};

//get a task by id
exports.findOne = (req, res, next) => {
    const id = req.params.id;

    Task.findByPk(id)
        .then((data) => {
            if (data) {
                res.status(200).json(data);
            } else {
                next(new NotFoundError());
            }
        })
        .catch((err) => {
            next(err);
        });
};

//delete a task by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Task.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.status(200).send({
                    success: true,
                });
            } else {
                next(new NotFoundError());
            }
        })
        .catch((err) => {
            next(err);
        });
};

//update task by id

exports.update = (req, res) => {
    const id = req.params.id;

    Task.update(
        { status: req.body.status },
        {
            where: { id: id },
        }
    )
        .then((num) => {
            if (num == 1) {
                res.status(200).json({
                    success: true,
                });
            } else {
                next(new NotFoundError());
            }
        })
        .catch((err) => {
            next(err);
        });
};
