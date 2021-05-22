var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var MessageSchema = new Schema({   
    objet:{
        type:String,
    },
    message:{
        type:String,
    },
    sendTo:{
        type:String
    },
    sender:{
        type:String
    }
});
MessageSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('message',MessageSchema);
