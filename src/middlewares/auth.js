const jwt = require("jsonwebtoken");
const { UnauthorizedError, ForbiddenError } = require("../utils/errors");

const auth = (req, res, next) => {
    const header = req.get("authorization");
    if (
        typeof header != "string" ||
        !header.startsWith("Bearer ") ||
        header.length < 8
    )
        return next(new UnauthorizedError());
    const token = header.slice(7);
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) return next(new UnauthorizedError());
        req.user = data;
        next();
    });
};

const adminAuth = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    auth(req, res, (err) => {
        if (err) return next(err);
        if (!req.user.isAdmin) {
            return next(new ForbiddenError());
        }
        next();
    });
};

module.exports = { auth, adminAuth };
