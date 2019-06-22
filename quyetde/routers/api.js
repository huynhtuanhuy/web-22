const express = require('express');
const fs = require('fs');
const ApiRouter = express.Router();

const QuestionModel = require('../models/question');

ApiRouter.get('/randomquestion', (req, res) => {
	QuestionModel.countDocuments({}, (err, totalQuestion) => {
		if(err) console.log(err)
		else {
			const randomIndex = Math.floor(Math.random()*totalQuestion);
			QuestionModel
				.findOne({})
				.skip(randomIndex)
				.exec((err, question) => {
					if(err) console.log(err)
					else res.send(question);
				});
		}
 	});
});

ApiRouter.post('/vote', (req, res) => {
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

// /vote/3/yes
ApiRouter.get('/vote/:questionId/:vote', (req, res) => {
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

// app.get('/', (req, res) => {
// 	res.sendFile(__dirname + '/views/info.html');
// });

ApiRouter.post('/addquestion', (req, res) => {
	// TODO create question with mongoose
	QuestionModel.create({
		content: req.body.question
	}, (err, questionCreated) => {
		if(err) console.log(err)
		else res.redirect('/');
	});
});

module.exports = ApiRouter;