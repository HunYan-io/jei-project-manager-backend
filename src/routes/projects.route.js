const express = require("express");
const Joi = require("joi");

const validate = require("../middlewares/validate");
const controller = require("../controllers/projects.controller");
const taskController = require("../controllers/task.controller");
const { auth, adminAuth } = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, controller.getProjects);

router.post(
    "/",
    adminAuth,
    validate.body(
        Joi.object({
            name: Joi.string().required(),
            type: Joi.any()
                .valid(
                    "Développement Web",
                    "Développement Mobile",
                    "Référencement Web"
                )
                .required(),
            description: Joi.string().allow("").required(),
            members: Joi.array().items(Joi.string()).required(),
            deadline: Joi.date().required(),
        }).required()
    ),
    controller.postProject
);

router.delete(
    "/:id",
    adminAuth,
    validate.params(
        Joi.object({ id: Joi.number().integer().required() }).required()
    ),
    controller.deleteProject
);

router.get(
    "/:projectId/tasks",
    auth,
    validate.params(
        Joi.object({ projectId: Joi.number().integer().required() }).required()
    ),
    taskController.findAll
);

router.post(
    "/:projectId/tasks",
    adminAuth,
    validate.params(
        Joi.object({ projectId: Joi.number().integer().required() }).required()
    ),
    validate.body(
        Joi.object({
            name: Joi.string().required(),
            description: Joi.string().allow("").required(),
            deadline: Joi.date().required(),
            status: Joi.any().valid("to do", "doing", "done").required(),
        }).required()
    ),
    taskController.create
);

module.exports = router;
