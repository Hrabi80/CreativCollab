const mongoose= require('mongoose');
const joi = require('joi');






const User = mongoose.model('User',new mongoose.Schema({
    name: {
        type: String
    } ,
    email: {
        type: String
    } , 
    password: {
        type: String
    } ,   
    introduction: {
        type: String
    } ,
     
    coverPhoto: {
        type: String
    } ,
    Photo: {
        type: String
    }         
    
    }) );

module.exports = User;

