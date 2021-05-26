const mongoose= require('mongoose');


const event = mongoose.model('event',new mongoose.Schema({
    name: {
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
    link : {
        type: String,
        require: true,
    } ,
    Photo: {
        type: String,
        require: true,
    } ,
    date: {
        type : Date, 
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ]

}) );

module.exports = event;

