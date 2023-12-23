// Import the express library
const express= require('express');

// Create an instance of the Express application
const app = express();

// Enable parsing of JSON data in the request body
app.use(express.json());

// Enable parsing of URL-encoded data in the request body
app.use(express.urlencoded({ extended: true }));

// Specify the port number for the server to listen on
const port=8001;

// Include the routes defined in the 'routes' module
app.use('/',require('./routes'));

// Connect to the MongoDB database using the configuration in 'config/mongoose'
const db=require('./config/mongoose')

// Start the server and listen on the specified port
app.listen(port, function(){
    console.log("listening on port", port);
})