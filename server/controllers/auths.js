const User      = require('mongoose').model('User')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')
const secret    = require('../config/middleware').jwtSecret

const sendRes = (res, message, success = false, token = null) => {
    return res.json({
        message: message,
        success: success,
        token: token
    })
}

const verify = (user, res) => {
    bcrypt.hash(user.password, 10, (err, hashedPass) => {
        user.password = hashedPass;
        user.save()
        .then(user => assignToken(user, res))
        .catch(err => sendRes(res, 'Error: Input invalid.'))
    })
}

const checkPassword = (user, res) => {
    user.checkPW(req.body.password)
    .then(valid => assignToken(user, res))
    .catch(err => sendRes(res, 'Error: Password invalid.'))
}

const assignToken = (user, res) => {
    const payload = {username: user.username}
    const token = jwt.sign(payload, secret, {expiresIn: '2hr'})
    return sendRes(res, 'Welcome! Logging in.', true, token)
}

module.exports = {
    
    register(req, res) {
        const user = new User(req.body)
        User.count({username: req.body.username})
        .then(count => {
            if(count) return sendRes(res, 'Error: Username taken.')
            else return verify(user, res)
        })
    },

    login(req, res){
        User.findOne({username: req.body.username})
        .then(user => {
            if(!user) return sendRes(res, 'Error: User not found.')
            else return checkPassword(user, res)
        })
    }

}