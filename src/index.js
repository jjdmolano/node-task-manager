const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Create endpoints
// Users
app.post('/users', async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		res.status(201).send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

// Tasks
app.post('/tasks', async (req, res) => {
	const task = new Task(req.body);

	try {
		await task.save();
		res.status(201).send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});

// Read endpoints
// Users
app.get('/users', async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users);
	} catch (e) {
		res.status(500).send();
	}
});

app.get('/users/:id', async (req, res) => {
	const _id = req.params.id;

	try {
		const user = await User.findById(_id);
		!user ? res.status(404).send() : res.send(user);
	} catch (e) {
		res.status(500).send();
	}
});

// Tasks
app.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find({});
		res.send(tasks);
	} catch (e) {
		res.status(500).send();
	}
});

app.get('/tasks/:id', async (req, res) => {
	const _id = req.params.id;

	try {
		const task = await Task.findById(_id);
		!task ? res.status(404).send() : res.send(task);
	} catch (e) {
		res.status(500).send();
	}
});

// Update endpoints
// Users
app.patch('/users/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdate = ['name', 'email', 'password', 'age'];
	const isValidUpdate = updates.every(update =>
		allowedUpdate.includes(update)
	);

	if (!isValidUpdate) {
		return res.status(400).send({ error: 'Invalid updates!' });
	}
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});
		!user ? res.status(404).send() : res.send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

// Tasks
app.patch('/tasks/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdate = ['description', 'completed'];
	const isValidUpdate = updates.every(update =>
		allowedUpdate.includes(update)
	);

	if (!isValidUpdate) {
		return res.status(400).send({ error: 'Invalid updates!' });
	}

	try {
		const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});
		!task ? res.status(404).send() : res.send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});

// Delete endpoints
// Users
app.delete('/users/:id', async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		!user ? res.status(404).send() : res.send(user);
	} catch (e) {
		res.status(500).send();
	}
});

// Tasks
app.delete('/tasks/:id', async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);
		!task ? res.status(404).send() : res.send(task);
	} catch (e) {
		res.status(500).send();
	}
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
