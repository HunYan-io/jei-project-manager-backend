const express = require("express");
const Joi = require("joi");

const validate = require("../middlewares/validate");
const controller = require("../controllers/projects.controller");
const { auth, adminAuth } = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, controller.getProjects);

router.post(
    "/",
    adminAuth,
    validate.body(
        Joi.object({
            name: Joi.string().required(),
            type: Joi.any().valid(
                "Développement Web",
                "Développement Mobile",
                "Référencement Web"
            ),
            description: Joi.string().allow("").required(),
            members: Joi.array().items(Joi.string()).required(),
            deadline: Joi.date().required(),
        }).required()
    ),
    controller.postProject
);

// router.delete("/:id", adminAuth, validate.params(/* validate id */), ...)

module.exports = router;
