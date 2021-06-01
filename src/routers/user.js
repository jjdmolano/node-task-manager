const express = require('express');
const router = new express.Router();
const User = require('../models/user');

// Create
router.post('/users', async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (e) {
		res.status(400).send(e);
	}
});

// Login
router.post('/users/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (e) {
		res.status(400).send();
	}
});

// Read
router.get('/users', async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users);
	} catch (e) {
		res.status(500).send();
	}
});

router.get('/users/:id', async (req, res) => {
	const _id = req.params.id;

	try {
		const user = await User.findById(_id);
		!user ? res.status(404).send() : res.send(user);
	} catch (e) {
		res.status(500).send();
	}
});

// Update
router.patch('/users/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdate = ['name', 'email', 'password', 'age'];
	const isValidUpdate = updates.every(update =>
		allowedUpdate.includes(update)
	);

	if (!isValidUpdate) {
		return res.status(400).send({ error: 'Invalid updates!' });
	}
	try {
		const user = await User.findById(req.params.id);
		updates.forEach(update => (user[update] = req.body[update]));
		await user.save();

		!user ? res.status(404).send() : res.send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

// Delete
router.delete('/users/:id', async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		!user ? res.status(404).send() : res.send(user);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;
