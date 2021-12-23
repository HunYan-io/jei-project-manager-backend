const express = require("express");
const Joi = require("joi");

const validate = require("../middlewares/validate");
const controller = require("../controllers/task.controller");

const router = express.Router();

router.get("/:id", controller.findOne);

router.delete("/:id", controller.delete);

router.put("/:id", controller.update);

module.exports = router;
