var express = require('express');
var router = express.Router();
var auth = require('../authentificate');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/needauth', auth.verifyUser,function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
