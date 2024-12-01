const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path=require('path');

const { createMessage, getAllMessages, deleteMessage } = require("./model/message");
const { createComment, getCommentsByPostId, deleteCommentsByPostId } = require("./model/comments");

// MongoDB Connection String
const con_string =
  "mongodb+srv://yugenjarwal23cse:wNu13Q4j1Bf5SFqL@learnliftcluster.pjesp.mongodb.net/?retryWrites=true&w=majority&appName=LearnLiftCluster";

// Function to connect to MongoDB
const dbconnect = () => {
  try {
    mongoose.connect(con_string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

// Initialize Express App
const app = express();

// Middleware
app.use(express.json()); // To parse JSON payloads
app.use(cors()); // Enable CORS for all routes

// Connect to the database
dbconnect();

/**
 * API Endpoints
 */

// Fetch all messages from the database
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await getAllMessages();
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Error fetching messages" });
  }
});

// Create a new message
app.post("/api/messages", async (req, res) => {
  try {
    const message = await createMessage(req.body);
    res.status(201).json({ message: "Message created successfully", data: message });
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: "Error creating message" });
  }
});

// Delete a message and its associated comments
app.delete("/api/messages/:id", async (req, res) => {
  try {
    const messageId = req.params.id;

    // Delete the message
    const message = await deleteMessage(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Delete associated comments
    await deleteCommentsByPostId(messageId);

    res.status(200).json({ message: "Message and its comments deleted successfully" });
  } catch (error) {
    console.error("Error deleting message and comments:", error);
    res.status(500).json({ error: "Error deleting message and comments" });
  }
});

// Fetch comments for a specific message
app.get("/api/comments/:postId", async (req, res) => {
  try {
    const comments = await getCommentsByPostId(req.params.postId);
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Error fetching comments" });
  }
});
app.use(express.static("C:/Users/dellk/Desktop/learnlift"));
app.get('/',(req,res)=>{
  res.sendFile(path.join(('C:/Users/dellk/Desktop/learnlift','index.html')))
})

// Create a new comment
app.post("/api/comments", async (req, res) => {
  try {
    const comment = await createComment(req.body);
    res.status(201).json({ message: "Comment added successfully", data: comment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Error adding comment" });
  }
});

// Delete comments by postId (called when message is deleted)
app.delete("/api/comments/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;

    // Delete associated comments
    await deleteCommentsByPostId(postId);

    res.status(200).json({ message: "Comments deleted successfully" });
  } catch (error) {
    console.error("Error deleting comments:", error);
    res.status(500).json({ error: "Error deleting comments" });
  }
});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
    res.render("index");
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});





