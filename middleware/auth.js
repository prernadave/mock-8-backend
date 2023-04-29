const jwt = require('jsonwebtoken')
require('dotenv').config();
const auth = (req, res, next) => {
    const token = req.headers.authorization
    console.log(token);
    if (!token) {
        return res.status(401).send({ message: 'please provide a token' })
    }

    jwt.verify(token, process.env.key, (err, decoded) => {
        if (decoded) {
            const userID = decoded.userID
            req.body.userID = userID
            next()
        } else {
            return res.status(500).send({ message: "Invalid Token" })
        }

    })
}
module.exports = { auth }