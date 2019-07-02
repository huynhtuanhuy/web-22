const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	author: String,
	content: String
}, {
	_id: false,
	versionKey: false
});

const PostSchema = new Schema({
	like: {
		type: Number,
		default: 0
	},
	view: {
		type: Number,
		default: 0
	},
	image: {
		type: String,
		required: true
	},
	caption: String,
	comments: [CommentSchema],
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	title: String
}, {
	timestamps: true // createdAt, updatedAt
});

module.exports = mongoose.model('Post', PostSchema);