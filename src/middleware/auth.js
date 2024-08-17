require('dotenv').config()
const jwt = require('jsonwebtoken')
const auth = (req, res, next) => {
    const whileList = ['/', '/register', '/login'];
    if (whileList.find((item) => {return `/v1/api${item}` === req.originalUrl})) {
        next()
    } else {
        if (req.headers.authorization && req.headers) {
            const token = req.headers.authorization.split(' ')[1];
            // invalid token - synchronous
            try {
                var decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log(decoded);
                req.user={
                    name:decoded.name,
                    email:decoded.email,
                }
            } catch (err) {
                return res.status(401).json({
                    message: 'token sai hoặc hết hạn '
                })
            }
            next()
        } else {
            res.send('không có headers hoặc token hết hạn')
            next()
        }
    }

}
module.exports = auth;