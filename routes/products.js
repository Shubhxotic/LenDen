var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs("mongodb://lenden2:lenden123@ds237389.mlab.com:37389/lenden", ['Product']);

var Product= require("../models/Product");

router.get('/all', function(req, res, next){
    db.Product.find(function(err, Product){
      if(err){
          res.send(err);
      }
      res.json(Product);
  });
});

router.get('/Product/:id', function(req, res, next){
  db.Product.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, Product){
      if(err){
          res.send(err);
      }
      res.json(Product);    
  });
});

router.get('/add', function(req, res, next){
  res.render("addProduct");
});

router.post('/add', function(req, res, next){
  var task = req.body;
      db.Product.save(task, function(err, task){
          if(err){
              res.send(err);
          }
          res.json(task);
      });
});

module.exports = router;
