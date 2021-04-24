const User = require('../models/User');
const _= require('lodash');
const { JSONCookie } = require('cookie-parser');
var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const joi = require('joi');



//post the user 
router.post('/register',async (req ,res )=> {
    const { error } = 
  
  let newUser = new User(_.pick(req.body , ['name', 'email','password' ,'introduction', 'lieu' , 'coverPhoto','photo']));

  //hashing the password 
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password , salt );
   
  console.log(_.pick(newUser , ['name', 'email','password' ,'introduction', 'lieu' , 'coverPhoto','photo']));
  newUser.save();
});


function validate(user) {
    const schema = { 
        email   
    }
}

module.exports = router;
