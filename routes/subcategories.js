var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs("mongodb://lenden2:lenden123@ds237389.mlab.com:37389/lenden", ['Subcategory']);

var Category= require("../models/Subcategory");

// console.log("In subcategories")
router.get('/all', function(req, res, next){
    db.Category.find(function(err, Subcategory){
      if(err){
          res.send(err);
      }
      res.json( Subcategory);
  });
});

// Get Single Category
router.get('/Subcat/:id', function(req, res, next){
  db.Category.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, Subcategory){
      if(err){
          res.send(err);
      }
      res.json(Subcategory);
  });
});

router.get('/add', function(req, res, next){
  res.render("addSubcategory");
});

router.post('/add', function(req, res, next){
  var task = req.body;
      db.Category.save(task, function(err, task){
          if(err){
              res.send(err);
          }
          res.json(task);
      });
});

module.exports = router;
