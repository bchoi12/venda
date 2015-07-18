var express = require('express');
var router = express.Router();
var ref = new Firebase("https://venda.firebaseio.com/");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Venda | Login' });
});

router.post('/login', function(req, res, next) {
  var formObjects = req.body;
  var password = formObjects.password;
  var inputEmail = formObjects.email;

});

router.post('/signup', function(req, res, next) {
  var formObjects = req.body;
  var password = formObjects.password;
  var inputEmail = formObjects.email;

});

module.exports = router;