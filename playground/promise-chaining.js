require('../src/db/mongoose');
const User = require('../src/models/user');

// Promise chaining
// User.findByIdAndUpdate('60b0918e585dec45a86277d6', { age: 1 })
// 	.then(user => {
// 		console.log(user);
// 		return User.countDocuments({ age: 1 });
// 	})
// 	.then(result => console.log(result))
// 	.catch(e => console.log(e));

// Same function as above but using async await instead
const updateAgeAndCount = async (id, age) => {
	const user = await User.findByIdAndUpdate(id, { age });
	const count = await User.countDocuments({ age });
	return count;
};

updateAgeAndCount('60b0918e585dec45a86277d6', 2)
	.then(count => console.log(count))
	.catch(e => console.log(e));
