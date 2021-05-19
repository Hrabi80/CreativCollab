var express = require('express');
var router = express.Router();
var auth = require('../authentificate');
/* GET home page. */
router.get('/first', function(req, res, next) {
  res.render('index', { title: 'FIrst' });
});

router.get('/second', auth.verifyUser,function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
