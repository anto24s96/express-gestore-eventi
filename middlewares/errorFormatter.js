const errorFormatter = (err, req, res, next) => {
    const statusCode = 500;
    res.form({
        html: () => res.status(statusCode).send("Error:" + err.message),
        json: () => res.status(statusCode).json({ statusCode, error: err.message, stack: err.stack }),
    });
};

module.exports = errorFormatter;
