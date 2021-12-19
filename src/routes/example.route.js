const express = require("express");
const Joi = require("joi");

const validate = require("../middlewares/validate");
const controller = require("../controllers/example.controller");

const router = express.Router();

router.get(
    "/",
    validate.query(
        Joi.object({
            id: Joi.number().integer().required(),
        }).required()
    ),
    controller.getExample
);

module.exports = router;
