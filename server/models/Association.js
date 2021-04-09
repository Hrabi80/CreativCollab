const mongoose= require('mongoose');


const UserSchema = new mongoose.Schema({
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


});

const User = mongoose.model('User',UserSchema );

module.exports = User;

