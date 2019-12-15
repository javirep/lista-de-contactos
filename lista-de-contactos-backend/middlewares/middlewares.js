const jwt = require("jsonwebtoken");

// This function checks that the token is valid. 
exports.verifiedByToken = () => (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        res.status(403).json({ message: "No Athorization found" })
    }
    else {
        const token = authorization.split(" ")[1]

        jwt.verify(token, "secretKey", (err) => {
            if (err) {
                res.status(403).json({ message: "invalid token" })
            } else {
                next()
            }
        })
    }
}