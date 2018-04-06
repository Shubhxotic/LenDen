const mongoose = require('mongoose');

// Product Schema
const productsDenSchema = mongoose.Schema({
	Id:{
		type: Number,
		required: true
	},
	Product_Id:{
		type: Number,
		required: true
	},
	User_Id:{
		type: Number,
    required: true
	},
	Quality_Id:{
		type: Number,
		required: true
	},
	Quality_before:{
		type: String,
    required: true
	},
	Quality_after:{
		type: Number,
    required: true
	},
  Den_date:{
		type: Date,
		default: Date.now
	}
});

const ProductsDen = module.exports = mongoose.model('ProductsDen', productDenSchema);
