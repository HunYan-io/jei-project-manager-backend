class HttpError extends Error {
    // abstract class
    statusCode = null;
    httpMessage = null;
}

class NotFoundError extends HttpError {
    statusCode = 404;
    httpMessage = "Not Found";
}

class MalformedRequestError extends HttpError {
    statusCode = 400;
    httpMessage = "Malformed Request";
}

class UnauthorizedError extends HttpError {
    statusCode = 401;
    httpMessage = "Unauthorized";
}

class InternalServerError extends HttpError {
    statusCode = 500;
    httpMessage = "Internal Server Error";
}

module.exports = {
    HttpError,
    NotFoundError,
    MalformedRequestError,
    UnauthorizedError,
    InternalServerError,
};
