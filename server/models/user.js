const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('User',{
	email:{
		type: String,
		required: false,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{Value} is not a valid email' 
		},
		password: {
			type: String,
			require: true,
			minLength: 6
		},
		tokens: [{
			access: {
				type: String,
				required: true
			},
			tokens:{
				type: String,
				required: true
			}
		}]
	}
});

module.exports = {User};