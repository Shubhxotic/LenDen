var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var nodemailer = require('nodemailer');
var db = mongojs("mongodb://lenden2:lenden123@ds237389.mlab.com:37389/lenden", ['User']);
<<<<<<< HEAD
var User= require("../models/User");

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: "preetisethi0@gmail.com",
        pass: "siddhant"
    }
});


=======

var User= require("../models/user");
/* GET users listing. */
>>>>>>> 9a9e7b9b5e6044e116ecda0a2477b91571b38853
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

router.route("/signin").get(function (req, res) {
  res.render("homepage");
})

router.route("/signup").get(function (req, res) {
  res.render("homepage");
})

// Get Single User
router.get('/user/:id', function(req, res, next){
  db.User.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, User){
      if(err){
          res.send(err);
      }
      res.json(User);
  });
});

router.post('/signup', function(req, res, next){
  var task = req.body;
      db.User.save(task, function(err, task){
          if(err){
            alert("Error");    
              res.json({success: false, msg: "Failed to register User"});
          }
<<<<<<< HEAD
=======
          alert(JSON.stringify(task,null,2));
          res.json({success: true, user: task});
>>>>>>> 9a9e7b9b5e6044e116ecda0a2477b91571b38853
      });
      var user = req.body.user;
        var mailOptions={
            to : user,
            subject : 'email from nodeJS',
            text : 'Yayy! it finally worked!'
        }
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response){
         if(error){
                console.log(error);
            res.end("error");
         }else{
                console.log("Message sent");
            //res.end("sent");
          }
    });
});

router.post('/signin', function(req, res, next){
  var user = req.body.email;
  db.User.findOne({user: mongojs.ObjectId(req.params.email)}, function(err, User){
      if(err){
          res.send(err);
      }
      res.json(User);
  });
});

module.exports = router;
