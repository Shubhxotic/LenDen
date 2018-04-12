var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs("mongodb://lenden2:lenden123@ds237389.mlab.com:37389/lenden", ['Category','Parameter','Product','ProductsDen','Quality','User','Subcategory']);
var Category= require("../models/Category");
var Subcategory= require("../models/Subcategory");
var Product= require("../models/Product");
var ProductsDen= require("../models/ProductsDen");
var Quality= require("../models/quality");
var User= require("../models/user");
var Parameter= require("../models/parameter");


router.route("/").get(function (req, res) {
  res.render("homepage");
})

router.route("/prodDesc").get(function (req, res) {
  res.render("lenden_pd");
})

router.route("/shoppingcart").get(function (req, res) {
  res.render("navbar");
})

router.route("/subcat").get(function (req, res) {
  res.render("subcat_filters");
})

router.get('/home', function(req,res,next){
 res.render("index");
});


router.get('/Category', function(req, res, next){
  db.Category.find(function(err, Category){
      if(err){
          res.send(err);
      }
      res.json(Category);
  });
});

// Get Single Category
router.get('/Category/:id', function(req, res, next){
  db.Category.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, Category){
      if(err){
          res.send(err);
      }
      res.json(Category);
  });
});

router.get('/addCategory', function(req, res, next){
  res.render("addCategory");
});

router.post('/addCategory', function(req, res, next){
  var task = req.body;
      db.Category.save(task, function(err, task){
          if(err){
              res.send(err);
          }
          res.json(task);
      });
});

module.exports = router;



router.get('/subcategory', function(req, res, next){
  db.Subcategory.find(function(err, Subcategory){
      if(err){
          res.send(err);
      }
      res.json(Subcategory);
  });
});

// Get Single Category
// router.get('/Category/:id', function(req, res, next){
//   db.Category.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, Category){
//       if(err){
//           res.send(err);
//       }
//       res.json(Category);
//   });
// });

router.get('/addSubcategory', function(req, res, next){
  res.render("addSubcategory");
});

router.post('/addSubcategory', function(req, res, next){
  var task = req.body;
      db.Subcategory.save(task, function(err, task){
          if(err){
              res.send(err);
          }
          res.json(task);
      });
});




router.get('/Products', function(req, res, next){
  db.Product.find(function(err, Product){
      if(err){
          res.send(err);
      }
      res.json(Product);
  });
});

// Get Single Category
// router.get('/Category/:id', function(req, res, next){
//   db.Category.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, Category){
//       if(err){
//           res.send(err);
//       }
//       res.json(Category);
//   });
// });

router.get('/addProduct', function(req, res, next){
  res.render("addProduct");
});

router.post('/addProduct', function(req, res, next){
  var task = req.body;
      db.Product.save(task, function(err, task){
          if(err){
              res.send(err);
          }
          res.json(task);
      });
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
// router.get('/User/:id', function(req, res, next){
//   db.User.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, User){
//       if(err){
//           res.send(err);
//       }
//       res.json(User);
//   });
// });

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
