var express = require('express');
var router = express.Router();

router.get('/items', function(req, res, next) {
  res.render('my-items', { title: 'Venda | My Items' });
});

router.get('/bids', function(req, res, next) {
  res.render('my-bids', { title: 'Venda | My Bids' });
});

router.get('/', function(req, res, next) {
  res.render('my', { title: 'Venda | My' });
});

module.exports = router;