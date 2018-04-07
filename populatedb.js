#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Category = require('./models/Category');
var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Categories = []

function CategoryCreate(Cat_id, CategoryName, Subcategories,CategoryImage, cb) {
  catDet = {Cat_id:Cat_id , CategoryName:CategoryName,  Subcategories:Subcategories,CategoryImage:CategoryImage }
  
  var category = new Category(catDet);
       
  category.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Category: ' + category);
    Categories.push(category)
    cb(null, category)
  }  );
}

function createCategories(cb) {
    async.parallel([
        function(callback) {
            CategoryCreate(1, 'Electronics', '1,2,4', "http://someimage.png" , callback);
        }
        ],
        // optional callback
        cb);
}





async.series([
    createCategories
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKInstances: ');
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




