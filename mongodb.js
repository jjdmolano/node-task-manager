// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;
const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());
// console.log(id.id.length);
// console.log(id.toHexString().length);

MongoClient.connect(
	connectionURL,
	{ useUnifiedTopology: true, useNewUrlParser: true },
	(error, client) => {
		if (error) {
			return console.log('Unable to connect to database! ❌');
		}

		const db = client.db(databaseName);

		// CRUD - Create, Read, Update, Delete

        // Create
		// db.collection('users').insertOne(
		// 	{
        //         _id: id,
		// 		name: 'Vikran',
		// 		age: 26
		// 	},
		// 	(error, result) => {
		// 		if (error) {
		// 			return console.log('Unable to insert user! ❌');
		// 		}

		// 		console.log(result.ops);
		// 	}
		// );

		// db.collection('users').insertMany(
		// 	[
		// 		{
		// 			name: 'Jen',
		// 			age: 28
		// 		},
		// 		{
		// 			name: 'Gunther',
		// 			age: 27
		// 		}
		// 	],
		// 	(error, result) => {
		// 		if (error) {
		// 			return console.log('Unable to insert documents! ❌');
		// 		}

		// 		console.log(result.ops);
		// 	}
		// );

		// db.collection('tasks').insertMany(
		// 	[
		// 		{
		// 			description: 'Fix bed',
		// 			completed: true
		// 		},
		// 		{
		// 			description: 'Make coffee',
		// 			completed: false
		// 		},
		// 		{
		// 			description: 'Log attendance',
		// 			completed: true
		// 		}
		// 	],
		// 	(error, result) => {
		// 		if (error) {
		// 			return console.log('Unable to insert documents! ❌');
		// 		}

		// 		console.log(result.ops);
		// 	}
		// );
	}
);
