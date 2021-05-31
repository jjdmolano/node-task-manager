require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('60b0918e585dec45a86277d6', { age: 1 })
	.then(user => {
		console.log(user);
		return User.countDocuments({ age: 1 });
	})
	.then(result => console.log(result))
	.catch(e => console.log(e));
