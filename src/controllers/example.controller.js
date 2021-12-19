const { Example } = require("../models/example.model");

exports.getExample = (req, res, next) => {
    res.status(200).json({
        example: {
            id: req.query.id,
            message: "This is an example.",
        },
    });
};
