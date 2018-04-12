const mongoose = require('mongoose');

const qualitySchema = mongoose.Schema({
	Quality_Id:{
		type: Number,
		required: true
	},
	Subcat_id:{
		type: Number,
		required: true
	},
	Parameters:{
        type: String,
        required: true
	}
});

const Quality = module.exports = mongoose.model('Quality', qualitySchema);

// // Get Books
// module.exports.getBooks = (callback, limit) => {
// 	Book.find(callback).limit(limit);
// }

// // Get Book
// module.exports.getBookById = (id, callback) => {
// 	Book.findById(id, callback);
// }

// // Add Book
// module.exports.addBook = (book, callback) => {
// 	Book.create(book, callback);
// }

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

// // Delete Book
// module.exports.removeBook = (id, callback) => {
// 	var query = {_id: id};
// 	Book.remove(query, callback);
// }