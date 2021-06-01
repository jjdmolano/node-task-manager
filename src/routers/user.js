const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
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

// Logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
});

// Logout and remove all tokens
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
});

// Read all profiles
// router.get('/users', auth, async (req, res) => {
// 	try {
// 		const users = await User.find({});
// 		res.send(users);
// 	} catch (e) {
// 		res.status(500).send();
// 	}
// });

// Read own user profile
router.get('/users/me', auth, async (req, res) => {
	res.send(req.user);
});

// Read targeted user
router.get('/users/:id', async (req, res) => {
	const _id = req.params.id;

	try {
		const user = await User.findById(_id);
		!user ? res.status(404).send() : res.send(user);
	} catch (e) {
		res.status(500).send();
	}
});

// Update user
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

// Delete user
router.delete('/users/:id', async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		!user ? res.status(404).send() : res.send(user);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;
