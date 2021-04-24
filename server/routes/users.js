var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var authenticate = require('../authentificate');
var passport = require('passport');
var User = require('../models/user');

router.use(bodyParser.json());
router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), //refister() by passport mongoose plugin
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if(req.body.firstname)
        user.firstname = req.body.firstname;
      if(req.body.lastname)
        user.lastname = req.body.lastname;
      user.save((err,user)=>{
        if(err){
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
      
    }
  });
});
//use passpoert.authentificate as a middlware // only req and res
router.post('/login', passport.authenticate('local'), (req, res) => {
  //create token and pass it to the user
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  //return the token in the response
  res.json({success: true,token: token,status: 'You are successfully logged in!'});
});

module.exports = router;
