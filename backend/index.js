const express = require('express');

const app = express();

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

// Router
app.get('/about', (request, response) => {
	response.send("About");
});

// http://localhost:6969
const port = 6969;
app.listen(port, function(err) {
	if(err) console.log(err)
	else console.log("Server start success");
});