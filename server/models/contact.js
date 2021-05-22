var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var ContactSchema = new Schema({   
    facebook:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:String
    }
});
ContactSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('contact',ContactSchema);
