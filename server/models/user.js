var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var UserSchema = new Schema({
    
    mail:{
        type:String,
    },
    role:{
        type:String,
    },
    about:{
        type:String
    },
    description:{
        type:String
    },
    linkedin:{
        type:String
    },
    facebook:{
        type: String
    },
    twitter:{
        type:String,
    },
    tel:{
        type:String,
    },
    place:{
        type:String
    },
    avatar:{
        type:String
    },
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'event'
        }
    ],
    skills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'skills'
        }
    ]


});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',UserSchema);
