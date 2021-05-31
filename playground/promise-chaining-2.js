require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('60b4552bacdbf710084eb6ba')
	.then(task => {
		console.log(task);
		return Task.countDocuments({ completed: false });
	})
	.then(result => console.log(result))
	.catch(e => console.log(e));
