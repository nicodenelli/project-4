const Post = require('../models/post')

module.exports = {
    create,
    deleteFavorite,
    favorites
}

async function create(req, res){
 
    try {
         // Find the post to add a favorite to using the id provided in the request
        const post = await Post.findById(req.params.id);
        // Add the current user's username and user id to the post's favorites array
        post.favorites.push({username: req.user.username, userId: req.user._id}); // <- mutating a document
        await post.save()// save the updated post
        // If successful will respond with a 201 status and a success message
        res.status(201).json({data: 'favorite added'})
    } catch(err){
        // If there was an error, respond with a 400 status and the error message
        res.status(400).json({err})
    }
    
}

async function deleteFavorite(req, res){
    try {
        // Find the Post with the favorite
        // 'favorites._id' and 'favorites.username' comes from the embedded schema on Post
        const post = await Post.findOne({'favorites._id': req.params.id, 'favorites.username': req.user.username});
        post.favorites.remove(req.params.id) // mutating a document
        // req.params.id is the favorite id 
        await post.save() // after you mutate a document you must save
        // res is an object that can respond to the client
        
        res.json({data: 'favorite removed'})
    } catch(err){
        res.status(400).json({err})
    }
}

// defines an asynchronous function called favorites that takes two arguments, req and res
async function favorites(req, res){
    try {
        // Post.find queries the database for all posts that have been favorited by the user with the ID stored in req.user._id, 
        // and populates .populate() the user field of each post with the corresponding user document.
      const posts = await Post.find({'favorites.userId': req.user._id}).populate('user').exec()

      console.log(posts, ' this posts')
      // sends a JSON response back to the client containing the resulting posts, along with an HTTP status code of 200
      res.status(200).json({posts: posts})

    } catch(err){

      console.log(err)
      res.status(400).json({err})
    }
  }




