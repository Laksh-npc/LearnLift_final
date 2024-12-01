const mongoose = require("mongoose");

// Define the schema for comments
const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Message", required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create the model
const Comment = mongoose.model("Comment", commentSchema);

// Function to create a new comment
const createComment = async (data) => {
  try {
    const comment = new Comment(data);
    await comment.save();
    console.log("Comment saved successfully");
    return comment;
  } catch (error) {
    console.error("Error saving comment:", error);
    throw error;
  }
};

// Function to fetch comments for a specific post
const getCommentsByPostId = async (postId) => {
  try {
    return await Comment.find({ postId });
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

module.exports = { createComment, getCommentsByPostId };