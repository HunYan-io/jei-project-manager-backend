const express = require("express");
const Joi = require("joi");

const validate = require("../middlewares/validate");
const controller = require("../controllers/auth.controller");

const router = express.Router();

router.post(
    "/login",
    validate.body(
        Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        }).required()
    ),
    controller.postLogin
);

router.post(
    "/signup",
    validate.body(
        Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().email().required(),
        }).required()
    ),
    controller.postSignup
);

module.exports = router;
