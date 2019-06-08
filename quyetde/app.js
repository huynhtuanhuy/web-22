const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();

const QuestionModel = require('./models/question');

mongoose.connect(
	'mongodb://localhost/quyetde-22',
	{ useNewUrlParser: true },
	(err) => {
		if(err) console.log(err)
		else console.log("DB connect success!!");
	});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	// QuestionModel.find({}, (err, questionList) => {
	// 	if(err) console.log(err)
	// 	else {
	// 		const randomQuestion = questionList[Math.floor(Math.random()*questionList.length)];
	// 		res.send(`
	// 			<h1>
	// 				${randomQuestion.content}
	// 			</h1>
	// 			<a href="/vote/${randomQuestion._id}/no"><button>Sai/không/trái</button></a>
	// 			<a href="/vote/${randomQuestion._id}/yes"><button>Đúng/có/phải</button></a>
	// 			<a href="/question/${randomQuestion._id}"><button>Kết quả vote</button></a>
	// 			<a href="/"><button>Câu hỏi khác</button></a>
	// 		`);
	// 	}
	// });

	QuestionModel.countDocuments({}, (err, totalQuestion) => {
		if(err) console.log(err)
		else {
			const randomIndex = Math.floor(Math.random()*totalQuestion);
			QuestionModel
				.findOne({})
				.skip(randomIndex)
				.exec((err, question) => {
					if(err) console.log(err)
					else {
						res.send(`
							<h1>
								${question.content}
							</h1>
							<a href="/vote/${question._id}/no"><button>Sai/không/trái</button></a>
							<a href="/vote/${question._id}/yes"><button>Đúng/có/phải</button></a>
							<a href="/question/${question._id}"><button>Kết quả vote</button></a>
							<a href="/"><button>Câu hỏi khác</button></a>
						`);
					}
				});
		}
 	});

	// const fileData = fs.readFileSync('questions.txt', { encoding: 'utf-8' });
	// let questionList = [];
	// if(fileData) {
	// 	questionList = JSON.parse(fileData);
	// }
	// if(questionList.length == 0) {
	// 	res.send("Question empty");
	// } else {
	// 	const randomQuestion = questionList[Math.floor(Math.random()*questionList.length)];
	// 	// res.send("<h1>" + randomQuestion.content + "</h1><span></span>");
	// 	res.send(`
	// 		<h1>
	// 			${randomQuestion.content}
	// 		</h1>
	// 		<a href="/vote/${randomQuestion.id}/no"><button>Sai/không/trái</button></a>
	// 		<a href="/vote/${randomQuestion.id}/yes"><button>Đúng/có/phải</button></a>
	// 		<a href="/question/${randomQuestion.id}"><button>Kết quả vote</button></a>
	// 		<a href="/"><button>Câu hỏi khác</button></a>
	// 	`);

	// 	// <form action="/vote" method="POST">
	// 	// 	<input type="hidden" name="id" value="${randomQuestion.id}" >
	// 	// 	<button type="submit" value="no" name="vote">Sai/không/trái</button>
	// 	// 	<button type="submit" value="yes" name="vote">Đúng/có/phải</button>
	// 	// </form>
	// }
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
	
	// QuestionModel.findByIdAndUpdate(questionId, ...)
	// QuestionModel.findOneAndUpdate(
	// 	{ _id: questionId },
	// 	{ $inc: { [vote]: 1 } },
	// 	{ new: true },
	// 	(err, questionUpdated) => {
	// 		if(err) console.log(err)
	// 		else res.redirect(`/question/${questionUpdated._id}`);
	// 	}
	// );

	QuestionModel.findOne({ _id: questionId }, (err, questionFound) => {
		if(err) console.log(err)
		else if(!questionFound) console.log("Not found")
		else {
			questionFound[vote] += 1;
			questionFound.save((err, questionUpdated) => {
				if(err) console.log(err)
				else res.redirect(`/question/${questionUpdated._id}`);
			});
		}
	});
});

app.get('/question/:questionId', (req, res) => {
	const questionId = req.params.questionId;
	QuestionModel.findById(questionId, (err, questionFound) => {
		if(err) console.log(err)
		else if(!questionFound) console.log("Not found")
		else {
			res.send(`
				${questionFound.content} 
				| yes: ${questionFound.yes} 
				| no: ${questionFound.no}
			`);
		}
	});
});

// app.get('/', (req, res) => {
// 	res.sendFile(__dirname + '/views/info.html');
// });

app.post('/addquestion', (req, res) => {
	// TODO create question with mongoose
	QuestionModel.create({
		content: req.body.question
	}, (err, questionCreated) => {
		if(err) console.log(err)
		else res.redirect('/');
	});
});

app.use('/public', express.static('public'));

const port = 6969;
app.listen(port, (err) => {
	if(err) console.log(err)
	else console.log("Server start success");
});