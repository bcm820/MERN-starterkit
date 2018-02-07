const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    username: String,
    password: String
});

// check password prior to login
UserSchema.methods.checkPW = function(password) {
	const user = this
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, user.password)
		.then(res => {
			if(!res) reject("Error: Password invalid.")
			else resolve()
		})
	})
}

mongoose.model('User', UserSchema);