const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: String,
	email: {
		type: String,
		unique: true
	}
});

module.exports = mongoose.model('User', UserSchema);