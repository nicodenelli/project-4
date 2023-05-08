const Post = require('../models/post');

module.exports = {
    create,
    index
}

const S3 = require('aws-sdk/clients/s3');

const s3 = new S3();

const { v4: uuidv4 } = require('uuid');

const BUCKET_NAME = process.env.BUCKET;



function create(req, res){

    console.log(req.body, req.file, req.user)

    const filePath = `project-hockey/posts/${uuidv4()}-${req.file.originalname}}`
    const params = {Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer}; // Body is the Image

    s3.upload(params, async function(err, data){
        
        if(err){
            console.log("===============")
            console.log(err, " err from aws, could be your BUCKET_NAME or Keys are incorrect");
            console.log("=============")
            console.log(400).json({error: 'Error from aws, check terminal'})
        }

        try {
            const post = await Post.create({
                user: req.user,
                photoSrc: data.Location,
                caption: req.body.caption
            })
            await post.populate('user');
            res.status(201).json({data: post})

        }catch(err){
            res.status(400).json({error: err})
        }
    })

}

async function index(req, res){
    try {
        const posts = await Post.find({}).populate('user').exec()
        res.status(200).json({posts: posts})

    }catch(err){
        console.log(err, "error in index function")
    }
}