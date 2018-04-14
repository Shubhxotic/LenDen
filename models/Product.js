const mongoose = require('mongoose');

// Product Schema
const productSchema = mongoose.Schema({
	Product_Id:{
		type: Number,
		required: true
	},
	Cat_Id:{
		type: Number,
		required: true
	},
	Subcat_Id:{
		type: Number,
    required: true
	},
	ProductName:{
		type: String,
		required: true
	},
	ProductImage:{
		type: String,
    required: true
	},
	Price:{
		type: Number,
    required: true
	},
	Description:{
		type: String,
		required: true
	},
	User_Id:{
		type: Number,
    required: true
	}
});

const Product = module.exports = mongoose.model('Product', productSchema);
