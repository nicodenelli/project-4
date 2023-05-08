const mongoose = require('mongoose');

const favoritesSchema = mongoose.Schema(
  {
  username: String,
  postId: { type: mongoose.Schema.Types.ObjectId },
  userId: { type: mongoose.Schema.Types.ObjectId }
},
{
  timestamps: true,
}
)

const postSchema = new mongoose.Schema(
    {
	// One User has many Posts, Post belongs to a User
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoSrc: String,
    caption: String,
    favorites: [favoritesSchema]
  },
  {
    timestamps: true,
  }
)
 

module.exports = mongoose.model('Post', postSchema);