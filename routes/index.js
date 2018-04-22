var express = require('express');
var router = express.Router();
/*var Category= require("../models/Category");
var Subcategory= require("../models/Subcategory");
var Product= require("../models/Product");
var ProductsDen= require("../models/ProductsDen");
var Quality= require("../models/quality");
var Parameter= require("../models/parameter");*/


router.route("/email").get(function (req, res) {
  res.render("email");
})

router.route("/signup").get(function (req, res) {
  res.render("homepage");
})

router.route("/signin").get(function (req, res) {
  res.render("homepage");
})

<<<<<<< HEAD
router.route("/").get(function (req, res) {
  res.render("authentication");
=======

router.get("/temp",function(req,res,next){
  res.render('temp');
>>>>>>> 9a9e7b9b5e6044e116ecda0a2477b91571b38853
})

router.route("/prodDesc").get(function (req, res) {
  res.render("lenden_pd" , {css:['style.css']});
})

router.route("/shoppingcart").get(function (req, res) {
  res.render("navbar");
})

router.route("/subcat").get(function (req, res) {
  res.render("subcat_filters",{css: ["subcat_filters.css"]});
})

module.exports = router;
