const express = require('express');
const bcrypt = require('bcrypt');
const AuthRouter = express.Router();

const UserModel = require('../models/users');

AuthRouter.post('/login', (req, res) => {
    const username = req.body.username;
	const password = req.body.password;
	$('[name=username]')
	if(password && username) {
		UserModel.findOne({ username }, (err, userFound) => {
			if(err) res.send({ success: false, err })
			else if(!userFound) res.send({ success: false, err: "User not found" })
			else {
				if(bcrypt.compareSync(password, userFound.password)) {
					res.send({ success: true, username: userFound.username });
				} else {
					res.send({ success: false, err: 'Wrong password!' });
				}
			}
		})
	}
});

module.exports = AuthRouter;
