const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const QuestionSchema = new Schema({
	yes: {
		type: Number,
		default: 0
	},
	no: {
		type: Number,
		default: 0
	},
	content: {
		type: String,
		required: true
	}
});

module.exports = model('Question', QuestionSchema);
// QuestionModel.find({}, (err, questions) => {
// 	if(err) console.log(err)
// 	else console.log('Question: ', questions);
// });

// QuestionModel.create({
// 	content: "Hello",
// 	yes: 1000
// }, (err, questionCreated) => {
// 	if(err) console.log(err)
// 	else console.log('questionCreated: ', questionCreated);
// });