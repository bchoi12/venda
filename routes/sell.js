var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/sell', function(req, res, next) {
  res.render('sell', { title: 'Venda | Sell' });
});

module.exports = router;