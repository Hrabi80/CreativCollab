var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//login page 
router.get('/login', (req , res )=> res.send('login'));

//register page 
router.get('/register', (req ,res) => res.send('register'));

module.exports = router;
