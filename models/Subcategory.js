const mongoose = require('mongoose');

// Book Schema
const subcatSchema = mongoose.Schema({
	Subcat_id:{
		type: Number,
		required: true
	},
	SubcatName:{
		type: String,
		required: true
	},
	CatId:{
		type: Number,
		required: true
	},
	Quality_Id:{
		type: String,
		required: true
	}
});

const subcategory = module.exports = mongoose.model('Subcategory', subcatSchema);
//
// // Get Books
// module.exports.getBooks = (callback, limit) => {
// 	Book.find(callback).limit(limit);
// }
//
// // Get Book
// module.exports.getBookById = (id, callback) => {
// 	Book.findById(id, callback);
// }
//
// // Add Book
// module.exports.addBook = (book, callback) => {
// 	Book.create(book, callback);
// }
//
// // Update Book
// module.exports.updateBook = (id, book, options, callback) => {
// 	var query = {_id: id};
// 	var update = {
// 		title: book.title,
// 		genre: book.genre,
// 		description: book.description,
// 		author: book.author,
// 		publisher: book.publisher,
// 		pages: book.pages,
// 		image_url: book.image_url,
// 		buy_url: book.buy_url
// 	}
// 	Book.findOneAndUpdate(query, update, options, callback);
// }
//
// // Delete Book
// module.exports.removeBook = (id, callback) => {
// 	var query = {_id: id};
// 	Book.remove(query, callback);
// }
