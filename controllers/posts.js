const Post = require('../models/post');

module.exports = {
    create,
    index
}

const S3 = require('aws-sdk/clients/s3');
// initialize the constructor function
// this object can make requests to the s3 bucket
const s3 = new S3();
// use the module uuid to generate random names for the aws file
const { v4: uuidv4 } = require('uuid');
// s3 aws bucket from .env file
const BUCKET_NAME = process.env.BUCKET;



function create(req, res){
    // Log the request body, file, and user information
    console.log(req.body, req.file, req.user)
    // Set up parameters for S3 upload
    const filePath = `project4/posts/${uuidv4()}-${req.file.originalname}`
    const params = {Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer}; // Body is the Image

    // Upload the image to S3 and handle the response
    s3.upload(params, async function(err, data){

        if(err){
            // If there was an error, log it and respond with a 400 status and error message
            console.log("===============")
            console.log(err, " err from aws, could be your BUCKET_NAME or Keys are incorrect");
            console.log("=============")
            console.log(400).json({error: 'Error from aws, check terminal'})
        }

        try {
            // If there was no error, create a new post document in the database
            const post = await Post.create({
                user: req.user,
                photoSrc: data.Location,
                caption: req.body.caption
            })
            // Populate the 'user' field with the full user object
            await post.populate('user');
            // If success respond with a 201 status and the created post
            res.status(201).json({data: post})

        }catch(err){
            // if error respond with 400
            res.status(400).json({error: err})
        }
    })

}

async function index(req, res){
    try {
        // this populates the user when posts is found allowing access to the users information 
        // when fetching the posts
        const posts = await Post.find({}).populate('user').exec()
        res.status(200).json({posts: posts})

    }catch(err){
        console.log(err, "error in index function")
    }
}