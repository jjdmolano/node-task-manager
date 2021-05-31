const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Create endpoints
app.post('/users', (req, res) => {
	const user = new User(req.body);
	user.save()
		.then(() => {
			res.status(201).send(user);
		})
		.catch(e => {
			res.status(400).send(e);
		});
});

app.post('/tasks', (req, res) => {
	const task = new Task(req.body);
	task.save()
		.then(() => {
			res.status(201).send(task);
		})
		.catch(e => {
			res.status(400).send(e);
		});
});

// Read endpoints
app.get('/users', (req, res) => {
    User.find({}).then(users => {
        res.send(users)
    }).catch(e => {
        res.status(500).send()
    })
})

app.get('/users/:id', (req, res) => {
    User.findById(req.params.id).then(user => {
        !user ? res.status(404).send() : res.send(user)
    }).catch(e => {
        res.status(500).send()
    })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then(tasks => {
        res.send(tasks)
    }).catch(e => {
        res.status(500).send()
    })
})

app.get('/tasks/:id', (req, res) => {
    Task.findById(req.params.id).then(task => {
        !task ? res.status(404).send() : res.send(task)
    }).catch(e => {
        res.status(500).send()
    })
})

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
