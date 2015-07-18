var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
  var itemId = req.params.id;
  res.render('item', { title: 'Venda | Item', itemId: itemId });
});

module.exports = router;