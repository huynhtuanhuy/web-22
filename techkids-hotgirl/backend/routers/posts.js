const express = require('express');
const PostRouter = express.Router();

const PostModel = require('../models/post');

// CRUD

// Get many
PostRouter.get('/', (req, res) => {
	const page = req.query.page || 1;
	const perPage = req.query.perPage || 5;

	PostModel.count({}, (err, totalPost) => {
		if(err) res.send({ success: false, err })
		else {
			PostModel.find({}, 'author image caption title')
				.populate('author', '-password')
				.skip(perPage*(page - 1))
				.limit(perPage)
				.exec((err, posts) => {
					if(err) res.send({ success: false, err })
					else res.send({ success: true, totalPost, data: posts });
				});
		}
	})
});

// Get one by id
PostRouter.get('/:id', (req, res) => {
	const id = req.params.id;
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
	// const { id } = req.params;

	PostModel.findById(id, (err, userFound) => {
		if(err) res.send({ success: false, err })
		else if(!userFound) res.send({ success: false, err: 'User not exist!' })
		else res.send({ success: true, data: userFound });
	});
});

// Create
PostRouter.post('/', (req, res) => {
	PostModel.create(req.body, (err, userCreated) => {
		if(err) res.send({ success: false, err })
		else res.send({ success: true, data: userCreated });
	});
});

// Update
PostRouter.put('/:id', (req, res) => {
	const id = req.params.id;

	// PostModel.findByIdAndUpdate(
	// 	id,
	// 	req.body,
	// 	{ new: true },
	// 	(err, userUpdated) => {
	// 		if(err) res.send({ success: false, err })
	// 		else res.send({ success: true, data: userUpdated })
	// 	});

	PostModel.findById(id, (err, userFound) => {
		if(err) res.send({ success: false, err })
		else if(!userFound) res.send({ success: false, err: 'User not exist!' })
		else {
			// const objA = {
			// 	a: 10,
			// 	b: 100,
			// }

			// const objB = {
			// 	a: 5,
			// 	b: 6
			// }
			// objB.a = objA.a
			// objB.b = objA.b

			// for(let key in objA) {
			// 	objB[key] = objA[key];
			// }

			for(let key in req.body) {
				userFound[key] = req.body[key];
			}

			userFound.save((err, userUpdated) => {
				if(err) res.send({ success: false, err })
				else res.send({ success: true, data: userUpdated });
			});
		};
	});
});

// Delete
PostRouter.delete('/:id', (req, res) => {
	const id = req.params.id;

	PostModel.findByIdAndRemove(id, (err) => {
		if(err) res.send({ success: false, err })
		else res.send({ success: true, data: null });
	});
});

module.exports = PostRouter;
