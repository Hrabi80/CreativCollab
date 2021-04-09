const User = require('../models/User');
const { JSONCookie } = require('cookie-parser');
var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//login page 
router.get('/login', (req , res )=> res.send('login'));

//register page 
router.get('/register', (req ,res) => res.send('register'));



router.post('/register',async (req ,res )=> {
  
  let newUser = new User({
    name : req.body.name,
    email : req.body.email,
    password : req.body.password,
    introduction : req.body.introduction, 
    lieu :  req.body.lieu,
    coverPhoto : req.body.coverPhoto,
    Photo : req.body.Photo
  });
  bcrypt.genSalt(10, (err, salt) => bcrypt.hash)

  console.log(newUser);
  newUser.save();
});



module.exports = router;
