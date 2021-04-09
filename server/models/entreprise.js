const mongoose= require('mongoose');


const User = mongoose.model('User',new mongoose.Schema({
    name: {
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
    email_ceo : {
        type : String,
        require : true
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
    } 


}) );

module.exports = User;

