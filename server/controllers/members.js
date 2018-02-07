const User      = require('mongoose').model('User')
const jwt       = require('jsonwebtoken')
const secret    = require('../config/middleware').jwtSecret

const sendRes = (res, message, success = false) => {
    return res.json({
        message: message,
        success: success
    })
}

module.exports = {

    authenticate(req, res, next) {
        const token = req.body.token
            || req.headers['x-access-token']
            || req.query.token
        if (token) jwt.verify(token, secret, (err, user) => {
            if (err) return sendRes(res, 'Error: Access denied.')
            else req.user = user
            next()
        })
        else return sendRes(res, 'Error: No token provided.')
    },
    
    getInfo(req, res) {
        User.find({username: req.user.username})
        .then(user => res.json(user))
        .catch(err => res.send(401))
    }

}