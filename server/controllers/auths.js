const User      = require('mongoose').model('User');
const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken')

module.exports = {

    sendMsg(s, m) {
        return {success: s, msg: m}
    },

// Registration

    register(req, res) {
        const user = new User(req.body)
        User.count({username: req.body.username})
        .then(count => {
            if(count) res.json(sendMsg(false, 'Error: Username taken.'))
            else verify(user, req.session, res.json)
        })
    },

    verify(user, session, json) {
        bcrypt.hash(user.password, 10, (err, hashedPass) => {
            user.password = hashedPass;
            user.save()
            .then(user => {
                session.uid = user._id; // change to jwt!
                json(sendMsg(true, `Welcome, ${user.first}! Logging in...`))
            })
            .catch(err => json(sendMsg(false, 'Error: Input invalid.')))
        })
    },

// Login
    
    login(req, res){
        User.findOne({username: req.body.username})
        .then(user => {
            if(!user) res.json(sendMsg(false, 'Error: No user found.'))
            else authenticate(user, req.session, res.json)
        })
    },

    authenticate(user, session, json){
        user.checkPW(req.body.password, (err, good) => {
            if(good) {
                
                const payload = {user: user.username}
                jwt.sign(payload, app.get('jwt'), {expiresIn: '8h'})
                
                session.uid = user._id; // change this to JWT!
                json(sendMsg(true, `Welcome! Logging you in...`))
            }
            else json(sendMsg(false, 'Error: Input invalid.'))
        })
    },

// Logout

    // deletes user ID from session
    logout(req, res) {
        req.session.uid = undefined;
        res.json(sendMsg(true, `Session ended.`))
    }

}