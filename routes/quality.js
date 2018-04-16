var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs("mongodb://lenden2:lenden123@ds237389.mlab.com:37389/lenden", ['Quality']);

var Quality= require("../models/Quality");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all', function(req, res, next){
  db.Quality.find(function(err, Quality){
      if(err){
          res.send(err);
      }
      res.json(Quality);
  });
});

// Get Single Quality
router.get('/quality/:id', function(req, res, next){
  db.Quality.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, Quality){
      if(err){
          res.send(err);
      }
      res.json(Quality);
  });
});

router.get('/add', function(req, res, next){
  res.render("addQuality");
});


router.post('/add', function(req, res, next){
  var task = req.body;
      db.Quality.save(task, function(err, task){
          if(err){
              res.send(err);
          }
          res.json(task);
      });
});

/*router.post('/signin', function(req, res, next){
  var task = req.body;
      db.Quality.save(task, function(err, task){
          if(err){
              res.send(err);
          }
          res.json(task);
      });
});*/

module.exports = router;
