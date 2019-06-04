const express = require('express');

const app = express();

// middleware
// http://localhost:6969/....
// http://localhost:6969/public/....
// http://localhost:6969/public/test.txt
app.use('/', express.static('html&css'));

// Router
app.get('/', (request, response) => {
	const data = {
		name: 'Huy',
		age: 18
	}
	console.log(__dirname + '/html&css/index.html');
	// response.send("<h1>"+data.name+" "+data.age+" tủi</h1>");
	response.sendFile(__dirname + '/html&css/index.html');
});

// app.get('/style.css', (request, response) => {
// 	response.sendFile(__dirname + '/html&css/style.css');
// });

// Router
app.get('/about/test', (request, response) => {
	response.sendFile(__dirname + '/html&css.1/index.html');
});

// http://localhost:6969
const port = 6969;
app.listen(port, function(err) {
	if(err) console.log(err)
	else console.log("Server start success");
});