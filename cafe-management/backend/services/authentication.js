const jwt = require('jsonwebtoken');

const validatetoken = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1];

        if (!token) {
            return res.status(401).send({ message: "Token not provided" });
        }

        const userinfo = jwt.verify(token, process.env.JWT_SECRET);
        if (!userinfo) {
            return res.status(401).send({ message: "invalid token" });
        }
        req.locals = userinfo;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({ message: "Token is expire or invalid error " });
    }
}

module.exports = {
    authenticationToken: validatetoken
};