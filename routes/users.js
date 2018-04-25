var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var db = mongojs("mongodb://lenden2:lenden123@ds237389.mlab.com:37389/lenden", ['User']);

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
  console.log("ixjfiosdoifsodif sdiof sdif ds f\n\n\n\n\\n\n\nn\n\n\n\n\nn\n\nn");
  var task = req.body;
  console.log(task);
  db.User.pre('save', function (next) {
  var user = this;
  console.log("user"+user);
  bcrypt.hash(user.Password, 10, function (err, hash){
  if (err) {
   return next(err);
   console.log(err);
  }
  user.Password = hash;
  console.log('hashed');
  next();
  })
      db.User.save(task, function(err, task){
          if(err){
            alert("Error");
              res.json({success: false, msg: "Failed to register User"});
          }

          });
          router.get('/user/:email', function(req, res, next){
            db.User.findOne({user:  req.params.email}, function(err, User){
                if(err){
                    alert('This email is already registered!')
                    console.log('duplicate email');
                }
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
          });


          // alert(JSON.stringify(task,null,2));
          // res.json({success: true, user: task});
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
