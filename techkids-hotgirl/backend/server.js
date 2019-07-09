const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const UserApiRouter = require('./routers/users');
const PostApiRouter = require('./routers/posts');

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

app.use('/api/users', UserApiRouter);
app.use('/api/posts', PostApiRouter);

const port = 6789;
app.listen(port, (err) => {
	if(err) console.log(err)
	else console.log("Server start success!");
});