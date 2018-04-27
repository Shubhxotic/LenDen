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
          to : task.email,
          subject : 'Love from Lenden! ',
          text : 'Hey, a loved one just remembered you :) Lenden wishes you a happy life ahead! Check this out: assets.myntassets.com/assets/images/2017/5/3/11493788297416-125552-iqv7e6.png'
      }

        console.log(mailOptions);

        smtpTransport.sendMail(mailOptions, function(error, response){
         if(error){
                console.log(error);
            res.end("error");
            res.render("giftcards",{data: req.body,status:'APOLOGY NOTICE: We could not send your giftcard, why not buy a gift item with your Lenden credits?'});
         }else{
                console.log("Message sent");
              //  res.redirect("/");
                res.render("giftcards",{data: req.body,status:'SUCCESS NOTICE: We sent your giftcard, why not buy a gift item with your Lenden credits?'});
            //res.end("sent");
          }
            });
      //  res.redirect("/");
        });

        module.exports = router;
