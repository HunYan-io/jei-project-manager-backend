const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UniqueConstraintError } = require("sequelize");

const User = require("../models/user.model");
const { UnauthorizedError, ConflictError } = require("../utils/errors");

exports.postLogin = async (req, res, next) => {
    try {
        const user = await User.findOne({
            attributes: ["id", "password", "email"],
            where: {
                username: req.body.username,
            },
        });
        if (!user)
            return next(
                new UnauthorizedError({ userMessage: "invalid_username" })
            );
        const isEqual = await bcrypt.compare(req.body.password, user.password);
        if (isEqual) {
            jwt.sign(
                { id: user.id, isAdmin: user.email.endsWith("@jei-2021.tn") },
                process.env.JWT_SECRET,
                (err, token) => {
                    if (err) return next(err);
                    res.status(200).json({ token });
                }
            );
        } else {
            return next(
                new UnauthorizedError({ userMessage: "invalid_password" })
            );
        }
    } catch (err) {
        next(err);
    }
};

exports.postSignup = async (req, res, next) => {
    try {
        const password = await bcrypt.hash(req.body.password, 12);
        const user = await User.create({
            email: req.body.email,
            username: req.body.username,
            password,
        });
        jwt.sign(
            { id: user.id, isAdmin: user.email.endsWith("@jei-2021.tn") },
            process.env.JWT_SECRET,
            (err, token) => {
                if (err) return next(err);
                res.status(200).json({ token });
            }
        );
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            next(
                new ConflictError({
                    userMessage: `${Object.keys(err.fields)[0]}_exists`,
                })
            );
        } else {
            next(err);
        }
    }
};
