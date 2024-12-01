// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
// Initialize app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/community', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define Schema and Model
const postSchema = new mongoose.Schema({
    author: String,
    content: String,
    comments: [{ author: String, content: String }],
});

const Post = mongoose.model('Post', postSchema);

// API Routes
app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

app.post('/posts', async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json({ message: 'Post saved successfully!' });
});

app.post('/posts/:id/comments', async (req, res) => {
    const { id } = req.params;
    const comment = req.body;
    const post = await Post.findById(id);
    post.comments.push(comment);
    await post.save();
    res.json({ message: 'Comment added successfully!' });
});

// Start Server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
