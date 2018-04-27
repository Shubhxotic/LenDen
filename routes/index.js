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
  res.render("homepage",{Categories: Category, authenticated: req.session.email});
})
})


router.get("/temp",function(req,res,next){
  res.render('temp');
})

router.get("/profile",function(req,res,next){
  console.log("req.user= "+req.user);
  db.User.findOne({ email: req.session.email }, function(err, User){
    if(err){
      res.send(err);
    }
    console.log("User Extracted =  "+JSON.stringify(User)+"\n\n\n");
    res.render('personalinfo', {csslinks: ['https://www.w3schools.com/w3css/4/w3.css','https://fonts.googleapis.com/css?family=Raleway'],
      css: ['account.css'], layout: "profilepages", User: User, authenticated: req.session.email
    });
  });
})

router.get("/profile/prodborrowed",function(req,res,next){
  db.ProductsDen.find({User_id: req.user}, function(err, Product){
    if(err){
      res.send(err);
    }
    res.render('productsborrowed', {csslinks: ['https://www.w3schools.com/w3css/4/w3.css','https://fonts.googleapis.com/css?family=Raleway'],
      css: ['account.css'], layout: "profilepages", Products: Product, authenticated: req.session.email
    });
  });
});

router.get("/profile/addressChange",function(req,res,next){
  res.render('addressChange', {csslinks: ['https://www.w3schools.com/w3css/4/w3.css','https://fonts.googleapis.com/css?family=Raleway'],
    css: ['account.css'], layout: "profilepages",authenticated: req.session.email
  });
});



router.post("/profile/addressChange",function(req,res,next){
  
 
  // res.render('addressChange', {csslinks: ['https://www.w3schools.com/w3css/4/w3.css','https://fonts.googleapis.com/css?family=Raleway'],
  //   css: ['account.css'], layout: "profilepages"
  // });
});


router.get("/profile/prodlent",function(req,res,next){
  // Extract Products according to User_id. These are the Products Lent
  db.User.find({email: req.session.email}, function(err, User){
    if(err){
      res.send(err);
    }
      db.Product.find({User_id:  mongojs.ObjectId(User._id)}, function(err, Product){
    if(err){
      res.send(err);
    }
    res.render('productslent', {csslinks: ['https://www.w3schools.com/w3css/4/w3.css','https://fonts.googleapis.com/css?family=Raleway'],
    css: ['account.css'], layout: "profilepages", authenticated: req.session.email
    });
  });
});
});

router.get("/profile/giftcards",function(req,res,next){
  res.render('giftcards', {csslinks: ['https://npmcdn.com/flickity@2/dist/flickity.css','https://www.w3schools.com/w3css/4/w3.css','https://fonts.googleapis.com/css?family=Raleway'],
    css: ['account.css', 'gift.css'], layout: "profilepages", authenticated: req.session.email
  });
});


router.get("/profile/prodborrowed",function(req,res,next){
  res.render('productsborrowed', {csslinks: ['https://www.w3schools.com/w3css/4/w3.css','https://fonts.googleapis.com/css?family=Raleway'],
    css: ['account.css'], layout: "profilepages", authenticated: req.session.email
  });
});

router.get("/profile/wishlist",function(req,res,next){
  db.User.findOne({email: req.session.email}, function(err, User){
    if(err){
      res.send(err);
    }
    console.log("User=== "+JSON.stringify(User));
    if(User){
      let x=User["Wishlist"];
      x=x.split(",");
      Products=[]
      // console.log("Cart= "+x);
      // console.log("Product==="+Products);
      if(x[0].trim().length==0){
        x.shift();
      }
      for(var i=0;i<x.length;i++){
        console.log("YOOOOOOOOOO");
      // db.Product.find({_id: mongojs.ObjectId(x[i])}, function(err, Product){
      //     if(err){
      //       res.send(err);
      //     }
      //     else{
      //       console.log(JSON.stringify(Product[0]));
      //       Products.push(Product[0]);
      //     }
      //   });
        db.collection("Product", function(err, collection)
        {
            collection.findOne({_id: mongojs.ObjectId(x[i])}, function(err, thing)
            {       
                // console.log("Thing==== "+JSON.stringify(thing));                
                // callback(err, thing);
            }).then()
        });
      }
      console.log("Products======="+Products+"\n\n\n\n\n");
      // res.render("navbar", {authenticated: req.session.email,Products: Products});
      res.render('productswishlist', {csslinks: ['https://www.w3schools.com/w3css/4/w3.css','https://fonts.googleapis.com/css?family=Raleway'],
          css: ['account.css'], layout: "profilepages", authenticated: req.session.email, Products: Products
  });
    }
    else{
      // res.render("navbar", {authenticated: req.session.email,Products: Products});
      res.redirect("/");
    }
    });
  
});

router.get("/profile/lendencred",function(req,res,next){

  db.User.findOne({email: req.session.email}, function(err, User){
    if(err){
      res.send(err);
    }
    console.log("asduashdioasdoasdoisa odjsaoi dsad"+JSON.stringify(User));
  res.render('lendencredits', {csslinks: ['https://www.w3schools.com/w3css/4/w3.css','https://fonts.googleapis.com/css?family=Raleway'],
    css: ['account.css'], layout: "profilepages", User: User, authenticated: req.session.email
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
    css: ['account.css'], authenticated: req.session.email
  });
})

router.route("/prodDesc").get(function (req, res) {
  res.render("lenden_pd" , {css:['style.css'], authenticated: req.session.email});
})

router.route("/subcat").get(function (req, res) {
  res.render("subcat_filters",{css: ["subcat_filters.css"], authenticated: req.session.email});
})


router.route("/payment").get(function (req, res) {
  res.render("payment_portal",{ authenticated: req.session.email});
})


router.route("/shoppingcart").get(function (req, res) {
  db.User.findOne({email: req.session.email}, function(err, User){
    if(err){
      res.send(err);
    }
    console.log("User=== "+JSON.stringify(User));
    if(User){
      let x=User["Cart"];
      x=x.split(",");
      Products=[]
      // console.log("Cart= "+x);
      // console.log("Product==="+Products);
      if(x[0].trim().length==0){
        x.shift();
      }

      query=[];
      for(var i=0;i<x.length;i++){
        temp={};
        temp["_id"]=x[i];
        query.push(temp);
      }

        console.log("YOOOOOOOOOO"+query);
      db.Product.find({ $or: query}, function(err, Product){
          if(err){
            res.send(err);
          }
          else{
            console.log(Product);
            res.render("navbar", {authenticated: req.session.email,Products: Product});
          }
        });
        // db.collection("Product", function(err, collection)
        // {
        //     collection.findOne({_id: mongojs.ObjectId(x[i])}, function(err, thing)
        //     {       
        //         console.log("Thing==== "+JSON.stringify(thing));                
        //         // callback(err, thing);
        //     })
        // });
      
      console.log("Products======="+Products+"\n\n\n\n\n");
      res.render("navbar", {authenticated: req.session.email,Products: Products});
    }
    else{
      // res.render("navbar", {authenticated: req.session.email,Products: Products});
      res.redirect("/");
    }
    });
})

router.route("/addProductDen").get(function (req, res) {
  res.render("addProductsden",{authenticated: req.session.email});
})


router.get('/upload', function(req, res, next){
  res.render("upload_item",{authenticated: req.session.email});
});

router.post('/upload', function(req, res, next){
var task = req.body;
    db.Category.save(task, function(err, task){
        if(err){
            res.send(err);
            res.render("upload",{data: req.body,status:'Failed!', authenticated: req.session.email});
        }
        res.json(task);
        res.render("addProduct",{data: req.body,status:'Added!', authenticated: req.session.email});
    }
  );
});


router.route("/addtocart/:productid").post(function (req, res) {
  db.User.findOne({email: req.session.email}, function(err, User){
    if(err){
      res.send(err);
    }
    
    console.log("User=== "+JSON.stringify(User));
    if(User){
      User["Cart"]=User["Cart"]+","+req.params.productid;
      console.log(JSON.stringify(User));
      db.User.save(User, function(err, user){
        if(err){
          res.send(err);
        }
        res.redirect("/shoppingcart" );
        // res.json(task);
      });
    }
    else{
      res.redirect("back");
    }
  })
});

router.route("/addtowishlist/:productid").post(function (req, res) {
  db.User.findOne({email: req.session.email}, function(err, User){
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
    res.redirect("/profile/productsborrowed")
      // res.json(task);
    });
  })
});

module.exports = router;