const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const UserModel = require('./models/users');

const UserApiRouter = require('./routers/users');
const PostApiRouter = require('./routers/posts');
const AuthApiRouter = require('./routers/auth');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(
	'mongodb://localhost/tk-hotgirl-22',
	{ useNewUrlParser: true },
	(err) => {
		if(err) console.log(err)
		else console.log("DB connect success!");
	});

app.use('/api/auth', AuthApiRouter);
app.use('/api/posts', PostApiRouter);

app.use((req, res, next) => {
	const access_token = req.query.access_token || req.headers.authentication;

	if(access_token) {
		jwt.verify(access_token, 't3chKids2019', function(err, decoded) {
			if(err) res.send({ success: false, err: 'Token not valid!' })
			else {
				const username = decoded.username;
				UserModel.findOne({ username }, function (err, userFound) {
					if(err) {
						res.send({ success: false, err });
					} else {
						if (!userFound) {
							res.send({ success: false, err: 'User not exist!' });
						} else if (userFound.role && userFound.role == 'admin') {
							next();
						} else {
							res.send({ success: false, err: 'Forbidden!' });
						}
					}
				})
			};
		});
	} else {
		res.send({ success: false, err: 'No token provided' });
	}
});

app.use('/api/users', UserApiRouter);

const port = 6789;
app.listen(port, (err) => {
	if(err) console.log(err)
	else console.log("Server start success!");
});