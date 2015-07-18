var titleText = 'Venda | Home';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: titleText });
});

module.exports = router;

// console.log(test);
