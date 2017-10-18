var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Image = require("../models/image.js");
var School = require("../models/school.js");
const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'dbdf7fcc676045bdb191ffb39a395d05'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var answer;
  app.models.predict("bd367be194cf45149e75f01d59f77ba7", "https://samples.clarifai.com/food.jpg").then(
    function(response) {
      answer = response;
      console.log('RESPONSE', response.outputs[0].data.concepts);
    },
    function(err) {
      console.log('ERROR', err);
    }
  );
  res.render('index', {'data': answer});
});

module.exports = router;
