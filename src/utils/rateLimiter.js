const rateLimiter = require('express-rate-limit')

module.exports = loginRateLimit = rateLimiter({
    windowsMs: 15 * 60 * 1000,
    max: 5,
    message: ' too many attempts , next attempt in 15min',
    statusCode: 429,
    standardHeaders: true,
    legacyHeaders: true
});