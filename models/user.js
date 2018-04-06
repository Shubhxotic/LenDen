const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({
	User_Id:{
		type: Number,
		required: true
	},
	Name:{
		type: String,
		required: true
	},
	MobileNo:{
		type: String,
		required: true
	},
	Address:{
		type: String,
		required: true
	},
	Points:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	ProductsLen:{
		type: String,
		required: true
	},
	ProductDen:{
		type: String,
		required: true
	},
	ProductWishlist:{
		type: String,
		required: true
	}
});

const User = module.exports = mongoose.model('User', userSchema);
