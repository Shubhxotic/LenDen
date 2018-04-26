var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var nodemailer = require('nodemailer');
var session = require('express-session');
var bodyParser = require('body-parser');
var db = mongojs("mongodb://lenden2:lenden123@ds237389.mlab.com:37389/lenden", ['User']);
var User= require("../models/user");
// var pupup=require("popups");


var sess;

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
  console.log("Entered signup");
        task["AdminToken"] = "0";
        console.log("asdiashdioashidhasoidhoiasdhiasdhoiasdo");
        task["RewardPts"] = "200";
        console.log("asdiashdioashidhasoidhoiasdhiasdhoiasdo");

        task["Wishlist"] = "";
        console.log("asdiashdioashidhasoidhoiasdhiasdhoiasdo");

        task["Cart"] = "";

        console.log("asdiashdioashidhasoidhoiasdhiasdhoiasdo");
        console.log("User object= "+JSON.stringify(task));
        db.User.find({email: task.email}, function(err, userx){
            // console.log(JSON.stringify(userx));
            if(err){
                res.json(err);
            }
            if(userx.length!=0){
                // alert("This Email is Already Registered.");
                // popup.alert({ 
                //     content: "This Email is Already Registered."
                // })
                console.log("This Email is Already Registered.");
                res.send("Already Registered");
            }    
      db.User.save(task, function(err, task){
          if(err){
            alert("Error");    
              res.json({success: false, msg: "Failed to register User"});
          }
      var email = req.body.email;
        var mailOptions={
            to : email,
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
                res.redirect("/");
            //res.end("sent");
          }
            });
        });
    });
});

router.post('/signin', function(req, res, next){
  var emails = req.body.email;
  sess=req.session;
  console.log("Session=  "+JSON.stringify(sess)+" \n\n\n\n\n");
  console.log("email= "+emails);
  db.User.findOne({email: emails}, function(err, User){
      if(err){
        alert("This Email is not Registered.");
        res.render("/"); 
        // res.send("Error occured:- "+JSON.stringify(err));
      }
      console.log("User=   "+JSON.stringify(User)+"\n\n\n\n\n\n\n");
      if(User.pass==req.body.pass)
      {
        sess.email=User.email;
        sess.username=User.username;  
          //   sess[email]=emails;
      }
      res.json(User);
  });
});



router.get('/logout',function(req,res){
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
});

module.exports = router;
