const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	const fileData = fs.readFileSync('questions.txt', { encoding: 'utf-8' });
	let questionList = [];
	if(fileData) {
		questionList = JSON.parse(fileData);
	}
	if(questionList.length == 0) {
		res.send("Question empty");
	} else {
		const randomQuestion = questionList[Math.floor(Math.random()*questionList.length)];
		// res.send("<h1>" + randomQuestion.content + "</h1><span></span>");
		res.send(`
			<h1>
				${randomQuestion.content}
			</h1>
			<a href="/vote/${randomQuestion.id}/no"><button>Sai/không/trái</button></a>
			<a href="/vote/${randomQuestion.id}/yes"><button>Đúng/có/phải</button></a>
			<a href="/question/${randomQuestion.id}"><button>Kết quả vote</button></a>
			<a href="/"><button>Câu hỏi khác</button></a>
		`);

		// <form action="/vote" method="POST">
		// 	<input type="hidden" name="id" value="${randomQuestion.id}" >
		// 	<button type="submit" value="no" name="vote">Sai/không/trái</button>
		// 	<button type="submit" value="yes" name="vote">Đúng/có/phải</button>
		// </form>
	}
	// res.sendFile(__dirname + '/views/home.html');
});

app.post('/vote', (req, res) => {
	console.log(req.body);
	const vote = req.body.vote;
	const id = req.body.id;
	const fileData = fs.readFileSync('questions.txt', { encoding: 'utf-8' });
	let questionList = [];
	if(fileData) {
		questionList = JSON.parse(fileData);
	}

	// if(vote == 'no') {
	// 	questionList[id].no += 1;
	// } else {
	// 	questionList[id].yes += 1;
	// }
	questionList[id][vote] += 1;

	fs.writeFileSync('questions.txt', JSON.stringify(questionList));
	res.redirect('/');
});

app.get('/ask', (req, res) => {
	console.log(req.query);
	res.sendFile(__dirname + '/views/ask.html');
});

// /vote/3/yes
app.get('/vote/:questionId/:vote', (req, res) => {
	const questionId = req.params.questionId;
	const vote = req.params.vote;
	const fileData = fs.readFileSync('questions.txt', { encoding: 'utf-8' });
	let questionList = [];
	if(fileData) {
		questionList = JSON.parse(fileData);
	}
	questionList[questionId][vote] += 1;

	fs.writeFileSync('questions.txt', JSON.stringify(questionList));
	res.redirect(`/question/${questionList[questionId].id}`);
});

app.get('/question/:questionId', (req, res) => {
	const questionId = req.params.questionId;
	const fileData = fs.readFileSync('questions.txt', { encoding: 'utf-8' });
	let questionList = [];
	if(fileData) {
		questionList = JSON.parse(fileData);
	}
	const question = questionList[questionId];
	res.send(`
		${question.content} | yes: ${question.yes} | no: ${question.no}
	`);
});

// app.get('/', (req, res) => {
// 	res.sendFile(__dirname + '/views/info.html');
// });

app.post('/addquestion', (req, res) => {
	const fileData = fs.readFileSync('questions.txt', { encoding: 'utf-8' });
	let questionList = [];
	if(fileData) {
		questionList = JSON.parse(fileData);
	}
	const question = {
		id: questionList.length,
		yes: 0,
		no: 0,
		content: req.body.question
	}
	questionList.push(question);
	fs.writeFileSync('questions.txt', JSON.stringify(questionList));
	res.redirect('/');
});

app.use('/public', express.static('public'));

const port = 6969;
app.listen(port, (err) => {
	if(err) console.log(err)
	else console.log("Server start success");
});