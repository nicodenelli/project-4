const mongoose = require("mongoose");

const favoritesSchema = mongoose.Schema(
    {
    postId: { type: mongoose.Schema.Types.ObjectId },
    userId: { type: mongoose.Schema.Types.ObjectId }
  },
  {
    timestamps: true,
  }
  )