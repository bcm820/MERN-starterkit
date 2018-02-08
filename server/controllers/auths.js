const User      = require('mongoose').model('User')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')
const secret    = require('../config/middleware').jwtSecret

// sendRes used to format messages sent to front
const sendRes = (res, message, success = false, token = null) => {
    return res.json({
        message: message,
        success: success,
        token: token
    })
}

// If username available on registration, this verifies/hashes PW
// If user successfully saved, JWT assigned for auto-login
const verify = (user, res) => {
    bcrypt.hash(user.password, 10, (err, hashedPass) => {
        user.password = hashedPass;
        user.save()
        .then(user => assignToken(user, res))
        .catch(err => sendRes(res, 'Error: Input invalid.'))
    })
}

// Bcrypt on User model compares password input to encrypted pass
// If valid, JWT assigned for auto-login
const checkPassword = (user, req, res) => {
    user.checkPW(req.body.password)
    .then(valid => assignToken(user, res))
    .catch(err => sendRes(res, 'Error: Password invalid.'))
}

// Stored token is the user's username encrypted
// If user does not logout, JWT expires after 1 hour
const assignToken = (user, res) => {
    const payload = {username: user.username}
    const token = jwt.sign(payload, secret, {expiresIn: '1hr'})
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
            else return checkPassword(user, req, res)
        })
    }

}