var express = require('express');
var session = require('express-session');
var router = express.Router();
var mongojs = require('mongojs');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var db = mongojs("mongodb://lenden2:lenden123@ds237389.mlab.com:37389/lenden", ['User']);
var User= require("../models/user");

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: "preetisethi0@gmail.com",
        pass: "siddhant"
    }
});


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
});

/*router.route("/signup").get(function (req, res) {
  res.render("homepage");
})*/

// Get Single User
router.get('/user/:id', function(req, res, next){
  db.User.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, User){
      if(err){
          res.send(err);
      }
      res.json(User);
  });
});

router.get('/user/:email', function(req, res, next){
  db.User.findOne({email: req.params.user}, function(err, User){
    console.log("req.params.user "+req.params.user);
    console.log("email "+email);
      if(!err){
          res.send(err);
          alert('This email is already registered!');
      }
    });
    });



var sess;

router.post('/signup', function(req, res, next){
  var task = req.body;
  console.log(task);
  sess = req.session;
  sess.user = req.body.username;
  console.log(req.body.username);
  console.log(sess.user);
  if(sess.user) {
  res.write('<h1>Hello '+sess.username+'</h1>');
  res.end('<a href="+">Logout</a>');
  } else {
      res.write(' <h1>Please login first.</h1>');
      res.end('<a href="+">Login</a>');
  }
});
  /*db.User.save(task, function(err, task){
          if(err){
             alert("Error");
              res.json({success: false, msg: "Failed to register User"});
          }*/
          //db.User.save({AdminToken : 0, RewardPts : 200, task}); //saving in two different documents //why???


                  /*var user = req.body.user;
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
                           //res.render("homepage");
                      }
              });*/
/*            });
            };

});
});*/

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
