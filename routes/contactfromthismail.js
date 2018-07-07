//user presses "Contact Us" and e-mail is sent to us
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var nodemailer = require('nodemailer');
var session = require('express-session');

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: "lenden010@gmail.com",
        pass: "lenden@123"
    }
});

router.post('/', function(req, res, next){

  var task = req.body;
  var email = task.email;
  var mailOptions={
          to : "lenden010@gmail.com",
          subject : 'Lenden Query from User',
          text : 'Mail from: '+req.body.email+' said that: '+req.body.message
      }

        console.log(mailOptions);

        smtpTransport.sendMail(mailOptions, function(error, response){
         if(error){
                console.log(error);
            res.end("error");
            res.render("contactus",{data: req.body,status:'Failed!'});
         }else{
                console.log("Message sent");
              //  res.redirect("/");
                res.render("contactus",{data: req.body,status:'Success!'});
            //res.end("sent");
          }
            });
      //  res.redirect("/");
        });

        module.exports = router;
