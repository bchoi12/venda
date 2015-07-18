var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/items', function(req, res, next) {
  res.render('my-items', { title: 'Venda | My Items' });
});

/* GET home page. */
router.get('/bids', function(req, res, next) {
  res.render('my-bids', { title: 'Venda | My Bids' });
});

module.exports = router;