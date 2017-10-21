var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Image = require("../models/image.js");
var School = require("../models/school.js");
const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'dbdf7fcc676045bdb191ffb39a395d05'
});



function count(array_elements) {
  array_elements.sort();
  var leaderboard = [];
  var current = null;
  var cnt = 0;
  for (var i = 0; i < array_elements.length; i++) {
    if (array_elements[i] != current) {
      if (cnt > 0) {
        leaderboard.push([current, cnt]);
      }
      current = array_elements[i];
      cnt = 1;
    }
    else {
      cnt++;
    }
  }
  if (cnt > 0) {
    leaderboard.push([current, 0]);
  }

  return leaderboard;
}



// IMAGE URLS: https://i.imgur.com/nHpV6Ob.jpg  https://i.imgur.com/nhujBRJ.jpg  https://i.imgur.com/UD9KMsK.jpg  https://i.imgur.com/IlJxfT2.jpg
// SCHOOL IDS: 59e7dfb9fbb8240edae42c0f  59e7dfb9fbb8240edae42c10  59e7dfb9fbb8240edae42c11
/* GET home page. */
router.get('/', function(req, res, next) {
  
   res.render('index');
});

router.get('/addImage/:imageUrl/:schoolId', function(req, res, next) {
  app.models.predict("bd367be194cf45149e75f01d59f77ba7", req.params.imageUrl).then(
    function(response) {
      var concepts = response.outputs[0].data.concepts;
      var foodList = [];
      for (var i = 0; i < 5; i++) {
        foodList.push(concepts[i].name);
      }
      console.log(foodList);
      var schoolId = mongoose.Types.ObjectId(req.params.schoolId);
      var image = new Image({ imageUrl: req.params.imageUrl, foodList: foodList, schoolId: schoolId });
      image.save(function(err) {
        if (err) return console.error('ERROR SAVING IMAGE', err);
      });
      console.log('IMAGE DOCUMENT', image);
      res.redirect('/');
    },
    function(err) {
      console.log('ERROR DOING FOOD RECOGNITION', err);
    }
  );
});

router.get('/createSchools', function(req, res, next) {
  var ahs = new School({ 'name': 'American High School', 'menuUrl': 'https://goo.gl/WWELbc', 'forumUrl': 'https://goo.gl/RCv5Vy', 'overallSentiment': Math.floor(Math.random() * 100) + 1 });
  var wes = new School({ 'name': 'Warwick Elementary School', 'menuUrl': 'https://goo.gl/MPdstc', 'forumUrl': 'https://goo.gl/Aw1JXa', 'overallSentiment': Math.floor(Math.random() * 100) + 1 });
  var tjhs = new School({ 'name': 'Thornton Junior High School', 'menuUrl': 'https://goo.gl/BgtZdv', 'forumUrl': 'https://goo.gl/UFBhmw', 'overallSentiment': Math.floor(Math.random() * 100) + 1 });
  ahs.save(function(err) {
    if (err) return console.error('PROBLEM IN AHS', err);
    wes.save(function(err) {
      if (err) return console.error('PROBLEM IN WES', err);
      tjhs.save(function(err) {
        if (err) return console.error('PROBLEM IN TJHS', err);
        res.redirect('/');
      });
    });
  });
});


router.get('/getLeaderboard', function(req, res, next) {
  var allFoods = [];
  Image.find(function(err, images) {
    if (err) return console.error(err);
    for (var i = 0; i < images.length; i++) {
      //console.log('ADDING', Array.from(images[i].foodList));
      //console.log('TYPE', typeof Array.from(images[i].foodList));
      allFoods = allFoods.concat(Array.from(images[i].foodList));
      //console.log('ALLFOODS', allFoods);
    }

    //console.log('ALL FOODS', allFoods);
    var counts = count(allFoods);
    //console.log('COUNTS', counts);

    function compare(a, b) {
      if (a[1] > b[1])
        return -1;
      if (a[1] < b[1])
        return 1;
      return 0;
    }
    
    counts = counts.sort(compare);
    
    res.send({'counts': counts});
  });
});


module.exports = router;
