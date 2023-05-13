const User = require('../models/user');
const Post = require('../models/post');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  profile
};

const S3 = require('aws-sdk/clients/s3');
// initialize the constructor function
// this object can make requests to the s3 bucket
const s3 = new S3();
// use the module uuid to generate random names for the aws file
const { v4: uuidv4 } = require('uuid')
// s3 aws bucket from .env file
const BUCKET_NAME = process.env.BUCKET

async function signup(req, res) {

  console.log(req.body, ' < req.body', req.file, " <- req.filed")
  
  // Check if a file was uploaded by the user
  if(!req.file) return res.status(400).json({error: "Please Submit a Photo!"});

  // defining the file path of where I want to store file in my s3 bucket
  // and create the S3 upload parameters
  const filePath = `project4/${uuidv4()}-${req.file.originalname}`;
  const params = {Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer}; // req.file.buffer is the image uploaded from the client
  // s3.upload to make a request to s3 bucket
  // requesting to upload the file to s3
  s3.upload(params, async function(err, data){
    if(err){
      // handle the errors from the s3 upload
      console.log('===========================================')
      console.log(err, ' err from aws, either your bucket name is wrong or your keys arent correct');
      console.log('===========================================')
      res.status(400).json({error: 'Error from aws, check your terminal!'})
    }
    // Create a new user with the request body and the uploaded image URL
    const user = new User({...req.body, photoSrc: data.Location}); // data.Location is the is the url of our image on AWS
    try {
      // Save the new user to the database, which will trigger the user model .pre('save') hook to hash the password
      await user.save();
      // create a jwt token for the user signing up
      const token = createJWT(user);
      // Send the token to the client (userService.signup function) and store it in local storage
      res.json({token});
      // user model toJSON removes the password
    } catch(err){
      res.status(400).json({error: err})
    }

  }) // end of s3.upload


}

async function login(req, res) {
 
  try {
    // matches the user in the database with the provided email from the user using User.findOne()
    const user = await User.findOne({email: req.body.email});
   // If there is no matching user found return - 
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => { // If a matching user is found, the comparePassword() method of the user object is called,
      // which compares the password provided in the request body with the hashed password stored in the database.
      if (isMatch) {
        const token = createJWT(user); // If the passwords match, a JSON Web Token is created using the 
        // createJWT() function and returned to the client in the response body.
        res.json({token});
      } else {
        // if passwords do not match return - 
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err); // and if an error occurs, the error message is returned to the client
  }
}

async function profile(req, res){
  try {
    // First find the user using the params from the request
    // findOne finds first match, its useful to have unique usernames
    const user = await User.findOne({username: req.params.username})
    // finding all the posts that belong to that user
    if(!user) return res.status(404).json({error: 'User not found'})

    // using the post model to find all the users posts (the user from req.params)
    // finding all posts by a user, and populating the user property
    const posts = await Post.find({user: user._id}).populate("user").exec();
    console.log(posts, ' this posts')
    res.status(200).json({posts: posts, user: user})
  } catch(err){
    console.log(err)
    res.status(400).json({err})
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
