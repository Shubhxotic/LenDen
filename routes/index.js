var express = require('express');
var router = express.Router();
/*var Category= require("../models/Category");
var Subcategory= require("../models/Subcategory");
var Product= require("../models/Product");
var ProductsDen= require("../models/ProductsDen");
var Quality= require("../models/quality");
var Parameter= require("../models/parameter");*/


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

module.exports = router;
