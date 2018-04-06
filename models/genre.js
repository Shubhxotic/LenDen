
// import { type } from "os";

var mongoose= require("mongoose");

var genreSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

Genre = module.exports = mongoose.model('Genre',genreSchema,"genres");

module.exports.getGenres = function(callback, limit){
    // var x=Genre.find();
    // console.log("Genre.find==="+x);
    // console.log(Genre.find());
    Genre.find(callback).limit(limit);
}

module.exports.getGenresByid = function(id,callback){
    // var x=Genre.find();
    // console.log("Genre.find==="+x);
    // console.log(Genre.find());
    Genre.findById(id,callback);
}

//Add Genre

module.exports.addGenres = function(genre,callback){
    // var x=Genre.find();
    // console.log("Genre.find==="+x);
    // console.log(Genre.find());
    // Genre.find(callback).limit(limit);
    Genre.create(genre,callback);
}


module.exports.updateGenre = function(id,genre,options,callback){
    var query = {_id:id}    
    var update = {
        name: genre.name
    }
    Genre.findOneAndUpdate(query,update,options,callback);
}

module.exports.deleteGenre = function(id,callback){
    var query = {_id:id}    
    Genre.remove(query,callback);
}