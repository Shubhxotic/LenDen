var express = require('express');
var router = express.Router();
/*var Category= require("../models/Category");
var Subcategory= require("../models/Subcategory");
var Product= require("../models/Product");
var ProductsDen= require("../models/ProductsDen");
var Quality= require("../models/quality");
var Parameter= require("../models/parameter");*/

router.route("/login").get(function (req, res) {
  res.render("authentication");
})

router.route("/").get(function (req, res) {
  res.render("homepage");
})


router.get("/temp",function(req,res,next){
  res.render('temp');
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
