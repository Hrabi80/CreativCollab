const mongoose = require('mongoose');
 

const connectdb = async () => {
    try {
       const conn = mongoose.connect(process.env.MONGO_URL  , {useNewUrlParser : true , useUnifiedTopology: true })
  .then(()=> console.log('db connected great'))
  .catch(()=> console.log('db not connected '));
    } catch (error) {
        console.log('error');
    }
}

module.exports = connectdb;