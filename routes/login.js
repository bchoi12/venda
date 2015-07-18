var express = require('express');
var router = express.Router();
var Firebase = require('firebase');
var ref = new Firebase("https://venda.firebaseio.com/");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Venda | Login' });
});

router.post('/', function(req, res, next) {

    res.render('search');


});

module.exports = router;