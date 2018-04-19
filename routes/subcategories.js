var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs("mongodb://lenden2:lenden123@ds237389.mlab.com:37389/lenden", ['Subcategory','Category','Product']);

var Category= require("../models/Subcategory");

// console.log("In subcategories")
router.get('/all', function(req, res, next){
    db.Subcategory.find(function(err, Subcategory){
      if(err){
          res.send(err);
      }
      res.json( Subcategory);
  });
});


router.get("/Category/:categoryId", function(req,res,next){
    db.Product.find({"Cat_id": req.params.categoryId}, function(err, Products){
        if(err){
            res.json(err);
        }
        // res.json(Products);

        //Get the Subcategory Names
        db.Subcategory.find({"Cat_id": req.params.categoryId}, function(err, Subcategories){
            if(err){
                res.json(err);
            }
            // res.json(Products);
            
            //Render the template   
            res.render("subcat_filters",{Products: Products, Subcategories: Subcategories});
        })
        //Render the template
        // res.render("subcat_filters",{Products: Products});
    })
})


router.get("/Subcategory/:subcategoryId", function(req,res,next){
    db.Product.find({"Subcat_id": req.params.subcategoryId}, function(err, Products){
        if(err){
            res.json(err);
        }
        // res.json(Products);
        res.render("subcat_filters",{Products: Products});
    })
})

// // Get Single Subcategory
// router.get('/Subcat/:id', function(req, res, next){
//   db.Subcategory.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, Subcategory){
//       if(err){
//           res.send(err);
//       }
//       res.json(Subcategory);
//   });
// });


router.get('/add', function(req, res, next){
  res.render("addSubcategory");
});

router.post('/add', function(req, res, next){
  var task = req.body;
      db.Subcategory.save(task, function(err, task){
          if(err){
              res.send(err);
          }
          res.json(task);
      });
});

module.exports = router;
