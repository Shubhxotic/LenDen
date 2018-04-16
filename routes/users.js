var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs("mongodb://lenden2:lenden123@ds237389.mlab.com:37389/lenden", ['User']);

<<<<<<< HEAD
=======
var User= require("../models/User");
>>>>>>> 2d307be720854247260f7c8ff3e2950e2c61e7f0
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all', function(req, res, next){
  db.User.find(function(err, User){
      if(err){
          res.send(err);
      }
      res.json(User);
  });
});

// Get Single User
router.get('/user/:id', function(req, res, next){
  db.User.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, User){
      if(err){
          res.send(err);
      }
      res.json(User);
  });
});

router.get('/signin', function(req, res, next){
  res.render("authentication");
});

router.get('/signup', function(req, res, next){
  res.render("authentication");
});

router.post('/signup', function(req, res, next){
  var task = req.body;
      db.User.save(task, function(err, task){
          if(err){
            alert("Error");    
              res.json({success: false, msg: "Failed to register User"});
          }
          alert(JSON.stringify(task,null,2));
          res.json({success: true, user: task});
      });
});

/*router.post('/signin', function(req, res, next){
  var task = req.body;
      db.User.save(task, function(err, task){
          if(err){
              res.send(err);
          }
          res.json(task);
      });
});*/

module.exports = router;
