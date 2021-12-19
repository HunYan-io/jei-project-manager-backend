require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

const exampleRoute = require("./routes/example.route");
const { HttpError, NotFoundError } = require("./utils/errors");
const sequelize = require("./utils/database");

app.use(helmet());
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV == "development") {
    app.use(require("morgan")("dev"));
}

app.use("/example", exampleRoute);

app.use((req, res, next) => {
    next(new NotFoundError());
});

app.use((err, req, res, next) => {
    console.error(err);
    if (err instanceof HttpError) {
        res.status(err.statusCode).json({
            error: err.httpMessage,
        });
    } else {
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
});

sequelize
    .sync()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });
