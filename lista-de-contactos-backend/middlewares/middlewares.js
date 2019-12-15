const jwt = require("jsonwebtoken");

// This function checks that the token is valid. 
exports.verifiedByToken = () => (req, res, next) => {
    const { token } = req.body
    console.log(req.body)

    if (!token) {
        res.status(403).json({ message: "jwt not found" })
    }
    else {
        jwt.verify(token, "secretKey", (err) => {
            if (err) {
                res.status(403).json({ message: "invalid token" })
            } else {
                next()
            }
        })
    }

}