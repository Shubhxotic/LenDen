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
    db.Category.find(function(err, Category){
        if(err){
            res.send(err);
        }
        db.Category.findOne({"Cat_id": req.params.categoryId}, function(err, Categor){
            if(err){
                res.send(err);
            }
        db.Product.find({"Cat_id": req.params.categoryId}, function(err, Products){
            if(err){
                res.json(err);
            }
            //Get the Subcategory Names
            db.Subcategory.find({"Cat_id": req.params.categoryId}, function(err, Subcategories){
                if(err){
                    res.json(err);
                }

                //Render the template
                console.log(JSON.stringify(Categor["Cat_id"]));
                res.render("subcat_filters",{Products: Products, Categ: Categor["Cat_id"], Subcategories: Subcategories, Categories:Category, authenticated: req.session.email});
            })
            //Render the template
            // res.render("subcat_filters",{Products: Products});
        })
    })
})
})

router.get('/Category/:categoryId/sort', function(req, res, next){
  db.Category.find(function(err, Category){
      if(err){
          res.send(err);
      }
      db.Category.findOne({"Cat_id": req.params.categoryId},function(err, Categ){
          if(err){
              res.send(err);
          }
          console.log(JSON.stringify(Categ["Cat_id"]));
      db.Product.find({"Cat_id": req.params.categoryId}).sort({ Price: 1 }).toArray(function(err, Products){
            if(err){
                res.send(err);
            }

            //console.log(Products);
          //Get the Subcategory Names
          db.Subcategory.find({"Cat_id": req.params.categoryId}, function(err, Subcategories){
              if(err){
                  res.json(err);
              }
              //Render the template
              //console.log("URL="+req.get("host")+req.originalUrl);
              res.render("subcat_filters",{Products: Products, Subcategories: Subcategories, Categ : Categ["Cat_id"], Categories:Category, authenticated: req.session.email});
              //res.render("subcat_filters",{Products: Products, authenticated: req.session.email});
          })
      })
  })
})
});


router.get("/Subcategory/:subcategoryId", function(req,res,next){
    // try{
        console.log(req.user);
    db.Category.find(function(err, Category){
        if(err){
            res.send(err);
        }
        db.Product.find({"Subcat_id": req.params.subcategoryId}, function(err, Products){
                if(err){
                    res.json(err);
                }
                // console.log("Products== "+Products+" \n\n\n\n");
                // console.log(Products.length);
                // if(Products.length==0){
                //     console.log("Rendering");
                //     res.render("subcat_filters",{Products: Products, Categories:Category, Subcategories:{} });
                //     console.log("Rendered");
                // }
                db.Subcategory.find({"Cat_id": Products[0]["Cat_id"]}, function(err, Subcategories){
                    if(err){
                        res.json(err);
                    }
                // res.json(Products);
                res.render("subcat_filters",{Products: Products, Subcategories:Subcategories, Categories:Category   });
            })
        })
    })
    // }
    // catch(exception){
    //     console.log(exception);
    // }
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

