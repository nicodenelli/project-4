const mongoose = require('mongoose');

const favoritesSchema = mongoose.Schema(
  {
  username: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
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
    favorites: [favoritesSchema],
    cardDate: {type: Date, default: Date.now}
  },
  {
    timestamps: true,
  }
)
 

module.exports = mongoose.model('Post', postSchema);