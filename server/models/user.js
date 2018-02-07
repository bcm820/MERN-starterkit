const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: String,
    password: String
});

// check password prior to login
UserSchema.methods.checkPW = function(password) {
	const self = this
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, self.password)
		.then(res => {
			if(!res) reject("Error: Password invalid.")
			else resolve()
		})
	})
}

mongoose.model('User', UserSchema);