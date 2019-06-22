const express = require('express');
const path = require('path');
const ViewRouter = express.Router();

const QuestionModel = require('../models/question');

// http://localhost:6969/view
// ViewRouter.get('/', (req, res) => {
// 	res.send("View router");
// });

ViewRouter.get('/', (req, res) => {
	console.log(req.user);
	res.sendFile(path.resolve(__dirname, '../views/home.html'));
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

	// QuestionModel.countDocuments({}, (err, totalQuestion) => {
	// 	if(err) console.log(err)
	// 	else {
	// 		const randomIndex = Math.floor(Math.random()*totalQuestion);
	// 		QuestionModel
	// 			.findOne({})
	// 			.skip(randomIndex)
	// 			.exec((err, question) => {
	// 				if(err) console.log(err)
	// 				else {
	// 					res.send(`
	// 						<h1>
	// 							${question.content}
	// 						</h1>
	// 						<a href="/api/vote/${question._id}/no"><button>Sai/không/trái</button></a>
	// 						<a href="/api/vote/${question._id}/yes"><button>Đúng/có/phải</button></a>
	// 						<a href="/question/${question._id}"><button>Kết quả vote</button></a>
	// 						<a href="/"><button>Câu hỏi khác</button></a>
	// 					`);
	// 				}
	// 			});
	// 	}
 	// });

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

ViewRouter.get('/ask', (req, res) => {
	console.log(req.query);
	res.sendFile(path.resolve(__dirname, '../views/ask.html'));
});

ViewRouter.get('/question/:questionId', (req, res) => {
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

module.exports = ViewRouter;