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
		// 		name: 'Andrew',
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

		// Read
		// findOne
		// db.collection('users').findOne({ _id: new ObjectID("60af50cc4d013d3c58acd525") }, (error, user) => {
		//     if (error) {
		//         return console.log('Unable to fetch');
		//     }

		//     console.log(user);
		// })

		// find multiple
		// db.collection('users').find({ age: 26 }).toArray((error, users) => {
		//     if (error) {
		//         return console.log('Unable to fetch');
		//     }
		//     console.log(users);
		// });

		// Update
		// db.collection('users')
		// 	.updateOne(
		// 		{
		// 			_id: new ObjectID('60af50cc4d013d3c58acd525')
		// 		},
		// 		{
		// 			// $set: {
		// 			// 	name: 'Michael'
		// 			// }
		//             $inc: {
		//                 age: 1
		//             }
		// 		}
		// 	)
		// 	.then(result => {
		// 		console.log(result);
		// 	})
		// 	.catch(error => {
		// 		console.log(error);
		// 	});

		// 	db.collection('tasks')
		// 		.updateMany(
		// 			{
		// 				completed: false
		// 			},
		// 			{
		// 				$set: {
		// 					completed: true
		// 				}
		// 			}
		// 		)
		// 		.then(result => {
		// 			console.log(result);
		// 		})
		// 		.catch(error => {
		// 			console.log(error);
		// 		});

		// Delete
		// db.collection('users')
		// 	.deleteMany({
		// 		age: 26
		// 	})
		// 	.then(result => {
		// 		console.log(result);
		// 	})
		// 	.catch(error => {
		// 		console.log(error);
		// 	});

		// db.collection('tasks')
		// 	.deleteOne({
		// 		description: 'Fix bed'
		// 	})
		// 	.then(result => {
		// 		console.log(result);
		// 	})
		// 	.catch(error => {
		// 		console.log(error);
		// 	});
	}
);
