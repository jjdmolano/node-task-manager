const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('../models/task');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid');
			}
		}
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 7,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('Password cannot contain "password"');
			}
		}
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Age must be a positive number');
			}
		}
	},
	tokens: [
		{
			token: {
				type: String,
				required: true
			}
		}
	]
});

userSchema.methods.generateAuthToken = async function () {
	const token = jwt.sign({ _id: this._id.toString() }, 'codingbootcamp');

	this.tokens = this.tokens.concat({ token });
	await this.save();

	return token;
};

// define relationship between models without storing this data in the database
userSchema.virtual('tasks', {
	ref: 'Task',
	localField: '_id',
	foreignField: 'owner'
});

// 'user' method to prevent returning user password and token data
userSchema.methods.toJSON = function () {
	const userObject = this.toObject();

	delete userObject.password;
	delete userObject.tokens;
	return userObject;
};

// 'User' method to find user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error('Unable to login');
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error('Unable to login');
	}

	return user;
};

// Password hashing middleware before saving
userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 8);
	}

	next();
});

// Middleware to delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
	await Task.deleteMany({ owner: this._id });
	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
