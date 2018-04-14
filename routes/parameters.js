var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs("mongodb://lenden2:lenden123@ds237389.mlab.com:37389/lenden", ['Parameter']);

var Parameter = require("../models/Parameter");

// console.log("In categories")
router.get('/all', function(req, res, next){
    db.Parameter.find(function(err, Parameter){
      if(err){
          res.send(err);
      }
      res.json(Parameter);
  });
});

// Get Single Category
router.get('/Parameter/:subcat_id', function(req, res, next){
  db.Parameter.findOne({subcat_id: mongojs.ObjectId(req.params.subcat_id)}, function(err, Parameter){
      if(err){
          res.send(err);
      }
      res.json(Parameter);
  });
});

router.get('/add', function(req, res, next){
  res.render("addParameter");
});

router.post('/add', function(req, res, next){
  var task = req.body;
      db.Parameter.save(task, function(err, task){
          if(err){
              res.send(err);
          }
          res.json(task);
      });
});

module.exports = router;
