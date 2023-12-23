// require the  library
const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://127.0.0.1:27017/Urlshortner',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

// acquire the connection to check if it is successful
const db = mongoose.connection;
// while error
db.on('error', console.error.bind(console,'error connecting to mongoDB'));

// if it is up and running then print this message
db.once('open',function(){
    console.log('Successfully connected to database');
});
 module.exports =db;