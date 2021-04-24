const mongoose= require('mongoose');
const joi = require('joi');


const User = mongoose.model('User',new mongoose.Schema({
    name: {
        type: String,
        require: true,
    } ,
    googleID: {
        type: String,
        require: true,
    } ,
    email: {
        type: String,
        require: true,
        unique: true
    } , 
    password: {
        type: String,
        require: true,
    } ,   
    introduction: {
        type: String
    } ,
    lieu : {
        type: String,
        require: true,
    } , 
    coverPhoto: {
        type: String,
        require: true,
    } ,
    Photo: {
        type: String,
        require: true,
    } ,
    createdate: {
        type : Date,
        default: Date.now 
    }


}) );

module.exports = User;

