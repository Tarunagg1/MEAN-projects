const jwt = require('jsonwebtoken');

const checkAdminRole = async (req, res, next) => {
    try {
        if (req.locals.role === 'user') {
            return res.status(401).send({ message: "user not allowed to access" });
        }
        next();
    } catch (error) {
        return res.status(401).send({ message: "Token is expire or invalid" });
    }
}

module.exports = { 
    checkAdminRole,
 };