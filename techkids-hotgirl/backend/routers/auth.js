const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthRouter = express.Router();

const UserModel = require('../models/users');

AuthRouter.get('/me', (req, res) => {
	const token = req.query.access_token || req.headers.authentication;

	jwt.verify(token, 't3chKids2019', function(err, decoded) {
		if (err) res.send({ success: false, err })
		else res.send({ success: true, user: decoded });
	});
});

AuthRouter.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (password && username) {
        UserModel.findOne({ username }, (err, userFound) => {
            if (err) res.send({ success: false, err });
            else if (!userFound)
                res.send({ success: false, err: 'User not found' });
            else {
                if (bcrypt.compareSync(password, userFound.password)) {
                    const token = jwt.sign({
                        id: userFound._id,
                        username: userFound.username,
                    }, 't3chKids2019');
                    res.send({ success: true, username: userFound.username, token });
                } else {
                    res.send({ success: false, err: 'Wrong password!' });
                }
            }
        });
    }
});

module.exports = AuthRouter;
