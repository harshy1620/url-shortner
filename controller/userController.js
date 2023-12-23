const User = require('../model/user'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// secret key- we can store this key in .env file for security
const secretkey="Mysecretkey";

// signup Controller********************************************
module.exports.signup=async function(req, res){
    const { fullName, email, password, confirmPassword} = req.body;
    if(fullName && email && password && confirmPassword){
        try{
            // Checking if the user already exists
               const userAlreadyExists = await User.findOne({email:email});
               if(userAlreadyExists){
                   return res.status(409).send({message:"User already esxists."})
               }
               // if user does not already exists then adding the user to db
               else{
               //if pass and confirmPassword are not same
                   if(password!==confirmPassword){
                       return res.status(400).send({message:"Passwords do not match."})
                   }
                   else{
                       // hashing password
                       const salt = await bcrypt.genSalt(10);
                       const hashPassword = await bcrypt.hash(password,salt);
                       const newUser = new User({fullName,email,password: hashPassword});
                       // saving the new user to db
                       newUser.save();
                       return res.status(201).send({ message: "User Successfully Registered.Please Log in now." });
                   }
               }
           } catch(error){
               return res.status(500).send({ message: "Internal server error in creating a new user", error})
           }  
    } return res.json({error:"All fields are required."});
     
};

// signin Controller********************************************
module.exports.signin = async function(req, res){
    const {email, password} = req.body;
    if(email && password){
        try{
            // Checking if the user already exists
            const userAlreadyExists = await User.findOne({email:email});
            // if user does not already exists then asking him to register first
              if(!userAlreadyExists) {
                return res.status(404).send({message:"user not found,please signup first"})
              }
              else{
                // checking password
                const passwordMatched = await bcrypt.compare(password, userAlreadyExists.password);
                // if password does not match then returning the message
                if(!passwordMatched) {return res.status(400).send({message:"Invalid login credentials."})}
                else{
                    // on password matching adding the jwt token 
                    const token = jwt.sign({userId:userAlreadyExists._id},secretkey,{expiresIn: '2d'});
                    return res.status(200).send({message:"Logged in successfully.", token});
                }
              }
         } catch(error){
            return res.status(500).send({ message: "Internal server error in logging in a user",token, error})
         }
    } return res.json({error:"All fields are required"})
}