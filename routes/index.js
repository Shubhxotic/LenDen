var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs("mongodb://lenden2:lenden123@ds237389.mlab.com:37389/lenden", ['Category','User',"Product", "ProductsDen"]);

/*var Category= require("../models/Category");
var Subcategory= require("../models/Subcategory");
var Product= require("../models/Product");
var ProductsDen= require("../models/ProductsDen");
var Quality= require("../models/quality");
var Parameter= require("../models/parameter");*/

router.route("/login").get(function (req, res) {
  res.render("authentication");
})



router.get("/",function (req, res,next) {
  console.log(req.session.email);
  db.Category.find(function(err, Category){
    if(err){
      res.send(err);
    }
  //   res.json(Category);
  res.render("homepage",{Categories: Category});
})
})


router.get("/temp",function(req,res,next){
  res.render('temp');
})

router.get("/profile",function(req,res,next){
  console.log("req.user= "+req.user);
  db.User.findOne({user: req.user}, function(err, User){
    if(err){
      res.send(err);
    }
    console.log("User Extracted =  "+JSON.stringify(User)+"\n\n\n");
    res.render('personalinfo', {csslinks: ['https://www.w3schools.com/w3css/4/w3.css','https://fonts.googleapis.com/css?family=Raleway'],
      css: ['account.css'], layout: "profilepages", User: User
    });
  });
})

router.get("/profile/prodborrowed",function(req,res,next){
  db.ProductsDen.find({User_id: req.user}, function(err, Product){
    if(err){
      res.send(err);
    }
    res.render('productsborrowed', {csslinks: ['https://www.w3schools.com/w3css/4/w3.css','https://fonts.googleapis.com/css?family=Raleway'],
      css: ['account.css'], layout: "profilepages", Products: Product
    });
  });
});

router.get("/profile/addressChange",function(req,res,next){
  res.render('addressChange', {csslinks: ['https://www.w3schools.com/w3css/4/w3.css','https://fonts.googleapis.com/css?family=Raleway'],
    css: ['account.css'], layout: "profilepages"
  });
});



router.post("/profile/addressChange",function(req,res,next){
  
 
  // res.render('addressChange', {csslinks: ['https://www.w3schools.com/w3css/4/w3.css','https://fonts.googleapis.com/css?family=Raleway'],
  //   css: ['account.css'], layout: "profilepages"
  // });
});


router.get("/profile/prodlent",function(req,res,next){
  // Extract Products according to User_id. These are the Products Lent
  db.Product.find({User_id:  mongojs.ObjectId(req.user)}, function(err, Product){
    if(err){
      res.send(err);
    }
  res.render('productslent', {csslinks: ['https://www.w3schools.com/w3css/4/w3.css','https://fonts.googleapis.com/css?family=Raleway'],
    css: ['account.css'], layout: "profilepages"
    });
  });
});

router.get("/profile/giftcards",function(req,res,next){
  res.render('giftcards', {csslinks: ['https://npmcdn.com/flickity@2/dist/flickity.css','https://www.w3schools.com/w3css/4/w3.css','https://fonts.googleapis.com/css?family=Raleway'],
    css: ['account.css', 'gift.css'], layout: "profilepages"
  });
});


router.get("/profile/prodborrowed",function(req,res,next){
  res.render('productsborrowed', {csslinks: ['https://www.w3schools.com/w3css/4/w3.css','https://fonts.googleapis.com/css?family=Raleway'],
    css: ['account.css'], layout: "profilepages"
  });
});

router.get("/profile/wishlist",function(req,res,next){
  res.render('productswishlist', {csslinks: ['https://www.w3schools.com/w3css/4/w3.css','https://fonts.googleapis.com/css?family=Raleway'],
    css: ['account.css'], layout: "profilepages"
  });
});

router.get("/profile/lendencred",function(req,res,next){

  db.User.findOne({user: req.user}, function(err, User){
    if(err){
      res.send(err);
    }
  res.render('lendencredits', {csslinks: ['https://www.w3schools.com/w3css/4/w3.css','https://fonts.googleapis.com/css?family=Raleway'],
    css: ['account.css'], layout: "profilepages", User: User
    });
  });
});

// });

// router.get("/profile/prodborrowed",function(req,res,next){
//   res.render('productsborrowed');
// });

// router.get("/profile/prodlent",function(req,res,next){
//   res.render('productslent');
// });

// router.get("/profile/giftcards",function(req,res,next){
//   res.render('giftcards');
// });


// router.get("/profile/prodborrowed",function(req,res,next){
//   res.render('productsborrowed');
// });

// router.get("/profile/wishlist",function(req,res,next){
//   res.render('productswishlist');
// });

// router.get("/profile/lendencred",function(req,res,next){
//   res.render('lendencredits');
// });

router.get("/contact",function(req,res,next){
  res.render('contactus', {csslinks: ['https://www.w3schools.com/w3css/4/w3.css','https://fonts.googleapis.com/css?family=Raleway'],
    css: ['account.css']
  });
})

router.route("/prodDesc").get(function (req, res) {
  res.render("lenden_pd" , {css:['style.css']});
})

router.route("/subcat").get(function (req, res) {
  res.render("subcat_filters",{css: ["subcat_filters.css"]});
})

router.route("/shoppingcart").get(function (req, res) {
  res.render("navbar");
})



router.get('/upload', function(req, res, next){
  res.render("upload_item");
});

router.post('/upload', function(req, res, next){
var task = req.body;

    db.Category.save(task, function(err, task){
        if(err){
            res.send(err);
            res.render("upload",{data: req.body,status:'Failed!'});
        }
        res.json(task);
        res.render("addProduct",{data: req.body,status:'Added!'});

    }
  );
});


router.route("/addtocart/:productid").post(function (req, res) {
  db.User.findOne({user: req.user}, function(err, User){
    if(err){
      res.send(err);
    }
    User["Cart"]=User["Cart"]+","+req.params.productid;
    db.User.save(User, function(err, user){
      if(err){
        res.send(err);
      }
      res.render("navbar" , {User: user});
      // res.json(task);
    });
  })
});

router.route("/addtowishlist/:productid").post(function (req, res) {
  db.User.findOne({_id: mongojs.ObjectId("5ad7b271bc3ca22eb0bbecd9")}, function(err, User){
    if(err){
      res.send(err);
    }
    User["Wishlist"]=User["Wishlist"]+","+req.params.productid;
    console.log("New User Object= "+JSON.stringify(User));
    db.User.save(User, function(err, user){
      if(err){
        res.send(err);
      }
    // res.render("navbar" , {User: user});
    res.redirect("/profile/")
      // res.json(task);
    });
  })
});

module.exports = router;