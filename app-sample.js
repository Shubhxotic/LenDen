// import { request } from 'https';

var express= require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose= require('mongoose');

app.use(bodyParser.json());

//Connect to Mongoose
mongoose.connect("mongodb://localhost/bookstore");
var db = mongoose.connection;

Genre = require('./models/genre');
Book = require('./models/book');

app.get('/',function(req,res){
    res.send("Hello World");
})

app.get("/api/genres/", function(req,res){
    Genre.getGenres(function(err,genres){
        if(err){
            throw err;
        }
        // console.log(genres);
        res.json(genres);
    });
});

app.get("/api/genres/:_id", function(req,res){
    Genre.getGenresByid(req.params._id, function(err,genre){
        if(err){
            throw err;
        }
        // console.log(genres);
        res.json(genre);
    });
});

app.post("/api/genres/", function(req,res){
    var genre=req.body;
    // console.log(genre);
    Genre.addGenres(genre, function(err,genre){
        if(err){
            throw err;
        }
        // console.log(genres);
        res.json(genre);
    });
});

app.put("/api/genres/:_id", function(req,res){
    var id=req.params._id;
    var genre=req.body;
    // console.log(genre);
    Genre.updateGenre(id,genre,{}, function(err,genre){
        if(err){
            throw err;
        }
        // console.log(genres);
        res.json(genre);
    });
});


app.delete("/api/genres/:_id", function(req,res){
    var id=req.params._id;
    // var genre=req.body;
    // console.log(genre);
    Genre.deleteGenre(id, function(err,genre){
        if(err){
            throw err;
        }
        // console.log(genres);
        res.json(genre);
    });
});


app.get('/api/books', (req, res) => {
	Book.getBooks((err, books) => {
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.get('/api/books/:_id', (req, res) => {
	Book.getBookById(req.params._id, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.post('/api/books', (req, res) => {
	var book = req.body;
	Book.addBook(book, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.put('/api/books/:_id', (req, res) => {
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.delete('/api/books/:_id', (req, res) => {
	var id = req.params._id;
	Book.removeBook(id, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.listen(3000);
console.log("Running on port 3000...");