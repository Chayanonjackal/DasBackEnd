module.exports = function logger(req, res, next) {
    console.log('request: '+req.method, req.originalUrl);
    next();
}

