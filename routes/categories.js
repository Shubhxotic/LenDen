var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs("mongodb://lenden2:lenden123@ds237389.mlab.com:37389/lenden", ['Category']);
var Category= require("../models/Category");

// console.log("In categories")
router.get('/all', function(req, res, next){
    db.Category.find(function(err, Category){
      if(err){
          res.send(err);
      }
      res.json(Category);
  });
});

// Get Single Category
router.get('/Cat/:id', function(req, res, next){
  db.Category.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, Category){
      if(err){
          res.send(err);
      }
      res.json(Category);
  });
});

router.get('/add', function(req, res, next){
  res.render("addCategory");
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
