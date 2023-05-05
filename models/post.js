const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
	// One User has many Posts, Post belongs to a User
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoSrc: String,
    caption: String
  },
  {
    timestamps: true,
  }
)
 

module.exports = mongoose.model('Post', postSchema);