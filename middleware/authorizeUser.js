const jwt = require('jsonwebtoken');
const User = require('../model/user'); 

// step 2 and 3: the client sends the jwt token in the header and then it is checked/ verified and then the further request takes place
module.exports.authoriseUser = async (req, res, next) => {
  try {
    // Accessing the token from header
    const token = req.header('Authorization').replace('Bearer ', '');
    // Verifying the token
    const decoded = jwt.verify(token, 'Mysecretkey'); 
    // Finding the user based on the decoded user ID
    const user = await User.findById(decoded.userId);
    // if user is not found, then throw an error
    if (!user) { throw new Error("User not found or invalid token.");}
    // Attaching the user to the request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Authorization failed' });
  }
};
