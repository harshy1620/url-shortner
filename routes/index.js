// Import the express library
const express = require('express');
// Create a router instance from the express.Router() method
const router = express.Router();

// Import the 'UserController' module from the specified path
const UserController=require('../controller/userController');

// Import the 'urlcontroller' module from the specified path
const urlcontroller= require('../controller/urlController');

// Import the 'authoriseUser' middleware from the specified path
const { authoriseUser} = require('../middleware/authorizeUser');

// routes for user

// route for sign up page
router.post('/signup',UserController.signup);
// route for sign in page
router.post('/signin',UserController.signin);


// routes for url

// route for posting original url in db
router.post('/',authoriseUser,urlcontroller.postUrl)
// route for getting short url from db
router.get('/:shortId',urlcontroller.getUrl)

module.exports = router;