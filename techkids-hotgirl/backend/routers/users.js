const express = require('express');
const UserRouter = express.Router();

const UserModel = require('../models/users');

// CRUD

// Get many
UserRouter.get('/', (req, res) => {
	UserModel.find({}, (err, users) => {
		if(err) res.send({ success: false, err })
		else res.send({ success: true, data: users });
	});
});

// Get one by id
UserRouter.get('/:id', (req, res) => {
	const id = req.params.id;
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
	// const { id } = req.params;

	UserModel.findById(id, (err, userFound) => {
		if(err) res.send({ success: false, err })
		else if(!userFound) res.send({ success: false, err: 'User not exist!' })
		else res.send({ success: true, data: userFound });
	});
});

// Create
UserRouter.post('/', (req, res) => {
	UserModel.create(req.body, (err, userCreated) => {
		if(err) res.send({ success: false, err })
		else res.send({ success: true, data: userCreated });
	});
});

// Update
UserRouter.put('/:id', (req, res) => {
	const id = req.params.id;

	// UserModel.findByIdAndUpdate(
	// 	id,
	// 	req.body,
	// 	{ new: true },
	// 	(err, userUpdated) => {
	// 		if(err) res.send({ success: false, err })
	// 		else res.send({ success: true, data: userUpdated })
	// 	});

	UserModel.findById(id, (err, userFound) => {
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
UserRouter.delete('/:id', (req, res) => {
	const id = req.params.id;

	UserModel.findByIdAndRemove(id, (err) => {
		if(err) res.send({ success: false, err })
		else res.send({ success: true, data: null });
	});
});

module.exports = UserRouter;
