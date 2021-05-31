require('../src/db/mongoose');
const Task = require('../src/models/task');

// Promise chaining
// Task.findByIdAndDelete('60b4552bacdbf710084eb6ba')
// 	.then(task => {
// 		console.log(task);
// 		return Task.countDocuments({ completed: false });
// 	})
// 	.then(result => console.log(result))
// 	.catch(e => console.log(e));

// Same function as above but using async await instead
const deleteTaskAndCount = async id => {
	const task = await Task.findByIdAndDelete(id);
	const count = await Task.countDocuments({ completed: false });
	return count;
};

deleteTaskAndCount('60b06d60e89ad13f6003309c')
	.then(count => console.log(count))
	.catch(e => console.log(e));
