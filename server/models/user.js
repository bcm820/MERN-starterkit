const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: String,
    password: String,
});

// check password prior to login
const bcrypt = require('bcryptjs')
UserSchema.methods.checkPW = function(password, cb){
    bcrypt.compare(password, this.password, (err, good) => {
        if(err){ return cb(err) }
        else { cb(null, good); }
    });
}

mongoose.model('User', UserSchema);