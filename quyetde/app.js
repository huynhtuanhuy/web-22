const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const ViewRouter = require('./routers/view');
const ApiRouter = require('./routers/api');

mongoose.connect(
	'mongodb://localhost/quyetde-22',
	{ useNewUrlParser: true },
	(err) => {
		if(err) console.log(err)
		else console.log("DB connect success!!");
	});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	console.log("Hello middleware");
	// res.send("Stop!!!");
	req.user = "Huy";
	next();
});

app.use('/', ViewRouter);
app.use('/api', ApiRouter);

app.use('/public', express.static('public'));

const port = 6969;
app.listen(port, (err) => {
	if(err) console.log(err)
	else console.log("Server start success");
});