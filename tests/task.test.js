const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const {
	userOneId,
	userOne,
	userTwoId,
	userTwo,
	taskOne,
	taskTwo,
	taskThree,
	setupDatabase,
	disconnectDatabase
} = require('./fixtures/db');

beforeEach(setupDatabase);

afterAll(disconnectDatabase);

test('Should create task for user', async () => {
	const response = await request(app)
		.post('/tasks')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			description: 'Test task'
		})
		.expect(201);
	const task = await Task.findById(response.body._id);
	expect(task).not.toBeNull();
	expect(task.completed).toEqual(false);
});

test('Should not create task with invalid description/completed', async () => {
	await request(app)
		.post('/tasks')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			description: ''
		})
		.expect(400);

	await request(app)
		.post('/tasks')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			completed: 'yes'
		})
		.expect(400);
});

test('Should get tasks for user', async () => {
	const response = await request(app)
		.get('/tasks')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);
	expect(response.body.length).toEqual(2);
});

test('Should get only completed tasks for user', async () => {
	const response = await request(app)
		.get('/tasks?completed=true')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);
	expect(response.body.length).toEqual(1);
});

test('Should get only incomplete tasks for user', async () => {
	const response = await request(app)
		.get('/tasks?completed=false')
		.set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
		.send()
		.expect(200);
	expect(response.body.length).toEqual(0);
});

test('Should get task for user by ID', async () => {
	await request(app)
		.get(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
        .expect(200);
});

test('Should not get task for other users by ID', async () => {
	await request(app)
		.get(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
		.send()
        .expect(404);
});

test('Should not get task for user by ID if unauthenticated', async () => {
	await request(app)
		.get(`/tasks/${taskOne._id}`)
		.send()
        .expect(401);
});

test('Should not update task with invalid description/completed', async () => {
	await request(app)
		.patch(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			description: ''
		})
		.expect(400);

	await request(app)
		.patch(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			completed: ''
		})
		.expect(400);
});

test('Should not update task of other users', async () => {
	await request(app)
		.patch(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
		.send({
			description: ''
		})
		.expect(404);
    const task = await Task.findById(taskOne._id);
    expect(task.description).toBe('Task One');
});

test('Should not delete tasks for user if unauthenticated', async () => {
	await request(app)
		.delete(`/tasks/${taskOne._id}`)
		.send()
		.expect(401);
});

test('Should not delete tasks of other users', async () => {
	await request(app)
		.delete(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
		.send()
		.expect(404);
	const task = await Task.findById(taskOne._id);
	expect(task).not.toBeNull();
});
