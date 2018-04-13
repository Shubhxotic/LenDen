var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/Users', function(req, res, next){
  db.User.find(function(err, User){
      if(err){
          res.send(err);
      }
      res.json(User);
  });
});

// Get Single User
router.get('/User/:id', function(req, res, next){
  db.User.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, User){
      if(err){
          res.send(err);
      }
      res.json(User);
  });
});

router.get('/addUser', function(req, res, next){
  res.render("addUser");
});

router.post('/addUser', function(req, res, next){
  var task = req.body;
      db.User.save(task, function(err, task){
          if(err){
              res.send(err);
          }
          res.json(task);
      });
});



module.exports = router;
