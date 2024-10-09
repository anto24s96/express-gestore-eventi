const routeNotFound = (req, res, next) => {
    const statusCode = 404;
    res.format({
        html: () => res.stasus(statusCode).send(`<h1>${statusCode} - Page Not Found</h1>`),
        json: () => res.statu(statusCode).json({ statusCode, error: "Page not found", stack: null }),
    });
};

module.exports = routeNotFound;
