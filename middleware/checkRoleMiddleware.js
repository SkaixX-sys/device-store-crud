const jwt = require('jsonwebtoken')


module.exports = function(role) {
    return function (req, res, next) {
        if (req.method === "OPTION") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]  // Bearer asdkjakl
            if (!token) {
                res.status(401).json({ message: "Пользователь неавторизован" })
            }
            const  decoded = jwt.verify(token, process.env.SECRET_KEY)
            if(decoded.role !== role) {
                res.status(403).json({ message: "Нет доступа" })

            }
            req.user = decoded
            next()
        } catch (e) {
            res.status(401).json({ message: "Пользователь неавторизован" })
        }
    }
}



